"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  auth,
  getCurrentProfile,
  listenPosts,
  listenUsers,
  updateprofile,
} from "../config/fireBase";
import {
  FiArrowLeft,
  FiCamera,
  FiCheckCircle,
  FiEdit3,
  FiGrid,
  FiHeart,
  FiImage,
  FiInfo,
  FiUsers,
} from "react-icons/fi";

const tabs = [
  ["Posts", FiGrid],
  ["Photos", FiImage],
  ["Friends", FiUsers],
  ["About", FiInfo],
];

import { errorToast } from "@/utils/toast";

const Profile = () => {
  const [updateProfile, setUpdateProfile] = useState("");
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("Posts");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("Design, Storytelling, Community");
  const [interests, setInterests] = useState(
    "Photography, Music, Creative tech",
  );

  useEffect(() => {
    getingProfile();
    const unsubscribeUsers = listenUsers(setUsers);
    const unsubscribePosts = listenPosts(setPosts);
    return () => {
      unsubscribeUsers();
      unsubscribePosts();
    };
  }, []);

  const getingProfile = async () => {
    try {
      const current = await getCurrentProfile();
      setProfile(current);
      setBio(current?.bio || "");
      setSkills((current?.skills || []).join(", "));
      setInterests((current?.interests || []).join(", "));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const myPosts = useMemo(
    () => posts.filter((post) => post.authorId === auth.currentUser?.uid),
    [posts],
  );

  const friends = useMemo(
    () => users.filter((user) => profile?.friends?.includes(user.uid)),
    [users, profile],
  );

  const profileUpdate = async () => {
    try {
      await updateprofile({
        updateProfile,
        bio,
        skills: skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        interests: interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });
      const current = await getCurrentProfile();
      console.log(current, "current user");
      setProfile(current);
    } catch (error) {
      errorToast("Failed to update profile.");
    }
  };

  const statItems = [
    ["Posts", myPosts.length],
    ["Followers", profile?.followers?.length || 0],
    ["Following", profile?.following?.length || 0],
    ["Friends", profile?.friends?.length || 0],
  ];
  // console.log(myPosts, "<-myPosts");
  return (
    <main className="profile-page premium-page">
      <motion.section
        className="profile-card glass-panel"
        style={{ width: "min(1180px, 100%)" }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/mainDashboard" className="ghost-button">
          <FiArrowLeft /> Back to feed
        </Link>
        <div className="profile-cover">
          <div className="profile-identity">
            <motion.img
              className="profile-avatar-xl"
              src={
                profile?.photo ||
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80"
              }
              alt={profile?.name || "Profile"}
              whileHover={{ scale: 1.05, rotate: -1 }}
            />
            <div>
              <h1>
                {profile?.name || "Luma Creator"}{" "}
                <span className="gradient-text">studio</span>
              </h1>
              <p className="rail-muted">
                {bio || "Creating moments worth gathering around."}
              </p>
              <div className="chip-list">
                {(profile?.skills || ["Design", "Community"]).map((skill) => (
                  <span className="chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          {statItems.map(([label, value]) => (
            <div className="stat-card" key={label}>
              <strong>{value}</strong>
              <span className="rail-muted">{label}</span>
            </div>
          ))}
        </div>

        <div className="tabs" role="tablist" aria-label="Profile sections">
          {tabs.map(([tab, Icon]) => (
            <button
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
            >
              <Icon /> {tab}
            </button>
          ))}
        </div>

        {activeTab === "Posts" && (
          <div className="profile-content-grid">
            {myPosts.length ? (
              myPosts.map((post) => (
                <article className="timeline-card" key={post.id}>
                  <strong>{post.description || "Untitled spark"}</strong>
                  <p className="rail-muted">{post.privacy || "Public"} post</p>
                </article>
              ))
            ) : (
              <article className="timeline-card">
                <strong>No posts yet</strong>
                <p className="rail-muted">
                  Your recent posts will appear here.
                </p>
              </article>
            )}
          </div>
        )}

        {activeTab === "Photos" && (
          <div className="profile-content-grid">
            {myPosts
              .flatMap((post) => post.media || [])
              .slice(0, 6)
              .map((media) => (
                <div className="gallery-tile" key={media.url}>
                  {media.type === "video" ? <FiCamera /> : <FiImage />}
                  <p className="rail-muted">{media.name || "Gallery item"}</p>
                </div>
              ))}
          </div>
        )}

        {activeTab === "Friends" && (
          <div className="profile-content-grid">
            {friends.length ? (
              friends.map((friend) => (
                <article className="people-card" key={friend.uid}>
                  <div className="people-card-header">
                    <span
                      className={`status-dot ${friend.online ? "online" : ""}`}
                    />
                    <img
                      className="avatar"
                      src={friend.photo}
                      alt={friend.name}
                    />
                    <div>
                      <strong>{friend.name}</strong>
                      <div className="rail-muted">Mutual creator</div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <article className="timeline-card">
                <strong>No friends yet</strong>
                <p className="rail-muted">
                  Accepted friend requests will show here.
                </p>
              </article>
            )}
          </div>
        )}

        {activeTab === "About" && (
          <div className="profile-content-grid">
            <article className="timeline-card">
              <h3>
                <FiHeart /> Bio
              </h3>
              <p className="rail-muted">{bio}</p>
              <div className="chip-list">
                {interests.split(",").map((interest) => (
                  <span className="chip" key={interest}>
                    {interest.trim()}
                  </span>
                ))}
              </div>
            </article>
            <article className="timeline-card">
              <h3>
                <FiEdit3 /> Edit profile
              </h3>
              <div className="composer-form">
                <input
                  className="field"
                  type="file"
                  name="profile"
                  accept="image/*"
                  onChange={(event) => setUpdateProfile(event.target.files[0])}
                />
                <textarea
                  className="field"
                  placeholder="Bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                />
                <input
                  className="field"
                  placeholder="Skills, comma separated"
                  value={skills}
                  onChange={(event) => setSkills(event.target.value)}
                />
                <input
                  className="field"
                  placeholder="Interests, comma separated"
                  value={interests}
                  onChange={(event) => setInterests(event.target.value)}
                />
                <button className="primary-button" onClick={profileUpdate}>
                  <FiCheckCircle /> Save profile
                </button>
              </div>
            </article>
          </div>
        )}
      </motion.section>
    </main>
  );
};

export default Profile;
