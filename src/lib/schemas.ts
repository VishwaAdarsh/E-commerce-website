import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters."),
  sku: z.string().min(3, "SKU is required."),
  category: z.string().min(1, "Category is required."),
  price: z.number().positive("Price must be greater than zero."),
  stock: z.number().int().min(0, "Stock cannot be negative."),
  status: z.enum(["ACTIVE", "LOW STOCK", "DRAFT"]),
  description: z.string().min(10, "Description must be at least 10 characters."),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;
