import React from "react";
import Navbar from '../components/Home/navbar';
import HomeLayout from "../components/Home/HomeLayout";
function Home() {
  return (
    <div className="bg-gradient-to-r from-[#FAACA8] to-[#DDD6F3] h-auto w-screen">
      <Navbar/>
      <HomeLayout />
    </div>
  );
}

export default Home;
