"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "../config/fireBase";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiShield, FiZap } from "react-icons/fi";
import { successToast, errorToast } from "@/utils/toast";

function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const notify = (message) =>
  //   toast(message, {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //   });

  const SignUpFunc = async (e) => {
    e.preventDefault();
    try {
      if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
        errorToast("Please fill all the fields");
        return;
      }
      await signUp({ name, email, password }, router);
      // successToast("Account created successfully!");
      // router.push("/mainDashboard");
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <main className="auth-page premium-page">
      <section className="auth-shell glass-panel">
        <div className="auth-visual">
          <span className="auth-kicker">
            <FiZap /> Creator-first social
          </span>
          <div>
            <h1>
              Build your <span className="gradient-text">signal</span>, not just
              a profile.
            </h1>
            <p>
              Luma turns posts, stories, messages, and community moments into a
              calm, expressive social workspace.
            </p>
          </div>
          <div className="auth-metrics">
            <div className="metric">
              <strong>48k</strong>
              <span>daily sparks</span>
            </div>
            <div className="metric">
              <strong>92%</strong>
              <span>faster sharing</span>
            </div>
            <div className="metric">
              <strong>24/7</strong>
              <span>secure sync</span>
            </div>
          </div>
        </div>
        <div className="auth-card">
          <div className="brand-mark">L</div>
          <h2>Join Luma Social</h2>
          <p>Create a luminous home for your ideas, friends, and moments.</p>
          <form className="auth-form">
            <input
              type="text"
              placeholder="Display name"
              className="field"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email address"
              className="field"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="field"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <ToastContainer /> */}
            <button onClick={SignUpFunc} className="primary-button">
              Create account <FiArrowRight />
            </button>
            <p className="auth-switch">
              Already have an account? <Link href="/login">Log in</Link>
            </p>
          </form>
          <p className="auth-switch">
            <FiShield /> Protected authentication powered by Firebase.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Signup;
