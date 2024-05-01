// ProfileChangePage.js
"use client";
import React, { useState } from "react";
import { updateprofile } from "../config/fireBase";
import { useRouter } from "next/navigation";
import "./profile.css";

const Profile = () => {
  const router = useRouter();
  const [updateProfile, setUpdateProfile] = useState("");

  const profile = async () => {
    try {
      await updateprofile({ updateProfile });
      router.push("/mainDashboard");
    } catch (error) {
      console.log(error.message);
    }
    console.log(updateProfile);
  };

  return (
    <div className="container">
      <div
        className="sub_container"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          height: "100vh",
          width: "100vw",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "50px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
            fontFamily: "sans-serif",
            textShadow: "2px 2px 4px #000000",
          }}
        >
          Profile Change
        </h1>
        <div>
          <img
            className="profileImg"
            src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/camera-512.png"
          />
          <div>
            <input
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
              }}
              type="file"
              name="profile"
              onChange={(e) => setUpdateProfile(e.target.files[0])}
            />
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                marginLeft: "20px",
              }}
              onClick={profile}
            >
              Change Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
