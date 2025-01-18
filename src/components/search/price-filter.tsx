'use client'

import SelectFilter from "./select-filter";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const filters = [
  {
    name: "Maior para menor",
    value: "desc"
  },
  {
    name: "Menor para maior",
    value: "asc"
  }
]

export default function PriceFilter({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    params.set('price', term);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={`${props.className} w-full`}>
      <div className="max-md:hidden">
        Preco
        <ul>
          {filters.map((filter, i) => (
            <li key={i}>
              <button className="hover:text-foreground/80 text-sm text-foreground/60 underline-offset-4 hover:underline"
                onClick={() => handleSearch(filter.value)}>
                {filter.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <SelectFilter
        param="price"
        placeholder="Filtrar por"
        label="Preço"
        items={[{ id: "desc", name: "Maior para menor" }, { id: "asc", name: "Menor para maior" }]}
      />
    </div>
  );
}