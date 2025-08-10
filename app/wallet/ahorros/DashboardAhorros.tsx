"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  TrendingUp,
  DollarSign,
  Bitcoin,
  Building,
  Landmark,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ModalActivos } from "@/app/components/ModalActivos";
import { CardAhorros } from "./components/CardAhorros";
import { useStoreFinancial } from "@/app/store/store";

interface SavingItem {
  id: string;
  name: string;
  type: "crypto" | "dolar" | "stock" | "bond" | "real-estate";
  symbol: string;
  amount: number;
  originalCurrency: string;
  currentPrice: number;
}

export const DashboardAhorros = () => {
  const [hideBalances, setHideBalances] = useState(false);
  const activesInWallet = useStoreFinancial((state) => state.activos);
  console.log(activesInWallet);

  // TODO: PENDIENTE DE USAR FUNCION QUE DEVUELVE ICONOS
  // const getAssetIcon = (type: string, symbol: string) => {
  //   switch (type) {
  //     case "crypto":
  //       return symbol === "BTC" ? Bitcoin : "₿";
  //     case "fiat":
  //       return DollarSign;
  //     case "stock":
  //       return TrendingUp;
  //     case "bond":
  //       return Landmark;
  //     case "real-estate":
  //       return Building;
  //     default:
  //       return DollarSign;
  //   }
  // };

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm">Valor Total</p>
                <p className="text-3xl font-bold">
                  {hideBalances ? "••••••" : null}
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">En Pesos Argentinos</p>
                <p className="text-2xl font-bold text-blue-600">
                  {hideBalances ? "••••••" : null}
                </p>
              </div>
              <div className="text-2xl">🇦🇷</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">En Dólares</p>
                <p className="text-2xl font-bold text-green-600">
                  {hideBalances ? "••••••" : null}
                </p>
              </div>
              <div className="text-2xl">🇺🇸</div>
            </div>
          </CardContent>
        </Card>
      </div>

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
            {["crypto", "fiat", "stock", "bond", "real-estate"].map((type) => {
              const typeNames = {
                crypto: "Cripto",
                fiat: "Fiat",
                stock: "Acciones",
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
                      {type === "stock" && "📈"}
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
