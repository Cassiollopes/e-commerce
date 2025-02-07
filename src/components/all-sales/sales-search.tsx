"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function SalesSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  async function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative flex items-center">
      <Input
        placeholder="Pesquisar vendas..."
        className="pr-7 overflow-ellipsis bg-muted/40 border-none p-4 rounded-xl"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Search className="h-4 w-4 absolute right-3" />
    </div>
  );
}
