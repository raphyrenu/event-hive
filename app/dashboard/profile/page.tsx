"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState<{ name: string; email: string; isAdmin: boolean } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        setUser(JSON.parse(storedUser));

    } else {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-5">Profile Page</h1>
      {user ? (
        <div className="bg-white p-5 rounded-md shadow-md">
          <h2 className="text-xl text-black font-bold">User Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default ProfilePage;
