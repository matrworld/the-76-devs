import React from "react";
import Slider from "../layout/Slider";
import HeaderText from "../layout/HeaderText";
import Conatiner from "../layout/Conatiner";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { discord } from "@/lib/config/discord";

export default function JoinUs() {
  return (
    <Conatiner>
      <HeaderText title="Join Our Community" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 px-2">
        {discord.map((user) => (
          <div className="shadow-bottom-right p-4">
          <div className="flex items-center justify-center gap-2">
            <Image src={user.img} alt="" width={100} height={100} className="rounded-full p-4"/>
            <div>
              <p className="font-semibold">{user.name}</p>
              <Badge>{user.status}</Badge>
            </div>
          </div>
        </div>
        ))}
      </div>
    </Conatiner>
  );
}
