import { useEffect, useState } from "react";

function resolveLimit(width) {
  if (width <= 640) {
    return 10;
  }

  if (width <= 1024) {
    return 12;
  }

  return 15;
}

export function useProductsPerPage() {
  const [limit, setLimit] = useState(() => resolveLimit(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setLimit(resolveLimit(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return limit;
}

