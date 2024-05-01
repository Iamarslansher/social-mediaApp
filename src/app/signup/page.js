"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "../config/fireBase";
import { useRouter } from "next/navigation";
import "./signUp.css";

function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignUpFunc = async (e) => {
    e.preventDefault();
    try {
      if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
        alert("Please fill all the fields");
        return;
      }
      await signUp({ name, email, password });
      router.push("/mainDashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="imageContainer">
            <img
              src="https://airproductionservice.com/wp-content/uploads/2021/05/Login.jpg"
              alt="Instagram"
              className="image"
            />
          </div>
          <div className="formContainer">
            <h2>Sign up for Instagram</h2>
            <form>
              <div className="formGroup">
                <input
                  type="text"
                  placeholder="Username"
                  className="inputField"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <input
                  type="email"
                  placeholder="Email"
                  className="inputField"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="formGroup">
                <input
                  type="password"
                  placeholder="Password"
                  className="inputField"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={SignUpFunc} className="btn">
                Sign Up
              </button>
              <p>
                Already have an account, <Link href="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
