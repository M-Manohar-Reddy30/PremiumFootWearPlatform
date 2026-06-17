import {
  Share2,
  Copy,
} from "lucide-react";

import {
  successToast,
} from "../../utils/toast";

export default function ShareProduct({
  product,
}:any){

  const productUrl =
  window.location.href;

  const copyLink =
  async()=>{

    await navigator.clipboard.writeText(
      productUrl
    );

    successToast(
      "Link Copied"
    );

  };

  const whatsappUrl =
  `https://wa.me/?text=${encodeURIComponent(
    `${product.name} - ${productUrl}`
  )}`;

  const telegramUrl =
  `https://t.me/share/url?url=${encodeURIComponent(
    productUrl
  )}&text=${encodeURIComponent(
    product.name
  )}`;

  return (

    <div
      className="
      mt-8

      border

      rounded-2xl

      p-5
      "
    >

      <h3
        className="
        font-semibold
        mb-4
        "
      >
        Share Product
      </h3>

      <div
        className="
        flex
        flex-wrap
        gap-3
        "
      >

        <a
          href={whatsappUrl}
          target="_blank"
          className="
          bg-green-500
          text-white

          px-4
          py-2

          rounded-xl
          "
        >
          WhatsApp
        </a>

        <a
          href={telegramUrl}
          target="_blank"
          className="
          bg-blue-500
          text-white

          px-4
          py-2

          rounded-xl
          "
        >
          Telegram
        </a>

        <button

          onClick={copyLink}

          className="
          border

          px-4
          py-2

          rounded-xl

          flex
          items-center
          gap-2
          "
        >

          <Copy size={16}/>

          Copy Link

        </button>

      </div>

    </div>

  );

}