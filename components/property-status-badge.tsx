import { PropertyStatus } from "@/types/propertyStatus";
import { Badge } from "./ui/badge";

const statusLabel = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  sold: "Sold",
  rented: "Rented",
  withdrawn: "Withdrawn",
  draft: "Draft",
};

const variant: {
  [key: string]:
    | "primary"
    | "slightPrimary"
    | "success"
    | "slightSuccess"
    | "destructive"
    | "secondary";
} = {
  "for-sale": "primary",
  "for-rent": "slightPrimary",
  sold: "success",
  rented: "slightSuccess",
  withdrawn: "destructive",
  draft: "secondary",
};

export default function PropertyStatusBadge({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) {
  const label = statusLabel[status];

  return (
    <Badge variant={variant[status]} className={className}>
      {label}
    </Badge>
  );
}
