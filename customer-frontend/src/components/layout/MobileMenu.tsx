import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  open,
  onClose,
}: Props) {

  if (!open) return null;

  return (

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
        duration: 0.3,
      }}

      className="
      fixed
      top-0
      right-0

      w-full
      h-screen

      bg-white
      dark:bg-black

      z-[100]

      p-8
      "
    >

      <button
        onClick={onClose}
        className="
        text-2xl
        mb-10
        "
      >
        ✕
      </button>

      <div
        className="
        flex
        flex-col
        gap-6
        text-xl
        "
      >

        <Link
          to="/"
          onClick={onClose}
        >
          Home
        </Link>

        <Link
          to="/products"
          onClick={onClose}
        >
          Shop
        </Link>

        <Link
          to="/categories"
          onClick={onClose}
        >
          Categories
        </Link>

        <Link
          to="/orders"
          onClick={onClose}
        >
          orders
        </Link>

        <Link
          to="/wishlist"
          onClick={onClose}
        >
          Wishlist
        </Link>

        <Link
          to="/cart"
          onClick={onClose}
        >
          Cart
        </Link>

        <Link
          to="/profile"
          onClick={onClose}
        >
          Profile
        </Link>

      </div>

    </motion.div>

  );

}