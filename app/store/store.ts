import { create } from "zustand";

interface FinancialStore {
  dolar: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

const useStoreFinancial = create<FinancialStore>((set) => ({
  dolar: 0,
  cripto: 0,
  acciones: 0,
  increasePopulation: () => set((state) => ({ dolar: state.dolar + 1 })),
  removeAllBears: () => set({ dolar: 0 }),
  updateBears: (newBears) => set({ dolar: newBears }),
}));
