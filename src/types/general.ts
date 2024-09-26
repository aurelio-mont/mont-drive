import { z } from "zod";

export const schemaQuery = z.object({
    page: z.number().nonnegative().int(),
    per_page: z.number().nonnegative().int(),
})