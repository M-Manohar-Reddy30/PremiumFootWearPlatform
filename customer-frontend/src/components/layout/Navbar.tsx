import {
  Link,
  NavLink,
} from "react-router-dom";

import { useState } from "react";

import MobileMenu
from "./MobileMenu";

import {
  Menu,
  ShoppingBag,
  Heart,
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

import {
  motion,
} from "framer-motion";

import useTheme
from "../../hooks/useTheme";

import {
  useWishlist,
} from "../../providers/WishlistProvider";

import {
  useCart,
} from "../../providers/CartProvider";

import SearchModal
from "../search/SearchModal";

export default function Navbar() {

  const {
    handleToggleTheme,
  } = useTheme();

  const [menuOpen,
  setMenuOpen] =
  useState(false);

  const [searchOpen,
  setSearchOpen] =
  useState(false);

  const {
    wishlistIds,
  } =
  useWishlist();

  const {
    cartItems,
  } =
  useCart();

  const settings =
  useSelector(
    (state:any)=>
    state.settings.data
  );

  return (

    <>

      {/* Announcement Bar */}
      {/*  
        <div
          className="
          bg-black
          text-white

          text-center

          py-2

          text-xs
          md:text-sm

          tracking-wide
          "
        >
          🚚 Free Shipping On Orders Above ₹1999
        </div>

      */}

        <header
          className="
          sticky
          top-0

          z-50

          backdrop-blur-2xl

          bg-white/80
          dark:bg-black/80

          border-b

          border-zinc-200
          dark:border-zinc-800
          "
        >

          <div
            className="
            max-w-7xl
            mx-auto

            px-5

            h-14 md:h-20 lg:h-24

            flex
            items-center
            justify-between
            "
          >

     

          {/* Logo */}

          <Link
            to="/"
            className="
            flex
            items-center
            "
          >

            {settings?.companyLogo?.url ? (

              <img
                src={
                  settings.companyLogo.url
                }
                alt={
                  settings.companyName
                }
                className="
                h-9
                md:h-16
                lg:h-20
                object-contain
                "
              />

            ) : (

              <span
                className="
                text-2xl
                font-black

                tracking-tight
                "
              >
                {settings?.companyName}
              </span>

            )}

          </Link>

          {/* Desktop Nav */}

          <nav
            className="
            hidden
            lg:flex

            items-center

            gap-10
            "
          >

            {[
              {
                label:"Home",
                path:"/"
              },
              {
                label:"Shop",
                path:"/products"
              },
              {
                label:"Categories",
                path:"/categories"
              },
              {
                label:"Orders",
                path:"/orders"
              },
            ].map((item)=>(

              <NavLink

                key={item.path}

                to={item.path}

                className={({isActive})=>
                `
                relative

                text-sm
                font-medium

                transition

                ${
                  isActive
                  ? "text-black dark:text-white"
                  : "text-zinc-500 hover:text-black dark:hover:text-white"
                }
                `
                }
              >

                {item.label}

              </NavLink>

            ))}

          </nav>

          {/* Actions */}

          <div
            className="
            flex
            items-center

            gap-3
            "
          >

            {/* Search */}

            <motion.button

              whileHover={{
                scale:1.08
              }}

              whileTap={{
                scale:0.95
              }}

              onClick={() =>
                setSearchOpen(true)
              }

              className="
              h-11
              w-11

              rounded-full

              bg-zinc-100
              dark:bg-zinc-900

              flex
              items-center
              justify-center
              "
            >

              <Search size={18} />

            </motion.button>

            {/* Wishlist */}

            <Link
              to="/wishlist"
              className="
              relative
              hidden md:block
              "
            >

              <motion.div

                whileHover={{
                  scale:1.08
                }}

                className="
                h-11
                w-11

                rounded-full

                bg-zinc-100
                dark:bg-zinc-900

                flex
                items-center
                justify-center
                "
              >

                <Heart size={18} />

              </motion.div>

              {wishlistIds.length > 0 && (

                <span
                  className="
                  absolute

                  -top-1
                  -right-1

                  h-5
                  min-w-[20px]

                  rounded-full

                  bg-red-500

                  text-white

                  text-[10px]

                  flex
                  items-center
                  justify-center
                  "
                >
                  {wishlistIds.length}
                </span>

              )}

            </Link>

            {/* Cart */}

            <Link
              to="/cart"
              className="
              relative
              hidden md:block
              "
            >

              <motion.div

                whileHover={{
                  scale:1.08
                }}

                className="
                h-11
                w-11

                rounded-full

                bg-zinc-100
                dark:bg-zinc-900

                flex
                items-center
                justify-center
                "
              >

                <ShoppingBag
                  size={18}
                />

              </motion.div>

              {cartItems.length > 0 && (

                <span
                  className="
                  absolute

                  -top-1
                  -right-1

                  h-5
                  min-w-[20px]

                  rounded-full

                  bg-black

                  text-white

                  text-[10px]

                  flex
                  items-center
                  justify-center
                  "
                >
                  {cartItems.length}
                </span>

              )}

            </Link>

            {/* Theme */}

            <button

              onClick={
                handleToggleTheme
              }

              className="
              hidden md:flex

              h-11
              w-11

              rounded-full

              bg-zinc-100
              dark:bg-zinc-900

              flex
              items-center
              justify-center
              "
            >

              <Moon size={18} />

            </button>

            {/* Auth */}

            <SignedOut>

              {/* Desktop */}

              <Link
                to="/auth"
                className="
                hidden
                md:flex

                px-5
                py-2.5

                rounded-full

                bg-black

                text-white

                text-sm
                font-medium
                "
              >
                Sign In
              </Link>

              {/* Mobile */}

              <Link
                to="/auth"
                className="
                md:hidden

                px-4
                py-2

                rounded-full

                bg-black

                text-white

                text-xs
                font-medium
                "
              >
                Sign In
              </Link>

            </SignedOut>

            <SignedIn>

              <Link
                to="/profile"
                className="
                hidden
                md:flex

                px-5
                py-2.5

                rounded-full

                border

                text-sm
                font-medium
                "
              >
                Profile
              </Link>

              <UserButton
                afterSignOutUrl="/"
              />

            </SignedIn>

            {/* Mobile Menu */}

            <button

              onClick={() =>
                setMenuOpen(true)
              }

              className="
              lg:hidden

              h-11
              w-11

              rounded-full

              bg-zinc-100
              dark:bg-zinc-900

              flex
              items-center
              justify-center
              "
            >

              <Menu size={20} />

            </button>

          </div>

        </div>

      </header>

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

    </>

  );

}