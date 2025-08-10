import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency, getAssetColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Icon } from "lucide-react";
import { Ahorros } from "@/app/interfaces/currency";

export const CardAhorros = ({
  type,
  name,
  amount,
  price,
  symbol,
  hide,
  valueInUSD,
  currency,
}: Ahorros) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center border-2",
                getAssetColor(type)
              )}
            >
              {typeof Icon === "string" ? (
                <span className="text-xl">{Icon}</span>
              ) : null}
            </div>
            <div>
              <CardTitle className="text-xl">{type?.toUpperCase()}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {symbol}
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
            <p className="text-sm text-gray-600">Cantidad en ARS</p>
            <p className="font-semibold text-lg">
              {/* {hide
                ? "••••"
                : amount.toLocaleString("es-AR", {
                    minimumFractionDigits: type === "crypto" ? 4 : 0,
                    maximumFractionDigits: type === "crypto" ? 4 : 0,
                  })} */}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Precio Actual</p>
            <p className="font-semibold text-lg">
              {/* {formatCurrency(price, type === "crypto" ? "USD" : "ARS")} */}
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
              {hide ? "••••••" : <p>U$ {valueInUSD}</p>}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              🇦🇷 Valor en ARS:
            </span>
            <span className="font-bold text-blue-600 text-lg">
              {hide ? "••••••" : <p>$ {amount}</p>}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
