import { useEffect } from "react";

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector("meta[name='description']");

    if (metaDescription && description) {
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);
}

