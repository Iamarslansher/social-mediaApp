import React from "react";
import Header from "../header/page";
import Navbar from "../navBar/page";
import SideBar from "../sideBar/page";
import Post from "../post/page";
function MainDashboard() {
  return (
    <div>
      <Header />
      <Navbar />
      <Post />
      <SideBar />
    </div>
  );
}

export default MainDashboard;
