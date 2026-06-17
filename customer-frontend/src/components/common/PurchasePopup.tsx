import {
  useEffect,
  useState,
} from "react";

import {
  getRecentOrders,
} from "../../api/orderApi";

export default function PurchasePopup(){

  const [visible,
  setVisible] =
  useState(false);

  const [purchases,
  setPurchases] =
  useState<any[]>([]);

  const [purchase,
  setPurchase] =
  useState<any>(null);

  useEffect(()=>{

    const loadOrders =
    async()=>{

      try{

        const res =
        await getRecentOrders();

        setPurchases(
          res.data.data || []
        );

      }
      catch(error){

        console.error(error);

      }

    };

    loadOrders();

  },[]);

  useEffect(()=>{

    if(
      purchases.length === 0
    ){
      return;
    }

    const interval =
    setInterval(()=>{

      const random =
      purchases[
        Math.floor(
          Math.random() *
          purchases.length
        )
      ];

      setPurchase(random);

      setVisible(true);

      setTimeout(()=>{

        setVisible(false);

      },4000);

    },12000);

    return ()=>{

      clearInterval(
        interval
      );

    };

  },[purchases]);

  if(
    !visible ||
    !purchase
  ){

    return null;

  }

  return (

    <div
      className="
      fixed
      bottom-6
      left-6

      z-[9999]

      bg-white
      dark:bg-zinc-900

      border

      rounded-2xl

      shadow-2xl

      p-4

      max-w-xs
      "
    >

      <p
        className="
        text-sm
        "
      >
        👟 <strong>
          {purchase.name}
        </strong>{" "}
        from{" "}
        <strong>
          {purchase.city}
        </strong>
      </p>

      <p
        className="
        mt-1
        font-medium
        "
      >
        purchased
      </p>

      <p
        className="
        text-zinc-600
        dark:text-zinc-400
        "
      >
        {purchase.product}
      </p>

      <p
        className="
        text-xs
        mt-2
        text-zinc-400
        "
      >
        Recently Ordered
      </p>

    </div>

  );

}