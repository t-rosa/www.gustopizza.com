'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { userRegisterSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Lock, Mail, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export function UserRegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof userRegisterSchema>) {
    setIsLoading(true)

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email.toLowerCase(),
        password: values.password
      })
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: 'Il y a eu un problème.',
        description: 'Votre demande de création de compte a échoué. Veuillez réessayer.',
        variant: 'destructive'
      })
    }

    toast({
      title: 'Compte crée avec succès',
      description: 'Vous pouvez maintenant vous connecter !'
    })

    router.refresh()
    router.push('/login')
  }

  return (
    <>
      <div className='pb-6 pt-12'>
        <h3 className='text-2xl text-center'>Créer un compte</h3>
        <Link
          href='/'
          className={cn(
            buttonVariants({ variant: 'link' }),
            'block mx-auto w-fit text-sm text-muted-foreground'
          )}
        >
          Vous avez déjà un compte ?
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-sm space-y-8 mx-auto'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center ring-offset-background focus-within:ring-ring focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'>
                    <div className='flex items-center px-2 border-y border-l rounded-l-[calc(var(--radius)_-_7px)] h-10'>
                      <UserCheck strokeWidth={1} />
                    </div>
                    <Input
                      placeholder='Prénom'
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
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex items-center ring-offset-background focus-within:ring-ring focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'>
                    <div className='flex items-center px-2 border-y border-l rounded-l-[calc(var(--radius)_-_7px)] h-10'>
                      <UserCheck strokeWidth={1} />
                    </div>
                    <Input
                      placeholder='Nom'
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
              Créer un compte
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
