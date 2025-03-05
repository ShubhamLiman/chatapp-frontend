import React from "react";
import * as motion from "motion/react-client";

function AnimatedGraphic() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        initial="hidden"
        animate="visible"
        style={image}
      >
        <motion.circle
          className="circle-path"
          cx="300"
          cy="300"
          r="80"
          stroke="#ff0088"
          variants={draw}
          custom={1}
          style={shape}
        />
        <motion.line
          x1="220"
          y1="30"
          x2="360"
          y2="170"
          stroke="#4ff0b7"
          variants={draw}
          custom={2}
          style={shape}
        />
        <motion.line
          x1="220"
          y1="170"
          x2="360"
          y2="30"
          stroke="#4ff0b7"
          variants={draw}
          custom={2.5}
          style={shape}
        />
        <motion.rect
          width="140"
          height="140"
          x="230"
          y="420"
          rx="20"
          stroke="#0d63f8"
          variants={draw}
          custom={3}
          style={shape}
        />
        <motion.circle
          className="circle-path"
          cx="100"
          cy="100"
          r="80"
          stroke="#ff0088"
          variants={draw}
          custom={4}
          style={shape}
        />
        <motion.rect
          width="140"
          height="140"
          x="30"
          y="220"
          rx="20"
          stroke="#0d63f8"
          variants={draw}
          custom={5}
          style={shape}
        />

        <motion.circle
          className="circle-path"
          cx="500"
          cy="500"
          r="80"
          stroke="#ff0088"
          variants={draw}
          custom={6}
          style={shape}
        />
        <motion.rect
          width="140"
          height="140"
          x="410"
          y="30"
          rx="20"
          stroke="#0d63f8"
          variants={draw}
          custom={9}
          style={shape}
        />
        <motion.line
          x1="410"
          y1="220"
          x2="560"
          y2="360"
          stroke="#4ff0b7"
          variants={draw}
          custom={8}
          style={shape}
        />
        <motion.line
          x1="410"
          y1="360"
          x2="560"
          y2="220"
          stroke="#4ff0b7"
          variants={draw}
          custom={8.5}
          style={shape}
        />
        <motion.line
          x1="30"
          y1="410"
          x2="170"
          y2="560"
          stroke="#4ff0b7"
          variants={draw}
          custom={7}
          style={shape}
        />
        <motion.line
          x1="30"
          y1="560"
          x2="170"
          y2="410"
          stroke="#4ff0b7"
          variants={draw}
          custom={7.5}
          style={shape}
        />
      </motion.svg>
    </div>
  );
}

export default AnimatedGraphic;

const image = {
  maxWidth: "80vw",
};

const shape = {
  strokeWidth: 10,
  strokeLinecap: "round",
  fill: "transparent",
};
