// PostCard.js
"use client";
import React, { useState, useEffect } from "react";
import { getingAds, getFacebookProfile, getProfile } from "../config/fireBase";
import "./post.css";

import { AiFillLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { TbLocationShare } from "react-icons/tb";

const PostCard = () => {
  const [posts, setosts] = useState([]);
  const [profile, setProfile] = useState("");
  const [localProfile, setLocalProfile] = useState("");

  useEffect(() => {
    getPosts();
    getPrfile();
    LocalProfile();
  }, []);

  const getPosts = async () => {
    const getPost = await getingAds();
    setosts(getPost);
    console.log(getPost);
  };

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
        <h2
          style={{
            textAlign: "center",
            marginTop: "100px",
            fontSize: "30px",
          }}
        >
          Create Post
        </h2>
      ) : (
        posts.map((post) => {
          return (
            <div className="container">
              <div className="card">
                <div className="CardHeader">
                  {!profile ? (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        margin: "10px",
                      }}
                    />
                  ) : (
                    <img
                      src={localProfile[0]?.image}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        margin: "10px",
                      }}
                    />
                  )}

                  {!profile ? <h3>Arslan</h3> : <h3>{profile[0]?.name}</h3>}
                </div>
                <div className="card-body">
                  <div className="cardImg">
                    <img
                      className="card-img-top"
                      src={!post.image ? "no image Upload" : post.image}
                      alt="..."
                    />
                  </div>

                  <p className="card-text">
                    {!post.description ? "No Descript" : post.description}
                  </p>
                  <hr />
                  <div className="actionDiv">
                    <AiFillLike title="Like" className="action" />
                    |
                    <FaCommentDots title="comment" className="action" />
                    |
                    <TbLocationShare title="share" className="action" />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default PostCard;
