"use client";

import { Sidebar } from "./components/Sidebar";
import { Overview } from "./components/Overview";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
//Creamos el cliente de Tanstack Query
const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8">
          <Overview />
        </main>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
