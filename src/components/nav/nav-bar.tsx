"use client";

import UserMenu from "../menu/user-menu";
import Links from "./links";
import Cart from "../cart";
import MenuMobile from "../menu/menu-mobile";
import { useEffect, useState } from "react";
import SearchInput from "./search-input";
import { LogoRounded } from "../logo";

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
        <div className="max-md:hidden">
          <UserMenu />
        </div>
        <div className="md:hidden">
          <MenuMobile />
        </div>
        <Cart />
      </div>
    </nav>
  );
}
