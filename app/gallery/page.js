"use client";

import Image from "next/image";
import { galleryItems } from "../data/data";



export default function Gallery() {
  return (
    <section className="bg-[#f5f1e8] text-gray-100 py-30 px-6 max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto space-y-24">
        {galleryItems.map((item, index) => {
          let heightClass = "h-64 sm:h-80 lg:h-96";
          let widthClass = "w-full lg:w-1/2";
          if (item.layout === "tall") heightClass = "h-100 sm:h-[36rem] lg:h-[40rem]";
          if (item.layout === "wide") heightClass = "h-64 sm:h-80 lg:h-72";
          return (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                item.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`relative ${widthClass} ${heightClass}  overflow-hidden shadow-xl`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-serif text-primary-500 mb-4 uppercase">
                  {item.title}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
