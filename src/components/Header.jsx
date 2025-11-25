
import { useState } from "react";
import ProfileDropdown from "./DropDown";

export default function Header() {
   
    return (
        <header className="fixed top-0 left-0 right-0 h-16
         bg-white rounded-xl shadow-2xl border-b border-[#ececf1]
          flex items-center px-6 z-50">
            <div className="flex items-center h-full">
                <img
                    src="/exl-effects.png"
                    alt="Logo"
                    className="w-28  object-contain"
                />
            </div>
             <ProfileDropdown />
        </header>
    );
}



