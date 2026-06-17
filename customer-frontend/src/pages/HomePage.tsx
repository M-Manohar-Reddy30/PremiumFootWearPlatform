import MainLayout
from "../layouts/MainLayout";

import HeroBanner
from "../components/hero/HeroBanner";

import FeaturedProducts
from "../components/products/FeaturedProducts";

import TrendingProducts
from "../components/products/TrendingProducts";

import NewArrivals
from "../components/products/NewArrivals";

import CategoriesShowcase
from "../components/categories/CategoriesShowcase";

import BrandStory
from "../components/home/BrandStory";

export default function HomePage() {

  return (

    <MainLayout>

      <HeroBanner />

      <FeaturedProducts />

      <CategoriesShowcase />

      <TrendingProducts />

      <BrandStory />

      <NewArrivals />

    </MainLayout>

  );

}