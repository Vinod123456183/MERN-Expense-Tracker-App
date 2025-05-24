// src/hooks/useThemeColors.jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext"; // update path if different

export const useThemeColors = () => {
  const { theme } = useContext(ThemeContext);

  return {
    bgColor: theme === "light" ? "bg-[#f0f0f0]" : "bg-[#090909]",
    // borderGrey: theme === "light" ? "border-[#c6c6c6]" : "border-[#29282F]",
    greyText: theme === "light" ? "text-gray-800" : "text-gray-400",
    whiteTxt: theme === "light" ? "text-gray-100" : "text-gray-200",
    darkGrey: theme === "light" ? "text-gray-900" : "text-gray-900",
    borderGrey2: theme === "light" ? "border-[#c6c6c6]" : "border-[#9a9a9a]",
    lightBorder: theme === "light" ? "border-[#d0d0d0]" : "border-[#29282F]",
    lightBorder2: theme === "light" ? "border-[#d0d0d0]" : "border-[#676767]",
    iconColor: theme === "light" ? "text-[#000]" : "border-[#fff]",
    borderGrey: theme === "light" ? "border-[#9a9a]" : "border-[#29282F]",
    darkborderGrey: theme === "light" ? "border-[#050505]" : "border-[#29282F]",

  };
};
