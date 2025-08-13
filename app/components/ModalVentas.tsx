"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Minus,
  AlertTriangle,
  Calculator,
  Icon,
  Bitcoin,
  DollarSign,
  TrendingUp,
  Landmark,
} from "lucide-react";
import { cn, getAssetColor } from "@/lib/utils";
import { Ahorros } from "../interfaces/app-financial";
import { SiEthereum, SiRipple, SiSolana, SiTether } from "react-icons/si";

interface WithdrawFormData {
  assetId: string;
  amount: string | number;
  reason: string;
  description: string;
  currency?: string;
}

interface WithdrawSavingsModalProps {
  trigger?: React.ReactNode;
  actives?: Ahorros[];
  onWithdraw?: (withdrawData: any) => void;
}

const withdrawReasons = [
  { value: "emergency", label: "Emergencia" },
  { value: "expense", label: "Gasto planificado" },
  { value: "investment", label: "Reinversión" },
  { value: "profit-taking", label: "Toma de ganancias" },
  { value: "rebalancing", label: "Rebalanceo de portafolio" },
  { value: "other", label: "Otro motivo" },
];

export const ModalVentas = ({
  trigger,
  actives,
}: WithdrawSavingsModalProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<WithdrawFormData>({
    assetId: "",
    amount: "",
    reason: "",
    description: "",
  });

  const handleInputChange = (field: keyof WithdrawFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!selectedAsset || !isValidAmount) return;

    setIsSubmitting(true);

    // const withdrawValue = calculateWithdrawValue();

    // const withdrawData = {
    //   id: Date.now().toString(),
    //   asset: selectedAsset,
    //   amount: withdrawAmount,
    //   valueUSD: withdrawValue.usd,
    //   valueARS: withdrawValue.ars,
    //   reason: formData.reason,
    //   description: formData.description,
    //   date: new Date().toISOString(),
    //   type: "withdraw",
    // };

    // onWithdraw?.(withdrawData);

    // Reset form
    setFormData({
      assetId: "",
      amount: "",
      reason: "",
      description: "",
    });

    setIsSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
          >
            <Minus className="w-4 h-4 mr-2" />
            Descontar Ahorro
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Minus className="w-6 h-6 mr-2 text-red-600" />
            Descontar Ahorro
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selección de Activo */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Seleccionar Activo *
            </Label>
            <Select
              value={formData.assetId}
              onValueChange={(value) => handleInputChange("assetId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Elige el activo a descontar" />
              </SelectTrigger>
              <SelectContent>
                {actives?.map((active) => {
                  const getAssetIcon = () => {
                    switch (active.currency) {
                      case "bitcoin":
                        return <Bitcoin />;

                      case "ARS":
                        return <DollarSign />;

                      case "accion":
                        return <TrendingUp />;

                      case "other":
                        return <Landmark />;

                      case "ethereum":
                        return <SiEthereum size={20} />;
                      case "usdt":
                        return <SiTether size={20} />;
                      case "solana":
                        return <SiSolana size={20} />;
                      case "xrp":
                        return <SiRipple size={20} />;
                      default:
                        return null;
                    }
                  };

                  return (
                    <SelectItem
                      key={active.amount}
                      value={String(active.currency)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            getAssetColor(active.type)
                          )}
                        >
                          {getAssetIcon()}
                        </div>
                        <div>
                          <span className="font-medium">
                            {active.currency?.toUpperCase() === "ARS"
                              ? "DOLAR"
                              : active.currency?.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            Disponible:{" "}
                            {active.amount.toLocaleString("es-AR", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}{" "}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Información del Activo Seleccionado */}

          {/* Cantidad a Descontar */}
          <div className="space-y-2">
            <Label
              htmlFor="amount"
              className="text-sm font-medium text-gray-700"
            >
              Cantidad a Descontar *
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                // step={selectedAsset?.type === "crypto" ? "0.0001" : "0.01"}
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className={cn("pr-16")}
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                {/* {selectedAsset?.symbol} */}
              </div>
            </div>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {/* {withdrawAmount > (selectedAsset?.availableAmount || 0)
                    ? "La cantidad excede el monto disponible"
                    : "Ingresa una cantidad válida mayor a 0"} */}
              </AlertDescription>
            </Alert>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Máximo disponible:</span>
              <button
                type="button"
                className="text-teal-600 hover:text-teal-700 font-medium"
                //   onClick={() =>
                //     handleInputChange(
                //       "amount",
                //     //   selectedAsset.availableAmount.toString()
                //     )
                //   }
              >
                {/* {selectedAsset.availableAmount.toLocaleString("es-AR", {
                    minimumFractionDigits:
                      selectedAsset.type === "crypto" ? 4 : 0,
                    maximumFractionDigits:
                      selectedAsset.type === "crypto" ? 4 : 0,
                  })}{" "}
                  {selectedAsset.symbol} */}
              </button>
            </div>
          </div>

          {/* Motivo del Retiro */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Motivo del Retiro *
            </Label>
            <Select
              value={formData.reason}
              onValueChange={(value) => handleInputChange("reason", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el motivo" />
              </SelectTrigger>
              <SelectContent>
                {withdrawReasons.map((reason) => (
                  <SelectItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={isSubmitting || !formData.assetId || !formData.reason}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? "Procesando..." : "Confirmar Retiro"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
