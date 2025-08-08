"use client";

import { Card, CardContent } from "@/components/ui/card";

import { cn, formatearFecha } from "@/lib/utils";
import { CurrencyData } from "../../interfaces/currency";

export function CurrencyTicker({
  moneda,
  nombre,
  compra,
  venta,
  fechaActualizacion,
  isLoading,
  refetch,
  logo,
}: CurrencyData) {
  if (isLoading) {
    return (
      <Card
        className={cn(
          "transition-all duration-200",
          "opacity-75",
          "bg-white shadow-md rounded-lg"
        )}
      >
        <CardContent className="p-4">
          <p className="text-center">Cargando datos del dólar...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center">
              <img
                src={`/${logo}`}
                alt="cripto logo"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">{moneda}</p>
              <p className="text-xs text-gray-500">{nombre}</p>
              <button
                className="bg-[#0F172B] text-white rounded-sm p-2"
                onClick={() => refetch()}
              >
                Actualizar
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center text-right">
            {venta ? (
              <div>
                <p className="text-lg">
                  Precio venta: <span className="font-bold"> $ {venta}</span>
                </p>
                <p className="text-lg">
                  Precio compra: <span className="font-bold"> $ {compra}</span>
                </p>
              </div>
            ) : (
              <p className="text-lg">
                Precio compra: <span className="font-bold"> $ {compra}</span>
              </p>
            )}
          </div>
        </div>
        <p className="pt-8">
          Fecha de actualizacion: {formatearFecha(fechaActualizacion || "")}
        </p>
      </CardContent>
    </Card>
  );
}
