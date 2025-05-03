"use client";
import React from "react";
import {
  motion,
  MotionStyle,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from "framer-motion";

interface IProps {
  children?: React.ReactNode;
  initial?: boolean | TargetAndTransition | VariantLabels | undefined;
  whileInView?: TargetAndTransition | VariantLabels | undefined;
  viewport?: object | undefined;
  transition?: Transition | undefined;
  style?: MotionStyle | undefined;
}

function FadeIn({
  children,
  initial = { opacity: 0, y: 20 },
  whileInView = { opacity: 1, y: 0 },
  viewport = { once: true },
  transition = { duration: 0.5, delay: 0.5 },
  style,
}: IProps) {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
