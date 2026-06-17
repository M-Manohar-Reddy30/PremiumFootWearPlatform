import {
  useEffect,
  useState,
} from "react";

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
}:any) {

  const [reviews,setReviews] =
  useState<any[]>([]);

  const loadReviews =
    async()=>{

      try{

        const res =
        await getProductReviews(
          product._id
        );

        setReviews(
          res.data.data
        );

      }
      catch(error){

        console.error(error);

      }

    };

  useEffect(()=>{

    loadReviews();

  },[product._id]);

  const averageRating =
  reviews.length
  ? (
      reviews.reduce(
        (acc,review)=>
        acc + review.rating,
        0
      ) /
      reviews.length
    ).toFixed(1)
  : "0";

  return (

    <section
      className="
      mt-24
      "
    >

      <div
        className="
        flex
        items-center
        gap-4

        mb-8
        "
      >

        <h2
          className="
          text-3xl
          font-bold
          "
        >
          Reviews
        </h2>

        <div
          className="
          mb-8

          p-6

          rounded-3xl

          border

          bg-zinc-50
          dark:bg-zinc-900
          "
        >

          <div
            className="
            text-5xl
            font-bold
            "
          >
            {averageRating}
          </div>

          <div
            className="
            mt-2
            "
          >
            Average Rating
          </div>

          <div
            className="
            mt-1
            text-zinc-500
            "
          >
            Based on
            {" "}
            {reviews.length}
            {" "}
            Reviews
          </div>

        </div>

        <div
          className="
          flex
          items-center
          gap-3
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

          <span
            className="
            font-semibold
            "
          >
            {averageRating}
          </span>

          <span
            className="
            text-zinc-500
            "
          >
            (
            {reviews.length}
            Reviews
            )
          </span>

        </div>

      </div>

      {reviews.length === 0 ? (

        <div
          className="
          text-zinc-500
          "
        >
          No Reviews Yet
        </div>

      ) : (

        <div
          className="
          space-y-5
          "
        >

          {reviews.map(
            (review:any)=>(

              <ReviewCard
                key={review._id}
                review={review}
              />

            )
          )}

        </div>

      )}

      <AddReviewForm

            productId={
                product._id
            }

            onSuccess={
                loadReviews
            }

        />

    </section>

  );

}