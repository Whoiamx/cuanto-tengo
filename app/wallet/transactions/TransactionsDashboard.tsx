"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Download,
  TrendingUp,
  TrendingDown,
  Bitcoin,
  DollarSign,
  Building,
  Landmark,
  MoreHorizontal,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  assetName: string;
  assetSymbol: string;
  type: "buy" | "sell";
  assetType: "crypto" | "fiat" | "stock" | "bond" | "real-estate";
  totalValueARS: number;
  totalValueUSD: number;
  date: string;
  description?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    assetName: "Bitcoin",
    assetSymbol: "BTC",
    type: "buy",
    assetType: "crypto",

    totalValueARS: 3953437.5,
    totalValueUSD: 10812.5,

    date: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    assetName: "Apple Inc.",
    assetSymbol: "AAPL",
    type: "buy",
    assetType: "stock",
    totalValueARS: 3384937.5,
    totalValueUSD: 9262.5,
    date: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    assetName: "Dólar Estadounidense",
    assetSymbol: "USD",
    type: "buy",
    assetType: "fiat",
    totalValueARS: 731000,
    totalValueUSD: 2000,

    date: "2024-01-13T09:15:00Z",
  },
  {
    id: "4",
    assetName: "Ethereum",
    assetSymbol: "ETH",
    type: "sell",
    assetType: "crypto",
    totalValueARS: 1452375,
    totalValueUSD: 3975,
    date: "2024-01-12T16:45:00Z",
  },
  {
    id: "5",
    assetName: "Bonos del Tesoro",
    assetSymbol: "BOND",
    type: "buy",
    assetType: "bond",
    totalValueARS: 10000,
    totalValueUSD: 27.36,
    date: "2024-01-11T11:00:00Z",
  },
  {
    id: "6",
    assetName: "Tesla Inc.",
    assetSymbol: "TSLA",
    type: "buy",
    assetType: "stock",
    totalValueARS: 1361887.5,
    totalValueUSD: 3727.5,
    date: "2024-01-10T13:30:00Z",
  },
];

export const TransactionsDashboard = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterAssetType, setFilterAssetType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredAndSortedTransactions = useMemo(() => {
    const filtered = transactions.filter((transaction) => {
      const matchesSearch =
        transaction.assetName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.assetSymbol
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesType =
        filterType === "all" || transaction.type === filterType;
      const matchesAssetType =
        filterAssetType === "all" || transaction.assetType === filterAssetType;

      return matchesSearch && matchesType && matchesAssetType;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      } else {
        return sortOrder === "desc"
          ? b.totalValueUSD - a.totalValueUSD
          : a.totalValueUSD - b.totalValueUSD;
      }
    });
  }, [
    transactions,
    searchTerm,
    filterType,
    filterAssetType,
    sortBy,
    sortOrder,
  ]);

  const getAssetIcon = (assetType: string, symbol: string) => {
    switch (assetType) {
      case "crypto":
        return symbol === "BTC" ? Bitcoin : "₿";
      case "fiat":
        return DollarSign;
      case "stock":
        return TrendingUp;
      case "bond":
        return Landmark;
      case "real-estate":
        return Building;
      default:
        return DollarSign;
    }
  };

  const getAssetTypeColor = (assetType: string) => {
    switch (assetType) {
      case "crypto":
        return "bg-orange-100 text-orange-600";
      case "fiat":
        return "bg-green-100 text-green-600";
      case "stock":
        return "bg-blue-100 text-blue-600";
      case "bond":
        return "bg-purple-100 text-purple-600";
      case "real-estate":
        return "bg-indigo-100 text-indigo-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: currency === "ARS" ? 0 : 2,
      maximumFractionDigits: currency === "ARS" ? 0 : 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalBought = transactions
    .filter((t) => t.type === "buy")
    .reduce((sum, t) => sum + t.totalValueUSD, 0);

  const totalSold = transactions
    .filter((t) => t.type === "sell")
    .reduce((sum, t) => sum + t.totalValueUSD, 0);

  const netInvestment = totalBought - totalSold;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Mis Transacciones
          </h1>
          <p className="text-gray-600">
            Historial completo de compras y ventas de activos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Compras</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalBought, "USD")}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Ventas</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalSold, "USD")}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Transacciones</p>
                <p className="text-2xl font-bold text-gray-900">
                  {transactions.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por activo o símbolo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo de operación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las operaciones</SelectItem>
                <SelectItem value="buy">Compras</SelectItem>
                <SelectItem value="sell">Ventas</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterAssetType} onValueChange={setFilterAssetType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo de activo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los activos</SelectItem>
                <SelectItem value="crypto">Criptomonedas</SelectItem>
                <SelectItem value="stock">Acciones</SelectItem>
                <SelectItem value="fiat">Monedas Fiat</SelectItem>
                <SelectItem value="bond">Bonos</SelectItem>
                <SelectItem value="real-estate">Bienes Raíces</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              {sortBy === "date" ? "Fecha" : "Monto"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Transacciones */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Transacciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor en ARS</TableHead>
                  <TableHead>Valor en USD</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedTransactions.map((transaction) => {
                  const Icon = getAssetIcon(
                    transaction.assetType,
                    transaction.assetSymbol
                  );

                  return (
                    <TableRow key={transaction.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center",
                              getAssetTypeColor(transaction.assetType)
                            )}
                          >
                            {typeof Icon === "string" ? (
                              <span className="text-sm">{Icon}</span>
                            ) : (
                              <Icon className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">
                              {transaction.assetName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {transaction.assetSymbol}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            transaction.type === "buy" ? "default" : "secondary"
                          }
                          className={cn(
                            transaction.type === "buy"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          )}
                        >
                          {transaction.type === "buy" ? "Compra" : "Venta"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span className="text-lg">🇦🇷</span>
                          <span className="font-bold text-blue-600">
                            {formatCurrency(transaction.totalValueARS, "ARS")}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span className="font-bold text-green-600">
                            {formatCurrency(transaction.totalValueUSD, "USD")}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-sm text-gray-600">
                        {formatDate(transaction.date)}
                      </TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredAndSortedTransactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No se encontraron transacciones que coincidan con los filtros.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
