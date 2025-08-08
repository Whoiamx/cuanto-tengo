import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ChevronRight } from "lucide-react";
import { Categories } from "./Categories";
import { TransactionsOverview } from "./TransactionsOverview";
import Link from "next/link";
import { CurrencyTicker } from "./CurrencyTiker";

import { useDolarCurrency } from "../../hooks/useDolarCurrency";
import { useCriptoCurrency } from "../../hooks/useCriptoCurrency";
import { formatearValor } from "../../../lib/utils";

export function Overview() {
  const { isLoading, data, error, refetch } = useDolarCurrency();
  const criptoData = useCriptoCurrency("BTC");
  const ethData = useCriptoCurrency("ETH");
  const usdtData = useCriptoCurrency("USDT");
  const solanaData = useCriptoCurrency("SOL");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
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
              Activos
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

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Pots Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex  flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Ahorros</CardTitle>
              <Link href={`/wallet/ahorros`} target="_blank">
                <Button variant="ghost" size="sm">
                  Ver Detalles <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm text-gray-600">Total Ahorrado</p>
                  <p className="text-2xl font-bold">$0</p>
                </div>
              </div>
              <div className="flex flex-col pb-2">
                <Categories />
              </div>
              <Button className=" text-md bg-[#0F172B]">
                Agregar nuevo activo
              </Button>
            </CardContent>
          </Card>

          {/* Transactions */}
          <TransactionsOverview />
          {/* Otras secciones*/}
        </div>
        <div className="space-y-6">
          <h1 className="text-xl font-semibold">Activos mas comprados</h1>
          <CurrencyTicker
            moneda={data?.moneda}
            nombre={data?.nombre}
            venta={data?.venta}
            compra={data?.compra}
            fechaActualizacion={data?.fechaActualizacion}
            isLoading={isLoading}
            refetch={refetch}
            logo="dolar.avif"
          />
          <CurrencyTicker
            moneda="USDT"
            nombre="USDT"
            venta={formatearValor(usdtData.data?.ask)}
            compra={formatearValor(usdtData.data?.ask)}
            fechaActualizacion={data?.fechaActualizacion}
            isLoading={usdtData.isLoading}
            refetch={usdtData.refetch}
            logo="usdt.jpeg"
          />
          <CurrencyTicker
            moneda="BITCOIN"
            nombre="BITCOIN"
            venta={formatearValor(criptoData.data?.ask)}
            compra={formatearValor(criptoData.data?.ask)}
            fechaActualizacion={data?.fechaActualizacion}
            isLoading={criptoData.isLoading}
            refetch={criptoData.refetch}
            logo="btc.avif"
          />
          <CurrencyTicker
            moneda="ETHEREUM"
            nombre="ETHEREUM"
            venta={formatearValor(ethData.data?.ask)}
            compra={formatearValor(ethData.data?.ask)}
            fechaActualizacion={data?.fechaActualizacion}
            isLoading={ethData.isLoading}
            refetch={ethData.refetch}
            logo="ethereum.avif"
          />
          <CurrencyTicker
            moneda="SOLANA"
            nombre="SOLANA"
            venta={formatearValor(solanaData.data?.ask)}
            compra={formatearValor(solanaData.data?.ask)}
            fechaActualizacion={data?.fechaActualizacion}
            isLoading={solanaData.isLoading}
            refetch={solanaData.refetch}
            logo="solana.png"
          />
        </div>
      </div>
    </div>
  );
}
