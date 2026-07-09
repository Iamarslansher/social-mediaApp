"use client";
import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { userCardItem } from "../config/fireBase";
import {
  FiArrowLeft,
  FiBold,
  FiImage,
  FiItalic,
  FiLock,
  FiSend,
  FiSmile,
  FiUploadCloud,
  FiUsers,
  FiVideo,
  FiZap,
} from "react-icons/fi";

const emojis = ["✨", "🔥", "💡", "📸", "🎧", "🌙", "🚀", "💬", "❤️", "🎨"];
const maxCharacters = 280;

const AddPost = () => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [des, setdes] = useState("");
  const [privacy, setPrivacy] = useState("Public");
  const [isDragging, setIsDragging] = useState(false);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const fileInputRef = useRef(null);

  const previews = useMemo(
    () =>
      files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image",
      })),
    [files],
  );

  const addFiles = (selectedFiles) => {
    setFiles((current) => [...current, ...Array.from(selectedFiles)]);
  };

  const addItem = async () => {
    await userCardItem(
      {
        files,
        des,
        privacy,
        richText: `${bold ? "bold " : ""}${italic ? "italic " : ""}`.trim(),
      },
      router,
    );
    setFiles([]);
    setdes("");
  };

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  };

  return (
    <main className="composer-page premium-page">
      <motion.section
        className="composer-card glass-panel"
        initial={{ opacity: 0, scale: 0.97, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link href="/mainDashboard" className="ghost-button">
          <FiArrowLeft /> Back to feed
        </Link>
        <div className="post-header">
          <div>
            <h1>
              Compose a <span className="gradient-text">visual spark</span>
            </h1>
            <p className="rail-muted">
              Add multiple images, video, emoji, privacy, and a polished
              caption.
            </p>
          </div>
          <select
            className="privacy-select"
            value={privacy}
            onChange={(event) => setPrivacy(event.target.value)}
            aria-label="Post privacy"
          >
            <option>Public</option>
            <option>Friends</option>
            <option>Private</option>
          </select>
        </div>
        <div className="composer-grid">
          <div
            className={`drop-zone ${isDragging ? "active" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
          >
            <div>
              <FiUploadCloud size={40} />
              <h3>Drop images or videos here</h3>
              <p className="rail-muted">
                Supports multiple images and video clips for richer posts.
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              multiple
              accept="image/*,video/*"
              onChange={(event) => addFiles(event.target.files)}
            />
          </div>
          <div className="composer-form">
            <div className="quick-actions">
              <button
                className={`ghost-button ${bold ? "active" : ""}`}
                type="button"
                onClick={() => setBold((value) => !value)}
              >
                <FiBold /> Bold
              </button>
              <button
                className={`ghost-button ${italic ? "active" : ""}`}
                type="button"
                onClick={() => setItalic((value) => !value)}
              >
                <FiItalic /> Italic
              </button>
              <button className="ghost-button" type="button">
                {privacy === "Public" ? (
                  <FiZap />
                ) : privacy === "Friends" ? (
                  <FiUsers />
                ) : (
                  <FiLock />
                )}
                {privacy}
              </button>
            </div>
            <textarea
              placeholder="What should people feel, notice, or respond to?"
              value={des}
              maxLength={maxCharacters}
              onChange={(event) => setdes(event.target.value)}
              className="field"
              style={{
                fontWeight: bold ? 850 : 500,
                fontStyle: italic ? "italic" : "normal",
              }}
            />
            <div className="counter">
              <span>
                {files.length} media item{files.length === 1 ? "" : "s"}{" "}
                selected
              </span>
              <span>
                {des.length}/{maxCharacters}
              </span>
            </div>
            <div className="emoji-picker" aria-label="Emoji picker">
              <FiSmile />
              {emojis.map((emoji) => (
                <button
                  className="emoji-button"
                  type="button"
                  key={emoji}
                  onClick={() => setdes((value) => `${value}${emoji}`)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            {!!previews.length && (
              <div className="media-preview-grid">
                {previews.map((preview) => (
                  <div className="media-preview" key={preview.url}>
                    {preview.type === "video" ? (
                      <video src={preview.url} controls />
                    ) : (
                      <img src={preview.url} alt={preview.file.name} />
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="quick-actions">
              <button
                className="secondary-button"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <FiImage /> Add media
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <FiVideo /> Add video
              </button>
              <button onClick={addItem} className="primary-button">
                Publish post <FiSend />
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default AddPost;
