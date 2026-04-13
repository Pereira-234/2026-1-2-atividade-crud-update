import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// Tipagem simples para os dados da API
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=10");
  if (!res.ok) throw new Error("Falha ao carregar produtos");
  const data = await res.json();
  return data.products as Product[];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Nossos Produtos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col justify-between">
            <CardHeader>
              <div className="aspect-video relative overflow-hidden rounded-md mb-4">
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform"
                />
              </div>
              <CardTitle className="text-xl">{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-bold">
                ${product.price.toFixed(2)}
              </span>
              <button className="text-sm font-medium underline underline-offset-4">
                Detalhes
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}