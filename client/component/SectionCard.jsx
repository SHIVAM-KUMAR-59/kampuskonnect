export default function SectionCard({ title, subtitle, children }) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="bg-white rounded-xl p-6">
        {children}
      </div>
    </section>
  );
}
