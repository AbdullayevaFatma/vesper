// components/Hero.jsx
export default function Hero() {
  return (
<section
  className="relative min-h-[40vh] md:min-h-[60vh] lg:min-h-screen w-full"
  style={{
    backgroundImage: "url('/interior-1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="absolute inset-0 bg-black/50"></div>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 text-center z-10">
    <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary-500 drop-shadow-lg">
      Where Cocktails Meet Culinary Art
    </h1>
    <p className="text-lg md:text-2xl text-gray-100 drop-shadow">
       Luxury bar & Dining experience
    </p>
  </div>
</section>
  );
}
