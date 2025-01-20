import z from "zod";

export const createCapsuleSchema = z.object({
    title:z.string().trim(),
    description:z.string().trim().max(20),
    openDate:z.date()

})