import Image from "next/image";
import PrimaryButton from "@/component/PrimaryButton";

export default function ProfileCard({
  user,
  variant = "request", // "request" | "active"
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex gap-4 items-start hover:shadow-md transition">
      
      {/* Avatar */}
      <Image
        src={user.image || "/avatar.png"}
        alt={user.name}
        width={52}
        height={52}
        className="rounded-full ring-2 ring-green-500/20"
      />

      {/* Content */}
      <div className="flex-1">
        <h4 className="font-semibold text-neutral-800 leading-tight">
          {user.name}
        </h4>

        <p className="text-sm text-neutral-500">
          {user.branch} • Batch of {user.passoutYear}
        </p>

        <p className="text-xs text-neutral-400 mt-0.5">
          {user.designation}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {user.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-xs bg-green-50 text-green-700 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          {variant === "request" ? (
            <PrimaryButton
              text="Accept Request"
              classname="px-4 py-1.5 text-sm"
            />
          ) : (
            <PrimaryButton
              text="Message"
              classname="px-4 py-1.5 text-sm"
            />
          )}

          <button className="px-4 py-1.5 text-sm rounded-xl border border-green-600 text-green-600 hover:bg-green-50 transition">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
