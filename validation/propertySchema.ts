import { z } from "zod";

const PostalCodeComprehensive = z
  .string()
  .length(5, "Postal code must be exactly 5 characters")
  .regex(/^\d{5}$/, "Postal code must contain only digits")
  .refine(
    (val) => {
      const num = parseInt(val);
      return num >= 10000 && num <= 53296; // Actual Croatian postal code range
    },
    {
      message: "Must be a valid Croatian postal code (10000-53296)",
    }
  );

export const propertyDataSchema = z.object({
  address1: z.string().min(1, { message: "Address line 1 is required." }),
  address2: z.string().optional(),
  city: z.string().min(3, "City must contain at least 3 characters."),
  postcode: PostalCodeComprehensive,
  price: z.number().positive("Price must be greater than 0"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  bedrooms: z.number().min(1, "Bedrooms must be at least 1"),
  square_meters: z.number().min(1, "Square meters must be at least 1"),
  status: z.enum([
    "draft",
    "for-sale",
    "for-rent",
    "sold",
    "rented",
    "withdrawn",
  ]),
});
