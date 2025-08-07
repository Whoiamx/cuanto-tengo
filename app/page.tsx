import { Sidebar } from "./components/Sidebar";
import { Overview } from "./components/Overview";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Overview />
      </main>
    </div>
  );
}
