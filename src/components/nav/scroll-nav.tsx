'use client'

import { Box, Filter } from "lucide-react";
import Link from "next/link";
import Cart from "../cart";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion'
import SearchInput from "../nav/search-input";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import CategoryFilter from "../search/category-filter";
import PriceFilter from "../search/price-filter";

export default function ScrollNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current && currentScrollY > 100) {
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
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            whileInView={{ boxShadow: "0 0px 50px rgba(0, 0, 0, 0.1)" }}
            exit={{ y: open ? -200 : -100 }}
            transition={{ duration: .8, ease: "easeInOut" }}
            className="md:hidden max-md:fixed top-0 left-0 right-0 z-50 max-md:flex 
            bg-background items-center justify-between p-3 pl-2 flex-wrap min-h-[68px]"
          >
            {!searchOpen && (
              <Link href="/" className="bg-background h-10 w-10 flex items-center justify-center border-r">
                <Box className="h-5 w-5" />
              </Link>
            )}
            <div
              className="flex-1 px-2"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => { setTimeout(() => setSearchOpen(false), 500) }}
            >
              <SearchInput />
            </div>
            {!searchOpen && (
              pathname === "/search" ? (
                <Button variant="outline"
                  onClick={() => open ? setOpen(false) : setOpen(true)}
                >
                  <Filter />
                </Button>
              ) : <Cart />
            )}
            <AnimatePresence>
              {open && pathname === "/search" && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: .5, ease: "easeInOut" }}
                  className="w-full order-4 gap-1 flex flex-col overflow-hidden">
                  <CategoryFilter />
                  <PriceFilter />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}