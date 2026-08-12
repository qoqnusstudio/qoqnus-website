"use client";

import { motion, type Variants } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "right" | "left";
};

const offsets = {
  up: { y: 28, x: 0 },
  right: { x: 40, y: 0 },
  left: { x: -40, y: 0 },
};

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const offset = offsets[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
