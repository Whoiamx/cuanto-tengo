"use client";

import { cn } from "@/lib/utils";
import { Home, ArrowUpDown, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Overview", icon: Home, route: "/" },
  { name: "Transacciones", icon: ArrowUpDown, route: "/wallet/transactions" },
  { name: "Ahorros", icon: Wallet, route: "/wallet/ahorros" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-84 bg-slate-900 text-white">
      <div className="p-6">
        <h1 className="text-4xl font-bold text-nowrap">Cuanto Tengo 💲</h1>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.route;

            return (
              <li key={item.name}>
                <Link
                  href={item.route}
                  className={cn(
                    "w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-teal-600 text-white"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
