import { useSelector } from "react-redux";

import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {

  const settings =
    useSelector(
      (state: any) =>
        state.settings.data
    );

  return (

    <footer
      className="
      relative

      mt-24

      bg-black
      text-white

      overflow-hidden
      "
    >

      {/* Top Trust Section */}

      <div
        className="
        border-b
        border-zinc-800
        "
      >

        <div
          className="
          max-w-7xl
          mx-auto

          px-6
          py-8

          grid
          md:grid-cols-3

          gap-8
          "
        >

          <div
            className="
            flex
            items-center
            gap-4
            "
          >

            <Truck />

            <div>

              <h4
                className="
                font-semibold
                "
              >
                Fast Delivery
              </h4>

              <p
                className="
                text-sm
                text-zinc-400
                "
              >
                Delivered in 3-7 days
              </p>

            </div>

          </div>

          <div
            className="
            flex
            items-center
            gap-4
            "
          >

            <RotateCcw />

            <div>

              <h4
                className="
                font-semibold
                "
              >
                Easy Returns
              </h4>

              <p
                className="
                text-sm
                text-zinc-400
                "
              >
                7-Day return policy
              </p>

            </div>

          </div>

          <div
            className="
            flex
            items-center
            gap-4
            "
          >

            <ShieldCheck />

            <div>

              <h4
                className="
                font-semibold
                "
              >
                Secure Payments
              </h4>

              <p
                className="
                text-sm
                text-zinc-400
                "
              >
                100% protected checkout
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Main Footer */}

      <div
        className="
        max-w-7xl
        mx-auto

        px-6
        py-12
        md:py-16

        grid

        grid-cols-1
        md:grid-cols-4

        gap-8
        md:gap-12
        "
      >

        {/* Brand */}

        <div>

          <h2
            className="
            text-3xl
            font-black

            mb-4
            "
          >
            {settings?.companyName}
          </h2>

          <p
            className="
            text-zinc-400
            leading-relaxed
            "
          >
            {settings?.footerText}
          </p>

        </div>

        {/* Links */}

        <div>

          <h3
            className="
            font-bold
            mb-5
            "
          >
            Quick Links
          </h3>

          <div
            className="
            flex
            flex-col
            gap-3
            text-zinc-400
            "
          >

            <a href="/">Home</a>

            <a href="/products">
              Shop
            </a>

            <a href="/categories">
              Categories
            </a>

            <a href="/orders">
              Orders
            </a>

          </div>

        </div>

        {/* Contact */}

        <div>

          <h3
            className="
            font-bold
            mb-5
            "
          >
            Contact
          </h3>

          <div
            className="
            space-y-4
            text-zinc-400
            "
          >

            <div
              className="
              flex
              gap-3
              "
            >
              <Mail size={18} />
              {settings?.supportEmail}
            </div>

            <div
              className="
              flex
              gap-3
              "
            >
              <Phone size={18} />
              {settings?.supportPhone}
            </div>

            <div
              className="
              flex
              gap-3
              "
            >
              <MapPin size={18} />
              {settings?.address}
            </div>

          </div>

        </div>

        {/* Newsletter */}

        <div>

          <h3
            className="
            font-bold
            mb-5
            "
          >
            Stay Updated
          </h3>

          <p
            className="
            text-zinc-400
            mb-4
            "
          >
            Get updates on new launches and exclusive offers.
          </p>

          <div
            className="
            flex
            "
          >

            <input
              type="email"
              placeholder="Your Email"
              className="
              flex-1

              px-4
              py-3

              rounded-l-xl

              bg-zinc-900

              border
              border-zinc-800

              outline-none
              "
            />

            <button
              className="
              px-4

              bg-white
              text-black

              rounded-r-xl
              "
            >

              <ArrowRight
                size={18}
              />

            </button>

          </div>

        </div>

      </div>

      {/* Social */}

      <div
        className="
        border-t
        border-zinc-800
        "
      >

        <div
          className="
          max-w-7xl
          mx-auto

          px-6
          py-6

          flex
          flex-col
          md:flex-row

          items-center
          justify-between

          gap-6
          "
        >

          <div
            className="
            flex
            gap-4
            "
          >

            {settings?.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                className="
                w-10
                h-10

                rounded-full

                bg-zinc-900

                flex
                items-center
                justify-center

                hover:bg-white
                hover:text-black

                transition-all
                duration-300
                "
              >
                <FaFacebookF />
              </a>
            )}

            {settings?.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                className="
                w-10
                h-10

                rounded-full

                bg-zinc-900

                flex
                items-center
                justify-center

                hover:bg-white
                hover:text-black

                transition-all
                duration-300
                "
              >
                <FaInstagram />
              </a>
            )}

            {settings?.linkedin && (
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noreferrer"
                className="
                w-10
                h-10

                rounded-full

                bg-zinc-900

                flex
                items-center
                justify-center

                hover:bg-white
                hover:text-black

                transition-all
                duration-300
                "
              >
                <FaLinkedinIn />
              </a>
            )}

            {settings?.youtube && (
              <a
                href={settings.youtube}
                target="_blank"
                rel="noreferrer"
                className="
                w-10
                h-10

                rounded-full

                bg-zinc-900

                flex
                items-center
                justify-center

                hover:bg-white
                hover:text-black

                transition-all
                duration-300
                "
              >
                <FaYoutube />
              </a>
            )}

          </div>

          <p
            className="
            text-zinc-500
            text-sm
            "
          >
            © {new Date().getFullYear()}
            {" "}
            {settings?.companyName}
            . All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>

  );

}