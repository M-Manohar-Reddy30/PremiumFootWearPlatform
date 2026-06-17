import { Link } from "react-router-dom";
import { deleteProduct } from "../../api/productApi";

interface Props {
  products: any[];
  refreshProducts?: () => void;
}

export default function ProductTable({
  products,
  refreshProducts,
}: Props) {

  const handleDelete = async (
    id: string
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      if (refreshProducts) {
        refreshProducts();
      }

    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete product"
      );
    }
  };

  return (
    <table
      className="
      w-full
      bg-white
      rounded-xl
      shadow
      "
    >

      <thead>

        <tr>

          <th>Name</th>

          <th>Price</th>

          <th>Stock</th>

          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        {products.map(
          (product) => (

            <tr key={product._id}>

              <td>
                {product.name}
              </td>

              <td>
                ₹{product.price}
              </td>

              <td>
                {product.stock}
              </td>

              <td>

                <Link
                  to={`/products/edit/${product._id}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      product._id
                    )
                  }
                  className="
                  text-red-500
                  ml-3
                  "
                >
                  Delete
                </button>

              </td>

            </tr>

          )
        )}

      </tbody>

    </table>
  );
}