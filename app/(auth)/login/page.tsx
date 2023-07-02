import { UserAuthForm } from "@/components/user-auth-form"
import { UserCircle } from 'lucide-react'

export default function LoginPage() {
  return (
    <>
      <header className="font-display rounded-b-[8rem] header-image px-6 text-white grid grid-cols-[auto_1fr_auto] h-[20rem] grid-rows-[5rem_1fr]  relative">
        <div className="row-[1/2] col-[1/2] grid place-items-center">
          <h1 className="text-2xl">Gusto Pizza</h1>
        </div>
        <div className='row-[1/2] col-[3/4] grid place-items-center'>
          <UserCircle strokeWidth={1} className="w-8 h-8" />
        </div>
        <div className="row-[2/3] col-[2/3] grid place-items-center">
          <h2 className="text-5xl">Bienvenue</h2>
        </div>
      </header>
      <main className="">
        <UserAuthForm />
      </main>
    </>
  )
}
