import { Request, Response } from "express";
import pool from "../db/db";

const createCart = async (req: Request, res: Response) => {
  try {
    const cart = await pool.query(
      "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
      [req.params.user_id]
    );

    res.status(201).json({ msg: "Cart created", cart_id: cart.rows[0].uuid });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Create cart failed" });
  }
};

const getCartById = async (req: Request, res: Response) => {
  try {
    // to get list of orders
    const cart = await pool.query(
      "SELECT user_id, cart_id, vendor_id, item_id, name, carts_items.item_price, quantity_ordered, user_note FROM carts JOIN carts_items ON carts.uuid = cart_id JOIN items ON items.uuid = item_id WHERE user_id = $1 AND carts_items.is_deleted = FALSE",
      [req.params.user_id]
    );

    // to calculate total_price of orders
    const calcPrice = await pool.query(
      "SELECT SUM(carts_items.item_price*quantity_ordered) FROM carts JOIN carts_items ON carts.uuid = cart_id JOIN items ON items.uuid = item_id WHERE user_id = $1 AND carts_items.is_deleted = FALSE",
      [req.params.user_id]
    );
    const total_price: Number = calcPrice.rows[0].sum;

    // to update total_price in carts
    const updateCart = await pool.query(
      "UPDATE carts SET total_price = $1 WHERE user_id = $2 RETURNING total_price",
      [total_price, req.params.user_id]
    );

    res
      .status(201)
      .json({ orders: cart.rows, total_price: updateCart.rows[0].total_price, vendor_id: cart.rows[0].vendor_id });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get cart failed" });
  }
};

const addItemToCart = async (req: Request, res: Response) => {
  try {
    const {
      cart_id,
      item_price,
      quantity_ordered,
      user_note,
    }: {
      cart_id: String;
      item_price: Number;
      quantity_ordered: Number;
      user_note: String;
    } = req.body;
    const addedItem = await pool.query(
      "INSERT INTO carts_items (item_id, cart_id, item_price, quantity_ordered, user_note) VALUES ($1 ,$2, $3, $4, $5) RETURNING *",
      [req.params.item_id, cart_id, item_price, quantity_ordered, user_note]
    );

    res
      .status(201)
      .json({ msg: "Item added to cart", createdItem: addedItem.rows });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Add item to cart failed" });
  }
};

const delItemFromCart = async (req: Request, res: Response) => {
  try {
    const { cart_id }: { cart_id: String } = req.body;
    const delItem = await pool.query(
      "UPDATE carts_items SET is_deleted = TRUE WHERE item_id = $1 AND cart_id = $2 RETURNING *",
      [req.params.item_id, cart_id]
    );

    res.json({
      status: "ok",
      msg: "Item deleted",
      deleted: delItem.rows,
    });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Delete item from cart failed" });
  }
};

const updateItemInCart = async (req: Request, res: Response) => {
  try {
    const {
      quantity_ordered,
      cart_id,
    }: { quantity_ordered: Number; cart_id: String } = req.body;
    const updatedItem = await pool.query(
      "UPDATE carts_items SET quantity_ordered = $1 WHERE item_id = $2 AND cart_id = $3 RETURNING *",
      [quantity_ordered, req.params.item_id, cart_id]
    );

    res.status(201).json({
      msg: "Item updated",
      updatedItem: updatedItem.rows,
    });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Update item failed" });
  }
};

export { createCart, getCartById, addItemToCart, delItemFromCart, updateItemInCart };
