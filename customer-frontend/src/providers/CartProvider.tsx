import {
  successToast,
  errorToast,
} from "../utils/toast";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "@clerk/clerk-react";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../api/cartApi";

const CartContext =
createContext<any>(null);

export function CartProvider({
  children,
}:any){

  const { getToken } =
  useAuth();

  const [cartItems,
  setCartItems] =
  useState<any[]>([]);

  const [summary,
  setSummary] =
  useState({
    subtotal:0,
    total:0,
  });

  const [loading,
  setLoading] =
  useState(false);

  const loadCart =
  async()=>{

    try{

      const token =
      await getToken();

      if(!token) return;

      const res =
      await getCart(
        token
      );

      setCartItems(
        res.data.data
      );

      setSummary(
        res.data.summary
      );

    }
    catch(error){

      console.error(error);

    }

  };

  useEffect(()=>{

    loadCart();

  },[getToken]);

  const addItem =
  async(
    productId:string,
    quantity=1,
    size="",
    color=""
  )=>{

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

      await addToCart(
        productId,
        quantity,
        size,
        color,
        token
      );

      await loadCart();

      successToast(
        "Added To Cart 🛒"
      );

    }
    catch(error:any){

      errorToast(
        error?.response?.data?.message
        ||
        "Cart Error"
      );

    }
    finally{

      setLoading(false);

    }

  };

  const updateItem =
  async(
    productId:string,
    size:string,
    color:string,
    quantity:number
  )=>{

    const token =
    await getToken();

    if(!token) return;

    await updateCartItem(
      productId,
      quantity,
      size,
      color,
      token
    );

    await loadCart();

    successToast(
      "Cart Updated"
    );

  };

  const removeItem =
  async(
    productId:string,
    size:string,
    color:string
  )=>{

    const token =
    await getToken();

    if(!token) return;

    await removeFromCart(
      productId,
      size,
      color,
      token
    );

    await loadCart();

    successToast(
      "Item Removed"
    );

  };

  return (

    <CartContext.Provider
      value={{

        cartItems,

        summary,

        loading,

        addItem,

        updateItem,

        removeItem,

      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export const useCart =
()=>{

  return useContext(
    CartContext
  );

};