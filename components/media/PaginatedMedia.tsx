"use client";
import { useSearchParams } from "next/navigation";
import Pagination from "../Pagination";

export default function PaginatedMedia({
  MediaComponent,
  numberOfItems,
}: {
  MediaComponent: React.FunctionComponent<{ pageNumber: number }>;
  numberOfItems: number;
}) {
  return () => {
    const searchParams = useSearchParams();
    const pageParam = searchParams.get("page");
    const pageNumber = pageParam ? parseInt(pageParam) : 1;
    return (
      <div className="flex flex-col">
        <MediaComponent pageNumber={pageNumber} />
        {/* <Pagination numberOfItems={numberOfItems} currentPage={pageNumber} /> */}
      </div>
    );
  };
}
