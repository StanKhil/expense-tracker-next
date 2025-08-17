'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Income, IncomeCategory } from "../../../lib/defenition";
import { getIncomes, createIncome, deleteIncome } from "../../../lib/incomes";

export default function Page() {
    const pathname = usePathname();

    const [incomes, setIncomes] = useState<Income[]>([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<IncomeCategory>(IncomeCategory.Other);
    const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [loading, setLoading] = useState(false);

    const fetchIncomes = async () => {
        try {
            setLoading(true);
            const data = await getIncomes();
            setIncomes(data);
        } catch (error) {
            console.error("Failed to load incomes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncomes();
    }, []);

    const handleAddIncome = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newIncome: Income = {
                title,
                amount,
                date,
                category,
                userId: "",
            };
            const created = await createIncome(newIncome);
            setIncomes([...incomes, created]);
            setTitle("");
            setAmount(0);
            setCategory(IncomeCategory.Other);
            setDate(new Date().toISOString().split("T")[0]);
        } catch (error) {
        console.error("Failed to create income:", error);
        }
    };

    const handleDeleteIncome = async (id?: string) => {
        if (!id) return;

        try {
            await deleteIncome(id);
            setIncomes(incomes.filter(inc => inc.id !== id));
        } catch (error) {
            console.error("Failed to delete income:", error);
        }
    };

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
        >
        <main className="flex flex-col gap-8 row-start-2 w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-center sm:text-left">Incomes Page</h1>
            <p className="text-lg text-center sm:text-left">
            Manage your incomes records here.
            </p>

            <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--foreground)" }}>
                Add New Income
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleAddIncome}>
                <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IncomeCategory)}
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                {Object.values(IncomeCategory).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                </select>
                <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                type="submit"
                className="bg-[var(--foreground)] text-[var(--background)] font-semibold py-3 rounded hover:bg-indigo-500 transition-colors"
                >
                Add Income
                </button>
            </form>
            </section>

            <section className="w-full">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--foreground)" }}>
                    All Incomes
                </h2>
                {loading ? (
                    <p>Loading incomes...</p>
                ) : incomes.length === 0 ? (
                    <p>No incomes added yet.</p>
                ) : (
                    <ul className="space-y-3">
                    {incomes.map((inc, index) => (
                        <li
                            key={inc.id || `${inc.title}-${inc.amount}-${index}`}
                            className="flex justify-between items-center p-4 border border-gray-200 rounded shadow-sm hover:shadow-md transition-shadow bg-white"
                        >
                            <div className="flex flex-col">
                            <span className="font-medium">{inc.title}</span>
                            <span className="text-sm text-gray-500">{inc.category} • {new Date(inc.date).toLocaleDateString()}</span>
                            </div>
                            <span className="font-semibold">${inc.amount.toFixed(2)}</span>
                            <button 
                                onClick={() => inc.id && handleDeleteIncome(inc.id)}
                                className="text-red-500 hover:text-red-700"
                                >
                                Delete
                            </button>

                        </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
        </div>
    );
}
