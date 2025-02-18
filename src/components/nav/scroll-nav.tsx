"use client";

import { Filter } from "lucide-react";
import Link from "next/link";
import Cart from "../cart";
import { useEffect, useState } from "react";
import SearchInput from "../nav/search-input";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import CategoryFilter from "../search/category-filter";
import PriceFilter from "../search/price-filter";
import { Logo } from "../logo";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

export default function ScrollNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  useMotionValueEvent(scrollYProgress, "change", () => {
    setOpen(false);
  });

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("storage", () => setVisible(true));
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="md:hidden max-md:fixed top-0 left-0 right-0 z-50 max-md:flex 
      bg-background items-center justify-between p-3 flex-wrap drop-shadow-sm border-b"
      >
        <Link
          href="/"
          className={`h-10 ${searchOpen ? "w-0 opacity-0" : "w-10 border-r mr-2"} transition-all 
        ease-in-out duration-300 flex items-center justify-center`}
        >
          <Logo />
        </Link>
        <div
          className="flex-1"
          onFocus={() => {
            setSearchOpen(true);
            setOpen(false);
          }}
          onBlur={() => {
            setTimeout(() => setSearchOpen(false), 300);
          }}
        >
          <SearchInput />
        </div>
        <div
          className={`${searchOpen ? "w-0 opacity-0" : "ml-2 w-11"} transition-all ease-in-out duration-300`}
        >
          {pathname === "/search" ? (
            <Button
              variant="outline"
              onClick={() => (open ? setOpen(false) : setOpen(true))}
              className="h-11 w-11"
            >
              <Filter />
            </Button>
          ) : (
            <Cart />
          )}
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: ".5rem" }}
              exit={{ height: 0, opacity: 0, marginTop: "0" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full order-4 gap-1 flex flex-col overflow-hidden"
            >
              <CategoryFilter />
              <PriceFilter />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
