"use client";

export default function PageIntro({ title, subtitle }) {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-top-10 duration-500">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">{title}</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl font-light">{subtitle}</p>
      </div>
    </div>
  );
}
