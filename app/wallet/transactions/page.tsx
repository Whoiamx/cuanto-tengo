// #TODO: Se debe mostrar las transacciones de la suma de activos si se ahorra dinero o si se gasta el dinero de los ahorros

import { Sidebar } from "@/app/components/Sidebar";

export default function TransactionPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1>Page</h1>
      </main>
    </div>
  );
}
