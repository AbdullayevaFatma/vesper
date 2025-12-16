"use client";

import { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

export default function Footer() {
    const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let data = {};
      try {
        data = await res.json(); // Backend JSON parse
      } catch (err) {
        console.error("Failed to parse JSON:", err);
      }

      if (!res.ok) {
        setMessage(data?.error || "Something went wrong. Try again.");
        setMessageType("error");
      } else {
        setMessage(data.message || "Successfully subscribed!");
        setMessageType("success");
        setEmail(""); // inputu temizle
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Something went wrong. Try again.");
      setMessageType("error");
    }

    setLoading(false);
  };


  return (
    <footer className="bg-neutral-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold tracking-widest text-primary-500 uppercase">
            Vesper
          </h2>
          <p className="text-gray-400 mt-2 max-w-sm">
            An intimate luxury restaurant & bar offering the finest dining
            experience.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a href="#" className="hover:text-primary-500 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-primary-500 transition-colors">
              <FaTiktok size={20} />
            </a>
            <a href="#" className="hover:text-primary-500 transition-colors">
              <FaFacebookF size={20} />
            </a>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right gap-4">
          <h3 className="text-xl font-semibold text-primary-500 uppercase">
            Subscribe to our Newsletter
          </h3>
          <p className="text-gray-400 max-w-md">
            Get the latest updates, promotions and events directly in your
            inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md w-full">
            <input
              className="flex-1 px-4 py-3 rounded-md border border-gray-700 bg-neutral-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <button type="submit" disabled={loading} className="px-6 py-3 bg-primary-500 text-white rounded-md cursor-pointer uppercase">
              Subscribe
            </button>
          </form>
           {message && (
            <p className="text-sm mt-2 text-center md:text-right text-gray-300">
              {message}
            </p>
          )}
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Vesper. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-primary-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
