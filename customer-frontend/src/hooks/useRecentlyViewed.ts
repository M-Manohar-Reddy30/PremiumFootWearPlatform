export default function useRecentlyViewed() {

  const addProduct =
  (product:any)=>{

    const existing =
    JSON.parse(

      localStorage.getItem(
        "recentlyViewed"
      ) || "[]"

    );

    const filtered =
    existing.filter(
      (item:any)=>
      item._id !== product._id
    );

    const updated = [

      product,

      ...filtered,

    ].slice(0,8);

    localStorage.setItem(

      "recentlyViewed",

      JSON.stringify(updated)

    );

  };

  const getProducts =
  ()=>{

    return JSON.parse(

      localStorage.getItem(
        "recentlyViewed"
      ) || "[]"

    );

  };

  return {

    addProduct,

    getProducts,

  };

}