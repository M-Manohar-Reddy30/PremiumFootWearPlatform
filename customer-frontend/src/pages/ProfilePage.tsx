import {
  useEffect,
  useState,
} from "react";

import {
  useUser,
} from "@clerk/clerk-react";

import MainLayout
from "../layouts/MainLayout";

import {
  getProfile,
  updateProfile,
} from "../api/userApi";

export default function ProfilePage() {

  const { user } =
  useUser();

  const [profile,setProfile] =
  useState<any>(null);

  const [saving,setSaving] =
  useState(false);

  useEffect(()=>{

    const loadProfile =
    async()=>{

      if(!user) return;

      try{

        const res =
        await getProfile(
          user.id
        );

        setProfile(
          res.data.data
        );

      }
      catch(error){

        console.error(error);

      }

    };

    loadProfile();

  },[user]);

  const handleSave =
  async()=>{

    try{

      setSaving(true);

      await updateProfile(
        user!.id,
        profile
      );

      alert(
        "Profile Updated"
      );

    }
    catch(error){

      console.error(error);

    }
    finally{

      setSaving(false);

    }

  };

  if(!profile){

    return (

      <MainLayout>

        <div
          className="
          p-20
          text-center
          "
        >
          Loading...
        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div
        className="
        max-w-5xl
        mx-auto

        px-6
        py-12
        "
      >

        {/* Profile Hero */}

        <div
          className="
          bg-white
          dark:bg-zinc-900

          rounded-3xl

          shadow

          p-8

          mb-8
          "
        >

            <div
                className="
                flex
                items-center
                gap-5
                "
            >

                <img
                src={
                    user?.imageUrl
                }
                alt=""
                className="
                w-20
                h-20

                rounded-full
                "
                />

                <div>

                    <h1
                        className="
                        text-3xl
                        font-bold
                        "
                    >
                        {
                        profile.fullName ||
                        "Complete Profile"
                        }
                    </h1>

                    <p>
                        {
                        profile.email
                        }
                    </p>

                </div>

            </div>

            <div
                className="
                mt-6
                "
            >

                <div
                    className="
                    flex
                    justify-between
                    mb-2
                    "
                >

                    <span>
                        Profile Completion
                    </span>

                    <span>
                        {
                        profile.profileCompletionPercentage
                        }%
                    </span>

                </div>

                <div
                    className="
                    h-3

                    bg-zinc-200
                    dark:bg-zinc-700

                    rounded-full
                    overflow-hidden
                    "
                >

                    <div
                        className="
                        h-full

                        bg-green-500

                        transition-all
                        duration-500
                        "
                        style={{
                        width:
                        `${profile.profileCompletionPercentage}%`
                        }}
                    />

                    </div>

                        <div
                            className="
                            grid
                            grid-cols-2
                            md:grid-cols-4
                            gap-4
                            mt-8
                            "
                            >

                            <div
                                className="
                                bg-zinc-100
                                dark:bg-zinc-800

                                p-5

                                rounded-2xl
                                "
                            >
                                <div
                                className="
                                text-sm
                                text-zinc-500
                                "
                                >
                                Wishlist
                                </div>

                                <div
                                className="
                                text-3xl
                                font-bold
                                "
                                >
                                {profile.wishlist?.length || 0}
                                </div>
                            </div>

                            <div
                                className="
                                bg-zinc-100
                                dark:bg-zinc-800

                                p-5

                                rounded-2xl
                                "
                            >
                                <div
                                className="
                                text-sm
                                text-zinc-500
                                "
                                >
                                Cart Items
                                </div>

                                <div
                                className="
                                text-3xl
                                font-bold
                                "
                                >
                                {profile.cart?.length || 0}
                                </div>
                            </div>

                            <div
                                className="
                                bg-zinc-100
                                dark:bg-zinc-800

                                p-5

                                rounded-2xl
                                "
                            >
                                <div
                                className="
                                text-sm
                                text-zinc-500
                                "
                                >
                                Status
                                </div>

                                <div
                                className="
                                font-semibold
                                "
                                >
                                {
                                    profile.profileCompleted
                                    ? "Complete"
                                    : "Incomplete"
                                }
                                </div>
                            </div>

                            <div
                                className="
                                bg-zinc-100
                                dark:bg-zinc-800

                                p-5

                                rounded-2xl
                                "
                            >
                                <div
                                className="
                                text-sm
                                text-zinc-500
                                "
                                >
                                Member Since
                                </div>

                                <div
                                className="
                                font-semibold
                                "
                                >
                                {
                                    new Date(
                                    profile.createdAt
                                    ).toLocaleDateString()
                                }
                                </div>
                            </div>

                        </div>

                </div>

            </div>

            {/* Personal Information */}

            <div
                className="
                bg-white
                dark:bg-zinc-900

                rounded-3xl

                shadow

                p-8

                space-y-4
                "
            >

                <h2
                    className="
                    text-2xl
                    font-bold
                    "
                >
                    Personal Information
                </h2>

                <input
                    value={
                    profile.fullName || ""
                    }
                    onChange={(e)=>
                    setProfile({
                        ...profile,
                        fullName:
                        e.target.value
                    })
                    }
                    placeholder="Full Name"
                    className="
                    border
                    p-3
                    rounded-xl
                    w-full
                    "
                />

                <input
                    value={
                    profile.mobileNumber || ""
                    }
                    onChange={(e)=>
                    setProfile({
                        ...profile,
                        mobileNumber:
                        e.target.value
                    })
                    }
                    placeholder="Mobile Number"
                    className="
                    border
                    p-3
                    rounded-xl
                    w-full
                    "
                />

                <input
                    value={
                    profile.alternateMobileNumber || ""
                    }
                    onChange={(e)=>
                    setProfile({
                        ...profile,
                        alternateMobileNumber:
                        e.target.value
                    })
                    }
                    placeholder="Alternative Mobile"
                    className="
                    border
                    p-3
                    rounded-xl
                    w-full
                    "
                />

                <textarea
                    value={
                    profile.address || ""
                    }
                    onChange={(e)=>
                    setProfile({
                        ...profile,
                        address:
                        e.target.value
                    })
                    }
                    placeholder="Address"
                    className="
                    border
                    p-3
                    rounded-xl
                    w-full
                    "
                />

                <input
                    value={
                    profile.city || ""
                    }
                    onChange={(e)=>
                    setProfile({
                        ...profile,
                        city:
                        e.target.value
                    })
                    }
                    placeholder="City"
                    className="
                    border
                    p-3
                    rounded-xl
                    w-full
                    "
                />

                <input
                    value={
                    profile.state || ""
                    }
                    onChange={(e)=>
                    setProfile({
                        ...profile,
                        state:
                        e.target.value
                    })
                    }
                    placeholder="State"
                    className="
                    border
                    p-3
                    rounded-xl
                    w-full
                    "
                />

                <input
                    value={
                    profile.pincode || ""
                    }
                    onChange={(e)=>
                    setProfile({
                        ...profile,
                        pincode:
                        e.target.value
                    })
                    }
                    placeholder="Pincode"
                    className="
                    border
                    p-3
                    rounded-xl
                    w-full
                    "
                />

                <input
                    value={
                    profile.country || ""
                    }
                    onChange={(e)=>
                    setProfile({
                        ...profile,
                        country:
                        e.target.value
                    })
                    }
                    placeholder="Country"
                    className="
                    border
                    p-3
                    rounded-xl
                    w-full
                    "
                />

                <button
                    onClick={
                    handleSave
                    }
                    disabled={saving}
                    className="
                    bg-black
                    text-white

                    px-8
                    py-3

                    rounded-xl
                    "
                >
                    {
                    saving
                    ? "Saving..."
                    : "Save Profile"
                    }
                </button>

            </div>

        </div>

    </MainLayout>

  );

}