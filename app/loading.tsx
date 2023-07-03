import { Loader2 } from "lucide-react";

export default function Loading() {
  return <div className="w-screen h-screen grid place-items-center">
    <div className="flex gap-3">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <div className="text-2xl">Chargement...</div>
    </div>
  </div>
}
