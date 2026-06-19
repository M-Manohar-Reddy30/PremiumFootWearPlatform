import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import AddReviewForm
from "./AddReviewForm";

import {
  getProductReviews,
} from "../../api/reviewApi";

import ReviewCard
from "./ReviewCard";

import StarRating
from "./StarRating";

export default function ReviewsSection({
  product,
}: any) {

  const [reviews, setReviews] =
    useState<any[]>([]);

  const loadReviews =
    async () => {

      try {

        const res =
          await getProductReviews(
            product._id
          );

        setReviews(
          res.data.data || []
        );

      }
      catch (error) {

        console.error(error);

      }

    };

  useEffect(() => {

    loadReviews();

  }, [product._id]);

  const averageRating =
    reviews.length
      ? (
          reviews.reduce(
            (
              acc,
              review
            ) =>
              acc +
              review.rating,
            0
          ) /
          reviews.length
        ).toFixed(1)
      : "0";

  const ratingBreakdown =
    [5, 4, 3, 2, 1].map(
      (star) => {

        const count =
          reviews.filter(
            (review) =>
              review.rating === star
          ).length;

        const percentage =
          reviews.length
            ? (
                count /
                reviews.length
              ) * 100
            : 0;

        return {
          star,
          count,
          percentage,
        };

      }
    );

  const reviewImages =
    reviews.flatMap(
      (review) =>
        review.images || []
    );

  return (

    <section
      className="
      mt-12
      md:mt-24

      pb-16
      md:pb-20
      "
    >

      <div
        className="
        rounded-[32px]

        border

        p-4
        md:p-12

        bg-white
        dark:bg-zinc-950

        shadow-xl
        "
      >

        <h2
          className="
          text-xl
          sm:text-2xl
          md:text-4xl
          font-black

          mb-10
          "
        >
          Customer Reviews
        </h2>

        <div
          className="
          grid

          lg:grid-cols-2

          gap-6
          md:gap-12
          "
        >

          {/* Left */}

          <div>

            <div
              className="
              text-4xl
              md:text-6xl
              font-black
              "
            >
              {averageRating}
            </div>

            <div
              className="
              mt-3
              "
            >
              <StarRating
                rating={
                  Math.round(
                    Number(
                      averageRating
                    )
                  )
                }
              />
            </div>

            <p
              className="
              mt-3

              text-zinc-500
              "
            >
              Based on
              {" "}
              {reviews.length}
              {" "}
              reviews
            </p>

          </div>

          {/* Right */}

          <div
            className="
            space-y-4
            "
          >

            {ratingBreakdown.map(
              (
                item
              ) => (

                <div
                  key={item.star}
                  className="
                  flex
                  items-center
                  gap-4
                  "
                >

                  <span
                    className="
                    w-10
                    "
                  >
                    {item.star}★
                  </span>

                  <div
                    className="
                    flex-1

                    h-3

                    rounded-full

                    bg-zinc-200
                    dark:bg-zinc-800

                    overflow-hidden
                    "
                  >

                    <motion.div

                      initial={{
                        width: 0,
                      }}

                      whileInView={{
                        width:
                          `${item.percentage}%`,
                      }}

                      viewport={{
                        once: true,
                      }}

                      transition={{
                        duration: 1,
                      }}

                      className="
                      h-full

                      bg-black
                      dark:bg-white
                      "
                    />

                  </div>

                  <span
                    className="
                    text-sm

                    text-zinc-500
                    "
                  >
                    {item.count}
                  </span>

                </div>

              )
            )}

          </div>

        </div>

        {/* Review Photos */}

        {reviewImages.length > 0 && (

          <div
            className="
            mt-12
            "
          >

            <h3
              className="
              text-xl
              md:text-2xl

              font-bold

              mb-4
              md:mb-5
              "
            >
              Customer Photos
            </h3>

            <div
              className="
              flex

              gap-4

              overflow-x-auto
              pb-2
              scrollbar-hide
              "
            >

              {reviewImages.map(
                (
                  image:any,
                  index:number
                ) => (

                  <img

                    key={index}

                    src={
                      image.url
                    }

                    alt=""

                    className="
                    w-20
                    h-20

                    md:w-28
                    md:h-28

                    object-cover

                    rounded-2xl

                    border

                    hover:scale-105

                    transition
                    "
                  />

                )
              )}

            </div>

          </div>

        )}

      </div>

      {/* Reviews */}

      <div
        className="
        mt-8
        md:mt-12

        space-y-4
        md:space-y-6
        "
      >

        {reviews.length === 0 ? (

          <div
            className="
            text-center

            py-12

            text-zinc-500
            "
          >
            No Reviews Yet
          </div>

        ) : (

          reviews.map(
            (
              review:any
            ) => (

              <ReviewCard
                key={review._id}
                review={review}
              />

            )
          )

        )}

      </div>

      {/* Review Form */}

      <div
        className="
        mt-16
        "
      >

        <AddReviewForm

          productId={
            product._id
          }

          onSuccess={
            loadReviews
          }

        />

      </div>

    </section>

  );

}