import React from "react";
import { FiBell, FiCompass, FiMessageCircle, FiSearch } from "react-icons/fi";

function Header() {
  return (
    <header className="topbar glass-panel">
      <div className="search-box">
        <FiSearch />
        <input className="field" placeholder="Search creators, sparks, rooms" />
      </div>
      <nav className="nav-pills" aria-label="Quick filters">
        <button className="ghost-button">
          <FiCompass /> Discover
        </button>
        <button className="ghost-button">
          <FiMessageCircle /> Rooms
        </button>
      </nav>
      <button className="icon-button" aria-label="Open notifications">
        <FiBell />
      </button>
    </header>
  );
}

export default Header;
