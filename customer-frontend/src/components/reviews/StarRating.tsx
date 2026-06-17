import {
  Star,
} from "lucide-react";

export default function StarRating({
  rating,
}:{
  rating:number
}) {

  return (

    <div
      className="
      flex
      items-center
      gap-1
      "
    >

      {[1,2,3,4,5].map(
        (star)=>(
          <Star
            key={star}

            size={18}

            fill={
              star <= rating
                ? "currentColor"
                : "none"
            }

            className="
            text-yellow-500
            "
          />
        )
      )}

    </div>

  );

}