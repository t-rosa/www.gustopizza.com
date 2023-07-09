'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { userAuthSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Lock, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof userAuthSchema>>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof userAuthSchema>) {
    setIsLoading(true)

    const signInResult = await signIn('credentials', {
      email: values.email.toLowerCase(),
      password: values.password,
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/pizzas'
    })

    setIsLoading(false)

    if (signInResult?.error) {
      return toast({
        title: 'Il y a eu un problème.',
        description: 'Votre demande de connexion a échoué. Veuillez réessayer.',
        variant: 'destructive'
      })
    }

    router.refresh()

    return toast({
      title: 'Connexion réussie',
      description: 'Bienvenue chez Gusto Pizza !'
    })
  }

  return (
    <>
      <div className='pb-6 pt-12 flex flex-col items-center'>
        <h3 className='text-2xl text-center'>Connectez-vous</h3>
        <Link
          href='/register'
          className={cn(buttonVariants({ variant: 'link' }), 'text-sm text-muted-foreground')}
        >
          Ou créer un compte
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-sm space-y-8 mx-auto'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center ring-offset-background focus-within:ring-ring focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'>
                    <div className='flex items-center px-2 border-y border-l rounded-l-[calc(var(--radius)_-_7px)] h-10'>
                      <Mail strokeWidth={1} />
                    </div>
                    <Input
                      type='email'
                      placeholder='Adresse e-mail'
                      className='rounded-l-none focus-visible:ring-0'
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center ring-offset-background focus-within:ring-ring focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'>
                    <div className='flex items-center px-2 border-y border-l rounded-l-[calc(var(--radius)_-_7px)] h-10'>
                      <Lock strokeWidth={1} />
                    </div>
                    <Input
                      type='password'
                      placeholder='Mot de passe'
                      className='rounded-l-none focus-visible:ring-0'
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex flex-col gap-3'>
            <Button type='submit'>
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Connexion
            </Button>

            <Link href='/pizzas' className={cn(buttonVariants({ variant: 'link' }))}>
              Je ne souhaite pas me connecter
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}
