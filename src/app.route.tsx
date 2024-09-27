import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allProduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/product/AddProductPage";
import CategoryPage from "./pages/category/CategoryPage";
import ProtectedRouteForAdmin from "./protectedRoute/ProtectedRouteForAdmin";
import ProtectedRouteForUser from "./protectedRoute/ProtectedRouteForUser";
import React from "react";
import { path } from "./routes"
export const routes = [
  { path:path.home, element: <HomePage /> },
  { path:path.noPage, element: <NoPage /> },
  { path: path.productInfo, element: <ProductInfo /> },
  { path: path.cart, element: <CartPage /> },
  { path:path.allProduct, element: <AllProduct /> },
  { path:path.signup, element: <Signup /> },
  { path:path.login, element: <Login /> },
  { path: path.category, element: <CategoryPage /> },
  {
    path: path.userDashboard,
    element: (
      <ProtectedRouteForUser>
        <UserDashboard />
      </ProtectedRouteForUser>
    ),
  },
  {
    path:path.adminDashboard,
    element: (
      <ProtectedRouteForAdmin>
        <AdminDashboard />
      </ProtectedRouteForAdmin>
    ),
  },
  {
    path:path.addProduct,
    element: (
      <ProtectedRouteForAdmin>
        <AddProductPage />
      </ProtectedRouteForAdmin>
    ),
  },
  {
    path:path.updateProduct,
    element: (
      <ProtectedRouteForAdmin>
        <AddProductPage />
      </ProtectedRouteForAdmin>
    ),
  },
];
