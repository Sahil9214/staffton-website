"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  DEFAULT_TRANSITION,
  fadeInVariants,
  fadeUpVariants,
  VIEWPORT,
} from "./config";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
  direction?: "up" | "fade";
};

const Reveal = ({
  children,
  className,
  delay = 0,
  immediate = false,
  direction = "up",
}: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const variants = direction === "fade" ? fadeInVariants : fadeUpVariants;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate={immediate ? "visible" : undefined}
      whileInView={immediate ? undefined : "visible"}
      viewport={VIEWPORT}
      transition={{ ...DEFAULT_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
