import {
  Home,
  Grid3X3,
  ShoppingCart,
  Package,
  User,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

import {
  useCart,
} from "../../providers/CartProvider";

export default function BottomNav() {

  const {
    cartItems,
  } = useCart();

  const navItems = [

    {
      label:"Home",
      path:"/",
      icon:Home,
    },

    {
      label:"Categories",
      path:"/categories",
      icon:Grid3X3,
    },

    {
      label:"Cart",
      path:"/cart",
      icon:ShoppingCart,
    },

    {
      label:"Orders",
      path:"/orders",
      icon:Package,
    },

    {
      label:"Profile",
      path:"/profile",
      icon:User,
    },

  ];

  return (

    <div
      className="
      fixed
      bottom-0
      left-0
      right-0

      md:hidden

      bg-white
      dark:bg-zinc-950

      border-t

      border-zinc-200
      dark:border-zinc-800

      z-50
      "
    >

      <div
        className="
        grid
        grid-cols-5

        h-16
        "
      >

        {navItems.map((item)=>{

          const Icon =
          item.icon;

          return(

            <NavLink

              key={item.path}

              to={item.path}

              className={({isActive})=>
              `
              flex
              flex-col

              items-center
              justify-center

              text-[11px]

              relative

              ${
                isActive
                ? "text-black dark:text-white"
                : "text-zinc-500"
              }
              `
              }

            >

              <div className="relative">

                <Icon size={22} />

                {item.path === "/cart" &&
                cartItems.length > 0 && (

                  <span
                    className="
                    absolute

                    -top-2
                    -right-3

                    min-w-[18px]
                    h-[18px]

                    bg-black
                    text-white

                    rounded-full

                    text-[10px]

                    flex
                    items-center
                    justify-center
                    "
                  >
                    {cartItems.length}
                  </span>

                )}

              </div>

              <span>
                {item.label}
              </span>

            </NavLink>

          );

        })}

      </div>

    </div>

  );

}