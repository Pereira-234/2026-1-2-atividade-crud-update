import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Bem-vindo à nossa Loja</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Explore nossa vitrine de produtos importados com os melhores preços do mercado.
      </p>
      <Link href="/produtos">
        <Button size="lg">Ver Catálogo de Produtos</Button>
      </Link>
    </main>
  );
}