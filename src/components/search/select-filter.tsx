'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type item = {
  name: string,
  id?: string
}

export default function SelectFilter({ items, placeholder, label, param }: {
  items: item[],
  placeholder: string,
  label: string,
  param: string
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selected, setSelected] = useState<string>('');

  function handleSearch(term: string) {
    setSelected(term);
    const params = new URLSearchParams(searchParams);
    params.set(param, term);
    if(param === 'category') params.delete('query');

    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    setSelected(searchParams.get(param)?.toString() || '');
  }, [searchParams]);

  return (
    <Select value={selected}>
      <SelectTrigger className="w-full md:hidden">
        {selected ? `${label} | ${selected}` : placeholder}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map((item: item, i) => (
            <SelectItem
              key={i}
              value={item.id || item.name}
              onClick={() => handleSearch(item.id || item.name)}
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}