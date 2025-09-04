"use client";

import { useEffect, useState } from "react";
import numeral from "numeral";

interface PriceDisplayProps {
  price: number;
  currency?: string;
}

export function PriceDisplay({ price, currency = "€" }: PriceDisplayProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder during SSR to prevent hydration mismatch
    return (
      <span>
        {price.toLocaleString()} {currency}
      </span>
    );
  }

  return (
    <span>
      {numeral(price).format("0,0")} {currency}
    </span>
  );
}
