"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Page = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading..</p>;
  }

  if (status === "unauthenticated") {
    return <p>You are not logged in</p>;
  }
  console.log(session);
  return (
    <div>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <Image src={session.user.image} alt="profile" width={100} height={100} />
      <button className="px-3 py-2 rounded-md bg-black text-white" onClick={() => signOut()}>
        Signout
      </button>
    </div>
  );
};

export default Page;
