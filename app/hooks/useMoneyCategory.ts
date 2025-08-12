import { formatNumber } from "@/lib/utils";
import { useStoreFinancial } from "../store/store";

export const useMoneyCategory = () => {
  const dolars = useStoreFinancial((state) => state.dolares);
  const criptos = useStoreFinancial(
    (state) =>
      state.bitcoin + state.ethreum + state.usdt + state.solana + state.xrp
  );

  const ethereum = useStoreFinancial((state) => state.ethreum);

  const acciones = useStoreFinancial((state) => state.acciones);

  const options = [
    { id: 1, label: "Dolares", total: formatNumber(dolars) },
    { id: 2, label: "Criptomonedas", total: formatNumber(criptos) },
    { id: 3, label: "CEDEARS / ACCIONES", total: formatNumber(acciones) },
    { id: 4, label: "Otros", total: 0 },
  ];

  return {
    options,
  };
};
