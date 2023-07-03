import { PropsWithChildren } from "react";
import { getCurrentUser } from '@/lib/session';
import { UserAccountNav } from "@/components/user-account-nav";

export default async function OrderLayout({ children }: PropsWithChildren) {
  const user = await getCurrentUser()

  return (
    <>
      <header className='flex justify-between px-12'>
        <div className='text-2xl'>Gusto Pizza</div>
        {user && <UserAccountNav user={user} />}
      </header>
      <main>{children}</main>
      <footer>Panier</footer>
    </>
  )
}
