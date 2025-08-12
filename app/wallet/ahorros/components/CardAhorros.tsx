import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getAssetColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { Ahorros } from "@/app/interfaces/app-financial";
import {
  Bitcoin,
  DollarSign,
  TrendingUp,
  Landmark,
  TrashIcon,
} from "lucide-react";
import { useStoreFinancial } from "@/app/store/store";

export const CardAhorros = ({
  type,
  name,
  amount,
  symbol,
  hide,
  valueInUSD,
  currency,
}: Ahorros) => {
  const getAssetIcon = (type: string, symbol?: string) => {
    switch (type) {
      case "crypto":
        if (symbol === "BTC") return <Bitcoin />;

        return <span>₿</span>;

      case "dolar":
        return <DollarSign />;

      case "accion":
        return <TrendingUp />;

      case "other":
        return <Landmark />;

      default:
        return null;
    }
  };

  const formatNumber = (number: number) => {
    const formattedMiles = new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
    return formattedMiles;
  };
  const deleteAhorros = useStoreFinancial((state) => state.deleteAhorro);

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center border-2",
                getAssetColor(type)
              )}
            >
              {getAssetIcon(type, symbol)}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">{type?.toUpperCase()}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-md">
                    {name?.length ? name : currency?.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <TrashIcon
            onClick={() => deleteAhorros(currency!)}
            className="hover:cursor-pointer"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
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
            <span className="font-medium text-lg">
              {hide ? "••••••" : <p>$ {formatNumber(amount)}</p>}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
