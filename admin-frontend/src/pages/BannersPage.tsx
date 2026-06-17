import {
 useEffect,
 useState,
} from "react";

import BannerForm
from "../components/banners/BannerForm";

import {
 getBanners,
 createBanner,
 deleteBanner,
} from "../api/bannerApi";

export default function BannersPage(){

 const [
  banners,
  setBanners
 ] =
 useState<any[]>([]);

 useEffect(()=>{

  loadBanners();

 },[]);

 const loadBanners =
 async()=>{

  const res =
  await getBanners();

  setBanners(
   res.data.data
  );

 };

 const handleCreate =
 async(data:any)=>{

  await createBanner(
   data
  );

  loadBanners();

 };

 const handleDelete =
 async(id:string)=>{

  const ok =
  window.confirm(
   "Delete Banner?"
  );

  if(!ok)
  return;

  await deleteBanner(
   id
  );

  loadBanners();

 };

 return(

 <div>

  <h1
  className="
  text-3xl
  font-bold
  mb-6
  "
  >
   Banner Management
  </h1>

  <BannerForm
   onSubmit={
    handleCreate
   }
  />

  <div
  className="
  grid
  md:grid-cols-2
  gap-6
  mt-8
  "
  >

   {banners.map(
    (banner)=>(
    <div
    key={banner._id}
    className="
    bg-white
    rounded-xl
    shadow
    overflow-hidden
    "
    >

     <img
      src={
       banner.image.url
      }
      alt=""
      className="
      h-48
      w-full
      object-cover
      "
     />

     <div
     className="
     p-4
     "
     >

      <h3
      className="
      font-bold
      text-lg
      "
      >
       {
        banner.title
       }
      </h3>

      <p>
       {
        banner.subtitle
       }
      </p>

      <button
      onClick={()=>
       handleDelete(
        banner._id
       )
      }
      className="
      text-red-500
      mt-3
      "
      >
       Delete
      </button>

     </div>

    </div>
    )
   )}

  </div>

 </div>

 );

}