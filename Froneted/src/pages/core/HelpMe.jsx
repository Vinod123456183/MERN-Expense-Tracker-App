// import { FaHandHoldingHeart } from "react-icons/fa";

// import React, { useState, useEffect } from "react";
// import Histogram from "../../components/income/Histogram";
// import AreaChart from "../../components/income/AreaChart";
// import PieChart from "../../components/income/PieChart";

// import { NavLink } from "react-router-dom";
// import { MdOutlineWhatsapp } from "react-icons/md";
// import { TiSocialLinkedin } from "react-icons/ti";
// import { PiInstagramLogoThin } from "react-icons/pi";
// import { IoMailOutline } from "react-icons/io5";
// import { motion } from "framer-motion";
// import { RiContactsLine } from "react-icons/ri";
// import { IoLocationOutline } from "react-icons/io5";

// import SideBar from "../core/SideBar";
// import { useThemeColors } from "../core/colors";
// import Doughnut from "../../components/income/Doughnut";
// import ComboChart from "../../components/income/ComboChart";
// import HeatmapChart from "../../components/income/Heat";
// import RecentTransitions from "../../components/income/RecentTransitions";
// import SideBox from "../../components/expense/SideBox";
// import BalanceComponent from "../../components/BalanceComponent";

// function Expense() {
//   const { borderGrey, greyText } = useThemeColors();
//   const [expanded, setExpanded] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       if (mobile) setExpanded(false);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="flex w-full max-w-[1440px] min-h-screen">
//       {/* Sidebar */}
//       <SideBar
//         expanded={expanded}
//         setExpanded={setExpanded}
//         isMobile={isMobile}
//       />

//       {/* Main Content */}
//       <div
//         className={`transition-all duration-300 flex-1 px-1 py-2 ${
//           isMobile ? "ml-12" : expanded ? "ml-52" : "ml-16"
//         }`}
//       >
//         <div className="  flex p-2  md:p-5 pt-4 gap-5 md:pt-20 flex-col lg:flex-row  ">
//           <div className="  w-full mx-auto lg:w-1/3 font-kodchasan  p-2    h-auto  rounded-3xl">
             

//             <div>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.9, delay: 0.2 }}
//                 className="mt-6 bg-[#141514] p-6 rounded-2xl text-gray-300"
//               >
//                 <div className="flex items-center gap-4 justify-center pb-2 mb-4">
//                   <FaHandHoldingHeart className="text-blue-500 text-3xl" />
//                   <h3 className="text-lg font-semibold ">Every bit helps 🙏</h3>
//                 </div>
//                 <p className="text-sm text-center pt-2 pb-2">
//                   If you love this Expense Tracker project and want to support
//                   its development, consider making a donation. Thank you for
//                   your support!
//                 </p>

//                 <div className="mt-6 flex justify-center">
//                   <img
//                     src="/images/qr-code.png" // ✅ replace with your actual QR code path
//                     alt="Donate QR Code"
//                     className="h-48 w-48 object-contain rounded-xl border border-gray-700"
//                   />
//                 </div>

//                 <p className="mt-4 text-center text-gray-400 text-sm p-1">
//                   Scan this QR code using any UPI app to donate.
//                 </p>
//               </motion.div>
//               <p>
//                 <p className="text-sm  p-2 text-wrap text-center pt-5">
//                   For Any Type Of Help Please You Can Contact Me Anytime{" "}
//                 </p>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Expense;
