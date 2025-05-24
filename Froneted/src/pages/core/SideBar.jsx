import React from "react";
import axios from "axios";
import ToggleButton from "../core/ToggleButton";
import { MdPerson } from "react-icons/md";

import {
  ChevronLast,
  ChevronFirst,
  MoreVertical,
  Home,
  LayoutDashboard,
  Phone,
} from "lucide-react";
import { TbLogout } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";

import { LOGOUT } from "../../APIS/user-auth-routes-api";
import { Link, useNavigate } from "react-router-dom"; // ← ✅ import useNavigate
import { useThemeColors } from "./colors";

export default function Sidebar({ expanded, setExpanded, isMobile }) {
  const { borderGrey, greyText, darkGrey, bgColor, borderGrey2, iconColor } =
    useThemeColors();

  const navigate = useNavigate(); // ← ✅ hook must be used inside the component

  const navItems = [
    {
      icon: <Home size={20} className={`${iconColor}`} />,
      label: "Home",
      to: "/",
    },
    {
      icon: <LayoutDashboard size={20} className={`${iconColor}`} />,
      label: "Dashboard",
      to: "/api/v1/dashboard",
    },
    {
      icon: <Phone size={20} className={`${iconColor}`} />,
      label: "Contact",
      to: "/api/v1/contact",
    },
    {
      icon: <MdPerson size={22} className={`${iconColor}`} />,
      label: "Contact",
      to: "/auth/login",
    },
    {
      icon: <FiLogOut size={20} className="text-painful-red" />,
      label: "Logout",
      onClick: async () => {
        try {
          await axios.get(LOGOUT, { withCredentials: true });
          navigate("/auth/login");
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full ${bgColor} shadow-md  transition-all duration-300 ${
        isMobile ? "w-14" : expanded ? "w-56" : "w-16"
      }`}
    >
      <nav className={`h-full flex flex-col ${iconColor} `}>
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`transition-all ${
              expanded ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
            alt="Logo"
          />
          {!isMobile && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="p-1.5 rounded-lg   "
            >
              {expanded ? (
                <ChevronFirst className={`${iconColor}`} />
              ) : (
                <ChevronLast className={`${iconColor}`} />
              )}
            </button>
          )}
        </div>

        <ul className="flex-1 px-3 space-y-2">
          {navItems.map(({ icon, label, to, onClick }) => (
            <li
              key={label}
              onClick={onClick} // ← ✅ handle click if present
              className={`flex items-center p-2 rounded-md  cursor-pointer transition-all ${
                expanded ? "justify-start" : "justify-center"
              }`}
            >
              {to ? (
                <Link to={to} className="flex items-center w-full">
                  <div className="flex items-center space-x-3">
                    {icon}
                    {!isMobile && expanded && (
                      <span className="text-sm font-medium">{label}</span>
                    )}
                  </div>
                </Link>
              ) : (
                <div className="flex items-center space-x-3 w-full">
                  {icon}
                  {!isMobile && expanded && (
                    <span className="text-sm font-medium">{label}</span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-700 flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=444444&color=ffffff&bold=true"
            className="w-10 h-10 rounded-md"
            alt="User"
          />
          <div
            className={`transition-all overflow-hidden items-center ${
              expanded ? "ml-3 w-52 flex" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-white">John Doe</h4>
              <span className="text-xs text-gray-400">johndoe@gmail.com</span>
            </div>
            <MoreVertical className="text-white" size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}
