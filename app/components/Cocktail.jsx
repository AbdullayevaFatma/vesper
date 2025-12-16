import Image from "next/image";

export default function Cocktail() {
  return (
      <section className="bg-primary-500 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:w-1/2 relative aspect-3/4 lg:aspect-4/5">
              <Image
                src="/cocktail-2.jpg"
                alt="Vesper signature cocktail"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="text-white space-y-4">
                <p className="text-lg uppercase tracking-[0.3em] font-light">VESPER</p>
                <h2 className="text-4xl lg:text-5xl font-light">
                  COCKTAIL<br />HOUR
                </h2>
                <p className="leading-relaxed text-white/90 max-w-lg">
                 Immerse yourself in the art of mixology, where handcrafted cocktails and seasonal ingredients come together to create unforgettable moments in a luxurious, intimate setting.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-4/5">
                  <Image
                    src="/cocktail-1.webp"
                    alt="Vesper martini cocktail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-4/5">
                  <Image
                    src="/cocktail-3.jpg"
                    alt="Vesper signature drink"
                    fill
                    className="object-cover object-[75%_5%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}