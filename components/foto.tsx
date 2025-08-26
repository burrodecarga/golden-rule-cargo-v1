import { AvatarFallback, AvatarImage, Avatar } from "./ui/avatar"

interface AvatarProps {
  uri: string|null|undefined
  size?: number
}

export default function Foto({ uri, size=32 }: AvatarProps) {
  const styles={ height: size, width: size, borderRadius: size/2 }
  if (uri)
    return (
      <Avatar>
        <AvatarImage src={uri} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
}
