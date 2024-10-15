"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import googleIcon from "../assets/images/google-icon.png";
import login from '../assets/images/login.png';
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

const Page = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("https://eventhive-unyb.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user name, email, isAdmin status, and token to local storage
        localStorage.setItem(
          "user",
          JSON.stringify({ name: data.name, email: data.email, isAdmin: data.isAdmin, token: data.token })
        );

        // Set user info state to display after login
        setUserInfo({ name: data.name, email: data.email });

        router.push("/dashboard");
      } else {
        setErrorMessage(data.error);
      }
    } catch {
      setErrorMessage("An error occurred while logging in.");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In clicked!");
  };

  // Check local storage on component mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserInfo({ name: parsedUser.name, email: parsedUser.email });
    }
  }, []);

  return (
    <div className="flex flex-row items-center justify-between min-h-screen bg-background h-screen text-foreground">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="font-bold text-3xl">
          Event <span className="text-primary">Hive</span>
        </h2>
        <h1 className="lg:text-4xl text-3xl md:text-4xl font-bold mb-12 mt-10">
          Sign Up to Event Hive
        </h1>

        <form
          className="lg:w-3/5 w-full bg-transparent px-20 flex items-center justify-center flex-col rounded-md shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="w-full uppercase placeholder:opacity-70">
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                style={{ width: "100%" }}
                className="mt-1 py-4 px-3 rounded-md mb-5 text-black outline-none"
              />
            </div>
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-sm font-bold mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                style={{ width: "100%" }}
                className="mt-1 py-4 px-3 rounded-md mb-5 text-black outline-none"
              />
              <span
                onClick={handleTogglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "48px",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <FaEyeSlash size={25} color="black" />
                ) : (
                  <FaEye size={25} color="black" />
                )}
              </span>
            </div>
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            type="submit"
            style={{
              color: "#fff",
              border: "none",
            }}
            className="px-20 py-3 bg-primary mb-5 text-black outline-none rounded-md"
          >
            Login
          </button>
        </form>
        {userInfo && (
          <div className="mt-4">
            <p>Welcome, {userInfo.name}!</p>
            <p>Your email: {userInfo.email}</p>
          </div>
        )}
        or
        <button
          onClick={handleGoogleSignIn}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "4px 50px",
            cursor: "pointer",
            marginTop: "30px",
          }}
          className="google-btn text-black rounded-md"
        >
          <img src={googleIcon.src} alt="Google Icon" style={{ width: "40px" }} />
          <span>Sign Up with Google</span>
        </button>
      </div>
      <div
        className="bg-no-repeat hidden font-bayon md:flex lg:flex flex-col items-center justify-center w-5/12 bg-center bg-cover h-full space-x-8 bg-opacity-100"
        style={{ backgroundImage: `url(${login.src})` }}
      >
        <h1 className="text-5xl mb-10">Hello Friend</h1>
        <p className="mb-10">
          To keep connected with us provide us with your information
        </p>
        <Link href="/signup">
          <button className="bg-gray-500 px-10 py-3 rounded-md text-xl">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
