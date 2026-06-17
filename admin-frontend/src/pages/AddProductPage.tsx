import {
  createProduct,
} from "../api/productApi";

import ProductForm
from "../components/products/ProductForm";

export default function AddProductPage() {

  const handleSubmit =
    async (
      data: any
    ) => {

      await createProduct(
        data
      );

      alert(
        "Product Created"
      );

    };

  return (

    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Add Product
      </h1>

      <ProductForm
        onSubmit={
          handleSubmit
        }
      />

    </div>

  );

}