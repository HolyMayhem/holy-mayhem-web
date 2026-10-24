"use client";
import { motion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={false}
      whileInView={{ opacity: [0.6, 1], y: [12, 0] }}
      viewport={{ once: true, margin: "0px 0px -30px 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
