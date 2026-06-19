import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Link,
  NavLink,
} from "react-router-dom";

import {
  Home,
  ShoppingBag,
  Grid3X3,
  Heart,
  User,
  Package,
  ShoppingCart,
  X,
  ChevronRight,
} from "lucide-react";

import {
  useCart,
} from "../../providers/CartProvider";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  open,
  onClose,
}: Props) {

  const {
    cartItems,
  } = useCart();

  const menuItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
    },
    {
      label: "Shop",
      path: "/products",
      icon: ShoppingBag,
    },
    {
      label: "Categories",
      path: "/categories",
      icon: Grid3X3,
    },
    {
      label: "Cart",
      path: "/cart",
      icon: ShoppingCart,
    },
    {
      label: "Wishlist",
      path: "/wishlist",
      icon: Heart,
    },
    {
      label: "Orders",
      path: "/orders",
      icon: Package,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (

    <AnimatePresence>

      {open && (

        <>

          {/* Backdrop */}

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            onClick={onClose}

            className="
            fixed
            inset-0

            bg-black/50

            backdrop-blur-sm

            z-[99]
            "
          />

          {/* Drawer */}

          <motion.div

            initial={{
              x: "100%",
            }}

            animate={{
              x: 0,
            }}

            exit={{
              x: "100%",
            }}

            transition={{
              duration: 0.35,
            }}

            className="
            fixed

            top-0
            right-0

            w-[85%]
            sm:w-[420px]
            max-w-[420px]

            h-screen

            bg-white
            dark:bg-zinc-950

            z-[100]

            flex
            flex-col
            "
          >

            {/* Header */}

            <div
              className="
              flex
              items-center
              justify-between

              p-6

              border-b
              border-zinc-200
              dark:border-zinc-800
              "
            >

              <div>

                <h2
                  className="
                  text-2xl
                  font-black
                  "
                >
                  MENU
                </h2>

                <p
                  className="
                  text-sm
                  text-zinc-500
                  "
                >
                  Explore Collection
                </p>

              </div>

              <button

                onClick={onClose}

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

                <X size={20} />

              </button>

            </div>

            {/* Navigation */}

            <div
              className="
              flex-1

              px-5
              py-6

              overflow-y-auto
              overscroll-contain
              "
            >

              <div
                className="
                flex
                flex-col

                gap-3
                "
              >

                {menuItems.map(
                  (item) => {

                    const Icon =
                      item.icon;

                    return (

                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}

                        className={({ isActive }) => `
                        flex
                        items-center
                        justify-between
                        p-4
                        rounded-2xl
                        transition-all

                        ${
                          isActive
                            ? "bg-black text-white"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                         }
                        `}
                      >

                        <div
                          className="
                          flex
                          items-center
                          gap-4
                          "
                        >

                          <Icon
                            size={20}
                          />

                          <span
                            className="
                            font-medium
                            "
                          >
                            {item.label}
                          </span>

                          {item.path === "/cart" &&
                            cartItems.length > 0 && (

                            <span
                              className="
                              ml-1

                              min-w-[22px]
                              h-[22px]

                              px-2

                              rounded-full

                              bg-black
                              text-white

                              text-xs

                              flex
                              items-center
                              justify-center
                              "
                            >
                              {cartItems.length}
                            </span>

                          )}

                        </div>

                        <ChevronRight
                          size={18}
                        />

                      </NavLink>

                    );

                  }
                )}

              </div>

              {/* Featured Categories */}
              {/*
              <div
                className="
                mt-10
                "
              >

                <h3
                  className="
                  font-bold

                  mb-4
                  "
                >
                  Popular Categories
                </h3>

                <div
                  className="
                  flex
                  flex-wrap

                  gap-3
                  "
                >

                  <span className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-sm">
                    Running
                  </span>

                  <span className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-sm">
                    Casual
                  </span>

                  <span className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-sm">
                    Sneakers
                  </span>

                  <span className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-sm">
                    Premium
                  </span>

                </div>

              </div>
              */}
            </div>
          
            {/* Bottom CTA */}

            <div
              className="
              p-5
              pb-safe

              border-t
              border-zinc-200
              dark:border-zinc-800
              "
            >

              <Link

                to="/products"

                onClick={onClose}

                className="
                block

                text-center

                bg-black

                text-white

                py-4

                rounded-2xl

                font-semibold
                "
              >
                Shop Collection
              </Link>

            </div>

          </motion.div>

        </>

      )}

    </AnimatePresence>

  );

}