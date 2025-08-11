import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Categories } from "./Categories";
import { TransactionsOverview } from "./TransactionsOverview";
import { CurrencyTicker } from "./CurrencyTiker";

import { useDolarCurrency, useCriptoCurrency } from "@/app/hooks";

import { formatearValor } from "../../../lib/utils";
import { useStoreFinancial } from "@/app/store/store";

import { ModalActivos } from "../ModalActivos";
import { CardsBalance } from "../CardsBalance";

export const Overview = () => {
  const { isLoading, data, error, refetch } = useDolarCurrency();
  const criptoData = useCriptoCurrency("BTC");
  const ethData = useCriptoCurrency("ETH");
  const usdtData = useCriptoCurrency("USDT");
  const solanaData = useCriptoCurrency("SOL");
  const total = useStoreFinancial(
    (state) =>
      state.totalAhorros + state.dolar + state.totalCriptos + state.acciones
  );

  const amountNumber = Number(total || 0);
  const ventaNumber = Number(data?.venta || 1);
  let totalUSD = (amountNumber / ventaNumber).toFixed(2);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
      </div>
      <CardsBalance total={total} totalUSD={totalUSD} />

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Pots Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex  flex-row  items-center justify-between">
              <CardTitle className="text-xl font-semibold">Ahorros</CardTitle>
              <Link href={`/wallet/ahorros`}>
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
};
