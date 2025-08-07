import { useQuery } from "@tanstack/react-query";
import { CurrencyData } from "../interfaces/currency";

export const useDolarCurrency = () => {
  const getCurrencyDataDolar = async () => {
    const resp = await fetch("https://dolarapi.com/v1/dolares/blue").then(
      (res) => res.json()
    );

    return resp;
  };

  const { isLoading, data, error, refetch } = useQuery<CurrencyData>({
    queryKey: ["currencyData"],
    queryFn: getCurrencyDataDolar,
  });

  return {
    isLoading,
    data,
    error,
    refetch,
  };
};
