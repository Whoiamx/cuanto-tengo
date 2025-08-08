import { create } from "zustand";

interface FinancialStore {
  dolar: number;
  ahorros: number;
  cripto: number;
  acciones: number;
  total: number;
}

export const useStoreFinancial = create<FinancialStore>((set, get) => ({
  ahorros: 0,
  dolar: 200,
  cripto: 0,
  acciones: 0,

  get total() {
    const { ahorros, dolar, cripto, acciones } = get();
    return ahorros + dolar + cripto + acciones;
  },
}));
