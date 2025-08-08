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
