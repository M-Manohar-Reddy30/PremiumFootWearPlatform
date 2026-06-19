import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useEffect,
} from "react";

export default function ImageLightbox({
  images,
  selectedIndex,
  setSelectedIndex,
  open,
  onClose,
}:any){

  useEffect(()=>{

    const handleKey =
    (e:KeyboardEvent)=>{

      if(e.key==="Escape"){

        onClose();

      }

      if(e.key==="ArrowLeft"){

        setSelectedIndex(
          (prev:number)=>
            prev === 0
            ? images.length - 1
            : prev - 1
        );

      }

      if(e.key==="ArrowRight"){

        setSelectedIndex(
          (prev:number)=>
            prev === images.length - 1
            ? 0
            : prev + 1
        );

      }

    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return ()=>{

      window.removeEventListener(
        "keydown",
        handleKey
      );

    };

  },[]);

  if(!open){

    return null;

  }

  return (

    <div

      onClick={onClose}

      className="
      fixed
      inset-0

      z-[9999]

      bg-black/95

      flex
      items-center
      justify-center
      "
    >

      <div
        onClick={(e)=>
          e.stopPropagation()
        }
        className="
        relative

        w-full
        h-full

        flex
        items-center
        justify-center
        "
      >

        <button

          onClick={onClose}

          className="
          absolute

          top-6
          right-6

          text-white
          z-50
          "
        >
          <X size={30}/>
        </button>

        <button
          onClick={() =>
            setSelectedIndex(
              selectedIndex === 0
              ? images.length - 1
              : selectedIndex - 1
            )
          }

          className="
          hidden md:block

          absolute

          left-6

          top-1/2
          -transform-y-1/2

          text-white

          z-50
          "
        >
          <ChevronLeft size={30} />
        </button>

        <img

            src={
              images[
                selectedIndex
              ]?.url
            }

            alt=""

            className="
            w-full
            h-auto

            max-w-[95vw]
            max-h-[85vh]

            object-contain

            mx-auto
            "
          />

        <button
          onClick={() =>
            setSelectedIndex(
              selectedIndex ===
              images.length - 1
              ? 0
              : selectedIndex + 1
            )
          }

          className="
          hidden md:block

          absolute

          right-6

          top-1/2
          -translate-y-1/2

          text-white

          z-50
          "
        >
          <ChevronRight size={30} />
        </button>

      </div>

    </div>

  );

}