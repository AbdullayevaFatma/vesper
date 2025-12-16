import Image from "next/image";

export default function Gallery() {
  return (
    <section className="bg-neutral-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          <div className="relative aspect-4/3">
            <Image
              src="/gallery-1.jpg"
              alt="Vesper dining experience"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-4/3">
            <Image
              src="/gallery-2.jpg"
              alt="Vesper interior design"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-4/3">
            <Image
              src="/gallery-3.jpg"
              alt="Vesper bar details"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-4/3">
            <Image
              src="/interior.png"
              alt="Vesper lounge area"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-4/3">
            <Image
              src="/gallery-4.jpg"
              alt="Vesper entrance"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-4/3">
            <Image
              src="/dinner-3.jpg"
              alt="Vesper private dining"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}