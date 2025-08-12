import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { useDolarCurrency } from "../hooks";
import { useMemo } from "react";
import { useStoreFinancial } from "../store/store";

interface CardsBalance {
  hideBalances: boolean;
}

export const CardsBalance = ({ hideBalances }: CardsBalance) => {
  const { data } = useDolarCurrency();

  const valueInUSD = useStoreFinancial((state) => state.totalAhorrosEnUSD);

  const totalInUSD = useMemo(() => {
    const valor = Number(valueInUSD) * (Number(data?.venta) || 1);
    return valor.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [valueInUSD, data?.venta]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-teal-100 text-sm">Valor Total</p>
              <p className="text-3xl font-bold">
                {hideBalances ? "••••••" : totalInUSD}
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
            <div className="flex flex-col gap-2">
              <p className="text-gray-600 text-sm">En Pesos Argentinos</p>
              <p className="text-2xl font-semibold">
                {hideBalances ? "••••••" : totalInUSD}
              </p>
            </div>
            <div className="text-2xl">🇦🇷</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-gray-600 text-sm">En Dólares</p>
              <p className="text-2xl font-bold text-green-600">
                US {hideBalances ? "••••••" : valueInUSD}
              </p>
            </div>
            <div className="text-2xl">🇺🇸</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
