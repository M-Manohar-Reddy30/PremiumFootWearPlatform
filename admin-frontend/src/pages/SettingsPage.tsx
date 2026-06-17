import {
  useEffect,
  useState,
} from "react";

import {
  getSettings,
  updateSettings,
} from "../api/settingApi";

import ImageUploader
from "../components/products/ImageUploader";

export default function SettingsPage() {

  const [
    settings,
    setSettings,
  ] =
    useState<any>(null);

  const [
    logoImages,
    setLogoImages,
  ] =
    useState<any[]>([]);

  useEffect(() => {

    loadSettings();

  }, []);

  const loadSettings =
    async () => {

      const res =
        await getSettings();

      setSettings(
        res.data.data
      );

      if (
        res.data.data
          ?.companyLogo?.url
      ) {

        setLogoImages([
          res.data.data
            .companyLogo,
        ]);

      }

    };

  const handleChange =
    (
      e:
        React.ChangeEvent<
          HTMLInputElement |
          HTMLTextAreaElement
        >
    ) => {

      setSettings({

        ...settings,

        [
          e.target.name
        ]:
          e.target.value,

      });

    };

  const handleSubmit =
    async (
      e:
        React.FormEvent
    ) => {

      e.preventDefault();

      await updateSettings({

        ...settings,

        companyLogo:
          logoImages[0]
            || null,

      });

      alert(
        "Settings Saved"
      );

    };

  if (!settings)
    return (
      <div>
        Loading...
      </div>
    );

  return (

    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Settings
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="
        bg-white
        p-6
        rounded-xl
        shadow
        space-y-4
        "
      >

        <input
          name="companyName"
          value={
            settings.companyName
          }
          onChange={
            handleChange
          }
          placeholder="Company Name"
          className="
          border
          p-3
          w-full
          "
        />

        <input
          name="supportEmail"
          value={
            settings.supportEmail
          }
          onChange={
            handleChange
          }
          placeholder="Support Email"
          className="
          border
          p-3
          w-full
          "
        />

        <input
          name="supportPhone"
          value={
            settings.supportPhone
          }
          onChange={
            handleChange
          }
          placeholder="Support Phone"
          className="
          border
          p-3
          w-full
          "
        />

        <input
          name="whatsappNumber"
          value={
            settings.whatsappNumber
          }
          onChange={
            handleChange
          }
          placeholder="WhatsApp Number"
          className="
          border
          p-3
          w-full
          "
        />

        <textarea
          name="address"
          value={
            settings.address
          }
          onChange={
            handleChange
          }
          placeholder="Address"
          className="
          border
          p-3
          w-full
          "
        />

        <input
          name="facebook"
          value={
            settings.facebook
          }
          onChange={
            handleChange
          }
          placeholder="Facebook URL"
          className="
          border
          p-3
          w-full
          "
        />

        <input
          name="instagram"
          value={
            settings.instagram
          }
          onChange={
            handleChange
          }
          placeholder="Instagram URL"
          className="
          border
          p-3
          w-full
          "
        />

        <input
          name="youtube"
          value={
            settings.youtube
          }
          onChange={
            handleChange
          }
          placeholder="YouTube URL"
          className="
          border
          p-3
          w-full
          "
        />

        <input
          name="linkedin"
          value={
            settings.linkedin
          }
          onChange={
            handleChange
          }
          placeholder="LinkedIn URL"
          className="
          border
          p-3
          w-full
          "
        />

        <input
          name="seoTitle"
          value={
            settings.seoTitle
          }
          onChange={
            handleChange
          }
          placeholder="SEO Title"
          className="
          border
          p-3
          w-full
          "
        />

        <textarea
          name="seoDescription"
          value={
            settings.seoDescription
          }
          onChange={
            handleChange
          }
          placeholder="SEO Description"
          className="
          border
          p-3
          w-full
          "
        />

        <textarea
          name="footerText"
          value={
            settings.footerText
          }
          onChange={
            handleChange
          }
          placeholder="Footer Text"
          className="
          border
          p-3
          w-full
          "
        />

        <div>

          <h3
            className="
            font-semibold
            mb-2
            "
          >
            Company Logo
          </h3>

          <ImageUploader
            images={
              logoImages
            }
            setImages={
              setLogoImages
            }
          />

        </div>

        <button
          type="submit"
          className="
          bg-black
          text-white
          px-6
          py-3
          rounded
          "
        >
          Save Settings
        </button>

      </form>

    </div>
  );
}