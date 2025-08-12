import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatearFecha(fechaString: string): string {
  const fecha = new Date(fechaString);
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const año = fecha.getFullYear();

  return `${dia}/${mes}/${año}`;
}

export const formatearValor = (valor: number) => {
  const formateado = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);

  return formateado;
};

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "ARS" ? 0 : 2,
    maximumFractionDigits: currency === "ARS" ? 0 : 2,
  }).format(amount);
};
export const getAssetColor = (currency: string) => {
  switch (currency) {
    case "bitcoin":
      return "bg-yellow-100 text-yellow-600 border-yellow-200";
    case "ars":
      return "bg-green-100 text-green-600 border-green-200";
    case "accion":
      return "bg-blue-100 text-blue-600 border-blue-200";
    case "other":
      return "bg-gray-100 text-gray-600 border-gray-200";
    case "ethereum":
      return "bg-gray-800 text-gray-300 border-gray-700";
    case "usdt":
      return "bg-green-200 text-green-800 border-green-300";
    case "solana":
      return "bg-teal-200 text-teal-700 border-teal-300";
    case "xrp":
      return "bg-gray-700 text-gray-100 border-gray-600";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

export const formatNumber = (number: number) => {
  const numberToNumber = Number(number);

  const formattedMiles = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberToNumber);
  return formattedMiles;
};
