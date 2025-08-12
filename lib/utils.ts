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
export const getAssetColor = (type: string) => {
  switch (type) {
    case "crypto":
      return "bg-orange-100 text-orange-600 border-orange-200";
    case "fiat":
      return "bg-green-100 text-green-600 border-green-200";
    case "stock":
      return "bg-blue-100 text-blue-600 border-blue-200";
    case "bond":
      return "bg-purple-100 text-purple-600 border-purple-200";
    case "real-estate":
      return "bg-indigo-100 text-indigo-600 border-indigo-200";
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
