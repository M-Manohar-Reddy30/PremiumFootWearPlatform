import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),

  description: z.string().min(10),

  price: z.coerce.number().min(1),

  discountPrice: z.coerce.number().min(0),

  category: z.string().min(1),

  stock: z.coerce.number().min(0),
});

export type ProductSchemaType =
  z.infer<typeof productSchema>;