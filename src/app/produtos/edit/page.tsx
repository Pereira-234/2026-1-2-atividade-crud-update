'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Estados para os campos que queremos editar
  const [title, setTitle] = useState("iPhone 9");
  const [price, setPrice] = useState(549); // Adicionado estado para preço

  async function handleSave() {
    setLoading(true);

    try {
      const res = await fetch('https://dummyjson.com/products/1', {
        method: 'PUT', // PUT substitui o objeto, PATCH atualizaria apenas o que enviamos
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          price: Number(price) // Garantimos que o preço vai como número
        })
      });

      const data = await res.json();
      console.log("Resposta da API (Produto atualizado):", data);
      
      alert(`Sucesso! Novo título: ${data.title}, Novo preço: $${data.price}`);
      router.push("/produtos"); 
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao salvar alterações.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-10 flex justify-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Editar Produto #1</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Campo de Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Nome do Produto</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Ex: iPhone 15 Pro"
            />
          </div>
          
          {/* Campo de Preço */}
          <div className="space-y-2">
            <Label htmlFor="price">Preço ($)</Label>
            <Input 
              id="price" 
              type="number"
              value={price} 
              onChange={(e) => setPrice(Number(e.target.value))} 
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2 text-muted-foreground">
            <Label>Descrição</Label>
            <Textarea placeholder="Descrição não editável neste exemplo." disabled />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <Link href="/produtos">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
            {loading ? "A guardar..." : "Salvar Alterações"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}