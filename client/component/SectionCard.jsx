export default function SectionCard({ title, subtitle, children }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      <div className="bg-white border rounded-xl p-6">
        {children}
      </div>
    </section>
  );
}
