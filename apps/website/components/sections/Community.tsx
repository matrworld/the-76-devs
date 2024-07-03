import React from "react";
import Slider from "../layout/Slider";
import Image from "next/image";
import Conatiner from "../layout/Conatiner";
import { community } from "@/lib/config/community";
import HeaderText from "../layout/HeaderText";

export default function Community() {
  return (
    <Conatiner className="px-2 sm:px-20">
      <HeaderText title="Public Community Work" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {community.map((source) => (
          <div className="relative shadow-bottom-right">
            <Image
              src={source.img}
              alt=""
              width={500}
              height={500}
            />
            <div className="flex flex-col bg-black/80 justify-center items-center cursor-pointer opacity-0 hover:opacity-100 absolute w-full h-full top-0 left-0 transition-all">
              <p className="text-xl font-semibold">{source.name}</p>
              <p>{source.info}</p>
            </div>
          </div>
        ))}
      </div>
    </Conatiner>
  );
}
