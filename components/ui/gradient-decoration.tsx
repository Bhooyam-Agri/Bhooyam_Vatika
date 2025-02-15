"use client";

import { cn } from "@/lib/utils";

export function GradientDecoration({
  className,
  position = "top-right",
}: {
  className?: string;
  position?: "top-right" | "bottom-left" | "center";
}) {
  const positionClasses = {
    "top-right": "right-0 top-1/4",
    "bottom-left": "left-0 bottom-1/4",
    "center": "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
  };

  return (
    <div
      className={cn(
        "absolute w-[500px] h-[500px] rounded-full opacity-50",
        "bg-gradient-to-r from-primary/30 via-purple-500/20 to-primary/10",
        "blur-3xl",
        "animate-slowly-spin",
        positionClasses[position],
        className
      )}
    />
  );
}