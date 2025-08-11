"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModalActivos } from "@/app/components/ModalActivos";
import { CardAhorros } from "./components/CardAhorros";
import { useStoreFinancial } from "@/app/store/store";
import { useDolarCurrency } from "@/app/hooks";
import { CardsBalance } from "@/app/components/CardsBalance";

export const DashboardAhorros = () => {
  const [hideBalances, setHideBalances] = useState(false);
  const activesInWallet = useStoreFinancial((state) => state.activos);
  console.log(activesInWallet);
  const total = useStoreFinancial(
    (state) =>
      state.totalAhorros + state.dolar + state.totalCriptos + state.acciones
  );
  const { data } = useDolarCurrency();

  const amountNumber = Number(total || 0);
  const ventaNumber = Number(data?.venta || 1);
  let totalUSD = (amountNumber / ventaNumber).toFixed(2);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Ahorros</h1>
          <p className="text-gray-600">
            Gestiona y monitorea tus inversiones y ahorros
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHideBalances(!hideBalances)}
          >
            {hideBalances ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            {hideBalances ? "Mostrar" : "Ocultar"}
          </Button>

          <ModalActivos />
        </div>
      </div>

      {/* Resumen Total */}
      <CardsBalance total={total} totalUSD={totalUSD} />

      {/* Lista de Ahorros */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activesInWallet?.map((item, index) => {
          return (
            <CardAhorros
              key={index}
              name={item.name}
              type={item.type}
              amount={item.amount}
              price={item.price}
              symbol={item.symbol}
              hide={hideBalances}
              currency={item.currency}
              valueInUSD={item.valueInUSD}
            />
          );
        })}
      </div>

      {/* Distribución por tipo */}
      <Card>
        <CardHeader>
          <CardTitle>Distribución de Ahorros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["crypto", "fiat", "accion", "bond", "real-estate"].map((type) => {
              const typeNames = {
                crypto: "Cripto",
                fiat: "Fiat",
                accion: "Acciones",
                bond: "Otros",
              };

              return (
                <div key={type} className="text-center">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center"
                    )}
                  >
                    <span className="text-2xl">
                      {type === "crypto" && "₿"}
                      {type === "fiat" && "💵"}
                      {type === "accion" && "📈"}
                      {type === "bond" && "🏛️"}
                    </span>
                  </div>
                  <p className="font-semibold text-sm">
                    {typeNames[type as keyof typeof typeNames]}
                  </p>

                  <p className="text-xs font-medium"></p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
