'use client'

import { Filter } from "lucide-react";
import Link from "next/link";
import Cart from "../cart";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion'
import SearchInput from "../nav/search-input";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import CategoryFilter from "../search/category-filter";
import PriceFilter from "../search/price-filter";
import { Logo } from "../logo";

export default function ScrollNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current && currentScrollY > 150) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setSearchOpen(false) }, [pathname]);

  return (
    <nav
      className={`${visible ? "translate-y-0" : "-translate-y-full delay-500"} transition-all
      ease-in-out duration-700 delay-200 md:hidden max-md:fixed top-0 left-0 right-0 z-50 max-md:flex 
      bg-background items-center justify-between p-3 flex-wrap drop-shadow-sm border-b`}
    >
      <Link href="/" className={`h-10 ${searchOpen ? "w-0 opacity-0" : "w-10 border-r mr-2"} transition-all 
        ease-in-out duration-500 flex items-center justify-center`}>
        <Logo />
      </Link>
      <div
        className="flex-1"
        onFocus={() => { setSearchOpen(true); setOpen(false) }}
        onBlur={() => { setTimeout(() => setSearchOpen(false), 300) }}
      >
        <SearchInput />
      </div>
      <div
        className={`${searchOpen ? "w-0 opacity-0" : "ml-2 w-11"} transition-all ease-in-out duration-500`}>
        {
          pathname === "/search" ? (
            <Button variant="outline"
              onClick={() => open ? setOpen(false) : setOpen(true)}
              className="h-11 w-11"
            >
              <Filter />
            </Button>
          ) : (
            <Cart />
          )
        }
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: ".5rem" }}
            exit={{ height: 0, opacity: 0, marginTop: "0" }}
            transition={{ duration: .5, ease: "easeInOut" }}
            className="w-full order-4 gap-1 flex flex-col overflow-hidden">
            <CategoryFilter />
            <PriceFilter />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}