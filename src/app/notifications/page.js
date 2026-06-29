"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { listenNotifications, removeNotification } from "../config/fireBase";
import {
  FiArrowLeft,
  FiAtSign,
  FiHeart,
  FiMessageCircle,
  FiTrash2,
  FiUserPlus,
} from "react-icons/fi";

const iconMap = {
  follow: FiUserPlus,
  message: FiMessageCircle,
  "friend-request": FiUserPlus,
  "friend-accepted": FiHeart,
  mention: FiAtSign,
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = listenNotifications(setNotifications);
    return () => unsubscribe();
  }, []);

  return (
    <main className="simple-page premium-page">
      <section className="settings-card glass-panel">
        <Link href="/mainDashboard" className="ghost-button">
          <FiArrowLeft /> Back
        </Link>
        <h1>
          Notification <span className="gradient-text">radar</span>
        </h1>
        <div className="settings-list">
          {!notifications.length && (
            <div className="skeleton-stack">
              <div className="skeleton" style={{ width: "82%" }} />
              <div className="skeleton" style={{ width: "64%" }} />
              <p className="rail-muted">You are all caught up.</p>
            </div>
          )}
          {notifications.map((notification, index) => {
            const Icon = iconMap[notification.type] || FiAtSign;
            return (
              <motion.article
                className="notification-row"
                key={notification.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28, delay: Math.min(index * 0.03, 0.15) }}
              >
                <div className="post-author">
                  <div className="brand-mark">
                    <Icon />
                  </div>
                  <div>
                    <strong>{notification.title}</strong>
                    <span>{notification.body}</span>
                  </div>
                </div>
                <button
                  className="icon-button"
                  aria-label="Remove notification"
                  onClick={() => removeNotification(notification.id)}
                >
                  <FiTrash2 />
                </button>
              </motion.article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
