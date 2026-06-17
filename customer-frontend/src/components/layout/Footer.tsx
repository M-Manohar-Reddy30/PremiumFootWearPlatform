import { useSelector } from "react-redux";

export default function Footer() {

  const settings =
    useSelector(
      (state: any) =>
        state.settings.data
    );

  return (

    <footer
      className="
      bg-zinc-950
      text-white

      mt-20
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto

        px-6
        py-16

        grid
        md:grid-cols-4

        gap-10
        "
      >

        {/* COMPANY */}

        <div>

          <h2
            className="
            text-2xl
            font-bold
            mb-4
            "
          >
            {
              settings?.companyName
            }
          </h2>

          <p
            className="
            text-zinc-400
            "
          >
            {
              settings?.footerText
            }
          </p>

        </div>

        {/* QUICK LINKS */}

        <div>

          <h3
            className="
            font-semibold
            mb-4
            "
          >
            Quick Links
          </h3>

          <div
            className="
            flex
            flex-col
            gap-3
            "
          >

            <a href="/">
              Home
            </a>

            <a href="/products">
              Products
            </a>

            <a href="/categories">
              Categories
            </a>

          </div>

        </div>

        {/* CONTACT */}

        <div>

          <h3
            className="
            font-semibold
            mb-4
            "
          >
            Contact
          </h3>

          <div
            className="
            flex
            flex-col
            gap-3
            text-zinc-400
            "
          >

            <p>
              {
                settings?.supportEmail
              }
            </p>

            <p>
              {
                settings?.supportPhone
              }
            </p>

            <p>
              {
                settings?.address
              }
            </p>

          </div>

        </div>

        {/* SOCIAL */}

        <div>

          <h3
            className="
            font-semibold
            mb-4
            "
          >
            Follow Us
          </h3>

          <div
            className="
            flex
            flex-col
            gap-3
            "
          >

            {
              settings?.facebook && (
                <a
                  href={
                    settings.facebook
                  }
                  target="_blank"
                >
                  Facebook
                </a>
              )
            }

            {
              settings?.instagram && (
                <a
                  href={
                    settings.instagram
                  }
                  target="_blank"
                >
                  Instagram
                </a>
              )
            }

            {
              settings?.youtube && (
                <a
                  href={
                    settings.youtube
                  }
                  target="_blank"
                >
                  YouTube
                </a>
              )
            }

            {
              settings?.linkedin && (
                <a
                  href={
                    settings.linkedin
                  }
                  target="_blank"
                >
                  LinkedIn
                </a>
              )
            }

          </div>

        </div>

      </div>

      <div
        className="
        border-t
        border-zinc-800

        py-5

        text-center

        text-zinc-500
        "
      >

        © {new Date().getFullYear()}
        {" "}
        {
          settings?.companyName
        }

      </div>

    </footer>

  );

}