import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ChevronRight, DollarSign } from "lucide-react";

export function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Balance Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$4,836.00</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ingresos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">$3,814.25</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Rendimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$1,700.50</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pots Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Ahorros</CardTitle>
              <Button variant="ghost" size="sm">
                Ver Detalles <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Ahorrado</p>
                  <p className="text-2xl font-bold">$850</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Ahorros</span>
                    <span className="text-sm font-medium">$159</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Concierto</span>
                    <span className="text-sm font-medium">$110</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Regalo</span>
                    <span className="text-sm font-medium">$40</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Laptop Nueva</span>
                    <span className="text-sm font-medium">$10</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Transacciones
              </CardTitle>
              <Button variant="ghost" size="sm">
                Ver Todas <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium">Savory Bites Bistro</p>
                    <p className="text-sm text-gray-500">19 Ago 2024</p>
                  </div>
                </div>
                <span className="font-semibold text-red-600">-$55.50</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
