"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  auth,
  listenMessages,
  listenUsers,
  sendMessage,
  updatePresence,
} from "../config/fireBase";
import { FiArrowLeft, FiMic, FiPhone, FiSearch, FiSend, FiVideo } from "react-icons/fi";

export default function Messages() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    updatePresence(true);
    const unsubscribeUsers = listenUsers((nextUsers) => {
      setUsers(nextUsers);
      setSelectedUser((current) => current || nextUsers[0] || null);
    });
    return () => unsubscribeUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser?.uid) return undefined;
    const unsubscribeMessages = listenMessages(selectedUser.uid, setMessages);
    return () => unsubscribeMessages();
  }, [selectedUser]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) =>
      query ? user.name?.toLowerCase().includes(query) : true
    );
  }, [search, users]);

  const submitMessage = async (event) => {
    event.preventDefault();
    if (!selectedUser) return;
    await sendMessage(selectedUser, message);
    setMessage("");
  };

  return (
    <main className="simple-page premium-page">
      <section className="simple-page-grid">
        <aside className="settings-card glass-panel">
          <Link href="/mainDashboard" className="ghost-button">
            <FiArrowLeft /> Back
          </Link>
          <h1>
            Live <span className="gradient-text">messages</span>
          </h1>
          <div className="search-box">
            <FiSearch />
            <input
              className="field"
              placeholder="Search friends"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          {filteredUsers.map((user) => (
            <button
              className="message-row"
              key={user.uid || user.id}
              onClick={() => setSelectedUser(user)}
            >
              <div className="post-author">
                <span className={`status-dot ${user.online ? "online" : ""}`} />
                <img className="avatar" src={user.photo} alt={user.name} />
                <div>
                  <strong>{user.name}</strong>
                  <span>{user.online ? "Online" : "Offline"}</span>
                </div>
              </div>
            </button>
          ))}
        </aside>
        <section className="settings-card glass-panel chat-panel">
          <div className="post-header">
            <div className="post-author">
              {selectedUser && (
                <img className="avatar" src={selectedUser.photo} alt={selectedUser.name} />
              )}
              <div>
                <h1>{selectedUser?.name || "Choose a conversation"}</h1>
                <p className="rail-muted">
                  {selectedUser?.online ? "Active now" : "Messages sync in real time"}
                </p>
              </div>
            </div>
            <div className="quick-actions">
              <button className="icon-button" aria-label="Start voice call">
                <FiPhone />
              </button>
              <button className="icon-button" aria-label="Start video call">
                <FiVideo />
              </button>
            </div>
          </div>
          <div className="chat-stream">
            {!messages.length && (
              <div className="skeleton-stack">
                <div className="skeleton" style={{ width: "70%" }} />
                <div className="skeleton" style={{ width: "52%" }} />
                <p className="rail-muted">No messages yet. Start the conversation.</p>
              </div>
            )}
            {messages.map((item) => (
              <motion.div
                className={`chat-bubble ${
                  item.from === auth.currentUser?.uid ? "mine" : ""
                }`}
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {item.text}
              </motion.div>
            ))}
          </div>
          <form className="composer-row" onSubmit={submitMessage}>
            <button className="icon-button" type="button" aria-label="Record voice note">
              <FiMic />
            </button>
            <input
              className="field"
              placeholder="Write a thoughtful reply"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button className="primary-button" type="submit">
              <FiSend /> Send
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
