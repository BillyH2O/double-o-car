"use client";

import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ContactForm from "@/components/features/contact/ContactForm";

export default function Contact() {
  return (
    <div className="relative min-h-screen bg-linear-to-t from-black via-blue-950 to-black w-full flex flex-col items-center justify-between">
      <Navbar solid />
      <div className="mt-42 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
        <ContactForm />
      </div>
      <Footer />
    </div>
  )
}

