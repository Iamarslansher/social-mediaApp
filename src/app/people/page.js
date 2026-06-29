"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  followUser,
  listenFriendRequests,
  listenUsers,
  respondFriendRequest,
  sendFriendRequest,
  unfollowUser,
  updatePresence,
} from "../config/fireBase";
import {
  FiArrowLeft,
  FiSearch,
  FiUserCheck,
  FiUserMinus,
  FiUserPlus,
  FiX,
} from "react-icons/fi";

export default function People() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    updatePresence(true);
    const unsubscribeUsers = listenUsers(setUsers);
    const unsubscribeRequests = listenFriendRequests(setRequests);
    return () => {
      unsubscribeUsers();
      unsubscribeRequests();
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) =>
      query
        ? user.name?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user.skills?.join(" ").toLowerCase().includes(query)
        : true
    );
  }, [search, users]);

  return (
    <main className="simple-page premium-page">
      <section className="settings-card glass-panel" style={{ width: "min(1180px, 100%)" }}>
        <Link href="/mainDashboard" className="ghost-button">
          <FiArrowLeft /> Back to dashboard
        </Link>
        <div className="post-header">
          <div>
            <h1>
              Find <span className="gradient-text">people</span>
            </h1>
            <p className="rail-muted">
              Search creators, send friend requests, follow updates, and see
              who is active right now.
            </p>
          </div>
          <div className="search-box" style={{ minWidth: 280 }}>
            <FiSearch />
            <input
              className="field"
              placeholder="Search people, skills, interests"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        {!!requests.length && (
          <section className="rail-section" style={{ marginBottom: 16 }}>
            <h3>Friend requests</h3>
            {requests.map((request) => (
              <div className="rail-row" key={request.id}>
                <div className="post-author">
                  <img className="avatar" src={request.fromPhoto} alt={request.fromName} />
                  <div>
                    <strong>{request.fromName}</strong>
                    <span>Sent you a request</span>
                  </div>
                </div>
                <div className="quick-actions">
                  <button
                    className="secondary-button"
                    onClick={() => respondFriendRequest(request, true)}
                  >
                    <FiUserCheck /> Accept
                  </button>
                  <button
                    className="ghost-button"
                    onClick={() => respondFriendRequest(request, false)}
                  >
                    <FiX /> Reject
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        <div className="people-grid">
          {filteredUsers.map((user, index) => (
            <motion.article
              className="people-card"
              key={user.uid || user.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.2) }}
            >
              <div className="people-card-header">
                <span className={`status-dot ${user.online ? "online" : ""}`} />
                <img className="avatar" src={user.photo} alt={user.name} />
                <div>
                  <strong>{user.name}</strong>
                  <div className="rail-muted">{user.email || "Luma creator"}</div>
                </div>
              </div>
              <p className="rail-muted">{user.bio || "Sharing bright ideas on Luma."}</p>
              <div className="chip-list">
                {(user.skills || ["Creator", "Community"]).slice(0, 4).map((skill) => (
                  <span className="chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
              <div className="quick-actions">
                <button className="primary-button" onClick={() => sendFriendRequest(user)}>
                  <FiUserPlus /> Add friend
                </button>
                <button className="secondary-button" onClick={() => followUser(user)}>
                  <FiUserCheck /> Follow
                </button>
                <button className="ghost-button" onClick={() => unfollowUser(user)}>
                  <FiUserMinus /> Unfollow
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
