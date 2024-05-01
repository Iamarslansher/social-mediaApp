"use client";
import React, { useState } from "react";
import "./addPost.css";
import Link from "next/link";
import { userCardItem } from "../config/fireBase";

const AddPost = ({ onAdd }) => {
  const [img, setImg] = useState("");
  const [des, setdes] = useState("");

  const addItem = async () => {
    try {
      await userCardItem({ img, des });
    } catch (error) {}
    console.log(error);
  };

  return (
    <div className="postAddCard">
      <div className="imagePreview">
        <img
          src="https://i.pinimg.com/736x/8f/8f/b4/8f8fb43ce828a22c91c0b59f55fb91b3.jpg"
          alt="Preview"
        />
        Here, you can post an image and write somthing about Image.
      </div>
      <input
        type="file"
        placeholder="Image URL"
        className="input"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setdes(e.target.value)}
        className="textarea"
      />

      <button onClick={addItem} className="addButton">
        Add Post
      </button>
    </div>
  );
};

export default AddPost;
