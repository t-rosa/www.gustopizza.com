import { PropsWithChildren } from "react";

export default function OrderLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main>{children}</main>
      <footer>Panier</footer>
    </>
  )
}
