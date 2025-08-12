import { useStoreFinancial } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const TransactionsOverview = () => {
  const transactions = useStoreFinancial((state) => state.transactions);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Transacciones</CardTitle>
        <Link href={`/wallet/transactions`}>
          <Button variant="ghost" size="sm">
            Ver Todas <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((trans, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-regular">
                  <i>
                    {trans.name?.length
                      ? trans.name.toUpperCase()
                      : trans.currency?.toUpperCase()}
                  </i>
                </p>
                <p className="text-sm text-gray-500">{trans.purchaseDate}</p>
              </div>
            </div>
            <span className="font-semibold text-green-600">
              ARS ${formatNumber(trans.amount)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
