"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Bitcoin,
  Building,
  Landmark,
  Eye,
  EyeOff,
  Plus,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SavingItem {
  id: string;
  name: string;
  type: "crypto" | "fiat" | "stock" | "bond" | "real-estate";
  symbol: string;
  amount: number;
  originalCurrency: string;
  currentPrice: number;
  change24h: number;
  changePercent: number;
  image?: string;
  goal?: number;
  description: string;
}

const mockSavings: SavingItem[] = [
  {
    id: "1",
    name: "Bitcoin",
    type: "crypto",
    symbol: "BTC",
    amount: 0.5,
    originalCurrency: "BTC",
    currentPrice: 43250.0,
    change24h: 1250.5,
    changePercent: 2.98,
    goal: 1.0,
    description: "Inversión a largo plazo en Bitcoin",
  },
  {
    id: "2",
    name: "Dólar Estadounidense",
    type: "fiat",
    symbol: "USD",
    amount: 5000,
    originalCurrency: "USD",
    currentPrice: 365.5,
    change24h: -2.5,
    changePercent: -0.68,
    goal: 10000,
    description: "Ahorro en dólares para emergencias",
  },
  {
    id: "3",
    name: "Apple Inc.",
    type: "stock",
    symbol: "AAPL",
    amount: 25,
    originalCurrency: "USD",
    currentPrice: 185.25,
    change24h: 3.75,
    changePercent: 2.06,
    goal: 50,
    description: "Acciones de Apple para diversificación",
  },
  {
    id: "4",
    name: "Ethereum",
    type: "crypto",
    symbol: "ETH",
    amount: 3.2,
    originalCurrency: "ETH",
    currentPrice: 2650.0,
    change24h: 85.3,
    changePercent: 3.32,
    goal: 5.0,
    description: "Ethereum para DeFi y staking",
  },
  {
    id: "5",
    name: "Bonos del Tesoro",
    type: "bond",
    symbol: "BOND",
    amount: 15000,
    originalCurrency: "ARS",
    currentPrice: 1.0,
    change24h: 0,
    changePercent: 0,
    description: "Bonos gubernamentales de bajo riesgo",
  },
];

const exchangeRates = {
  USD_ARS: 365.5,
  BTC_USD: 43250.0,
  ETH_USD: 2650.0,
  AAPL_USD: 185.25,
};

export const DashboardAhorros = () => {
  const [savings] = useState<SavingItem[]>(mockSavings);
  const [hideBalances, setHideBalances] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<"ARS" | "USD">(
    "ARS"
  );

  const getAssetIcon = (type: string, symbol: string) => {
    switch (type) {
      case "crypto":
        return symbol === "BTC" ? Bitcoin : "₿";
      case "fiat":
        return DollarSign;
      case "stock":
        return TrendingUp;
      case "bond":
        return Landmark;
      case "real-estate":
        return Building;
      default:
        return DollarSign;
    }
  };

  const getAssetColor = (type: string) => {
    switch (type) {
      case "crypto":
        return "bg-orange-100 text-orange-600 border-orange-200";
      case "fiat":
        return "bg-green-100 text-green-600 border-green-200";
      case "stock":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "bond":
        return "bg-purple-100 text-purple-600 border-purple-200";
      case "real-estate":
        return "bg-indigo-100 text-indigo-600 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const calculateValue = (item: SavingItem, currency: "ARS" | "USD") => {
    let valueInUSD = 0;

    switch (item.type) {
      case "crypto":
        valueInUSD = item.amount * item.currentPrice;
        break;
      case "fiat":
        if (item.originalCurrency === "USD") {
          valueInUSD = item.amount;
        } else {
          valueInUSD = item.amount / exchangeRates.USD_ARS;
        }
        break;
      case "stock":
        valueInUSD = item.amount * item.currentPrice;
        break;
      case "bond":
        if (item.originalCurrency === "ARS") {
          valueInUSD = item.amount / exchangeRates.USD_ARS;
        } else {
          valueInUSD = item.amount;
        }
        break;
      default:
        valueInUSD = item.amount;
    }

    return currency === "USD" ? valueInUSD : valueInUSD * exchangeRates.USD_ARS;
  };

  const totalValue = savings.reduce(
    (sum, item) => sum + calculateValue(item, selectedCurrency),
    0
  );
  const totalValueUSD = savings.reduce(
    (sum, item) => sum + calculateValue(item, "USD"),
    0
  );
  const totalValueARS = savings.reduce(
    (sum, item) => sum + calculateValue(item, "ARS"),
    0
  );

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: currency === "ARS" ? 0 : 2,
      maximumFractionDigits: currency === "ARS" ? 0 : 2,
    }).format(amount);
  };

  const getGoalProgress = (item: SavingItem) => {
    if (!item.goal) return 0;
    return (item.amount / item.goal) * 100;
  };

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
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setSelectedCurrency(selectedCurrency === "ARS" ? "USD" : "ARS")
            }
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            {selectedCurrency}
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Ahorro
          </Button>
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
                  {hideBalances
                    ? "••••••"
                    : formatCurrency(totalValue, selectedCurrency)}
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
                  {hideBalances
                    ? "••••••"
                    : formatCurrency(totalValueARS, "ARS")}
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
                  {hideBalances
                    ? "••••••"
                    : formatCurrency(totalValueUSD, "USD")}
                </p>
              </div>
              <div className="text-2xl">🇺🇸</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Ahorros */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {savings.map((item) => {
          const Icon = getAssetIcon(item.type, item.symbol);
          const valueARS = calculateValue(item, "ARS");
          const valueUSD = calculateValue(item, "USD");
          const goalProgress = getGoalProgress(item);

          return (
            <Card
              key={item.id}
              className="hover:shadow-lg transition-all duration-200"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center border-2",
                        getAssetColor(item.type)
                      )}
                    >
                      {typeof Icon === "string" ? (
                        <span className="text-xl">{Icon}</span>
                      ) : (
                        <Icon className="w-7 h-7" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {item.symbol}
                        </Badge>
                        <Badge
                          variant={
                            item.changePercent >= 0 ? "default" : "destructive"
                          }
                          className="text-xs"
                        >
                          {item.changePercent >= 0 ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {item.changePercent.toFixed(2)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Cantidad y Precio */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Cantidad</p>
                    <p className="font-semibold text-lg">
                      {hideBalances
                        ? "••••"
                        : item.amount.toLocaleString("es-AR", {
                            minimumFractionDigits:
                              item.type === "crypto" ? 4 : 0,
                            maximumFractionDigits:
                              item.type === "crypto" ? 4 : 0,
                          })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Precio Actual</p>
                    <p className="font-semibold text-lg">
                      {formatCurrency(
                        item.currentPrice,
                        item.type === "crypto" ? "USD" : item.originalCurrency
                      )}
                    </p>
                  </div>
                </div>

                {/* Valores en diferentes monedas */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      💵 Valor en USD:
                    </span>
                    <span className="font-bold text-green-600 text-lg">
                      {hideBalances
                        ? "••••••"
                        : formatCurrency(valueUSD, "USD")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      🇦🇷 Valor en ARS:
                    </span>
                    <span className="font-bold text-blue-600 text-lg">
                      {hideBalances
                        ? "••••••"
                        : formatCurrency(valueARS, "ARS")}
                    </span>
                  </div>
                </div>

                {/* Progreso hacia la meta */}
                {item.goal && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Progreso hacia la meta
                      </span>
                      <span className="font-medium">
                        {item.amount.toFixed(item.type === "crypto" ? 4 : 0)} /{" "}
                        {item.goal} {item.symbol}
                      </span>
                    </div>
                    <Progress value={goalProgress} className="h-2" />
                    <p className="text-xs text-gray-500 text-center">
                      {goalProgress.toFixed(1)}% completado
                    </p>
                  </div>
                )}

                {/* Descripción */}
                <p className="text-sm text-gray-600 bg-white p-3 rounded border-l-4 border-teal-500">
                  {item.description}
                </p>

                {/* Cambio en 24h */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-gray-600">Cambio 24h:</span>
                  <div
                    className={cn(
                      "flex items-center text-sm font-medium",
                      item.change24h >= 0 ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {item.change24h >= 0 ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {formatCurrency(
                      Math.abs(item.change24h),
                      item.type === "crypto" ? "USD" : item.originalCurrency
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
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
              const typeItems = savings.filter((item) => item.type === type);
              const typeValue = typeItems.reduce(
                (sum, item) => sum + calculateValue(item, "USD"),
                0
              );
              const percentage =
                totalValueUSD > 0 ? (typeValue / totalValueUSD) * 100 : 0;

              const typeNames = {
                crypto: "Cripto",
                fiat: "Fiat",
                stock: "Acciones",
                bond: "Bonos",
                "real-estate": "Inmuebles",
              };

              return (
                <div key={type} className="text-center">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center",
                      getAssetColor(type)
                    )}
                  >
                    <span className="text-2xl">
                      {type === "crypto" && "₿"}
                      {type === "fiat" && "💵"}
                      {type === "stock" && "📈"}
                      {type === "bond" && "🏛️"}
                      {type === "real-estate" && "🏠"}
                    </span>
                  </div>
                  <p className="font-semibold text-sm">
                    {typeNames[type as keyof typeof typeNames]}
                  </p>
                  <p className="text-xs text-gray-600">
                    {percentage.toFixed(1)}%
                  </p>
                  <p className="text-xs font-medium">
                    {formatCurrency(typeValue, "USD")}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
