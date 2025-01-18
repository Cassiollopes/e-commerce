'use client'

import { usePathname, useSearchParams } from "next/navigation";
import SelectFilter from "./select-filter";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/types";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/data";
import { Skeleton } from "../ui/skeleton";

export default function CategoryFilter({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [categories, setCategories] = useState<CategoryType[]>();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    params.set('category', term);
    params.delete('query');

    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    getCategories().then((result) => setCategories([{ name: 'tudo' }, ...result]));
  }, []);

  return (
    <div className={`${props.className} w-full text-end`}>
      <div className="max-md:hidden">
        Filtro de Categoria
        {categories && categories.length > 0 ? (
          <ul>
            {categories.map((category, i) => (
              <li key={i}>
                <button
                  onClick={() => handleSearch(category.name)}
                  className="hover:text-foreground/80 text-sm text-foreground/60 underline-offset-4 hover:underline"
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <Skeleton className="w-20 h-4 mt-2 ml-auto" />
        )}
      </div>
      <SelectFilter
        param="category"
        placeholder="Selecione uma Categoria"
        label="Categoria"
        items={categories || [{ name: 'carregando...' }]}
      />
    </div>
  )
}