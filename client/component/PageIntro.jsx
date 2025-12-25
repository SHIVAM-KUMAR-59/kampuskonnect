export default function PageIntro({ title, subtitle }) {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
}
