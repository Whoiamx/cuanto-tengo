import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface CardsBalance {
  total: number;
  totalUSD: string;
}

export const CardsBalance = ({ total, totalUSD }: CardsBalance) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm">Valor Total</p>
              <p className="text-3xl font-bold">{total}</p>
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
              <p className="text-2xl font-bold text-blue-600">{total}</p>
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
              <p className="text-2xl font-bold text-green-600">US {totalUSD}</p>
            </div>
            <div className="text-2xl">🇺🇸</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
