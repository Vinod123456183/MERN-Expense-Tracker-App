import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineWhatsapp } from "react-icons/md";
import { TiSocialLinkedin } from "react-icons/ti";
import { PiInstagramLogoThin } from "react-icons/pi";
import { IoMailOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { RiContactsLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";

import SideBar from "../core/SideBar";
import { useThemeColors } from "../core/colors";
import Header from "./Header";

function Expense() {
  const { darkborderGrey, greyText, lightBorder2 } = useThemeColors();
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
        className={`transition-all duration-300 flex-1 px-1 py-2 ${
          isMobile ? "ml-12" : expanded ? "ml-52" : "ml-16"
        }`}
      >
        <Header />
        <div className="flex p-2 md:p-5 pt-4 gap-5 md:pt-20 flex-col lg:flex-row">
          <div className="w-full mx-auto lg:w-1/3 font-kodchasan p-2 h-auto rounded-3xl">
            <h2 className="pt-4 text-[17px] md:text-[20px] lg:text-[24px] font-bold">
              CONTACT INFO
            </h2>

            {/* Mail Us Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.97, delay: 0.2 }}
              className="mt-2 p-2"
            >
              <h3
                className={` pb-1 text-[17px] md:text-[18px] lg:text-[19px] ${greyText} `}
              >
                MAIL US
              </h3>
              <div className="flex items-center gap-5">
                <div className="rounded-xl p-2 md:p-5  ">
                  <IoMailOutline className="h-10 w-10" />
                </div>
                <div className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[17px]">
                  <p className={`${greyText}`}>vinodsinghbarti420@gmail.com</p>
                  <p className={`${greyText}`}>insidesoul645@gmail.com</p>
                  <p className={`${greyText}`}>devilstriangle420@gmail.com</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Us Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.97, delay: 0.3 }}
              className="p-3"
            >
              <h3
                className={`pb-2 ${greyText} text-[17px] md:text-[18px] lg:text-[19px]`}
              >
                Contact US
              </h3>
              <div className="flex items-center gap-4">
                <div className="rounded-xl p-2 md:p-5  ">
                  <RiContactsLine className="h-10 w-10" />
                </div>
                <div className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[17px]">
                  <p className={`${greyText}`}>+918439371949</p>
                  <p className={`${greyText}`}>+919456541392</p>
                  <p className={`${greyText}`}>+917251841949</p>
                </div>
              </div>
            </motion.div>

            {/* Location Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.97, delay: 0.38 }}
              className="p-3"
            >
              <h3
                className={`pb-2 ${greyText} text-[17px] md:text-[18px] lg:text-[19px]`}
              >
                Location
              </h3>
              <div className="flex items-center gap-4">
                <div className="rounded-xl p-2 md:p-5  ">
                  <IoLocationOutline className="h-10 w-10" />
                </div>
                <div className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[17px]">
                  <p className={`${greyText}`}>
                    Canal Road , Above Om Sai Banquet Hall , Kathgodam ,
                    Haldwani.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Info */}
            <div>
              <motion.h3
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`pt-10 font-bold text-[17px] md:text-[20px] lg:text-[25px] text-center ${greyText} mb-5`}
              >
                SOCIAL <span className="text-blue-600">INFO</span>
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.97, delay: 0.38 }}
                className="mx-auto w-full flex justify-between items-center"
              >
                {/* Social Media Links */}
                {/* Instagram */}
                <motion.a
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.97, delay: 0.5 }}
                  href="https://instagram.com/___12_devin_12___"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={` ${darkborderGrey} rounded-full border font-bold`}
                >
                  <PiInstagramLogoThin className="transition-transform m-4 md:m-3 lg:m-5 xl:m-7 rounded-full h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11 transform hover:scale-110 duration-200" />
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.97, delay: 1 }}
                  href="https://linkedin.com/in/vinod-barti-339571268"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={` ${darkborderGrey} rounded-full border font-bold`}
                >
                  <TiSocialLinkedin className="transition-transform m-4 md:m-3 lg:m-5 xl:m-7 rounded-full h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11 transform hover:scale-110 duration-200" />
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.97, delay: 1.5 }}
                  href="https://api.whatsapp.com/send?phone=919456541392&text=%F0%9F%95%89%EF%B8%8F%F0%9F%95%89%EF%B8%8F%F0%9F%95%89%EF%B8%8F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={` ${darkborderGrey} rounded-full border font-bold`}
                >
                  <MdOutlineWhatsapp className="transition-transform m-4 md:m-3 lg:m-5 xl:m-7 rounded-full h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11 transform hover:scale-110 duration-200" />
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className={`mx-auto w-full lg:w-2/3 p-5 pt-0 gap-10  border ${lightBorder2} rounded-3xl`}
          >
            <div className="flex justify-between md:p-6 p-2">
              <div>
                <p className="text-[22px] md:text-[30px] lg:text-[40px] font-bold font-kodchasan">
                  Let's work <span className="text-blue-500">together.</span>
                </p>
              </div>
              <div className="flex items-center -mt-2 xl:-mt-5 justify-center">
                <img
                  src="https://wpriverthemes.com/gridx/wp-content/themes/gridx/assets/images/icon2.png"
                  className="h-14 md:h-14 lg:h-20"
                  alt=""
                />
              </div>
            </div>

            {/* Form Submission */}
            <form
              className="mt-4"
              action="https://formspree.io/f/mvgpeadn"
              method="POST"
            >
              <div className="mb-4">
                <input
                  placeholder="Name *"
                  className={` ${lightBorder2} font-kodchasan px-4 md:px-7 text-[15px] md:text-[16px] w-full p-4 md:p-5 rounded-2xl   outline-none border  `}
                  type="text"
                  name="name"
                />
              </div>
              <div className="mb-4">
                <input
                  placeholder="Email *"
                  className={` ${lightBorder2} font-kodchasan px-4 md:px-7 text-[15px] md:text-[16px] w-full p-4 md:p-5 rounded-2xl   outline-none border  `}
                  type="email"
                  name="email"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Your Message *"
                  name="message"
                  className={` ${lightBorder2} font-kodchasan px-4 md:px-7 text-[15px] md:text-[16px] w-full p-4 md:p-5 rounded-2xl   outline-none border  `}
                  rows="4"
                ></textarea>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full px-5 py-3 text-center text-lg text-white font-bold border-none rounded-lg bg-blue-600 transition-all duration-300  "
                >
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Expense;
