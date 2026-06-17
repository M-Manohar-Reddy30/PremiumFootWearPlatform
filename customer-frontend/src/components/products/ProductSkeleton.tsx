export default function ProductSkeleton() {

  return (

    <div
      className="
      animate-pulse

      rounded-3xl

      overflow-hidden

      border
      "
    >

      <div
        className="
        aspect-square

        bg-zinc-200
        dark:bg-zinc-800
        "
      />

      <div
        className="
        p-4
        space-y-3
        "
      >

        <div
          className="
          h-4

          bg-zinc-200
          dark:bg-zinc-800

          rounded
          "
        />

        <div
          className="
          h-4

          w-1/2

          bg-zinc-200
          dark:bg-zinc-800

          rounded
          "
        />

      </div>

    </div>

  );

}