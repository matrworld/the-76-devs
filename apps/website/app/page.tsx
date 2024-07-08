"use client";
import Community from "@/components/sections/Community";
import DevnetDir from "@/components/sections/DevnetDir";
import Header from "@/components/sections/Header";
import JoinUs from "@/components/sections/JoinUs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-2">
      <Header />
      <div className="text-xl border text-center py-10 px-">
        blah blah so you made it to the 76 devs website, welcome!
      </div>
      <JoinUs title="Community" desc=""/>
      <JoinUs className="flex-row-reverse" title="Directory"/>
      <JoinUs title="Devnet Faucet"/>
      <JoinUs className="flex-row-reverse" title="The 76 Monorepo"/>
    </div>
  );
}
