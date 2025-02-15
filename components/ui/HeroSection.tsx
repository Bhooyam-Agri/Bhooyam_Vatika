"use client";

import React from "react";
import dynamic from "next/dynamic";
import { GlowEffect } from "./glow-effect";
import { Button } from "./button";

const MotionDiv = dynamic(() => import("framer-motion").then(mod => mod.motion.div), { ssr: false });

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background/90" />
        <MotionDiv 
          className="absolute left-1/4 top-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <MotionDiv 
          className="absolute right-1/4 bottom-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Grow Smarter, Not Harder
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Revolutionary hydroponics solutions powered by artificial intelligence. Experience the future of sustainable farming today.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="group relative">
              <Button size="lg" className="relative bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full text-lg">
                Get Started
              </Button>
              <GlowEffect />
            </div>
            <div className="group relative">
              <Button size="lg" variant="outline" className="relative px-8 py-6 rounded-full text-lg border-primary/20 hover:bg-primary/5">
                Watch Demo
              </Button>
              <GlowEffect />
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
