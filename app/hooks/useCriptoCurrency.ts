import { useQuery } from "@tanstack/react-query";

export const useCriptoCurrency = () => {
  const getCriptoCurrencyData = async () => {
    const resp = await fetch("https://criptoya.com/api/BTC/ARS/0.1").then(
      (res) => res.json()
    );

    return resp.belo;
  };

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["criptoCurrencyData"],
    queryFn: getCriptoCurrencyData,
  });

  return {
    isLoading,
    data,
    error,
    refetch,
  };
};
