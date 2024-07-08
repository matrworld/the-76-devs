import React from "react";
import Slider from "../layout/Slider";
import HeaderText from "../layout/HeaderText";
import Conatiner from "../layout/Conatiner";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { discord } from "@/lib/config/discord";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface JoinUsProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  title?: string;
  desc?: string;
}

export default function JoinUs({ className, title, desc }: JoinUsProps) {
  return (
    <Conatiner className="py-10">
      <div className={cn("flex justify-between px-20 gap-32", className)}>
        <div className="flex justify-center flex-1">
          <div className="relative w-full h-full px-10">
            <Image src={"/images/background/bg.jpg"} alt="" fill />
          </div>
        </div>
        <div className="flex justify-center flex-1">
          <div className="flex flex-col justify-center items-start gap-5">
            <h1 className="text-4xl font-bold">{title}</h1>
            <h2 className="text-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis dolorum accusantium magni impedit vero corrupti cum
              harum amet eum. Cupiditate.
            </h2>
            <Link
              href={"/"}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "self-start shadow-bottom-right border-"
              )}
            >
              Join Discord
            </Link>
          </div>
        </div>
      </div>
    </Conatiner>
  );
}
