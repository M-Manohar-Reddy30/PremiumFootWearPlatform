import {
  Link,
} from "react-router-dom";
import { useState } from "react";

import MobileMenu
from "./MobileMenu";

import {
  Menu,
  ShoppingBag,
  Heart,
  User,
  Search,
  Moon,
} from "lucide-react";

import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import {
  useSelector,
} from "react-redux";

import useTheme from "../../hooks/useTheme";
import {
  useWishlist,
} from "../../providers/WishlistProvider";
import {
  useCart,
} from "../../providers/CartProvider";

import SearchModal
from "../search/SearchModal";

export default function Navbar() {

    const { handleToggleTheme } = useTheme();

    const [menuOpen, setMenuOpen] =
        useState(false);

    const {
      wishlistIds
    } =
    useWishlist();

    const {
      cartItems
    } =
    useCart();

    const [searchOpen,
    setSearchOpen] =
    useState(false);

  const settings =
  useSelector(
    (state:any)=>
    state.settings.data
  );

  return (

    <header
        className="
        sticky
        top-0
        z-50

        backdrop-blur-xl

        bg-white/70
        dark:bg-zinc-900/70

        text-black
        dark:text-white

        border-b
        "
    >

      <div
        className="
        max-w-7xl
        mx-auto

        h-16

        px-4

        flex
        items-center
        justify-between
        "
      >

        <Link to="/">

            {
                settings?.companyLogo?.url
                ? (

                <img
                    src={
                    settings.companyLogo.url
                    }
                    alt={
                    settings.companyName
                    }
                    className="
                    h-12
                    object-contain
                    "
                />

                )
                : (

                <span
                    className="
                    font-bold
                    text-xl
                    "
                >
                    {
                    settings?.companyName
                    }
                </span>

                )
            }

        </Link>

        <nav
          className="
          hidden
          md:flex

          gap-8
          "
        >

          <Link to="/">
            Home
          </Link>

          <Link
          to="/products">
            Shop
          </Link>

          <Link
          to="/categories">
            Categories
          </Link>

          <Link
            to="/orders"
          >
            Orders
          </Link>

        </nav>

        <div
          className="
          flex
          items-center
          gap-4
          "
        >

          <Search
            size={20}
            className="
            cursor-pointer
            "
            onClick={() =>
              setSearchOpen(true)
            }
          />

          <Link
              to="/wishlist"
              className="
              relative
              "
            >

              <Heart
                size={20}
              />

              {wishlistIds.length > 0 && (

                <span
                  className="
                  absolute

                  -top-2
                  -right-2

                  min-w-[18px]
                  h-[18px]

                  px-1

                  text-[10px]

                  bg-red-500
                  text-white

                  rounded-full

                  flex
                  items-center
                  justify-center
                  "
                >
                  {
                    wishlistIds.length
                  }
                </span>

              )}

            </Link>

                      <Link
              to="/cart"
              className="
              relative
              "
            >

              <ShoppingBag
                size={20}
              />

              {cartItems.length > 0 && (

                <span
                  className="
                  absolute

                  -top-2
                  -right-2

                  min-w-[18px]
                  h-[18px]

                  px-1

                  text-[10px]

                  bg-black
                  text-white

                  rounded-full

                  flex
                  items-center
                  justify-center
                  "
                >
                  {
                    cartItems.length
                  }
                </span>

              )}

            </Link>

          <SignedOut>

            <Link
              to="/auth"
            >
              <User size={20}/>
            </Link>

          </SignedOut>

          <SignedIn>

            <Link
              to="/profile"
            >
              Profile
            </Link>

            <UserButton
              afterSignOutUrl="/"
            />

          </SignedIn>

          <Moon
            size={20}
            className="cursor-pointer"
            onClick={handleToggleTheme}
          />

          <Menu
            size={22}
            className="
            md:hidden
            cursor-pointer
            "
            onClick={() =>
                setMenuOpen(true)
            }
          />

        </div>

      </div>

      <MobileMenu
            open={menuOpen}
            onClose={() =>
                setMenuOpen(false)
            }
        />

        <SearchModal
          open={searchOpen}
          onClose={() =>
            setSearchOpen(false)
          }
        />

    </header>

  );

}