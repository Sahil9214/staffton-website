"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  staggerContainerVariants,
  staggerItemVariants,
  VIEWPORT,
} from "./config";

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
};

export const StaggerContainer = ({
  children,
  className,
}: StaggerContainerProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export const StaggerItem = ({
  children,
  className,
}: StaggerItemProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
};
