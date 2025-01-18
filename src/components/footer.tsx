import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full py-6 border-t">
      <Link href={"https://github.com/cassiollopes"} className="font-bold group hover:text-muted-foreground ease-in duration-300">
        Created by{" "}
        <span className="text-muted-foreground group-hover:text-foreground ease-in duration-300 relative">
          Cassio
          <div className="w-[100%] bg-muted-foreground absolute bottom-0 right-0 h-[2px] group-hover:w-0 ease-in duration-300" aria-hidden="true" role="presentation" aria-label=":"></div>
        </span>
        </Link>
    </footer>
  );
}