import { useStoreFinancial } from "../store/store";

export const useMoneyCategory = () => {
  const dolars = useStoreFinancial((state) => state.dolar);
  const criptos = useStoreFinancial(
    (state) =>
      state.bitcoin + state.ethreum + state.usdt + state.solana + state.xrp
  );
  const acciones = useStoreFinancial((state) => state.acciones);

  const options = [
    { id: 1, label: "Dolares", total: dolars },
    { id: 2, label: "Criptomonedas", total: criptos },
    { id: 3, label: "CEDEARS / ACCIONES", total: acciones },
    { id: 4, label: "Otros", total: 0 },
  ];

  return {
    options,
  };
};
