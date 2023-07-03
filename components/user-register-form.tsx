"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { userRegisterSchema } from "@/lib/validations/auth"
import { Loader2, Lock, Mail, UserCheck } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function UserRegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof userRegisterSchema>) {
    setIsLoading(true)

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email.toLowerCase(),
        password: values.password,
      })
    })

    setIsLoading(false)

    if (!response?.ok) {

      return toast({
        title: "Il y a eu un problème.",
        description: "Votre demande de création de compte a échoué. Veuillez réessayer.",
        variant: "destructive",
      })
    }

    toast({
      title: "Compte crée avec succès",
      description: "Vous pouvez maintenant vous connecter !",
    })

    router.refresh()
    router.push('/login')
  }

  return (
    <>
      <div className="pb-6 pt-12">
        <h3 className="text-2xl text-center">Créer un compte</h3>
        <Link href="/" className="block text-sm text-muted-foreground text-center">Vous avez déjà un compte ?</Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm space-y-8 mx-auto">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <div className="flex items-center px-2 border-y border-l rounded-l-[calc(var(--radius)_-_7px)] h-10">
                      <UserCheck strokeWidth={1} />
                    </div>
                    <Input placeholder="Prénom" className="rounded-l-none" {...field} />
                  </div>

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <div className="flex items-center px-2 border-y border-l rounded-l-[calc(var(--radius)_-_7px)] h-10">
                      <UserCheck strokeWidth={1} />
                    </div>
                    <Input placeholder="Nom" className="rounded-l-none" {...field} />
                  </div>

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <div className="flex items-center px-2 border-y border-l rounded-l-[calc(var(--radius)_-_7px)] h-10">
                      <Mail strokeWidth={1} />
                    </div>
                    <Input type="email" placeholder="Adresse e-mail" className="rounded-l-none" {...field} />
                  </div>

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <div className="flex items-center px-2 border-y border-l rounded-l-[calc(var(--radius)_-_7px)] h-10">
                      <Lock strokeWidth={1} />
                    </div>
                    <Input type="password" placeholder="Mot de passe" className="rounded-l-none" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3">
            <Button type="submit" >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Connexion
            </Button>

            <Link href="/pizzas">Je ne souhaite pas me connecter</Link>
          </div>
        </form>
      </Form>
    </>
  )
}
