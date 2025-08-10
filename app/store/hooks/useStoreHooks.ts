import { useStoreFinancial } from "../store";

export const useStoreHooks = () => {
  const setDolarPlus = useStoreFinancial((state) => state.setDolarAhorro);
  const setBicoinPlus = useStoreFinancial((state) => state.setBitcoinAhorro);
  const setEthereumPlus = useStoreFinancial((state) => state.setEthreumAhorro);
  const setSolanaPlus = useStoreFinancial((state) => state.setSolanaAhorro);
  const setXrpPlus = useStoreFinancial((state) => state.setXrpAhorro);
  const setUsdtPlus = useStoreFinancial((state) => state.setUsdtAhorro);

  return {
    setDolarPlus,
    setBicoinPlus,
    setEthereumPlus,
    setSolanaPlus,
    setXrpPlus,
    setUsdtPlus,
  };
};
