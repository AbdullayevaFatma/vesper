"use client"

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });


export default function Address() {
  return (
    <section className="bg-[#f7f4ef] py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
       <Map/>
        <div className="text-neutral-800 flex flex-col items-center lg:items-start">
          <h2 className="text-sm uppercase tracking-widest mb-4">Visit Us</h2>
          <h3 className="text-4xl mb-6">
            <span className="text-primary-500 font-bold">Vesper</span>{" "}
            <span className="italic">Milano</span>
          </h3>
          <p className="mb-8 text-lg leading-relaxed max-w-md text-center lg:text-left">
            An intimate luxury restaurant & bar located in the heart of Milan.
          </p>
          <div className="space-y-4 text-center lg:text-left">
            <p>
              <span className="font-medium">Address</span>
              <br />
              Via Monte Napoleone 12, 20121 Milano
            </p>
            <p>
              <span className="font-medium">Phone</span>
              <br />
              +39 02 9876 5432
            </p>
            <p>
              <span className="font-medium">Email</span>
              <br />
              info@vesper.it
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
