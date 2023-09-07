import { Route, Routes } from "react-router-dom";
import Login from "./pages_customer/Login";
import Registration from "./pages_customer/Registration";
import Homepage from "./pages_customer/Homepage";
import SearchResults from "./pages_customer/SearchResults";
import RestaurantDetails from "./pages_customer/RestaurantDetails";
import Cart from "./pages_customer/Cart";
import CheckOut from "./pages_customer/CheckOut";
import History from "./pages_customer/History";
import HistoryDetail from "./pages_customer/HistoryDetail";
import Favourite from "./pages_customer/Favourite";
import Tracker from "./pages_customer/Tracker";
import Dashboard from "./pages_vendor/Dashboard";
import Menu from "./pages_vendor/Menu";
import HistoryVendor from "./pages_vendor/HistoryVendor";
import Alert from "./pages_vendor/Alert";
import RatingReview from "./pages_vendor/RatingReview";

function App() {
  return (
    <div>
      <Routes>
        {/* customer pages */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>

        <Route path="/" element={<Homepage />}></Route>
        <Route path="/searchresults" element={<SearchResults />}></Route>
        <Route path="/details/:item" element={<RestaurantDetails />}></Route>

        <Route path="/cart/:item" element={<Cart />}>
          <Route path="/checkout" element={<CheckOut />}></Route>
        </Route>

        <Route path="/history/:item" element={<History />}>
          <Route path="/details/:item" element={<HistoryDetail />}></Route>
        </Route>

        <Route path="/favourite/:item" element={<Favourite />}></Route>

        <Route path="/tracker/:item" element={<Tracker />}></Route>

        {/* vendor pages */}
        <Route path="/" element={<Dashboard />}></Route>

        <Route path="/menu" element={<Menu />}></Route>

        <Route path="/historyvendor" element={<HistoryVendor />}></Route>

        <Route path="/alert" element={<Alert />}></Route>

        <Route path="/ratingreview" element={<RatingReview />}></Route>
      </Routes>
    </div>
  );
}

export default App;