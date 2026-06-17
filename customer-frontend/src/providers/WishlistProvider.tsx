import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  successToast,
  errorToast,
} from "../utils/toast";

import {
  useAuth,
} from "@clerk/clerk-react";

import {
  getWishlist,
  addToWishlist,
  removeWishlist,
} from "../api/wishlistApi";

const WishlistContext =
createContext<any>(null);

export function WishlistProvider({
  children,
}:any){

  const { getToken } =
  useAuth();

  const [wishlistIds,
  setWishlistIds] =
  useState<string[]>([]);

  const [loading,
  setLoading] =
  useState(false);

  const loadWishlist =
  async()=>{

    try{

      const token =
      await getToken();

      if(!token) return;

      const res =
      await getWishlist(
        token
      );

      setWishlistIds(

        res.data.data.map(
          (product:any)=>
          product._id
        )

      );

    }
    catch(error){

      console.error(error);

    }

  };

  useEffect(()=>{

    loadWishlist();

  },[getToken]);

  const toggleWishlist =
  async(productId:string)=>{

    try{

      setLoading(true);

      const token =
      await getToken();

      if(!token){

        errorToast(
          "Please login first"
        );

        return;

      }

      if(
        wishlistIds.includes(
          productId
        )
      ){

        await removeWishlist(
          productId,
          token
        );

        setWishlistIds(
          prev =>
          prev.filter(
            id =>
            id !== productId
          )
        );

        successToast(
          "Removed From Wishlist"
        );

      }
      else{

        await addToWishlist(
          productId,
          token
        );

        setWishlistIds(
          prev => [
            ...prev,
            productId
          ]
        );

        successToast(
          "Added To Wishlist ❤️"
        );

      }

    }
    catch(error){

      console.error(error);

      errorToast(
        "Wishlist Error"
      );

    }
    finally{

      setLoading(false);

    }

  };

  return (

    <WishlistContext.Provider
      value={{

        wishlistIds,

        toggleWishlist,

        loading,

      }}
    >

      {children}

    </WishlistContext.Provider>

  );

}

export const useWishlist =
()=>{

  return useContext(
    WishlistContext
  );

};