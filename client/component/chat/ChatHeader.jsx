import { ArrowLeft } from "lucide-react";

export default function ChatHeader({ user, onBack }) {
  return (
    <div className="border-b bg-white p-4 flex items-center gap-3">
      <button onClick={onBack} className="lg:hidden">
        <ArrowLeft />
      </button>
      {/* <img src={user.profileImage || "/default-avatar.png"} className="w-10 h-10 rounded-full" /> */}
      <div>
        <h2 className="font-semibold">{"Hii"}</h2>
        <p className="text-sm text-gray-500">{"cnsd"}</p>
      </div>
    </div>
  );
}
