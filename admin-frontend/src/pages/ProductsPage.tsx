import {
  useEffect,
  useState
} from "react";

import { Link } from "react-router-dom";

import {
  getProducts
} from "../api/productApi";

import {
  deleteProduct
} from "../api/productApi";

export default function ProductsPage(){

const [
products,
setProducts
]
=
useState([]);

useEffect(()=>{

loadProducts();

},[]);

const loadProducts = async () => {
  try {

    const res =
      await getProducts();

    setProducts(
      res.data.products || []
    );

  } catch (error) {

    console.error(
      "Failed to load products",
      error
    );

    setProducts([]);

  }
};

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

    await loadProducts();

  } catch (error) {

    console.error(error);

    alert(
      "Failed to delete product"
    );

  }

};

return(

<div>

<div
className="
flex
justify-between
items-center
mb-6
"
>

<h1
className="
text-3xl
font-bold
"
>
Products
</h1>

<Link
  to="/products/add"
  className="
  bg-black
  text-white
  px-4
  py-2
  rounded
  inline-block
  "
>

  Add Product

</Link>

</div>

<table
className="
w-full
bg-white
shadow
rounded
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

{
Array.isArray(products) &&
products.map(
(product:any)=>(
<tr
key={
product._id
}
>

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
  className="
  ml-2
  text-red-500
  "
  onClick={() =>
    handleDelete(product._id)
  }
>
  Delete
</button>

</td>

</tr>
)
)
}

</tbody>

</table>

</div>

);

}