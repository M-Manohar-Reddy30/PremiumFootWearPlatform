import ProductCard from "./ProductCard";

interface Props {
  title: string;
  products: any[];
}

export default function ProductSection({
  title,
  products,
}: Props) {

  if (!products?.length)
    return null;

  return (

    <section
      className="
      py-20
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >

        <h2
          className="
          text-4xl
          font-bold
          mb-12
          "
        >
          {title}
        </h2>

        <div
          className="
          grid

          grid-cols-2
          md:grid-cols-4

          gap-6
          "
        >

          {products.map(
            (product:any)=>(
              <ProductCard
                key={product._id}
                product={product}
              />
            )
          )}

        </div>

      </div>

    </section>

  );

}