import { useEffect, useState } from "react";

import {
  getDashboardStats,
} from "../api/dashboardApi";

export default function DashboardPage() {

  const [stats, setStats] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
    async () => {

      try {

        const res =
          await getDashboardStats();

        setStats(
          res.data.data
        );

      } catch (error) {

        console.error(
          "Dashboard Error",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (
      <div>
        Loading Dashboard...
      </div>
    );

  }

  if (!stats) {

    return (
      <div>
        Failed To Load Dashboard
      </div>
    );

  }

  return (

    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        Dashboard
      </h1>

      {/* Stats Cards */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-6
        gap-4
        "
      >

        <Card
          title="Products"
          value={
            stats.totalProducts
          }
        />

        <Card
          title="Categories"
          value={
            stats.totalCategories
          }
        />

        <Card
          title="Users"
          value={
            stats.totalUsers
          }
        />

        <Card
          title="Orders"
          value={
            stats.totalOrders
          }
        />

        <Card
          title="Revenue"
          value={
            `₹${stats.totalRevenue || 0}`
          }
        />

        <Card
          title="Reviews"
          value={
            stats.totalReviews
          }
        />

      </div>

      {/* Quick Overview */}

      <div
        className="
        mt-10

        bg-white

        rounded-2xl

        p-6

        shadow-sm
        "
      >

        <h2
          className="
          text-xl
          font-bold

          mb-6
          "
        >
          Quick Overview
        </h2>

        <div
          className="
          grid
          md:grid-cols-3
          gap-4
          "
        >

          <OverviewCard
            title="Products"
            value={
              stats.totalProducts
            }
          />

          <OverviewCard
            title="Orders"
            value={
              stats.totalOrders
            }
          />

          <OverviewCard
            title="Revenue"
            value={
              `₹${stats.totalRevenue || 0}`
            }
          />

        </div>

      </div>

    </div>

  );

}

function Card({
  title,
  value,
}: any) {

  return (

    <div
      className="
      bg-white

      rounded-2xl

      p-6

      shadow-sm

      hover:shadow-lg

      transition
      "
    >

      <h3
        className="
        text-zinc-500
        text-sm
        "
      >
        {title}
      </h3>

      <p
        className="
        text-4xl
        font-bold

        mt-3
        "
      >
        {value}
      </p>

    </div>

  );

}

function OverviewCard({
  title,
  value,
}: any) {

  return (

    <div
      className="
      border

      rounded-xl

      p-5
      "
    >

      <h3
        className="
        text-zinc-500
        "
      >
        {title}
      </h3>

      <p
        className="
        text-2xl
        font-bold

        mt-2
        "
      >
        {value}
      </p>

    </div>

  );

}