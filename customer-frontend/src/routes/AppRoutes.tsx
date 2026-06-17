import {
  Routes,
  Route,
} from "react-router-dom";

import AuthPage
from "../pages/AuthPage";

import HomePage
from "../pages/HomePage";

import CategoriesPage
from "../pages/CategoriesPage";

import ProductsPage
from "../pages/ProductsPage";

import ProductDetailsPage
from "../pages/ProductDetailsPage";

import ProfilePage
from "../pages/ProfilePage";

import WishlistPage
from "../pages/WishlistPage";

import CartPage
from "../pages/CartPage";

import CheckoutPage
from "../pages/CheckoutPage";

import OrdersPage
from "../pages/OrdersPage";

import CategoryPage
from "../pages/CategoryPage";

export default function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/auth"
        element={<AuthPage />}
      />

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/products"
        element={<ProductsPage />}
      />

      <Route
        path="/products/:slug"
        element={
          <ProductDetailsPage />
        }
      />

      <Route
        path="/profile"
        element={
          <ProfilePage />
        }
      />

      <Route
        path="/wishlist"
        element={
          <WishlistPage />
        }
      />

      <Route
        path="/cart"
        element={<CartPage />}
      />

      <Route
        path="/checkout"
        element={
          <CheckoutPage />
        }
      />

      <Route
        path="/orders"
        element={<OrdersPage />}
      />

      <Route
        path="/categories"
        element={
          <CategoriesPage />
        }
      />

      <Route
        path="/category/:slug"
        element={<CategoryPage />}
      />

    </Routes>

  );

}