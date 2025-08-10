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
import { useStoreFinancial } from "@/app/store/store";

import { ModalActivos } from "../ModalActivos";

export function Overview() {
  const { isLoading, data, error, refetch } = useDolarCurrency();
  const criptoData = useCriptoCurrency("BTC");
  const ethData = useCriptoCurrency("ETH");
  const usdtData = useCriptoCurrency("USDT");
  const solanaData = useCriptoCurrency("SOL");
  const total = useStoreFinancial(
    (state) => state.ahorros + state.dolar + state.cripto + state.acciones
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Balance Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$ {total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">$ {total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Rendimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$ 0</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Pots Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex  flex-row  items-center justify-between">
              <CardTitle className="text-xl font-semibold">Ahorros</CardTitle>
              <Link href={`/wallet/ahorros`} target="_blank">
                <Button variant="ghost" size="sm">
                  Ver Detalles <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 items-center space-x-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-600">Total Ahorrado</p>
                  <p className="text-2xl font-bold">$ 0</p>
                </div>
              </div>
              <div className="flex flex-col pb-2">
                <Categories />
              </div>
              <ModalActivos />
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
            compra={formatearValor(usdtData.data?.ask)}
            fechaActualizacion={data?.fechaActualizacion}
            isLoading={usdtData.isLoading}
            refetch={usdtData.refetch}
            logo="usdt.jpeg"
          />
          <CurrencyTicker
            moneda="BITCOIN"
            nombre="BITCOIN"
            compra={formatearValor(criptoData.data?.ask)}
            fechaActualizacion={data?.fechaActualizacion}
            isLoading={criptoData.isLoading}
            refetch={criptoData.refetch}
            logo="btc.avif"
          />
          <CurrencyTicker
            moneda="ETHEREUM"
            nombre="ETHEREUM"
            compra={formatearValor(ethData.data?.ask)}
            fechaActualizacion={data?.fechaActualizacion}
            isLoading={ethData.isLoading}
            refetch={ethData.refetch}
            logo="ethereum.png"
          />
          <CurrencyTicker
            moneda="SOLANA"
            nombre="SOLANA"
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
