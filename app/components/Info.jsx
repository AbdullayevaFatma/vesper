import Image from "next/image";
import Link from "next/link";

export default function Info() {
  return (
    <section className="bg-[#f5f1e8] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start ">
          <div className="lg:w-1/3 space-y-6">
            <h3 className="text-3xl uppercase tracking-widest text-primary-500 font-bold">
              VESPER
            </h3>
            <h2 className="text-3xl font-light text-neutral-800 uppercase">
              Contemporary European
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Renowned for its refined cuisine, Vesper blends confident flavors
              with a warm, softly lit atmosphere, offering a simple yet
              luxurious dining and bar experience in the heart of Milan.
            </p>
            <Link
              href="/menu"
              className="flex items-center gap-2 text-sm uppercase tracking-wider text-neutral-800 hover:text-primary-500 transition"
            >
              VIEW MENU
              <span className="text-xl">→</span>
            </Link>
            <Link href="/contact">
              <button className="mt-8 border border-neutral-800 px-8 py-3 text-sm uppercase tracking-wider bg-neutral-800 text-white transition cursor-pointer">
                CONTACT TO BOOK →
              </button>
            </Link>
            <div className="flex gap-12 pt-8 border-t border-neutral-300 mt-12">
              <div className="text-center">
                <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
                  DINNER
                </h4>
                <p className="text-xs uppercase tracking-wider text-neutral-500">
                  EVERYDAY
                </p>
                <p className="text-sm text-neutral-800 mt-1">18.00 - 23.00</p>
              </div>
              <div className="w-px bg-neutral-300"></div>
              <div className="text-center">
                <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
                  BAR
                </h4>
                <p className="text-xs uppercase tracking-wider text-neutral-500">
                  EVERYDAY
                </p>
                <p className="text-sm text-neutral-800 mt-1">17.00 - 01.00</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3 flex gap-2 lg:gap-4">
            <div className="w-1/2 flex flex-col justify-center gap-2 lg:gap-4">
              <div className="relative aspect-square">
                <Image
                  src="/dinner-2.jpg"
                  alt="Vesper dining experience"
                  fill
                  className="object-cover object-[20%_20%]"
                />
              </div>
              <div className="relative aspect-square">
                <Image
                  src="/cocktail-2.jpg"
                  alt="Vesper table setting"
                  fill
                  className="object-cover object-[65%_5%]"
                />
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-2 lg:gap-4">
              <div className="relative aspect-square">
                <Image
                  src="/cocktail-1.webp"
                  alt="Vesper wine pairing"
                  fill
                  className="object-cover object-[center_25%]"
                />
              </div>
              <div className="relative aspect-4/2">
                <Image
                  src="/dinner-3.jpg"
                  alt="Vesper outdoor seating"
                  fill
                  className="object-cover object-[center_65%]"
                />
              </div>
              <div className="relative aspect-square">
                <Image
                  src="/dinner-1.jpg"
                  alt="Vesper signature dish"
                  fill
                  className="object-cover object-[center_40%]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
