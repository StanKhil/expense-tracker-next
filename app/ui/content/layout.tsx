"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logout } from "../../lib/auth";

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const userName = useSelector((state: RootState) => state.auth.userName);
  const firstLetter = userName ? userName[0].toUpperCase() : "?";

  useEffect(() => {
    if (!userName) {
      router.push("/ui/auth/login");
    }
  }, [userName, router]);

  if (!userName) {
    return null;
  }

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
    router.push("/ui/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-foreground text-background">
      <header
        className="w-full flex justify-between items-center px-6 py-4 border-b shadow-sm"
        style={{ background: "var(--foreground)", color: "var(--background)" }}
      >
        <div className="flex-1"></div>

        <nav className="flex-1 flex justify-center space-x-6 font-medium text-lg">
          <Link href="/ui/content/expenses" className="hover:underline">
            Expenses
          </Link>
          <Link href="/ui/content/incomes" className="hover:underline">
            Incomes
          </Link>
          <Link href="/ui/content/report" className="hover:underline">
            Report
          </Link>
        </nav>

        <div className="flex-1 flex justify-end">
          <button
            onClick={handleLogout}
            className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold cursor-pointer"
            style={{ background: "var(--background)", color: "var(--foreground)" }}
          >
            {firstLetter}
          </button>
        </div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
