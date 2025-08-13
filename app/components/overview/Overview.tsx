"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Categories } from "./Categories";
import { TransactionsOverview } from "./TransactionsOverview";
import { CurrencyTicker } from "./CurrencyTiker";

import { useDolarCurrency, useCriptoCurrency } from "@/app/hooks";

import { formatearValor } from "../../../lib/utils";
import { useStoreFinancial } from "@/app/store/store";

import { ModalActivos } from "../ModalActivos";
import { CardsBalance } from "../CardsBalance";
import { useMemo, useState } from "react";
import { ModalVentas } from "../ModalVentas";

export const Overview = () => {
  const { isLoading, data, error, refetch } = useDolarCurrency();
  const criptoData = useCriptoCurrency("BTC");
  const ethData = useCriptoCurrency("ETH");
  const usdtData = useCriptoCurrency("USDT");
  const solanaData = useCriptoCurrency("SOL");
  const total = useStoreFinancial(
    (state) => state.dolares + state.totalCriptos + state.acciones
  );

  const [hideBalances, setHideBalances] = useState(false);

  const valueInUSD = useStoreFinancial((state) => state.totalAhorrosEnUSD);
  const activesInWallet = useStoreFinancial((state) => state.activos);
  console.log(activesInWallet);

  const totalInUSD = useMemo(() => {
    const valor = Number(valueInUSD) * (Number(data?.venta) || 1);
    return valor.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [valueInUSD, data?.venta]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
      </div>
      <div className="flex justify-end items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setHideBalances(!hideBalances)}
        >
          {hideBalances ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
          {hideBalances ? "Mostrar" : "Ocultar"}
        </Button>

        <ModalActivos />
        <ModalVentas actives={activesInWallet} />
      </div>
      <CardsBalance hideBalances={hideBalances} />

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Pots Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex  flex-row  items-center justify-between">
              <CardTitle className="text-xl font-semibold">Ahorros</CardTitle>
              <Link href={`/wallet/ahorros`}>
                <Button variant="ghost" className="hover:underline" size="sm">
                  Ver Detalles <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 items-center space-x-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-600">Total Ahorrado en ARS</p>
                  <p className="text-2xl font-bold">
                    $ {hideBalances ? "••••••" : totalInUSD}
                  </p>
                </div>
              </div>
              <div className="flex flex-col pb-2">
                <Categories hideBalances={hideBalances} />
              </div>
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
