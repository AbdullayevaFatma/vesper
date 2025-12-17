import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section className="bg-[#f5f1e8] py-24 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl lg:text-5xl font-light text-neutral-800 tracking-wide uppercase">
          Contemporary European
        </h2>
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-600">
          Modern European flavors with a Milanese spirit.
        </p>
        <div className="max-w-2xl mx-auto space-y-4 text-neutral-700 leading-relaxed">
          <p className="italic text-sm">
            VESPER — Luxury Dining & Bar in Milan
          </p>
          <p>
            Renowned for its refined cuisine, Vesper blends confident flavors
            with a warm, softly lit atmosphere, offering a simple yet luxurious
            dining and bar experience in the heart of Milan.
          </p>
        </div>
        <div className="pt-6">
          <Link href="/reservations">
            <button className="inline-flex items-center gap-2 border border-neutral-800 px-8 py-3 text-sm uppercase tracking-wider bg-neutral-800 text-white cursor-pointer">
              RESERVE
              <span className="text-lg">→</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
