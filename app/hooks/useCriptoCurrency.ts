import { useQuery } from "@tanstack/react-query";

export const useCriptoCurrency = (cripto: string) => {
  const getCriptoCurrencyData = async () => {
    const resp = await fetch(`https://criptoya.com/api/${cripto}/ARS/0.1`).then(
      (res) => res.json()
    );

    return resp.belo;
  };

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["criptoCurrencyData", cripto],
    queryFn: getCriptoCurrencyData,
  });

  return {
    isLoading,
    data,
    error,
    refetch,
  };
};
