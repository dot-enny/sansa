import React from 'react'
import heroImg from '../../assets/slider-01.jpg' // place your file at src/assets/slider-01.jpg

const HeroBanner: React.FC = () => {
  return (
    <section className="w-full">
      <div className="relative rounded-lg overflow-hidden">
        {/* background image */}
        <div
          className="w-full h-100 md:h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
          role="img"
          aria-label="Hero banner"
        />

        {/* subtle gradient overlay to improve text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        {/* text content on top */}
        <div className="absolute left-6 top-6 md:left-12 md:top-12 max-w-lg text-white">
          <p className="text-sm opacity-80">Bevesi Natural Foods</p>
          <h1 className="mt-2 text-2xl md:text-4xl font-extrabold leading-tight">
            Everyday Essentials,
            <br />
            Exceptional Prices.
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/90">
            We have prepared the most special discounts for you on the most popular products you need. Don't miss these opportunities…
          </p>
          <button className="mt-4 inline-block bg-white text-slate-800 font-semibold px-4 py-2 rounded shadow cursor-pointer">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
