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

import { Card, CardContent } from "@/components/ui/card";
import { Plus, DollarSign, TrendingUp, Wallet, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStoreFinancial } from "../store/store";

interface AssetFormData {
  name: string;
  type: string;
  amount: string;
  price: string;
  currency: string;
  purchaseDate: string;
  valueInUSD?: string; // Optional for stocks
}

interface AddAssetModalProps {
  trigger?: React.ReactNode;
  onAssetAdded?: (asset: AssetFormData) => void;
}

const assetTypes = [
  {
    value: "stock",
    label: "Acciones",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-600",
  },
  {
    value: "crypto",
    label: "Criptomonedas",
    icon: Coins,
    color: "bg-orange-100 text-orange-600",
  },
  {
    value: "dolar",
    label: "Dolares",
    icon: DollarSign,
    color: "bg-gray-100 text-gray-600",
  },
  {
    value: "other",
    label: "Otros",
    icon: Wallet,
    color: "bg-teal-100 text-teal-600",
  },
];

const currencies = [{ value: "ARS", label: "Peso Argentino (ARS)" }];

const criptoCurrencies = [
  { value: "BTC", label: "Bitcoin (BTC)" },
  { value: "ETH", label: "Ethereum (ETH)" },
  { value: "USDT", label: "Tether (USDT)" },
  { value: "SOL", label: "Solana (SOL)" },
  { value: "XRP", label: "Ripple (XRP)" },
];

export const ModalActivos = ({ trigger, onAssetAdded }: AddAssetModalProps) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showActionsInputs, setShowActionsInputs] = useState(false);
  const [isCripto, setIsCripto] = useState(false);
  const [formData, setFormData] = useState<AssetFormData>({
    name: "",
    type: "",
    amount: "",
    price: "",
    currency: "ARS",
    purchaseDate: new Date().toISOString().split("T")[0],
  });

  console.log(formData);
  const setDolarPlus = useStoreFinancial((state) => state.setDolarAhorro);
  const setCriptoPlus = useStoreFinancial((state) => state.setCriptoAhorro);

  const handleInputChange = (field: keyof AssetFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    handleInputChange("type", type);

    if (type === "crypto") {
      setIsCripto(true);
    } else {
      setIsCripto(false);
    }

    if (type === "stock") {
      setShowActionsInputs(true);
    } else {
      setShowActionsInputs(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const assetWithTotal = {
      ...formData,
    };
    onAssetAdded?.(assetWithTotal);
    setSelectedType("");
    setIsSubmitting(false);
    setOpen(false);

    switch (formData.type) {
      case "dolar":
        const amount = parseFloat(formData.price);
        setDolarPlus(amount);
        break;
      case "cripto":
        const amountCripto = parseFloat(formData.price);
        setCriptoPlus("bitcoin", amountCripto);
        break;
    }

    if (formData.type === "dolar") {
      const amount = parseFloat(formData.price);
      setDolarPlus(amount);
    }
  };

  const selectedAssetType = assetTypes.find(
    (type) => type.value === selectedType
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Activo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Agregar Nuevo Activo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Tipo de Activo *
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {assetTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card
                    key={type.value}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md",
                      selectedType === type.value
                        ? "ring-2 ring-teal-500 bg-teal-50"
                        : "hover:bg-gray-50"
                    )}
                    onClick={() => handleTypeSelect(type.value)}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center",
                          type.color
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-medium">{type.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Información Básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {formData.type === "stock" || formData.type === "other" ? (
                <>
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nombre del Activo *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ej: Apple Inc., Bitcoin, Departamento..."
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </>
              ) : (
                <div className="space-y-2">
                  <Label
                    htmlFor="currency"
                    className="text-sm font-medium text-gray-700"
                  >
                    Moneda *
                  </Label>
                  {isCripto ? (
                    <Select
                      value={formData.currency}
                      onValueChange={(value) =>
                        handleInputChange("currency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {criptoCurrencies.map((currency) => (
                          <SelectItem
                            key={currency.value}
                            value={currency.value}
                          >
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select
                      value={formData.currency}
                      onValueChange={(value) =>
                        handleInputChange("currency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem
                            key={currency.value}
                            value={currency.value}
                          >
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}
              {showActionsInputs && (
                <Label
                  htmlFor="currency"
                  className="text-sm font-medium text-gray-700 text-nowrap"
                >
                  Valor en USD
                  <Input type="number" />
                </Label>
              )}
            </div>
          </div>

          {/* Precio y Cantidad */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="text-sm font-medium text-gray-700"
              >
                Cantidad en ARS
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Total Calculado en USD
              </Label>
              <div className="h-10 px-3 py-2 bg-gray-50 border rounded-md flex items-center">
                <span className="font-semibold text-teal-600">Pendiente</span>
              </div>
            </div>
          </div>

          {/* Fecha de Compra */}
          <div className="space-y-2">
            <Label
              htmlFor="purchaseDate"
              className="text-sm font-medium text-gray-700"
            >
              Fecha de Compra
            </Label>
            <Input
              id="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={(e) =>
                handleInputChange("purchaseDate", e.target.value)
              }
            />
          </div>

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
              className="bg-teal-600 hover:bg-teal-700"
              disabled={
                isSubmitting ||
                !formData.name ||
                !formData.type ||
                !formData.price
              }
            >
              {isSubmitting ? "Agregando..." : "Agregar Activo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
