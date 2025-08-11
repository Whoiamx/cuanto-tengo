import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const TransactionsOverview = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Transacciones</CardTitle>
        <Link href={`/wallet/transactions`} target="_blank">
          <Button variant="ghost" size="sm">
            Ver Todas <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div>
              <p className="font-medium">Emma Richardson</p>
              <p className="text-sm text-gray-500">19 Ago 2024</p>
            </div>
          </div>
          <span className="font-semibold text-green-600">+$75.50</span>
        </div>
      </CardContent>
    </Card>
  );
};
