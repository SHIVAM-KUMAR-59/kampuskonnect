"use client";

export default function SectionCard({ title, subtitle, children, classname }) {
  return (
    <section
      className={`space-y-6 animate-in fade-in slide-in-from-top-10 duration-500 ${classname}`}
    >
      <div className="animate-in fade-in duration-500 delay-100">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="text-base text-gray-600 mt-2 max-w-3xl font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div
        className={`bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-200 hover:border-green-300 hover:shadow-lg animate-in fade-in delay-200 ${classname}`}
      >
        <div className="relative">{children}</div>
      </div>
    </section>
  );
}
