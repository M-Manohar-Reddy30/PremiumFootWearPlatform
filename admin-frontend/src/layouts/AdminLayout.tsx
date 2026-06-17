import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-black text-white p-5">

        <h1 className="text-2xl font-bold mb-8">
          Footwear Admin
        </h1>

        <nav className="space-y-4">

          <Link
            to="/dashboard"
            className="block"
          >
            Dashboard
          </Link>

          <Link
            to="/products"
            className="block"
          >
            Products
          </Link>

          <Link
            to="/categories"
            className="block"
          >
            Categories
          </Link>

          <Link
            to="/orders"
            className="block"
          >
            Orders
          </Link>

          <Link
            to="/reviews"
            className="block"
          >
            Reviews
          </Link>

          <Link
            to="/banners"
            className="block"
          >
            Banners
          </Link>

          <Link
            to="/settings"
            className="block"
          >
            Settings
          </Link>

        </nav>

      </aside>

      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>

    </div>
  );
}