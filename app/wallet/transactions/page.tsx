"use client";

import { Sidebar } from "@/app/components/Sidebar";
import { TransactionsDashboard } from "./TransactionsDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function TransactionPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8">
          <TransactionsDashboard />
        </main>
      </div>
    </QueryClientProvider>
  );
}
