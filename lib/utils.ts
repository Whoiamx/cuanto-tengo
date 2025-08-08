import { clsx, type ClassValue } from "clsx";
import { time } from "console";
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

// TODO: TRANSFORM BTC TO USD

// export const criptoToUsd = (valor: number) => {
//   const formateado = new Intl.NumberFormat("en-US", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(valor);

// const transformToUsd = formateado /

//   return transormToUsd;
// };
