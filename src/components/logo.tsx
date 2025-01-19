import { Box } from "lucide-react"
import Link from "next/link"

export const LogoRounded = () => {
  return (
    <Link href="/" className="flex items-center justify-between gap-2">
      <div className="bg-background h-10 w-10 flex items-center justify-center rounded-xl border" >
        <Box className="h-5 w-5" />
      </div>
      <span className="text-base max-md:text-lg max-md:font-bold font-semibold max-md:block max-[1100px]:hidden mr-2">
        SLA STORE
      </span>
    </Link>
  )
}