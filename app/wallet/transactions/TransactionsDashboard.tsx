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
import { useStoreFinancial } from "@/app/store/store";
import { ModalActivos } from "@/app/components/ModalActivos";

export const TransactionsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterAssetType, setFilterAssetType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const activesInWallet = useStoreFinancial((state) => state.activos);
  console.log(activesInWallet);

  const filteredAndSortedTransactions = useMemo(() => {
    const filtered = activesInWallet.filter((transaction) => {
      const matchesSearch =
        transaction.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.symbol?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        filterType === "all" || transaction.type === filterType;
      const matchesAssetType =
        filterAssetType === "all" || transaction.type === filterAssetType;

      return matchesSearch && matchesType && matchesAssetType;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = a.purchaseDate ? new Date(a.purchaseDate).getTime() : 0;
        const dateB = b.purchaseDate ? new Date(b.purchaseDate).getTime() : 0;
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      } else {
        return sortOrder === "desc"
          ? Number(b.valueInUSD ?? 0) - Number(a.valueInUSD ?? 0)
          : Number(a.valueInUSD ?? 0) - Number(b.valueInUSD ?? 0);
      }
    });
  }, [
    activesInWallet,
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
      case "real-estate":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency,
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

  const totalBought = activesInWallet
    .filter((t) => t.type === "buy")
    .reduce((sum, t) => sum + Number(t.valueInUSD ?? 0), 0);

  const totalSold = activesInWallet
    .filter((t) => t.type === "sell")
    .reduce((sum, t) => sum + Number(t.valueInUSD ?? 0), 0);

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
          <ModalActivos />
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
                  {activesInWallet.length}
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
                {filteredAndSortedTransactions.map((transaction, index) => {
                  const Icon = getAssetIcon(
                    transaction.type,
                    transaction.symbol ?? ""
                  );

                  return (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center",
                              getAssetTypeColor(transaction.type)
                            )}
                          >
                            {typeof Icon === "string" ? (
                              <span className="text-sm">{Icon}</span>
                            ) : (
                              <Icon className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">{transaction.name}</p>
                            <p className="text-sm text-gray-500">
                              {transaction.symbol}
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
                            $ {transaction.amount}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span className="font-bold text-green-600">
                            {formatCurrency(
                              Number(transaction.valueInUSD ?? 0),
                              "USD"
                            )}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-sm text-gray-600">
                        {formatDate(transaction.purchaseDate ?? "")}
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
