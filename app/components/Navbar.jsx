"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-extrabold tracking-widest text-primary-500"
          >
            VESPER
          </Link>
          <ul className="hidden md:flex items-center space-x-8 uppercase">
            <li>
              <Link
                href="/menu"
                className="cursor-pointer hover:text-primary-500 transition duration-500"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="cursor-pointer hover:text-primary-500 transition duration-500"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="cursor-pointer hover:text-primary-500 transition duration-500"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/reservations"
                className="cursor-pointer border border-primary-500 px-4 py-1 rounded hover:bg-primary-500  transition duration-500"
              >
                Reservation
              </Link>
            </li>
          </ul>
          {!open && (
            <button
              className="md:hidden text-3xl cursor-pointer z-50"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
          )}
          {open && (
            <button
              className="md:hidden absolute top-3 right-6 text-4xl text-white z-50"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          )}
        </div>
      </nav>
      <div
        className={`fixed inset-0 z-40 md:hidden
  flex flex-col justify-center items-center
  bg-black/80 backdrop-blur-lg
  transition-all duration-500 ease-out
  ${open ? "opacity-100 visible" : "opacity-0 invisible"}
  `}
      >
        <ul
          className={`flex flex-col space-y-8 text-center uppercase text-xl text-white
    transition-all duration-500 ease-out
    ${open ? "scale-100 blur-0" : "scale-95 blur-sm"}
    `}
        >
          <li
            className={`transition-all duration-500 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } delay-100`}
          >
            <Link href="/menu" onClick={() => setOpen(false)}>
              Menu
            </Link>
          </li>

          <li
            className={`transition-all duration-500 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } delay-200`}
          >
            <Link href="/gallery" onClick={() => setOpen(false)}>
              Gallery
            </Link>
          </li>
          <li
            className={`transition-all duration-500 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } delay-300`}
          >
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </li>
          <li
            className={`transition-all duration-500 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } delay-400`}
          >
            <Link
              href="/reservations"
              className="border border-primary-500 px-6 py-2 rounded hover:bg-primary-500 transition"
              onClick={() => setOpen(false)}
            >
              Reservation
            </Link>
          </li>
        </ul>
      </div>
      )
    </>
  );
}
