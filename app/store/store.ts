import { create } from "zustand";

type CriptoStock = "bitcoin" | "ethreum" | "usdt" | "solana" | "xrp";
interface FinancialStore {
  dolar: number;
  ahorros: number;
  cripto: number;
  acciones: number;
  bitcoin: number;
  ethreum: number;
  usdt: number;
  solana: number;
  xrp: number;

  setBitcoinAhorro: (amount: number) => void;
  setSolanaAhorro: (amount: number) => void;
  setUsdtAhorro: (amount: number) => void;
  setEthreumAhorro: (amount: number) => void;
  setXrpAhorro: (amount: number) => void;
  setDolarAhorro: (amount: number) => void;
}

export const useStoreFinancial = create<FinancialStore>((set) => ({
  ahorros: 0,

  dolar: 200,

  cripto: 0,
  acciones: 0,
  bitcoin: 0,
  ethreum: 0,
  usdt: 0,
  solana: 0,
  xrp: 0,

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

  setDolarAhorro: (amount: number) =>
    set((state) => ({
      dolar: state.dolar + amount,
    })),
}));
