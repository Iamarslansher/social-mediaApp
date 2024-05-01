"use client";
import React, { useState } from "react";
import Link from "next/link";
import { logIn, loginWithFacebook } from "../config/fireBase";
import { useRouter } from "next/navigation";
import "./login.css";

import { FaFacebook } from "react-icons/fa";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFunc = async (e) => {
    e.preventDefault();
    try {
      if (email.trim() === "" || password.trim() === "") {
        alert("Please fill all the fields");
        return;
      }
      await logIn({ email, password });
      router.push("/mainDashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const faceBookLogin = async () => {
    try {
      await loginWithFacebook();
      router.push("/mainDashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="imageContainer">
          <img
            src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg"
            alt="Instagram"
            className="image"
          />
        </div>
        <div className="formContainer">
          <h2>Welcome back to Instagram</h2>

          <form>
            <input
              type="text"
              placeholder="Username or Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={loginFunc} className="btn">
              Log in
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                marginBottom: "10px",
                fontSize: "20px",
                border: "1px solid lightgray",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                background: "lightblue",
              }}
            >
              Login with <FaFacebook onClick={faceBookLogin} />
            </div>
          </form>
          <p>Forgot password?</p>
          <div className="separator">
            <span
              style={{
                color: "black",
                fontWeight: "600",
                fontSize: "20px",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              OR
            </span>
          </div>
          <button className="createAccount">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "600",
              }}
              href="/signup"
            >
              Create New Account
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
