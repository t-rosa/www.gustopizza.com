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
import { userAuthSchema } from "@/lib/validations/auth"
import { Loader2, Lock, Mail } from "lucide-react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof userAuthSchema>>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof userAuthSchema>) {
    setIsLoading(true)

    const signInResult = await signIn("credentials", {
      email: values.email.toLowerCase(),
      password: values.password,
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/pizzas",
    })

    setIsLoading(false)

    console.log(signInResult)
    if (signInResult?.error) {
      return toast({
        title: "Il y a eu un problème.",
        description: "Votre demande de connexion a échoué. Veuillez réessayer.",
        variant: "destructive",
      })
    }

    toast({
      title: "Connexion réussie",
      description: "Bienvenue chez Gusto Pizza !",
    })

    router.push("/pizzas")
  }

  return (
    <>
      <div className="pb-6 pt-12">
        <h3 className="text-2xl text-center">Connectez-vous</h3>
        <Link href="/register" className="block text-sm text-muted-foreground text-center">Ou créer un compte</Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm space-y-8 mx-auto">
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
