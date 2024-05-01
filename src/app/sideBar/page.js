// Sidebar.js
"use client";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaSearch,
  FaPlusSquare,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import "./sideBar.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProfile, logout } from "../config/fireBase";

import { MdMessage } from "react-icons/md";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoSettings } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdHelpOutline } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

const SideBar = () => {
  const router = useRouter();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    getProfileFirebase();
  });

  const getProfileFirebase = async () => {
    const pfile = await getProfile();
    setProfile(pfile);
    // console.log(pfile);
  };

  const logOut = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      <div className="sidebar">
        <ul className="sidebarList">
          <li>
            <Link
              href="/profile"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {!profile ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
                  alt=""
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              ) : (
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={profile[0]?.image}
                />
              )}
              {/* <FaUser /> */}
              <span className="custom">Profile</span>
            </Link>
          </li>
          <li>
            <FaHome />
            <span className="custom">Home</span>
          </li>
          <li>
            <FaSearch />
            <span className="custom">Explore</span>
          </li>
          <li>
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              href="/addPost"
            >
              <FaPlusSquare />
              <span className="custom">New Post</span>
            </Link>
          </li>
          <li>
            <FaHeart />
            <span className="custom">Activity</span>
          </li>

          <li>
            <IoMdNotificationsOutline />
            <span className="custom">Notifications</span>
          </li>
          <li>
            <MdMessage />
            <span className="custom">Messages</span>
          </li>
          <li>
            <CiBookmarkPlus />
            <span className="custom">Bookmarks</span>
          </li>
          <li>
            <IoSettings />
            <span className="custom">Settings</span>
          </li>
          <li>
            <MdHelpOutline />
            <span className="custom">Help</span>
          </li>
          <li>
            <IoMdLogOut onClick={logOut} />
            <span className="custom">Log out</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
