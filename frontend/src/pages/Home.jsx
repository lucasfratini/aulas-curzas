import React from "react";
import { Card, CardContent } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";


export default function Home() {
  const secciones = [
    "Usuarios",
    "Aulas",
    "Materias",
    "Docentes",
    "Carreras",
    "Horarios",
    "Departamentos"
  ];

  return (
    <main className="min-h-screen bg-[#f4f0ec] text-[#333] px-6 py-8">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold text-[#0a4e78] mb-2">Panel de Gestión</h1>
        <p className="text-gray-600">Seleccione una sección para administrar</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {secciones.map((nombre, idx) => (
          <Card key={idx} className="bg-white rounded-xl shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[#0a4e78]">{nombre}</h2>
              <Button className="mt-4 bg-[#0a4e78] hover:bg-[#0c5d90] text-white w-full">
                Ingresar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}