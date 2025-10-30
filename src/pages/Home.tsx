import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import CategoriesSidebar from "../components/organisms/CategoriesSidebar";
import HeroBanner from "../components/organisms/HeroBanner";
import ProductGrid from "../components/organisms/ProductGrid";

const Home: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="container mx-auto  py-6" style={{ maxWidth: "1200px" }}>
      <div className="flex gap-8">
        {/* Mobile: menu button to open categories drawer */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open categories"
            className="mb-4 inline-flex items-center gap-2 rounded bg-white px-3 py-2 text-sm shadow"
          >
            <HiOutlineMenu className="w-5 h-5" />
            Categories
          </button>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden md:block w-72">
          <CategoriesSidebar />
        </div>

        {/* Mobile drawer (slide-over) */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="fixed left-0 top-0 h-full w-72 bg-white p-4 shadow-lg overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Categories</h3>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2"
                >
                  <HiOutlineX className="w-6 h-6" />
                </button>
              </div>
              <CategoriesSidebar />
            </aside>
          </div>
        )}

        <main className="flex-1">
          <HeroBanner />

          {/* Additional sections can be added below: vendor carousel, featured products, promotions */}
          <section className="mt-8">
            {/* Product grid (replaced carousel) */}
            <div className="bg-transparent">
              <ProductGrid />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
