import { create } from "zustand";

interface FinancialStore {
  dolar: number;
  ahorros: number;
  cripto: number;
  acciones: number;
}

const useStoreFinancial = create<FinancialStore>((set) => ({
  ahorros: 0,
  dolar: 0,
  cripto: 0,
  acciones: 0,
  increasePopulation: () => set((state) => ({ dolar: state.dolar + 1 })),
}));
