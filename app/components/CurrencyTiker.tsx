"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrencyData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  lastUpdate: Date;
}

interface CurrencyTickerProps {
  baseCurrency?: string;
  targetCurrency?: string;
  symbol?: string;
  name?: string;
  initialPrice?: number;
  updateInterval?: number;
  className?: string;
  compact?: boolean;
}

export function CurrencyTicker({
  baseCurrency = "USD",
  targetCurrency = "ARS",
  symbol = "USD/ARS",
  name = "Dólar Estadounidense",
  initialPrice = 350.5,
  updateInterval = 3000,
  className,
  compact = false,
}: CurrencyTickerProps) {
  const [currencyData, setCurrencyData] = useState<CurrencyData>({
    symbol,
    name,
    price: initialPrice,
    change: 0,
    changePercent: 0,
    high24h: initialPrice * 1.02,
    low24h: initialPrice * 0.98,
    lastUpdate: new Date(),
  });

  const [isLoading, setIsLoading] = useState(false);

  //   #TODO: CAMBIAR ESTO A TANSTACK QUERY

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);

      setTimeout(() => {
        setCurrencyData((prev) => {
          // Simular fluctuaciones realistas
          const volatility = 0.005; // 0.5% de volatilidad
          const randomChange = (Math.random() - 0.5) * 2 * volatility;
          const newPrice = prev.price * (1 + randomChange);
          const change = newPrice - initialPrice;
          const changePercent = (change / initialPrice) * 100;

          return {
            ...prev,
            price: newPrice,
            change,
            changePercent,
            high24h: Math.max(prev.high24h, newPrice),
            low24h: Math.min(prev.low24h, newPrice),
            lastUpdate: new Date(),
          };
        });
        setIsLoading(false);
      }, 500);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [initialPrice, updateInterval]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: targetCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}`;
  };

  const formatPercent = (percent: number) => {
    const sign = percent >= 0 ? "+" : "";
    return `${sign}${percent.toFixed(2)}%`;
  };

  const getTrendIcon = () => {
    if (currencyData.changePercent > 0) return TrendingUp;
    if (currencyData.changePercent < 0) return TrendingDown;
    return Minus;
  };

  const getTrendColor = () => {
    if (currencyData.changePercent > 0) return "text-green-600";
    if (currencyData.changePercent < 0) return "text-red-600";
    return "text-gray-600";
  };

  const TrendIcon = getTrendIcon();

  if (compact) {
    return (
      <Card
        className={cn(
          "transition-all duration-200",
          isLoading && "opacity-75",
          className
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">
                  {baseCurrency}
                </span>
              </div>
              <div>
                <p className="font-semibold text-sm">{currencyData.symbol}</p>
                <p className="text-xs text-gray-500">{currencyData.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">
                {formatPrice(currencyData.price)}
              </p>
              <div className={cn("flex items-center text-sm", getTrendColor())}>
                <TrendIcon className="w-3 h-3 mr-1" />
                <span>{formatPercent(currencyData.changePercent)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        isLoading && "opacity-75",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="font-bold text-blue-600">{baseCurrency}</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{currencyData.symbol}</h3>
              <p className="text-sm text-gray-500">{currencyData.name}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold mb-1">
              {formatPrice(currencyData.price)}
            </div>
            <div className={cn("flex items-center text-sm", getTrendColor())}>
              <TrendIcon className="w-4 h-4 mr-1" />
              <span className="mr-2">{formatChange(currencyData.change)}</span>
              <span>({formatPercent(currencyData.changePercent)})</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-xs text-gray-500 mb-1">Máximo 24h</p>
            <p className="font-semibold text-green-600">
              {formatPrice(currencyData.high24h)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Mínimo 24h</p>
            <p className="font-semibold text-red-600">
              {formatPrice(currencyData.low24h)}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500">
            Última actualización:{" "}
            {currencyData.lastUpdate.toLocaleTimeString("es-AR")}
          </p>
        </div>

        {isLoading && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
