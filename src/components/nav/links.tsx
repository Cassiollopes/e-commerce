import Link from "next/link";

const links = [
  {
    title: "All",
    href: "/search",
  },
  {
    title: "Camisetas",
    href: "/search?category=camisetas",
  },
  {
    title: "Acessorios",
    href: "/search?category=acessorios",
  },
];

export default function Links({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ul
      className={`flex justify-center items-center gap-6 ${props.className} max-md:flex-col max-md:items-start max-md:font-semibold max-md:gap-1`}
    >
      {links.map((link) => (
        <li key={link.title}>
          <Link
            href={link.href}
            className="hover:underline max-md:text-xl text-sm text-foreground/60 underline-offset-4 hover:text-foreground/80"
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
