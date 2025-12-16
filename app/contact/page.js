// app/contact/page.jsx
import Address from "../components/Address";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Vesper, luxury dining & cocktails in Milan.",
};

export default function Contact() {
  return (
    <div className="bg-[#f7f4ef] py-40 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16 ">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-500 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          We'd love to hear from you. Reach out for reservations or inquiries.
        </p>
      </div>
      <Address />
    </div>
  );
}
