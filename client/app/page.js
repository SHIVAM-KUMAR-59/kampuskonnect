"use client";

import React, { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import PrimaryButton from "@/component/PrimaryButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="font-sans text-gray-800 overflow-x-hidden">

      <nav className="w-full bg-white shadow-sm relative">
        <div className="flex justify-between items-center px-4 md:px-10 py-4">
          {/* Left: Logo + Divider + Title */}
          <div className="flex items-center gap-4">
            <Image
              height={50}
              width={150}
              src="/kiitformallogo.png"
              alt="KIIT Logo"
              className="h-10 md:h-[50px] w-auto"
            />

            <div className="h-8 md:h-10 w-px bg-gray-300"></div>

            <span className="text-green-600 font-semibold text-lg md:text-xl hidden sm:inline-block">
              Alumni Konnect
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 text-green-600 text-base font-medium">
            <li className="cursor-pointer hover:underline">Home</li>
            <li className="cursor-pointer hover:underline">Directory</li>
            <li className="cursor-pointer hover:underline">Events</li>
            <li>
              <Link href={"/auth/login"}>
                <PrimaryButton
                  text={
                    <div className="flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  }
                  classname="px-4 py-2 font-medium"
                />
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden text-green-600 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-4 py-4 text-green-600 text-base font-medium bg-white border-t border-gray-200">
            <li className="cursor-pointer hover:underline">Home</li>
            <li className="cursor-pointer hover:underline">Directory</li>
            <li className="cursor-pointer hover:underline">Events</li>
            <li>
              <Link href={"/auth/login"}>
                <PrimaryButton
                  text={
                    <div className="flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  }
                  classname="px-4 py-2 font-medium"
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <section
        className="relative min-h-[460px] md:min-h-[560px] bg-cover bg-center"
        style={{ backgroundImage: "url('/kiit.png')" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent"></div>

        <div className="relative z-10 h-full flex items-start pt-28 md:pt-36 px-6 md:px-14">
          <div className="max-w-xl text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
              Connect with KIIT Alumni. <br /> Shape Your Career.
            </h1>

            <p className="text-gray-200 mb-6 text-sm sm:text-base">
              Discover alumni from your field of interest, seek guidance, and connect directly
              through secure messaging.
            </p>

            <Link href={"/auth/login"}>
              <PrimaryButton
                text={
                  <div className="flex items-center justify-center gap-2">
                    Explore Alumni
                    <ArrowRight className="h-5 w-5" />
                  </div>
                }
                classname="px-6 py-3 font-medium text-lg"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center py-12 bg-gray-100 px-4">
        <div>
          <h2 className="text-3xl font-bold text-green-600">10K+</h2>
          <p className="mt-1">Students Connected</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-green-600">10K+</h2>
          <p className="mt-1">Verified Alumni</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-green-600">10K+</h2>
          <p className="mt-1">Messages Exchanged</p>
        </div>
      </section>

      <section className="py-14 text-center px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-2">Explore Alumni by Domain</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Browse alumni across engineering, management, research, entrepreneurship, higher studies,
          and more.
        </p>
      </section>

      <section className="py-14 bg-gray-100 px-4 md:px-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-start md:items-center">
          <div className="w-full md:w-1/2 h-48 bg-gray-300 rounded-lg"></div>

          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-bold mb-3">Meaningful Student–Alumni Connections</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Students can directly interact with alumni, gain insights into career paths,
              placements, higher studies, and industry expectations through one-on-one
              conversations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 text-center px-4 md:px-10">
        <h2 className="text-2xl font-bold mb-8">Distinguished Alumni</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full mb-2"></div>
              <p className="font-medium">Alumni Name</p>
              <p className="text-sm text-gray-600">Company / Role</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 text-center bg-green-50 px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-2">Build the Perfect Roadmap for Your Career</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
          Learn from alumni experiences, understand industry expectations, and make informed career
          decisions with confidence.
        </p>
        <Link href={"/auth/login"}>
          <PrimaryButton
            text={
              <div className="flex items-center justify-center gap-2">
                Start Connecting
                <ArrowRight className="h-5 w-5" />
              </div>
            }
            classname="px-8 py-3 font-medium text-lg mx-auto"
          />
        </Link>
      </section>

      <footer className="bg-green-600 text-white text-center py-4 text-sm">
        © 2026 Alumni Konnect | For KIIT Students & Alumni
      </footer>
    </main>
  );
}
