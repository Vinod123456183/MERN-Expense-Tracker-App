import React from "react";
import darkLogo from "../assets/icon.svg"; // ✅ include the extension
import lightLogo from "../assets/m.svg";
import { useThemeColors } from "../pages/core/colors";
import "aos/dist/aos.css";

function BalanceComponent({ text, amount, about, withSymbol = true }) {
  const { borderGrey, lightBorder, darkGrey, bgColor, greyText, borderGrey2 } =
    useThemeColors();

  return (
    <div
      className={` ${lightBorder} rounded-lg p-6 font-raleway border  w-full backdrop-blur-md bg-gradient`}
    >
      <p className="font-raleway text-2xl">
        {text.length > 13 ? text.slice(0, 13) + "..." : text}
      </p>

      <div className="flex items-center justify-between ">
        <div className="flex flex-col gap-3">
          <p className="text-xl pt-5 text-blue-600 font-semibold">
            {withSymbol
              ? `₹${amount.toString().slice(0, 8)}`
              : amount.toString().slice(0, 8)}
          </p>

          <p>{about?.length > 25 ? about.slice(0, 25) + "..." : about}</p>
        </div>

        <div className="pt-10">
          <img
            src={lightLogo} // Static for now, no theme context
            alt="Logo"
            className="transition duration-300 ease-in-out w-12 h-12 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default BalanceComponent;
