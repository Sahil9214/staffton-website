export const EASE = [0.25, 0.1, 0.25, 1] as const;

export const DEFAULT_TRANSITION = {
  duration: 0.5,
  ease: EASE,
};

export const FAST_TRANSITION = {
  duration: 0.3,
  ease: EASE,
};

export const PAGE_TRANSITION = {
  duration: 0.25,
  ease: EASE,
};

export const VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -48px 0px",
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASE,
    },
  },
};
