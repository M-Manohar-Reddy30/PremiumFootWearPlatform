interface Props {
  image:string;
  onClose:()=>void;
}

export default function ReviewImageLightbox({
  image,
  onClose,
}:Props){

  return (

    <div
      onClick={onClose}
      className="
      fixed
      inset-0

      bg-black/90

      z-[999]

      flex
      items-center
      justify-center

      p-6
      "
    >

      <img
        src={image}
        alt=""
        className="
        max-h-[90vh]
        max-w-[90vw]

        rounded-3xl
        "
      />

      <button
        onClick={onClose}
        className="
        absolute

        top-6
        right-6

        text-white

        text-4xl
        "
      >
        ×
      </button>

    </div>

  );

}