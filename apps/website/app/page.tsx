"use client"
import Community from "@/components/sections/Community";
import DevnetDir from "@/components/sections/DevnetDir";
import Header from "@/components/sections/Header";
import JoinUs from "@/components/sections/JoinUs";
import Lottie from "lottie-react";


export default function Home() {
  return (
    <div className="">
      <Header />
      <JoinUs />
      {/* <DevnetDir /> */}
      <Community />
    </div>
  );
}
