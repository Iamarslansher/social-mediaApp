// PostCard.js
"use client";
import React, { useState, useEffect } from "react";
import { getFacebookProfile, listenPosts } from "../config/fireBase";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiMessageCircle,
  FiMoreHorizontal,
  FiSend,
  FiEyeOff,
  FiBookmark,
  FiRepeat,
  FiLink,
  FiBellOff,
  FiFlag,
  FiUserX,
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PostCard = () => {
  const [posts, setosts] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [profile, setProfile] = useState("");
  const [localProfile, setLocalProfile] = useState("");

  // useEffect(() => {
  //   getPrfile();
  //   LocalProfile();
  //   const unsubscribe = listenPosts(setosts);
  //   return () => unsubscribe();
  // }, []);

  const getPrfile = async () => {
    const pfile = await getFacebookProfile();
    setProfile(pfile);
  };
  const LocalProfile = async () => {
    const pfile = await getProfile();
    setLocalProfile(pfile);
    console.log(pfile, "loal");
  };

  return (
    <>
      {!posts.length ? (
        <div className="skeleton-stack glass-panel">
          <div className="skeleton" style={{ width: "42%", height: 18 }} />
          <div className="skeleton" style={{ height: 320, borderRadius: 24 }} />
          <div className="skeleton" style={{ width: "76%" }} />
          <div className="feed-empty">
            <h2>Ready for your first spark?</h2>
            <p className="rail-muted">
              Create a post to turn this feed into a living timeline.
            </p>
            <a className="primary-button" href="/addPost">
              Create post
            </a>
          </div>
        </div>
      ) : (
        posts.map((post, index) => {
          return (
            <motion.article
              className="post-card glass-panel"
              key={post.id || index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: Math.min(index * 0.04, 0.18),
              }}
            >
              <div className="post-header">
                <div className="post-author">
                  <img
                    className="avatar"
                    src={
                      post.authorPhoto ||
                      localProfile[0]?.image ||
                      profile[0]?.photo ||
                      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    }
                    alt="Post author"
                  />
                  <div>
                    <strong>
                      {post.authorName || profile[0]?.name || "Luma Creator"}
                    </strong>
                    <span>{post.privacy || "Public"} spark</span>
                  </div>
                </div>
                <div style={{ position: "relative" }}>
                  <button
                    className="icon-button"
                    aria-label="More post options"
                    onClick={() =>
                      setOpenMenu(openMenu === index ? null : index)
                    }
                  >
                    <FiMoreHorizontal />
                  </button>
                  {openMenu === index && (
                    <div
                      className="post-menu glass-panel"
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "2.4rem",
                        zIndex: 30,
                      }}
                    >
                      <ul
                        style={{
                          listStyle: "none",
                          margin: 0,
                          padding: "8px 0",
                        }}
                      >
                        <li>
                          <button className="menu-item">
                            <FiEyeOff /> Hide
                          </button>
                        </li>
                        <li>
                          <button className="menu-item">
                            <FiBookmark /> Save
                          </button>
                        </li>
                        <li>
                          <button className="menu-item">
                            <FiRepeat /> Repost
                          </button>
                        </li>
                        <li>
                          <button className="menu-item">
                            <FiLink /> Copy link
                          </button>
                        </li>
                        <li>
                          <button className="menu-item">
                            <FiBellOff /> Turn off notifications
                          </button>
                        </li>
                        <li>
                          <button className="menu-item">
                            <FiUserX /> Unfollow
                          </button>
                        </li>
                        <li>
                          <button className="menu-item menu-item-danger">
                            <FiFlag /> Report
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="post-media">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  className="swiper"
                >
                  {post.media.map((item, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                      {item.type === "video" ? (
                        <video controls>
                          <source src={item.url} />
                        </video>
                      ) : (
                        <img src={item.url} alt="" />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {post.media?.length > 1 && (
                <div className="media-count">+{post.media.length - 1} more</div>
              )}
              <p className="post-copy">
                {post.description || "A quiet moment from the creator feed."}
              </p>
              <div className="post-actions">
                <div className="action-group">
                  <button className="reaction-button">
                    <FiHeart /> Like
                  </button>
                  <button className="reaction-button">
                    <FiMessageCircle /> Comment
                  </button>
                  <button className="reaction-button">
                    <FiSend /> Share
                  </button>
                </div>
                <span className="post-meta">{128 + index * 17} reactions</span>
              </div>
            </motion.article>
          );
        })
      )}
    </>
  );
};

export default PostCard;
