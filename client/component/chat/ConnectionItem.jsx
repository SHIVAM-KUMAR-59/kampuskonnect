import { getAvatar } from "@/utils/util";
import Image from "next/image";

export default function ConnectionItem({ user, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
    >
      {user.profileImage ? (
        <Image
          alt="profile"
          src={user.profileImage}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <p className="w-8 h-8 xl:w-10 xl:h-10 p-2 rounded-full bg-green-50 border border-green-300 flex items-center justify-center text-green-700 font-bold">
          {getAvatar(user.name)}
        </p>
      )}
      <div className="text-left">
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </button>
  );
}
