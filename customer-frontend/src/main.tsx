import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/globals.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import App from "./App";

import ClerkProvider
from "./providers/ClerkProvider";

import ReduxProvider
from "./providers/ReduxProvider";

import {
  WishlistProvider,
} from "./providers/WishlistProvider";

import {
  CartProvider,
} from "./providers/CartProvider";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <ClerkProvider>

      <ReduxProvider>

        <CartProvider>

          <WishlistProvider>

            <App />

            <ToastContainer
              position="top-right"
              autoClose={3000}
              theme="light"
            />

          </WishlistProvider>

        </CartProvider>

      </ReduxProvider>

    </ClerkProvider>

  </React.StrictMode>

);