import { getAvatar } from "@/utils/util";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function ChatHeader({ user, onBack }) {
  return (
    <div className="border-b bg-white p-4 flex items-center gap-3">
      <button onClick={onBack} className="lg:hidden">
        <ArrowLeft />
      </button>
      {user.profileImage ? (
        <Image
          height={48}
          width={48}
          alt="profile"
          src={user.profileImage || "/default-avatar.png"}
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <p className="w-8 h-8 xl:w-10 xl:h-10 p-2 rounded-full bg-green-50 border border-green-300 flex items-center justify-center text-green-700 font-bold">
          {getAvatar(user.name)}
        </p>
      )}
      <div>
        <h2 className="font-semibold">{user.name}</h2>
        {/* <p className="text-sm text-gray-500">{"cnsd"}</p> */}
      </div>
    </div>
  );
}
