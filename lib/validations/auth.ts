import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  password: z.string()
})

export const userRegisterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  password: z.string()
})
