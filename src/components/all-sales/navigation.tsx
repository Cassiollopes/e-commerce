'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getNumberOfPages } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation({ query, page }: { query?: string, page?: string }) {
  const { replace } = useRouter();
  const [pages, setPages] = useState(0);

  const currentPage = Number(page) || 1;

  const [count, setCount] = useState(currentPage);

  const handleClick = (operation?: { remove?: boolean }) => {
    const newCount = operation?.remove ? count - 1 : count + 1;

    if (pages === 0) return
    if (newCount < 1) return
    if (newCount > pages) return

    setCount(newCount);
    replace(`?page=${newCount}`);
  };

  useEffect(() => {
    getNumberOfPages(query).then((result) => setPages(result));
  }, [query]);

  return (
    <Pagination>
      {pages ? (
        <PaginationContent>
          {count > 1 &&
            <PaginationItem>
              <PaginationPrevious className="hover:cursor-pointer" onClick={() => handleClick({ remove: true })} />
            </PaginationItem>
          }
          <PaginationItem>
            <PaginationLink className="hover:bg-transparent">{`${count} de ${pages}`}</PaginationLink>
          </PaginationItem>
          {count < pages &&
            <PaginationItem>
              <PaginationNext className="hover:cursor-pointer" onClick={() => handleClick()} />
            </PaginationItem>
          }
        </PaginationContent>
      ) : "..."}
    </Pagination>
  );
}