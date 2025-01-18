import Image from "next/image";

export default function SalesAvatar({ sale }: { sale: { user: { name: string | null, image: string | null }, userId: string } }) {
  return (
    <div className="flex items-center gap-2 max-md:gap-1">
      <div className="aspect-square w-[40px] overflow-hidden rounded-full" >
        <Image
          src={sale.user.image ?? ""}
          alt={sale.userId}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid flex-1 font-semibold">
        <h3 className="truncate text-sm">{sale.user.name?.split(" ").slice(0, 2).join(" ")}</h3>
        <h4 className="text-xs truncate text-muted-foreground">{sale.userId}</h4>
      </div>
    </div>
  )
}