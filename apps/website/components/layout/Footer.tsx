import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="mx-auto py-6 px-10 flex justify-between items-center border">
        <div>The 76 Devs</div>
        <div className="text-center w-1/2">
          <h1 className="">Do not take us to court</h1>
          <h2 className="font-light">Join our community Lorem ipsum dolor sit amet</h2>
        </div>
        <div className="flex flex-col gap-2 justify-center items">
          <Link href={"/"} className="underline">
            Product
          </Link>
          <Link href={"/"} className="underline">
            DevnetDir
          </Link>
          <Link href={""} className="underline">
            Other
          </Link>
          <div className="flex gap-4">
            <Github />
            <Twitter />
          </div>
        </div>
      </div>
    </div>
  );
}
