import {
  Copy,
  Share2,
  MessageCircle,
  Send,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  successToast,
} from "../../utils/toast";

export default function ShareProduct({
  product,
}: any) {

  const productUrl =
    window.location.href;

  const copyLink =
    async () => {

      await navigator.clipboard.writeText(
        productUrl
      );

      successToast(
        "Link Copied Successfully"
      );

    };

  const nativeShare =
    async () => {

      if (
        navigator.share
      ) {

        try {

          await navigator.share({

            title:
              product.name,

            text:
              product.description,

            url:
              productUrl,

          });

        } catch {

        }

      } else {

        copyLink();

      }

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

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{
        once: true,
      }}

      className="
      mt-8

      rounded-[28px]

      border

      bg-white
      dark:bg-zinc-950

      p-6

      shadow-sm
      "
    >

      <div
        className="
        flex
        items-center
        gap-3

        mb-5
        "
      >

        <div
          className="
          w-10
          h-10

          rounded-full

          bg-black
          text-white

          flex
          items-center
          justify-center
          "
        >

          <Share2
            size={18}
          />

        </div>

        <div>

          <h3
            className="
            font-bold
            text-lg
            "
          >
            Share Product
          </h3>

          <p
            className="
            text-sm
            text-zinc-500
            "
          >
            Share this product with friends
          </p>

        </div>

      </div>

      <div
        className="
        flex
        flex-wrap
        gap-3
        "
      >

        <motion.a

          whileHover={{
            scale: 1.05,
          }}

          whileTap={{
            scale: 0.95,
          }}

          href={whatsappUrl}

          target="_blank"

          rel="noreferrer"

          className="
          flex
          items-center
          gap-2

          bg-green-500
          text-white

          px-5
          py-3

          rounded-2xl

          font-medium
          "
        >

          <MessageCircle
            size={18}
          />

          WhatsApp

        </motion.a>

        <motion.a

          whileHover={{
            scale: 1.05,
          }}

          whileTap={{
            scale: 0.95,
          }}

          href={telegramUrl}

          target="_blank"

          rel="noreferrer"

          className="
          flex
          items-center
          gap-2

          bg-sky-500
          text-white

          px-5
          py-3

          rounded-2xl

          font-medium
          "
        >

          <Send
            size={18}
          />

          Telegram

        </motion.a>

        <motion.button

          whileHover={{
            scale: 1.05,
          }}

          whileTap={{
            scale: 0.95,
          }}

          onClick={copyLink}

          className="
          flex
          items-center
          gap-2

          border

          px-5
          py-3

          rounded-2xl

          font-medium
          "
        >

          <Copy
            size={18}
          />

          Copy Link

        </motion.button>

        <motion.button

          whileHover={{
            scale: 1.05,
          }}

          whileTap={{
            scale: 0.95,
          }}

          onClick={nativeShare}

          className="
          flex
          items-center
          gap-2

          bg-black
          text-white

          px-5
          py-3

          rounded-2xl

          font-medium
          "
        >

          <Share2
            size={18}
          />

          Share

        </motion.button>

      </div>

    </motion.div>

  );

}