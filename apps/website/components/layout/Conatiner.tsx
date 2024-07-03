import { cn } from "@/lib/utils";
import React, { HTMLProps } from "react";

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Conatiner({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("flex flex-col justify-center items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}
