"use client";

import { useEffect, useState, useRef } from "react";

interface MetricsCounterProps {
  target: number;
  label: string;
  suffix?: string;
  testId?: string;
}

export function MetricsCounter({ target, label, suffix = "", testId }: MetricsCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateCounter();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounter = () => {
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentValue = Math.floor(startValue + (target - startValue) * easeOutCubic(progress));
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  return (
    <div ref={counterRef} className="text-center" data-testid={testId}>
      <div className="counter text-5xl font-display font-bold mb-2" data-testid={`${testId}-value`}>
        {count}{suffix}
      </div>
      <div className="text-slate-300 text-lg" data-testid={`${testId}-label`}>
        {label}
      </div>
    </div>
  );
}
