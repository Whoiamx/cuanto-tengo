import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatNumber, getAssetColor } from "@/lib/utils";
import { SiEthereum, SiTether, SiSolana, SiRipple } from "react-icons/si";

import { Ahorros } from "@/app/interfaces/app-financial";
import {
  Bitcoin,
  DollarSign,
  TrendingUp,
  Landmark,
  Edit2Icon,
} from "lucide-react";
import { useDolarCurrency } from "@/app/hooks";

export const CardAhorros = ({
  type,
  name,
  amount,
  symbol,
  hide,
  currency,
}: Ahorros) => {
  const getAssetIcon = () => {
    switch (currency) {
      case "bitcoin":
        return <Bitcoin />;

      case "ARS":
        return <DollarSign />;

      case "accion":
        return <TrendingUp />;

      case "other":
        return <Landmark />;

      case "ethereum":
        return <SiEthereum size={20} />;
      case "usdt":
        return <SiTether size={20} />;
      case "solana":
        return <SiSolana size={20} />;
      case "xrp":
        return <SiRipple size={20} />;
      default:
        return null;
    }
  };

  const { data } = useDolarCurrency();

  const amountNumber = Number(amount || 0);
  const ventaNumber = Number(data?.venta || 1);
  let totalUSD = (amountNumber / ventaNumber).toFixed(2);

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center border-2",
                getAssetColor(String(currency))
              )}
            >
              {getAssetIcon()}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">
                  {" "}
                  {name?.length
                    ? name
                    : currency?.toUpperCase() === "ARS"
                    ? "DOLAR"
                    : currency?.toUpperCase()}
                </CardTitle>
              </div>
            </div>
          </div>
          <Edit2Icon className="hover:cursor-pointer" />
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
              {hide ? "••••••" : <p>U$ {totalUSD}</p>}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              🇦🇷 Valor en ARS:
            </span>
            <span className="font-medium text-lg">
              {hide ? "••••••" : <p>$ {formatNumber(Number(amount))}</p>}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
