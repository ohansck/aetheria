import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject(),
};

export default function DashboardPage() {
  return (
    <main className="h-screen text-center">
      <h1>Isomorfic Starter Template</h1>
    </main>
  );
}
