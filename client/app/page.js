'use client'
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <>
    <button className="px-3 py-2 bg-black text-white" onClick={() => signIn("google")}>Google signin</button>
    </>
  );
}
