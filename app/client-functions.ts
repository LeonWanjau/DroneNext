import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MediaTypes,
  getMediaPageNumberParamName,
  getNumberOfItemsPerPage,
} from "./functions";

const emailAddress = "leonwanjau@gmail.com";

export function sendMail(subject: string, body: string) {
  const url = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  //   window.location.href = encodeURI(url);
  window.open(encodeURI(url), "_blank");
}

export function useGetPageNumber(mediaType: MediaTypes) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get(getMediaPageNumberParamName(mediaType));
  const pageNumber = pageParam ? parseInt(pageParam) : 1;
  return pageNumber;
}

export function useGetItemsBasedOnPageNumber<T>(
  pageNumber: number,
  items: T[]
) {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  useEffect(() => {
    if (pageNumber === 0) {
      setSelectedItems([]);
      return;
    }
    const itemsPerPage = getNumberOfItemsPerPage();
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + (itemsPerPage);
    setSelectedItems(items.slice(startIndex, endIndex));
  }, [pageNumber, items]);

  return selectedItems;
}
