import bcrypt from "bcrypt"
import * as z from "zod"

import { db } from "@/lib/db"
import { userRegisterSchema } from "@/lib/validations/auth"

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = userRegisterSchema.parse(json)

    const hashPassword = await bcrypt.hash(body.password, 10)

    const user = await db.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashPassword
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(user))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
