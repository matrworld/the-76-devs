"use client";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import Lottie from "lottie-react";
import wavey from "../../public/waves.json";
import Image from "next/image";
import bg from "../../public/images/background/bg.jpg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Slider from "../layout/Slider";

export default function Header() {
  return (
    <div
      className="relative flex flex-col gap-10 items-center justify-center h-[80vh] w-full mb-32"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Image
        src={"/images/background/bg.jpg"}
        alt=""
        fill
        className="opacity-10"
      />
      <div className="flex flex-col gap-2 justify-center py-8 px-4 max-w-sm h-fit w-full shadow-bottom-right">
        <h1 className="font-light">The</h1>
        <h2 className="text-[10rem] font-extrabold text-center">76</h2>
        <h3 className="text-3xl font-extrabold text-right">Devs</h3>
        {/* <Slider /> */}
      </div>
      <Link
        href={"/"}
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "px-20 py-5 border-none shadow-bottom-right"
        )}
      >
        Join Us Now
      </Link>
      {/* <Lottie animationData={wavey} loop={true} allowFullScreen={true} className="min-w-full"/> */}
    </div>
  );
}
