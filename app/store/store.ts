import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Ahorros, OtrosActive } from "../interfaces/app-financial";

interface FinancialStore {
  dolares: number;
  totalAhorrosEnUSD: number;
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
  setNewTransaction: (transaction: Ahorros) => void;
  setAhorroEnUsd: (amount: number) => void;
}

export const useStoreFinancial = create<FinancialStore>()(
  persist(
    (set) => ({
      totalAhorrosEnUSD: 0,
      activos: [],
      transactions: [],
      dolares: 0,
      totalCriptos: 0,
      acciones: 0,
      bitcoin: 0,
      ethreum: 0,
      usdt: 0,
      solana: 0,
      xrp: 0,
      otros: [],

      setAhorroEnUsd: (amount) =>
        set((state) => ({
          totalAhorrosEnUSD: state.totalAhorrosEnUSD + amount,
        })),

      setEthreumAhorro: (amount) =>
        set((state) => ({ ethreum: state.ethreum + amount })),

      setSolanaAhorro: (amount) =>
        set((state) => ({ solana: state.solana + amount })),

      setUsdtAhorro: (amount) =>
        set((state) => ({ usdt: state.usdt + amount })),

      setXrpAhorro: (amount) => set((state) => ({ xrp: state.xrp + amount })),

      setBitcoinAhorro: (amount) =>
        set((state) => ({ bitcoin: state.bitcoin + amount })),

      setDolarAhorro: (amount) =>
        set((state) => ({ dolares: state.dolares + amount })),

      setNewAhorro: (ahorro) =>
        set((state) => {
          const index = state.activos.findIndex(
            (a) => a.currency === ahorro.currency
          );

          if (index !== -1) {
            const updatedActivos = [...state.activos];
            updatedActivos[index] = {
              ...updatedActivos[index],
              amount:
                Number(updatedActivos[index].amount) + Number(ahorro.amount),
            };
            return { activos: updatedActivos };
          } else {
            return { activos: [...state.activos, ahorro] };
          }
        }),

      setNewTransaction: (transaction) =>
        set((state) => ({
          transactions: [...state.transactions, transaction],
        })),
    }),
    {
      name: "financial-storage", // nombre en localStorage
    }
  )
);
