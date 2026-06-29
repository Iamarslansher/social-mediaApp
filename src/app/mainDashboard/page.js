"use client";
import React, { useEffect, useMemo, useState } from "react";
import Header from "../header/page";
import Navbar from "../navBar/page";
import SideBar from "../sideBar/page";
import Post from "../post/page";
import Link from "next/link";
import {
  followUser,
  listenFriendRequests,
  listenUsers,
  respondFriendRequest,
  updatePresence,
} from "../config/fireBase";
import { FiUserCheck, FiUserPlus, FiX } from "react-icons/fi";
function MainDashboard() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    updatePresence(true);
    const unsubscribeUsers = listenUsers(setUsers);
    const unsubscribeRequests = listenFriendRequests(setRequests);
    const markOffline = () => updatePresence(false);
    window.addEventListener("beforeunload", markOffline);
    return () => {
      unsubscribeUsers();
      unsubscribeRequests();
      window.removeEventListener("beforeunload", markOffline);
      updatePresence(false);
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return users
      .filter((user) =>
        normalized
          ? user.name?.toLowerCase().includes(normalized) ||
            user.email?.toLowerCase().includes(normalized)
          : true
      )
      .slice(0, 4);
  }, [query, users]);

  return (
    <main className="app-shell premium-page">
      <SideBar />
      <Header />
      <section className="feed-column">
        <div className="hero-composer glass-panel">
          <h1>
            Today&apos;s pulse, curated in{" "}
            <span className="gradient-text">living color</span>.
          </h1>
          <div className="composer-row">
            <img
              className="avatar"
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
              alt="Your profile"
            />
            <input
              className="field"
              placeholder="Share a spark, question, photo, or mood..."
            />
            <a className="primary-button" href="/addPost">
              New post
            </a>
          </div>
          <Navbar />
        </div>
        <Post />
      </section>
      <aside className="right-rail glass-panel">
        <section className="rail-section">
          <h3>Search / Discover</h3>
          <input
            className="field"
            placeholder="Find people"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {filteredUsers.map((user) => (
            <div className="rail-row" key={user.uid || user.id}>
              <div className="post-author">
                <span className={`status-dot ${user.online ? "online" : ""}`} />
                <img className="avatar" src={user.photo} alt={user.name} />
                <div>
                  <strong>{user.name}</strong>
                  <div className="rail-muted">
                    {user.online ? "Online now" : "Recently active"}
                  </div>
                </div>
              </div>
              <button
                className="icon-button"
                aria-label={`Follow ${user.name}`}
                onClick={() => followUser(user)}
              >
                <FiUserPlus />
              </button>
            </div>
          ))}
          <Link className="ghost-button" href="/people">
            Find more people
          </Link>
        </section>
        {!!requests.length && (
          <section className="rail-section">
            <h3>Friend requests</h3>
            {requests.map((request) => (
              <div className="rail-row" key={request.id}>
                <div className="post-author">
                  <img className="avatar" src={request.fromPhoto} alt={request.fromName} />
                  <div>
                    <strong>{request.fromName}</strong>
                    <div className="rail-muted">Wants to connect</div>
                  </div>
                </div>
                <div className="quick-actions">
                  <button
                    className="icon-button"
                    aria-label="Accept request"
                    onClick={() => respondFriendRequest(request, true)}
                  >
                    <FiUserCheck />
                  </button>
                  <button
                    className="icon-button"
                    aria-label="Reject request"
                    onClick={() => respondFriendRequest(request, false)}
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
        <section className="rail-section">
          <h3>Creator pulse</h3>
          <div className="sparkline" aria-hidden="true">
            <span style={{ height: "38%" }} />
            <span style={{ height: "72%" }} />
            <span style={{ height: "52%" }} />
            <span style={{ height: "84%" }} />
            <span style={{ height: "62%" }} />
            <span style={{ height: "92%" }} />
          </div>
        </section>
        <section className="rail-section">
          <h3>Trending rooms</h3>
          {["Design after dark", "Karachi creators", "AI studio notes"].map(
            (room) => (
              <div className="rail-row" key={room}>
                <div>
                  <strong>{room}</strong>
                  <div className="rail-muted">Live now</div>
                </div>
                <button className="ghost-button">Join</button>
              </div>
            )
          )}
        </section>
      </aside>
    </main>
  );
}

export default MainDashboard;
