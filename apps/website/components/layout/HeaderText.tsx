import { cn } from "@/lib/utils";
import React, { HTMLProps } from "react";

interface HeaderTextProps extends HTMLProps<HTMLHeadingElement> {
  title: string;
}

export default function HeaderText({
  title,
  className,
  ...props
}: HeaderTextProps) {
  return (
    <h1
      className={cn("text-xl sm:text-2xl md:text-3xl font-semibold text-center py-10", className)}
      {...props}
    >
      {title}
    </h1>
  );
}
