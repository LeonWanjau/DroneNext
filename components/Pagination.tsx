"use client";

import {
  MediaTypes,
  getMediaPageNumberParamName,
  getNumberOfItemsPerPage,
} from "@/app/functions";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadCnPagination,
} from "./ui/pagination";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  numberOfItems,
  currentPage,
  mediaType,
  urlHash,
}: {
  numberOfItems: number;
  currentPage: number;
  mediaType: MediaTypes;
  urlHash?: string;
}) {
  const lastPage = Math.ceil(numberOfItems / getNumberOfItemsPerPage());
  if (currentPage > lastPage) {
    currentPage = lastPage;
  }
  const inFirstPage = currentPage == 1;
  const inLastPage = currentPage == lastPage;
  const router = useRouter();

  const onPaginationClicked = useMemo(
    () => (newPage: number) => {
      const url = new URL(window.location.href);
      url.searchParams.set(
        getMediaPageNumberParamName(mediaType),
        newPage.toString()
      );
      if (urlHash) {
        url.hash = urlHash;
      }
      router.replace(url.href);
      // router.push(url.href,{});
      // window.history.replaceState({}, "", url.href);
    },
    [mediaType, urlHash, router]
  );

  return (
    <ShadCnPagination>
      <PaginationContent>
        {!inFirstPage && (
          <>
            <PaginationItem
              className="cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                onPaginationClicked(1);
              }}
            >
              <PaginationLink className="gap-1 pl-2.5 pr-4 w-auto">
                <ChevronLeft className="h-4 w-4" />
                <span>First</span>
              </PaginationLink>
            </PaginationItem>
            {currentPage - 1 != 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {lastPage >= 3 && inLastPage && (
              <PaginationItem
                className="cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  onPaginationClicked(currentPage - 2);
                }}
              >
                <PaginationLink>{currentPage - 2}</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem
              className="cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                onPaginationClicked(currentPage - 1);
              }}
            >
              <PaginationLink>{currentPage - 1}</PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem
          className="cursor-pointer"
          onClick={(event) => {
            event.preventDefault();
            onPaginationClicked(currentPage);
          }}
        >
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        {!inLastPage && (
          <>
            <PaginationItem
              className="cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                onPaginationClicked(currentPage + 1);
              }}
            >
              <PaginationLink>{currentPage + 1}</PaginationLink>
            </PaginationItem>
            {lastPage >= 3 && inFirstPage && (
              <PaginationItem
                className="cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  onPaginationClicked(currentPage + 2);
                }}
              >
                <PaginationLink>{currentPage + 2}</PaginationLink>
              </PaginationItem>
            )}
            {currentPage + 1 != lastPage && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem
              className="cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                onPaginationClicked(lastPage);
              }}
            >
              <PaginationLink className="gap-1 pr-2.5 pl-4 w-auto">
                <span>Last</span>
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </ShadCnPagination>
  );
}
