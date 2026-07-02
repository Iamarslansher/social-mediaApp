"use client";
import React, { useState } from "react";
import Link from "next/link";
import { logIn, loginWithFacebook } from "../config/fireBase";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { FiArrowRight, FiLock, FiRadio } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const loginFunc = async (e) => {
    e.preventDefault();
    try {
      if (email.trim() === "" || password.trim() === "") {
        notify("Please fill all the fields");
        return;
      }
      await logIn({ email, password });
      router.push("/mainDashboard");
    } catch (error) {
      notify(error.message);
    }
  };

  const faceBookLogin = async () => {
    try {
      await loginWithFacebook();
      router.push("/mainDashboard");
    } catch (error) {
      notify(error.message);
    }
  };

  return (
    <main className="auth-page premium-page">
      <section className="auth-shell glass-panel">
        <div className="auth-visual">
          <span className="auth-kicker">
            <FiRadio /> Live communities
          </span>
          <div>
            <h1>
              Step back into your{" "}
              <span className="gradient-text">creative orbit</span>.
            </h1>
            <p>
              Catch up on fresh posts, private threads, creator drops, and the
              people who make your feed feel alive.
            </p>
          </div>
          <div className="auth-metrics">
            <div className="metric">
              <strong>18</strong>
              <span>new stories</span>
            </div>
            <div className="metric">
              <strong>7</strong>
              <span>active rooms</span>
            </div>
            <div className="metric">
              <strong>3m</strong>
              <span>avg reply</span>
            </div>
          </div>
        </div>
        <div className="auth-card">
          <div className="brand-mark">L</div>
          <h2>Welcome back</h2>
          <p>Log in to your Luma account and continue the conversation.</p>
          <form className="auth-form">
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
            <ToastContainer />
            <button onClick={loginFunc} className="primary-button">
              Log in <FiArrowRight />
            </button>
            <div className="divider">or</div>
            <button
              type="button"
              onClick={faceBookLogin}
              className="secondary-button"
            >
              <FaFacebook /> Continue with Facebook
            </button>
          </form>
          <p className="auth-switch">
            <FiLock /> New here? <Link href="/signup">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
