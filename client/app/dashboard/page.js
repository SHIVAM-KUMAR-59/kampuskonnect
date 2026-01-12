"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="p-6">Loading...</p>;
  if (status === "unauthenticated")
    return <p className="p-6">You are not logged in</p>;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <Image
            src="/kiit-logo.png"
            alt="KIIT"
            width={40}
            height={40}
          />
          <span className="font-semibold text-green-700">
            Alumni Konnect
          </span>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <span className="text-green-600">Home</span>
          <span>Directory</span>
          <span>Events</span>
        </nav>

        <Image
          src={session?.user?.image || "/avatar.png"}
          alt="profile"
          width={36}
          height={36}
          className="rounded-full"
        />
      </header>

      {/* ================= CONTENT ================= */}
      <section className="px-6 py-8 flex-1">
        {/* Greeting */}
        <h2 className="text-sm text-gray-500">HELLO</h2>
        <h1 className="text-2xl font-bold text-green-600 mb-1">
          {session?.user?.name}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Find Mentors • Connect • Grow
        </p>

        {/* ================= QUICK CARDS ================= */}
        <h3 className="font-semibold text-green-700 mb-4">
          Everything you need right at your fingertips
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 shadow-sm"
            >
              <h4 className="font-semibold mb-1">Card Title</h4>
              <p className="text-sm text-gray-500">
                Some description text goes here
              </p>
            </div>
          ))}
        </div>

        {/* ================= FIND & CONNECT ================= */}
        <h3 className="font-semibold text-green-700 mb-4">
          Find and Connect
        </h3>

        <input
          type="text"
          placeholder="Search people"
          className="w-full border rounded-md px-4 py-2 mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/avatar.png"
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Rahul Gupta</h4>
                  <p className="text-xs text-gray-500">
                    Software Engineer at Amazon
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                  Connect
                </button>
                <button className="text-xs px-3 py-1 rounded-full border">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-green-600 text-white px-6 py-6">
        <p className="text-sm font-semibold mb-2">Get in touch</p>
        <p className="text-xs">KIIT University, Bhubaneswar</p>
        <p className="text-xs">support@kiit.ac.in</p>
      </footer>
    </main>
  );
}

