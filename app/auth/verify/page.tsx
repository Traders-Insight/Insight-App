"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { VerifyForm } from "@/components/_components/verify-form";
import { LoginImg, Logo } from "@/public";
import Bubble from "@/components/_components/bubbles";

export default function VerifyPage() {
  const [bubbles, setBubbles] = useState<
    { id: number; style: React.CSSProperties; color: string }[]
  >([]);

  useEffect(() => {
    const colors = [
      "rgba(245, 238, 29, 0.7)",
      "rgba(245, 245, 245, 0.7)",
      "rgba(30, 242, 129, 0.7)",
    ];

    const interval = setInterval(() => {
      const newBubble = {
        id: Date.now(),
        style: {
          left: Math.random() * window.innerWidth + "px",
          top: "0px",
          animation: "drop 6s linear forwards",
        },
        color: colors[Math.floor(Math.random() * colors.length)], // Randomly select a color
      };
      setBubbles((prev) => [...prev, newBubble]);

      // Remove bubble after animation
      setTimeout(() => {
        setBubbles((prev) =>
          prev.filter((bubble) => bubble.id !== newBubble.id)
        );
      }, 3000);
    }, 1000); // Create a new bubble every second

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen md:mx-30 flex flex-col">
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} style={bubble.style} color={bubble.color} />
      ))}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />

          <span className="text-2xl font-bold text-gray-800">Insight</span>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <VerifyForm />
            </div>

            <div className="bg-gray-100 rounded-3xl p-6 flex items-center justify-center hover:shadow-amber-200 hover:shadow-2xl">
              <Image
                src={LoginImg}
                alt="Phone mockup showing login screen"
                width={400}
                height={500}
                className="max-w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
