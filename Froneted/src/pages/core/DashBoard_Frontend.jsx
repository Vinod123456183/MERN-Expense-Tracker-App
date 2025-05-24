import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useThemeColors } from "./colors";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

// Scroll animation wrapper component
const ScrollAnimationWrapper = ({ children, delay = 0.3 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

function DashBoard_Frontend() {
  const { lightBorder2 } = useThemeColors();

  // Sidebar state & responsive handling, just like Expense component
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setExpanded(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full max-w-[1440px] min-h-screen">
      {/* Sidebar */}
      <SideBar
        expanded={expanded}
        setExpanded={setExpanded}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 flex-1 px-1  lg:px-4 lg:py-4 ${
          isMobile ? "ml-12" : expanded ? "ml-52" : "ml-12"
        }`}
      >
        <Header />
        <div className="flex justify-center items-center p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 w-full max-w-5xl">
            <Link to="/api/v1/income" className="w-full">
              <ScrollAnimationWrapper delay={0.3}>
                <div
                  className={`${lightBorder2} w-full h-[300px] md:h-[400px] lg:h-[450px] flex items-center justify-center text-2xl font-semibold rounded-xl border shadow-xl 
                  transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
                >
                  Income
                </div>
              </ScrollAnimationWrapper>
            </Link>
            <Link to="/api/v1/expense" className="w-full">
              <ScrollAnimationWrapper delay={0.4}>
                <div
                  className={`${lightBorder2} w-full h-[300px] md:h-[400px] lg:h-[450px] flex items-center justify-center text-2xl font-semibold rounded-xl border shadow-xl 
                  transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
                >
                  Expense
                </div>
              </ScrollAnimationWrapper>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard_Frontend;
