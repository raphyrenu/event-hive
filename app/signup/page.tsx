"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import register from "../assets/images/register.png";
import googleIcon from "../assets/images/google-icon.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Page() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordTooShortError, setPasswordTooShortError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password" && value.length >= 6) {
      setPasswordTooShortError(false);
    }

    if (name === "confirmPassword") {
      setPasswordMatchError(formData.password !== value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setPasswordTooShortError(true);
      return;
    }

    if (!passwordMatchError && formData.password.length >= 6) {
      try {
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          router.push("/login");
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    }
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In clicked!");
  };

  return (
    <div className="flex flex-row bg-hero h-screen bg-background">
      <div
        className="bg-no-repeat bg-opacity-45 hidden font-bayon md:flex lg:flex flex-col items-center justify-center w-5/12 bg-center bg-cover h-full space-x-8"
        style={{ backgroundImage: `url(${register.src})` }}
      >
        <h1 className="text-5xl mb-10">Welcome Back</h1>
        <p className="mb-10">
          To keep connected with us provide us with your information
        </p>
        <Link href="/login">
          <button className="bg-gray-500 px-10 py-3 rounded-md text-xl">
            Signin
          </button>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center flex-col">
        <h2 className="font-bold text-3xl">
          Event <span className="text-primary">Hive</span>
        </h2>
        <h1 className="lg:text-4xl text-3xl md:text-4xl font-bold mb-12 mt-10">
          Sign Up to Event Hive
        </h1>
        <form className="w-3/5 flex items-center flex-col" onSubmit={handleSubmit}>
          <div className="w-full uppercase placeholder:opacity-70">
            <div style={{ marginBottom: "10px" }}>
              <label>Your name</label>
              <br />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                style={{ width: "100%" }}
                className="mt-1 py-4 px-3 rounded-md mb-5 text-black outline-none"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Email</label>
              <br />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                style={{ width: "100%" }}
                className="mt-1 py-4 px-3 rounded-md mb-5 text-black outline-none"
              />
            </div>
            <div style={{ marginBottom: "10px", position: "relative" }}>
              <label>Password</label>
              <br />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                style={{ width: "100%" }}
                className="mt-1 py-4 px-3 rounded-md mb-5 text-black outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "47px",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <FaEyeSlash color="black" size={25} />
                ) : (
                  <FaEye color="black" size={25} />
                )}
              </span>
              {passwordTooShortError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  Password must be at least 6 characters long!
                </span>
              )}
            </div>
            <div style={{ marginBottom: "10px", position: "relative" }}>
              <label>Confirm Password </label>

              {passwordMatchError && (
                <span
                  style={{
                    color: "red",
                    marginBottom: "10px",
                    right: "4px",
                    position: "absolute",
                  }}
                >
                  Passwords do not match!
                </span>
              )}
              <br />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                style={{ width: "100%" }}
                className="mt-1 py-4 px-3 rounded-md mb-5 text-black outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "47px",
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
          <button
            type="submit"
            disabled={passwordMatchError}
            style={{
              color: "#fff",
              border: "none",
              cursor: passwordMatchError ? "not-allowed" : "pointer",
            }}
            className="px-20 py-3 bg-primary mb-5 text-black outline-none rounded-md"
          >
            Sign Up
          </button>
        </form>

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
    </div>
  );
}

export default Page;
