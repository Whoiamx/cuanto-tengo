import { DashboardAhorros } from "@/app/components/ahorros/DashboardAhorros";
import { Sidebar } from "@/app/components/Sidebar";

export default function AhorrosPage() {
  return (
    <div>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8">
          <DashboardAhorros />
        </main>
      </div>
    </div>
  );
}
