"use client";
import api from "@/utils/axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/user");
      setUser(response.data.user);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (status === "loading") {
    return <p>Loading..</p>;
  }

  if (status === "unauthenticated") {
    return <p>You are not logged in</p>;
  }
  console.log(session);

  return (
    <div>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        user && (
          <>
            <p>Name: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
            <Image src={session.user.image} alt="profile" width={100} height={100} />
            <button className="px-3 py-2 rounded-md bg-black text-white" onClick={() => signOut()}>
              Signout
            </button>
          </>
        )
      )}
    </div>
  );
};

export default Page;
