import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"
import { UserCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "firstName">
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.firstName}</span>
          <UserCircle className="h-8 w-8" strokeWidth={1} />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
