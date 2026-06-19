import Navbar
from "../components/layout/Navbar";

import Footer
from "../components/layout/Footer";

import BottomNav
from "../components/layout/BottomNav";

export default function MainLayout({
  children,
}:{
  children:React.ReactNode;
}){

  return(

    <div
      className="
      min-h-screen
      flex
      flex-col
      "
    >

      <Navbar />

      <main
        className="
        flex-1
        pb-24
        md:pb-0
        "
      >
        {children}
      </main>

      <Footer />

      <BottomNav />

    </div>

  );

}