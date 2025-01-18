'use client'

import { Search, TextSearch } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductsFiltered } from "@/lib/data";
import { Card } from "../ui/card";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProductFiltered } from "@/types";

const mostSearchProducts = [
  {
    name: 'Camisetas',
  },
  {
    name: 'Eletronicos',
  },
  {
    name: 'Celulares',
  },
  {
    name: 'Roupas',
  },
]

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [products, setProducts] = useState<ProductFiltered[]>([]);
  const [showList, setShowList] = useState(false);
  const [value, setValue] = useState<string>('');

  async function handleSearch(term: string) {
    setValue(term);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });

    const res = await getProductsFiltered(term);
    if (term) return setProducts(res);
    setProducts([]);
  }

  useEffect(() => {
    if (pathname === '/search') return setValue(searchParams.get('query')?.toString() || '');
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      if (document.activeElement instanceof HTMLInputElement) {
        document.activeElement.blur();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <div className="relative flex items-center flex-1">
      <Input
        placeholder="Procurando algo?"
        className="pr-7 overflow-ellipsis"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        value={value}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur();
            if (pathname !== '/search') replace(`/search?query=${e.currentTarget.value}`);
          }
        }}
        onFocus={() => setShowList(true)}
        onBlur={() => { setShowList(false); setProducts([]); if (pathname !== '/search') setValue(''); }}
        autoCapitalize="off"
        enterKeyHint="enter"
      />
      <Search className="h-4 w-4 absolute right-3" />
      <AnimatePresence>
        {showList && pathname !== '/search' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .3, ease: 'easeInOut' }}
            className="bg-background border shadow-2xl rounded-2xl absolute z-40 top-12 left w-full p-4"
          >
            {products?.length === 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TextSearch className="h-5 w-5" />
                  <h2>Mais procurados</h2>
                </div>
                <ul className="overflow-y-auto max-h-[50vh]">
                  {mostSearchProducts.map((product, i) => (
                    <li key={i}>
                      <Link
                        href={`/search?query=${product.name}`}
                        className="flex items-center gap-2 py-2 px-3 hover:bg-accent rounded-lg"
                      >
                        <span className="font-bold">{i + 1}</span>
                        <span className="text-sm">{product.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {products.length > 0 && (
              <ul className="flex flex-col gap-2">
                {products.map((product, i) => (
                  <li key={i}>
                    <Link href={`/product/${product.id}`} className="group flex justify-between items-center gap-2 border-b pb-2 p-1">
                      <Card className="max-w-[70px] aspect-square group-hover:border-blue-500 transition ease-linear duration-150">
                        <Image
                          src={product.image ?? ""}
                          alt=""
                          width={100}
                          height={100}
                          className="h-full w-full object-contain"
                          priority
                          loading="eager"
                        />
                      </Card>
                      <div className="flex flex-col items-end">
                        <h2 className="font-bold">{product.name}</h2>
                        <h3 className="text-sm text-muted-foreground">{product.description}</h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}