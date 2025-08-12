export interface CurrencyData {
  moneda?: string;
  casa?: string;
  nombre?: string;
  compra?: number | string;
  venta?: number | string;
  fechaActualizacion?: string;
  isLoading: boolean;
  refetch: () => void;
  logo: string;
}

export interface Ahorros {
  type: string;
  name?: string;
  amount: number;
  price?: string;
  symbol?: string;
  hide?: boolean;
  purchaseDate?: string;
  currency?: string;
  valueInUSD?: number;
}

export interface OtrosActive {
  type: string;
  amount: number;
  price?: string;
  purchaseDate?: string;
  valueInUSD?: number;
}
