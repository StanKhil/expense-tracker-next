'use client';
import { useState, useEffect } from "react";
import {
  getExpensesByCategory,
  getExpensesByDate,
  getExpensesByMonth,
  getExpensesByYear,
  getIncomesByCategory,
  getIncomesByDate,
  getIncomesByMonth,
  getIncomesByYear,
} from "../../../lib/report";
import { Income, Expense, IncomeCategory, ExpenseCategory } from "../../../lib/defenition";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

type FilterType = "category" | "date" | "month" | "year";
type StatisticType = "expenses" | "incomes" | "all";

export default function Page() {
    const [filterType, setFilterType] = useState<FilterType>("category");
    const [filterValue, setFilterValue] = useState<string>("");

    const [allIncomes, setAllIncomes] = useState<Income[]>([]);
    const [allExpenses, setAllExpenses] = useState<Expense[]>([]);

    const [filteredIncomes, setFilteredIncomes] = useState<Income[]>([]);
    const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
    const [statisticYear, setStatisticYear] = useState<number>(new Date().getFullYear());

    const incomeCategories = Object.values(IncomeCategory);
    const expenseCategories = Object.values(ExpenseCategory);

    const formatDate = (dateStr: string): string => new Date(dateStr).toLocaleDateString();

    const totalIncomes = allIncomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpenses = allExpenses.reduce((sum, e) => sum + e.amount, 0);

    const [statisticType, setStatisticType] = useState<StatisticType>("expenses");

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const fetchedIncomes = await Promise.all(
                    incomeCategories.map((cat) => getIncomesByCategory(cat))
                ).then(res => res.flat());

                const fetchedExpenses = await Promise.all(
                    expenseCategories.map((cat) => getExpensesByCategory(cat))
                ).then(res => res.flat());

                setAllIncomes(fetchedIncomes);
                setAllExpenses(fetchedExpenses);

                setFilteredIncomes(fetchedIncomes);
                setFilteredExpenses(fetchedExpenses);
            } catch (err) {
                console.error("Failed to fetch all data:", err);
            }
        };
        fetchAllData();
    }, []);

    const fetchData = async () => {
        try {
            let fetchedIncomes: Income[] = [];
            let fetchedExpenses: Expense[] = [];

            if (filterType === "category") {
                if (filterValue) {
                    fetchedIncomes = await getIncomesByCategory(filterValue);
                    fetchedExpenses = await getExpensesByCategory(filterValue);
                } else {
                    fetchedIncomes = allIncomes;
                    fetchedExpenses = allExpenses;
                }
            } else if (filterType === "date") {
                if (filterValue) {
                    fetchedIncomes = await getIncomesByDate(filterValue);
                    fetchedExpenses = await getExpensesByDate(filterValue);
                }
            } else if (filterType === "month") {
                if (filterValue) {
                    const [year, month] = filterValue.split("-");
                    fetchedIncomes = await getIncomesByMonth(year, month);
                    fetchedExpenses = await getExpensesByMonth(year, month);
                }
            } else if (filterType === "year") {
                if (filterValue) {
                    fetchedIncomes = await getIncomesByYear(filterValue);
                    fetchedExpenses = await getExpensesByYear(filterValue);
                }
            }

            setFilteredIncomes(fetchedIncomes);
            setFilteredExpenses(fetchedExpenses);
        } catch (err) {
            console.error("Failed to fetch filtered data:", err);
        }
    };

    const chartData = months.map((month, index, array) => {
        const year = statisticYear;
        const income = filteredIncomes
            .filter(i => {
            const d = new Date(i.date);
            return d.getMonth() === index && d.getFullYear() === year;
            })
            .reduce((sum, i) => sum + i.amount, 0);

        const expense = filteredExpenses
            .filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === index && d.getFullYear() === year;
            })
            .reduce((sum, e) => sum + e.amount, 0);

        return {
            month,
            year,
            Income: income,
            Expense: expense,
            Total: income - expense,
        };
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Balance: <span className="text-indigo-600">{totalIncomes - totalExpenses} USD</span>
                </h1>

                <div className="mb-8 flex flex-col md:flex-row items-start md:items-end gap-4">
                <div className="flex flex-col gap-3 w-full md:w-auto">
                    <label className="font-medium text-gray-700">Filter:</label>
                    <select
                    className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 transition"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as FilterType)}
                    >
                    <option value="category">By Category</option>
                    <option value="date">By Date</option>
                    <option value="month">By Month</option>
                    <option value="year">By Year</option>
                    </select>

                    {filterType === "category" && (
                    <select
                        className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 transition"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    >
                        <option value="">All categories</option>
                        {incomeCategories.map((cat) => (
                        <option key={`income-${cat}`} value={cat}>{cat}</option>
                        ))}
                        {expenseCategories.map((cat) => (
                        <option key={`expense-${cat}`} value={cat}>{cat}</option>
                        ))}
                    </select>
                    )}

                    {filterType === "date" && (
                    <input
                        type="date"
                        className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 transition"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />
                    )}

                    {filterType === "month" && (
                    <input
                        type="month"
                        className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 transition"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />
                    )}

                    {filterType === "year" && (
                    <input
                        type="number"
                        min="2000"
                        max="2100"
                        placeholder="Enter year"
                        className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 transition"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />
                    )}
                </div>

                <button
                    onClick={fetchData}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded shadow-md hover:shadow-lg transition"
                >
                    Show
                </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-4 shadow-md hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2 text-green-800">Incomes</h3>
                    <h2 className="text-lg mb-4 text-green-900 font-semibold">
                    Total: {filteredIncomes.reduce((sum, i) => sum + i.amount, 0)} USD
                    </h2>
                    <div className="space-y-3">
                    {filteredIncomes.map((inc) => (
                        <div
                        key={inc.id}
                        className="border-l-4 border-green-600 bg-white rounded p-3 hover:bg-green-50 transition shadow-sm"
                        >
                        <strong className="text-green-700">{inc.title}</strong> - {inc.amount} USD<br />
                        <span className="text-gray-600 text-sm">{formatDate(inc.date)} : {inc.category}</span>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-red-100 to-red-200 rounded-lg p-4 shadow-md hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2 text-red-800">Expenses</h3>
                    <h2 className="text-lg mb-4 text-red-900 font-semibold">
                    Total: {filteredExpenses.reduce((sum, e) => sum + e.amount, 0)} USD
                    </h2>
                    <div className="space-y-3">
                    {filteredExpenses.map((exp) => (
                        <div
                        key={exp.id}
                        className="border-l-4 border-red-600 bg-white rounded p-3 hover:bg-red-50 transition shadow-sm"
                        >
                        <strong className="text-red-700">{exp.title}</strong> - {exp.amount} USD<br />
                        <span className="text-gray-600 text-sm">{formatDate(exp.date)} : {exp.category}</span>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Statistics</h2>
                <select
                    className="mt-2 mb-6 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 transition"
                    value={statisticType}
                    onChange={(e) => setStatisticType(e.target.value as StatisticType)}
                >
                    <option value="expenses">Expenses</option>
                    <option value="incomes">Incomes</option>
                    <option value="all">All</option>
                </select>
                <input
                    type="number"
                    min="2000"
                    max="2100"
                    placeholder="Enter year"
                    className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 transition mb-6"
                    value={statisticYear}
                    onChange={(e) => setStatisticYear(Number(e.target.value))}
                />

                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {statisticType === "incomes" && <Bar dataKey="Income" fill="#4ade80" />}
                    {statisticType === "expenses" && <Bar dataKey="Expense" fill="#f87171" />}
                    {statisticType === "all" && (
                        <>
                        <Bar dataKey="Income" fill="#4ade80" />
                        <Bar dataKey="Expense" fill="#f87171" />
                        <Bar dataKey="Total" fill="#60a5fa" />
                        </>
                    )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
        </div>
    );
};
