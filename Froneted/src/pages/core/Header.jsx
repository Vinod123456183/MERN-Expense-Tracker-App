import React, { useState } from "react";
import ToggleButton from "./ToggleButton"; // Assuming this is for the theme toggle

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state

  const handleLogoClick = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div>
      <header className="  md:ml-0    relative  w-full flex  items-center justify- py-3  lg:py-2   px-1 lg-px-3 ">
        {/* <div className="fixe ">Loo</div> */}
        <div className="  justify-end flex  w-full  lg:gap-2">
          <div className="bg-gradient p-2 flex hidden lf:block items-center justify-center gap-4 px-3 rounded-xl">
            <div className="bg-gradient bg-painful-red  ">
              <img
                src="https://imgs.search.brave.com/oZYPjK1Ng15jmvpQuFpYODALGUDnMyocOatW9U9oa_I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvcmVk/LWFuaW1lLXVjaGlo/YS1pdGFjaGktc3c2/ZHE2emw4ODByM2Rp/NS5qcGc"
                className=" rounded-xl bg-gradient h-7 w-7 lg:h-8 lg:w-8 "
                alt=""
              />
            </div>
            <div className="flex items-center justify-center text-sm">
              <p>ggg@gmail.com</p>
            </div>
          </div>
          <div className="p-2 ">
            <ToggleButton />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
