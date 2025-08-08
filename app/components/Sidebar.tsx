"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Home, ArrowUpDown, Wallet } from "lucide-react";

const navigation = [
  { name: "Overview", icon: Home, current: true },
  { name: "Transacciones", icon: ArrowUpDown, current: false },
  { name: "Ahorros", icon: Wallet, current: false },
];

export function Sidebar() {
  const [currentPage, setCurrentPage] = useState("Overview");

  return (
    <div className="w-84 bg-slate-900 text-white">
      <div className="p-6">
        <h1 className="text-4xl font-medium text-nowrap">
          <i>Cuanto Tengo </i>💲
        </h1>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.name === currentPage;
            return (
              <li key={item.name}>
                <button
                  onClick={() => setCurrentPage(item.name)}
                  className={cn(
                    "w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-teal-600 text-white"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
