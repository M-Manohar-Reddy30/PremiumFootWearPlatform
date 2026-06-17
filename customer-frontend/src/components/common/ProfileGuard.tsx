import {
  Navigate,
} from "react-router-dom";

import {
  useUser,
} from "@clerk/clerk-react";

import {
  useEffect,
  useState,
} from "react";

import {
  getProfile,
} from "../../api/userApi";

export default function ProfileGuard({
  children,
}:any){

  const { user } =
  useUser();

  const [loading,setLoading] =
  useState(true);

  const [completed,setCompleted] =
  useState(false);

  useEffect(()=>{

    const load =
    async()=>{

      if(!user){

        setLoading(false);

        return;

      }

      try{

        const res =
        await getProfile(
          user.id
        );

        setCompleted(
          res.data.data
          .profileCompleted
        );

      }
      catch(error){

        console.error(error);

      }
      finally{

        setLoading(false);

      }

    };

    load();

  },[user]);

  if(loading){

    return (
      <div>
        Loading...
      </div>
    );

  }

  if(!completed){

    return (
      <Navigate
        to="/profile"
      />
    );

  }

  return children;

}