import {
  successToast,
  errorToast,
} from "../../utils/toast";

import {
  useState,
} from "react";

import {
  useAuth
} from "@clerk/clerk-react";

import {
  createReview,
} from "../../api/reviewApi";

import ReviewImageUploader
from "./ReviewImageUploader";

import {
  Star,
  ImagePlus,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

export default function AddReviewForm({
  productId,
  onSuccess,
}: any) {

  const [rating, setRating] =
    useState(5);

  const [hoverRating,
  setHoverRating] =
    useState(0);

  const [comment,
  setComment] =
    useState("");

  const [images,
  setImages] =
    useState<any[]>([]);

  const [loading,
  setLoading] =
    useState(false);

  const {
    getToken,
    isSignedIn,
  } = useAuth();

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        if (!isSignedIn) {

          errorToast(
            "Please login first"
          );

          return;

        }

        const token =
          await getToken();

        await createReview(

          {
            productId,
            rating,
            comment,
            images,
          },

          token!

        );

       setComment("");

        setImages([]);

        setRating(5);

        setHoverRating(0);

        successToast(
          "Review Added Successfully"
        );

        onSuccess?.();

      }
      catch (error: any) {

        errorToast(

          error?.response?.data
            ?.message ||

          "Review Failed"

        );

      }
      finally {

        setLoading(false);

      }

    };

  return (

    <motion.form

      initial={{
        opacity: 0,
        y: 40,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{
        once: true,
      }}

      transition={{
        duration: 0.6,
      }}

      onSubmit={
        handleSubmit
      }

      className="
      mt-16

      rounded-[32px]

      border

      bg-white
      dark:bg-zinc-950

      shadow-xl

      p-6
      md:p-10
      "
    >

      <div
        className="
        flex
        items-center
        justify-between

        mb-8
        "
      >

        <div>

          <h3
            className="
            text-3xl
            font-black
            "
          >
            Write A Review
          </h3>

          <p
            className="
            mt-2

            text-zinc-500
            "
          >
            Share your experience with this product
          </p>

        </div>

      </div>

      {/* Interactive Rating */}

      <div
        className="
        mb-8
        "
      >

        <p
          className="
          text-sm

          font-medium

          mb-4
          "
        >
          Your Rating
        </p>

        <div
          className="
          flex
          gap-2
          "
        >

          {[1,2,3,4,5].map(
            (star) => (

              <button

                type="button"

                key={star}

                onClick={() =>
                  setRating(star)
                }

                onMouseEnter={() =>
                  setHoverRating(star)
                }

                onMouseLeave={() =>
                  setHoverRating(0)
                }

                className="
                transition-transform

                hover:scale-125
                "
              >

                <Star

                  size={34}

                  fill={
                    star <=
                    (
                      hoverRating ||
                      rating
                    )
                      ? "#facc15"
                      : "none"
                  }

                  className={
                    star <=
                    (
                      hoverRating ||
                      rating
                    )
                      ? "text-yellow-400"
                      : "text-zinc-300"
                  }

                />

              </button>

            )
          )}

        </div>

      </div>

      {/* Review Text */}

      <div
        className="
        mb-8
        "
      >

        <p
          className="
          text-sm

          font-medium

          mb-4
          "
        >
          Your Review
        </p>

        <textarea

          rows={6}

          maxLength={500}

          value={comment}

          onChange={(e) =>
            setComment(
              e.target.value
            )
          }

            placeholder="
          Tell others what you liked, comfort, quality, fit and overall experience...
          "

          className="
          w-full

          rounded-2xl

          border

          p-5

          resize-none

          focus:outline-none

          focus:ring-2
          focus:ring-black

          dark:bg-zinc-900
          "
        />

        <div
          className="
          flex
          justify-end
          mt-2
          "
        >

          <span
            className="
            text-xs
            text-zinc-500
            "
          >
            {comment.length}/500
          </span>

        </div>

      </div>

      {/* Upload Images */}

      <div
        className="
        mb-8
        "
      >

        <div
          className="
          flex
          items-center
          gap-2

          mb-4
          "
        >

          <ImagePlus size={18} />

          <span
            className="
            font-medium
            "
          >
            Add Photos
          </span>

        </div>

        <ReviewImageUploader

          images={images}

          setImages={setImages}

        />

      </div>

      {/* Footer */}

      <div
        className="
        flex

        flex-col
        md:flex-row

        items-center
        justify-between

        gap-4
        "
      >

        <p
          className="
          text-sm

          text-zinc-500
          "
        >
          Your review helps other customers make better decisions.
        </p>

        <motion.button

          whileHover={{
            scale: 1.05,
          }}

          whileTap={{
            scale: 0.95,
          }}

          type="submit"

          disabled={
            loading ||
            comment.trim().length < 10
          }

          className="
          bg-black

          hover:bg-zinc-800

          text-white

          px-8
          py-4

          rounded-2xl

          font-semibold

          shadow-lg

          transition-all

          disabled:opacity-50
          disabled:cursor-not-allowed
          "
        >

          {
            loading
              ? "Submitting..."
              : "Submit Review"
          }

        </motion.button>

      </div>

    </motion.form>

  );

}