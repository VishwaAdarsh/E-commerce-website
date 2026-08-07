"use client";

import { useState, useEffect } from "react";
import { Timer } from "lucide-react";

interface CountdownTimerProps {
  initialHours?: number;
}

export function CountdownTimer({ initialHours = 14 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="inline-flex items-center space-x-2 bg-[#ffdbc7] text-[#795f4f] px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-sm">
      <Timer className="w-3.5 h-3.5 text-[#845331]" />
      <span className="tracking-wider uppercase">Flash Deal Ends In:</span>
      <span className="font-mono font-black text-[#845331]">
        {format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}
      </span>
    </div>
  );
}
