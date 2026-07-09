import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminRedirect,
});

function AdminRedirect() {
  useEffect(() => {
    window.location.replace("/admin/index.html");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <a href="/admin/index.html" className="text-mono border border-white/40 px-5 py-3 hover:border-white">
        Abrir painel admin
      </a>
    </main>
  );
}
