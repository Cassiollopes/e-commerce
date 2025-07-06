"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleAlert, Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { Logo } from "./logo";

export function LoginForm({
  className,
  next,
  error,
  ...props
}: { next?: string; error?: string } & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-6 w-full max-w-[400px]", className)}
      {...props}
    >
      {next === "/checkout" && (
        <span className="font-bold text-muted-foreground">
          Faca login para acessar {next}
        </span>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex items-center font-extrabold">
            <Logo className="h-8 w-8" />
            Login
          </CardTitle>
          <CardDescription>Escolha uma das opcoes abaixo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full rounded-full font-bold"
                onClick={() => signIn("google", { redirectTo: next || "/" })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continuar com Google
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Ou
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full rounded-full font-bold"
                onClick={() => signIn("github", { redirectTo: next || "/" })}
              >
                <Github className="h-6 w-6" />
                Continuar com GitHub
              </Button>
            </div>
          </div>
          {error && (
            <Card className="flex items-center gap-2 border-red-600 bg-red-400 p-4 mt-4 justify-center  text-white">
              <div>
                <CircleAlert size={20} />
              </div>
              <p className="text-sm">
                {error === "OAuthAccountNotLinked"
                  ? "Este e-mail já está vinculado a outro login. Use o provedor original."
                  : "Erro ao fazer login. Tente novamente."}
              </p>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
