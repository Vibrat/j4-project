import z from "zod"

export const authSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export type AuthSchema = z.infer<typeof authSchema>