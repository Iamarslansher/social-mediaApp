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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProfile, logout } from "../config/fireBase";

import { CiBookmarkPlus } from "react-icons/ci";
import { IoSettings } from "react-icons/io5";
import { MdHelpOutline, MdMessage } from "react-icons/md";
import { IoMdLogOut, IoMdNotificationsOutline } from "react-icons/io";
import { FiActivity } from "react-icons/fi";

const SideBar = () => {
  const router = useRouter();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    getProfileFirebase();
  }, []);

  const getProfileFirebase = async () => {
    const pfile = await getProfile();
    setProfile(pfile);
    // console.log(pfile);
  };

  return (
    <aside className="sidebar glass-panel">
      <Link href="/mainDashboard" className="sidebar-brand">
        <div className="brand-mark">L</div>
        {/* <img src={logo.src} alt="Logo" className="brand-mark" /> */}
        <div>
          <strong>Luma</strong>
          <span>Social OS</span>
        </div>
      </Link>
      <Link href="/profile" className="profile-chip">
        <img
          className="avatar"
          src={
            profile[0]?.image ||
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
          }
          alt="Profile"
        />
        <div>
          <strong>Your studio</strong>
          <span>Update profile</span>
        </div>
      </Link>
      <ul className="sidebar-list">
        <li>
          <Link className="nav-link active" href="/mainDashboard">
            <FaHome />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/people">
            <FaSearch />
            <span>Explore</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/addPost">
            <FaPlusSquare />
            <span>New post</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/notifications">
            <IoMdNotificationsOutline />
            <span>Notifications</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/messages">
            <MdMessage />
            <span>Messages</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/profile">
            <FaUser />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/settings">
            <IoSettings />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <button className="nav-link" type="button">
            <FaHeart />
            <span>Activity</span>
          </button>
        </li>
        <li>
          <button className="nav-link" type="button">
            <CiBookmarkPlus />
            <span>Bookmarks</span>
          </button>
        </li>
        <li>
          <button className="nav-link" type="button">
            <MdHelpOutline />
            <span>Help</span>
          </button>
        </li>
        <li>
          <button
            className="nav-link"
            type="button"
            onClick={async () => logout(router)}
          >
            <IoMdLogOut />
            <span>Log out</span>
          </button>
        </li>
      </ul>
      <div className="sidebar-footer">
        <FiActivity />
        <p>Your creator score is up 18% this week.</p>
        <button className="ghost-button">View insights</button>
      </div>
    </aside>
  );
};

export default SideBar;
