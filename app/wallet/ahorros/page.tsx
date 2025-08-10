"use client";

import { Sidebar } from "@/app/components/Sidebar";
import { DashboardAhorros } from "./DashboardAhorros";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AhorrosPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 p-8">
            <DashboardAhorros />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
