import {
 useEffect,
 useState,
} from "react";

import {
 getReviews,
 deleteReview,
} from "../api/reviewApi";

export default function ReviewsPage() {

 const [
  reviews,
  setReviews
 ] =
 useState<any[]>([]);

 useEffect(() => {

  loadReviews();

 }, []);

 const loadReviews =
 async()=>{

  const res =
  await getReviews();

  setReviews(
   res.data.data
  );

 };

 const handleDelete =
 async(id:string)=>{

  const ok =
  window.confirm(
   "Delete Review?"
  );

  if(!ok)
  return;

  await deleteReview(
   id
  );

  loadReviews();

 };

 return (

 <div>

  <h1
  className="
  text-3xl
  font-bold
  mb-6
  "
  >
   Reviews
  </h1>

  <div
  className="
  bg-white
  rounded-xl
  shadow
  overflow-x-auto
  "
  >

   <table
   className="
   w-full
   "
   >

    <thead>

     <tr>

      <th className="p-4">
       Product
      </th>

      <th className="p-4">
       User
      </th>

      <th className="p-4">
       Rating
      </th>

      <th className="p-4">
       Comment
      </th>

      <th className="p-4">
       Images
      </th>

      <th className="p-4">
       Actions
      </th>

     </tr>

    </thead>

    <tbody>

     {reviews.map(
      (review)=>(

      <tr
      key={review._id}
      className="
      border-b
      "
      >

       <td className="p-4">
        {
         review.product
         ?.name
        }
       </td>

       <td className="p-4">
        {
         review.user
         ?.fullName
        }
       </td>

       <td className="p-4">
        ⭐
        {
         review.rating
        }
       </td>

       <td className="p-4">
        {
         review.comment
        }
       </td>

       <td className="p-4">

        <div
        className="
        flex
        gap-2
        "
        >

         {review.images?.map(
          (
           image:any,
           index:number
          )=>(
           <img
            key={index}
            src={
             image.url
            }
            alt=""
            className="
            w-12
            h-12
            rounded
            object-cover
            "
           />
          )
         )}

        </div>

       </td>

       <td className="p-4">

        <button
        onClick={()=>
         handleDelete(
          review._id
         )
        }
        className="
        text-red-500
        "
        >
         Delete
        </button>

       </td>

      </tr>

      )
     )}

    </tbody>

   </table>

  </div>

 </div>

 );

}