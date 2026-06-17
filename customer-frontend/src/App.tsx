import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch } from "react-redux";

import {
  useUser,
} from "@clerk/clerk-react";

import AppRoutes from "./routes/AppRoutes";

import SmoothScroll
from "./providers/SmoothScroll";

import {
  syncUser,
} from "./api/userApi";

import {
  fetchSettings,
} from "./features/settings/settingsSlice";

import PurchasePopup
from "./components/common/PurchasePopup";

export default function App() {

  const dispatch =
    useDispatch();

  const { user } =
    useUser();

  // Load website settings

  useEffect(() => {

    dispatch(
      fetchSettings() as any
    );

  }, [dispatch]);

  // Sync Clerk user with MongoDB

  useEffect(() => {

    const syncMongoUser =
      async () => {

        if (!user) return;

        try {

          await syncUser({

            clerkId:
              user.id,

            email:
              user.primaryEmailAddress
                ?.emailAddress,

          });

        } catch (error) {

          console.error(
            "User sync failed",
            error
          );

        }

      };

    syncMongoUser();

  }, [user]);

  return (

    <BrowserRouter>

      <SmoothScroll />

      <AppRoutes />

      <PurchasePopup />

    </BrowserRouter>

  );

}