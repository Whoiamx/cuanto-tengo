import { create } from "zustand";
import { Ahorros, OtrosActive } from "../interfaces/app-financial";

interface FinancialStore {
  dolar: number;
  totalAhorros: number;
  totalCriptos: number;
  acciones: number;
  bitcoin: number;
  ethreum: number;
  usdt: number;
  solana: number;
  xrp: number;
  activos: Ahorros[];
  otros: OtrosActive[];
  transactions: Ahorros[];
  setBitcoinAhorro: (amount: number) => void;
  setSolanaAhorro: (amount: number) => void;
  setUsdtAhorro: (amount: number) => void;
  setEthreumAhorro: (amount: number) => void;
  setXrpAhorro: (amount: number) => void;
  setDolarAhorro: (amount: number) => void;
  setNewAhorro: (ahorro: Ahorros) => void;
}

export const useStoreFinancial = create<FinancialStore>((set) => ({
  totalAhorros: 0,
  activos: [],
  transactions: [],

  dolar: 200,
  totalCriptos: 0,
  acciones: 0,
  bitcoin: 0,
  ethreum: 0,
  usdt: 0,
  solana: 0,
  xrp: 0,

  otros: [],

  setEthreumAhorro: (amount: number) =>
    set((state) => ({
      ethreum: state.ethreum + amount,
    })),

  setSolanaAhorro: (amount: number) =>
    set((state) => ({
      solana: state.solana + amount,
    })),

  setUsdtAhorro: (amount: number) =>
    set((state) => ({
      usdt: state.usdt + amount,
    })),

  setXrpAhorro: (amount: number) =>
    set((state) => ({
      xrp: state.xrp + amount,
    })),

  setBitcoinAhorro: (amount: number) =>
    set((state) => ({
      bitcoin: state.bitcoin + amount,
    })),

  setNewAhorro: (ahorro: Ahorros) =>
    set((state) => {
      // Buscar si ya existe un activo con el mismo currency
      const index = state.activos.findIndex(
        (a) => a.currency === ahorro.currency
      );

      if (index !== -1) {
        // Si existe, crear un nuevo array con la suma de amounts en ese índice
        const updatedActivos = [...state.activos];
        updatedActivos[index] = {
          ...updatedActivos[index],
          amount: updatedActivos[index].amount + ahorro.amount,
        };
        return { activos: updatedActivos };
      } else {
        // Si no existe, agregar normalmente
        return { activos: [...state.activos, ahorro] };
      }
    }),
  setDolarAhorro: (amount: number) =>
    set((state) => ({
      dolar: state.dolar + amount,
    })),
}));
