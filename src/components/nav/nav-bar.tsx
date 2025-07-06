"use client";

import UserMenu from "../menu/user-menu";
import Links from "./links";
import Cart from "../cart";
import MenuMobile from "../menu/menu-mobile";
import { useEffect, useState } from "react";
import SearchInput from "./search-input";
import { LogoRounded } from "../logo";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <nav
      data-scroll={scroll}
      className="data-[scroll=true]:md:shadow-md data-[scroll=true]:md:border-b 
      transition ease-linear duration-150 md:sticky z-50 top-0 bg-background flex items-center justify-between py-4 px-6
      max-md:gap-2 gap-4 max-md:flex-wrap"
    >
      <div className="flex items-center md:w-1/3 gap-4">
        <LogoRounded />
        <Links className="max-md:hidden" />
      </div>
      <div className="w-1/3 max-md:w-full max-md:order-3">
        <SearchInput />
      </div>
      <div className="flex items-center md:w-1/3 justify-between max-md:justify-end gap-2">
        <div className="max-md:hidden flex items-center justify-center gap-4">
          <UserMenu />
          <Link
            className={`rounded-full bg-blue-500 dark:bg-blue-700 dark:border-blue-400 text-white border-blue-700 p-6 py-2 border-[1.5px] flex gap-2 items-center justify-center text-sm transition-all hover:bg-blue-600 dark:hover:bg-blue-600`}
            href="/dashboard"
          >
            <PanelsTopLeft size={16} />
            Dashboard
          </Link>
        </div>
        <div className="md:hidden">
          <MenuMobile />
        </div>
        <Cart />
      </div>
    </nav>
  );
}
