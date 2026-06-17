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

export default function AddReviewForm({
  productId,
  onSuccess,
}:any) {

  const [rating,setRating] =
  useState(5);

  const [comment,setComment] =
  useState("");

  const [images,
  setImages] =
  useState<any[]>([]);

  const [loading,setLoading] =
  useState(false);

  const {
    getToken,
    isSignedIn,
  } = useAuth();

  const handleSubmit =
  async (
    e:React.FormEvent
  ) => {

    e.preventDefault();

    try{

      setLoading(true);

      if(!isSignedIn){

        alert(
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

      successToast(
        "Review Added Successfully"
      );

      onSuccess?.();

    }
    catch(error:any){

      console.error(error);

      errorToast(
        error?.response?.data?.message
        ||
        "Review Failed"
      );

    }
    finally{

      setLoading(false);

    }

  };

  return (

    <form
      onSubmit={
        handleSubmit
      }
      className="
      border

      rounded-2xl

      p-6

      mt-8

      space-y-4
      "
    >

      <h3
        className="
        text-xl
        font-semibold
        "
      >
        Write A Review
      </h3>

      <select

        value={rating}

        onChange={(e)=>
          setRating(
            Number(
              e.target.value
            )
          )
        }

        className="
        border
        p-3
        rounded-xl
        w-full
        "
      >

        <option value={5}>
          5 Stars
        </option>

        <option value={4}>
          4 Stars
        </option>

        <option value={3}>
          3 Stars
        </option>

        <option value={2}>
          2 Stars
        </option>

        <option value={1}>
          1 Star
        </option>

      </select>

      <textarea

        rows={4}

        value={comment}

        onChange={(e)=>
          setComment(
            e.target.value
          )
        }

        placeholder="
        Share your experience...
        "

        className="
        border
        p-3
        rounded-xl
        w-full
        "
      />

      <div>

        <h4
          className="
          font-medium
          mb-2
          "
        >
          Review Images
        </h4>

        <ReviewImageUploader
          images={images}
          setImages={setImages}
        />

      </div>

      <button

        type="submit"

        disabled={loading}

        className="
        bg-black
        text-white

        px-6
        py-3

        rounded-xl
        "
      >

        {
          loading
          ? "Submitting..."
          : "Submit Review"
        }

      </button>

    </form>

  );

}