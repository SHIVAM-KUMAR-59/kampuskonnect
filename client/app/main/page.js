export default function Home() {
  return (
    <main className="font-sans text-gray-800 overflow-x-hidden">

{/* ================= NAVBAR ================= */}
<nav className="w-full flex flex-col md:flex-row md:justify-between md:items-center px-4 md:px-10 py-4 bg-white shadow-sm">

  {/* Left: Logo + Divider + Title */}
  <div className="flex items-center gap-4 justify-center md:justify-start">
    <img
      src="/kiitformallogo.png"
      alt="KIIT Logo"
      className="h-10 md:h-[50px] w-auto"
    />

    <div className="h-8 md:h-10 w-px bg-gray-300"></div>

    <span className="text-green-600 font-semibold text-lg md:text-xl">
      Alumni Konnect
    </span>
  </div>

  {/* Right: Menu */}
  <ul className="w-full md:w-auto flex flex-wrap md:flex-nowrap justify-center md:justify-end items-center gap-4 md:gap-8 mt-3 md:mt-0 text-green-600 text-sm md:text-base font-medium">
    <li className="cursor-pointer hover:underline">Home</li>
    <li className="cursor-pointer hover:underline">Directory</li>
    <li className="cursor-pointer hover:underline">Events</li>
    <li className="cursor-pointer hover:underline">Login</li>
    <li className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 cursor-pointer">
      Sign Up
    </li>
  </ul>
</nav>

{/* ================= HERO SECTION ================= */}
<section
  className="relative min-h-[460px] md:min-h-[560px] bg-cover bg-center"
  style={{ backgroundImage: "url('/kiit.png')" }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

  <div className="relative z-10 h-full flex items-start pt-28 md:pt-36 px-6 md:px-14">
    <div className="max-w-xl text-white">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
        Connect with KIIT Alumni. <br /> Shape Your Career.
      </h1>

      <p className="text-gray-200 mb-6 text-sm sm:text-base">
        Discover alumni from your field of interest, seek guidance,
        and connect directly through secure messaging.
      </p>

      <button className="bg-green-600 px-6 py-2 rounded font-medium hover:bg-green-700">
        Explore Alumni
      </button>
    </div>
  </div>
</section>


{/* ================= STATS ================= */}
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

{/* ================= EXPLORE SECTION ================= */}
<section className="py-14 text-center px-4 md:px-6">
  <h2 className="text-2xl font-bold mb-2">
    Explore Alumni by Domain
  </h2>
  <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
    Browse alumni across engineering, management, research,
    entrepreneurship, higher studies, and more.
  </p>
</section>

{/* ================= STUDENT CONNECTION ================= */}
<section className="py-14 bg-gray-100 px-4 md:px-10">
  <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-start md:items-center">
    
    <div className="w-full md:w-1/2 h-48 bg-gray-300 rounded-lg"></div>

    <div className="w-full md:w-1/2">
      <h3 className="text-xl font-bold mb-3">
        Meaningful Student–Alumni Connections
      </h3>
      <p className="text-gray-600 text-sm sm:text-base">
        Students can directly interact with alumni, gain insights
        into career paths, placements, higher studies, and industry
        expectations through one-on-one conversations.
      </p>
    </div>
  </div>
</section>

{/* ================= DISTINGUISHED ALUMNI ================= */}
<section className="py-16 text-center px-4 md:px-10">
  <h2 className="text-2xl font-bold mb-8">
    Distinguished Alumni
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
    {[1,2,3,4].map((_, i) => (
      <div key={i} className="flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-300 rounded-full mb-2"></div>
        <p className="font-medium">Alumni Name</p>
        <p className="text-sm text-gray-600">Company / Role</p>
      </div>
    ))}
  </div>
</section>

{/* ================= CTA ================= */}
<section className="py-16 text-center bg-green-50 px-4 md:px-6">
  <h2 className="text-2xl font-bold mb-2">
    Build the Perfect Roadmap for Your Career
  </h2>
  <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
    Learn from alumni experiences, understand industry expectations,
    and make informed career decisions with confidence.
  </p>
  <button className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700">
    Start Connecting
  </button>
</section>

{/* ================= FOOTER ================= */}
<footer className="bg-green-600 text-white text-center py-4 text-sm">
  © 2026 Alumni Konnect | For KIIT Students & Alumni
</footer>

</main>
  );
}
