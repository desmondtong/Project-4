import { body, param } from "express-validator";

const validateIdInParam = [
  param("id", "invalid id").isLength({ min: 36, max: 36 }),
];

const validateCreateOrder = [
  body("vendor_id", "vendor id is required")
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
  body("total_price", "total price is required").notEmpty().isDecimal(),
];

const validateUpdateOrder = [
  body("status", "status is required").notEmpty().isString().isUppercase(),
  body("rating", "rating is required").optional().notEmpty().isFloat(),
  body("review", "review is required").optional().notEmpty().isString(),
];

const validateCreateItemsOrders = [
  body("cart_id", "cart id is required")
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
];

const validateGetItemById = [
  body("order_id", "order id is required")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
  body("vendor_id", "vendor id is required")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
  body("user_id", "user id is required")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
];

export {
  validateIdInParam,
  validateCreateOrder,
  validateUpdateOrder,
  validateCreateItemsOrders,
  validateGetItemById,
};
