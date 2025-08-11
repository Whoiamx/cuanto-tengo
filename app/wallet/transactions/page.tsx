import { Sidebar } from "@/app/components/Sidebar";
import { TransactionsDashboard } from "./TransactionsDashboard";

export default function TransactionPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <TransactionsDashboard />
      </main>
    </div>
  );
}
