import { Geist, Geist_Mono,Jost } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import "leaflet/dist/leaflet.css";
import Footer from "./components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["400", "500", "700"], 
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: {
    template: "%s | VESPER",
    default: "Welcome | VESPER",
  },
  description: "Experience luxury dining and exquisite cocktails in the heart of Milan.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};



export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jost.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar/>
        <main className="flex-1">{children}</main>
      
        <Footer/>
      </body>
    </html>
  );
}
