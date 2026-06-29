// ImageGallery.js

import React from "react";

const Navbar = () => {
  const stories = [
    ["Mina", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80"],
    ["Zain", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80"],
    ["Ava", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=80"],
    ["Noor", "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=180&q=80"],
    ["Leo", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=180&q=80"],
    ["Sara", "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=180&q=80"],
  ];

  return (
    <section className="story-strip" aria-label="Creator stories">
      {stories.map(([name, image]) => (
        <article className="story-card" key={name}>
          <img className="story-avatar" src={image} alt={`${name} story`} />
          <strong>{name}</strong>
        </article>
      ))}
    </section>
  );
};

export default Navbar;
