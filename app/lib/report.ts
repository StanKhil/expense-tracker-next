import axios from 'axios';
import { Expense, Income} from './defenition';
import { store } from '../store/store';
import { getAuthHeaders } from '../store/authSlice';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const mapExpense = (expense: any): Expense => ({
  ...expense,
  id: expense._id,
});

const mapIncome = (income: any): Income => ({
  ...income,
    id: income._id,
});



export const getExpensesByDate = async(date: string) => {
    try {
        if (!date) {
            throw new Error("Date is required for fetching expenses by date");
        }
        const response = await axios.get(`${apiUrl}/expenses/date/${date}`, {
            headers: getAuthHeaders(store.getState().auth),
        });
        return response.data.map(mapExpense);
    } catch (error) {
        console.error(`Failed to fetch expenses for date ${date}:`, error);
        throw error;
    }
}

export const getExpensesByCategory = async(category: string) => {
    try {
        if (!category) {
            throw new Error("Category is required for fetching expenses by category");
        }
        const response = await axios.get(`${apiUrl}/expenses/category/${category}`, {
            headers: getAuthHeaders(store.getState().auth),
        });
        return response.data.map(mapExpense);
    } catch (error) {
        console.error(`Failed to fetch expenses for category ${category}:`, error);
        throw error;
    }
}

export const getExpensesByMonth = async(year: string, month: string) => {
    try {
        if (!year || !month) {
            throw new Error("Year and month are required for fetching expenses by month");
        }
        const response = await axios.get(`${apiUrl}/expenses/month/${year}/${month}`, {
            headers: getAuthHeaders(store.getState().auth),
        });
        return response.data.map(mapExpense);
    } catch (error) {
        console.error(`Failed to fetch expenses for month ${year}${month}:`, error);
        throw error;
    }
}

export const getExpensesByYear = async(year: string) => {
    try {
        if (!year) {
            throw new Error("Year is required for fetching expenses by year");
        }
        const response = await axios.get(`${apiUrl}/expenses/year/${year}`, {
            headers: getAuthHeaders(store.getState().auth),
        });
        return response.data.map(mapExpense);
    } catch (error) {
        console.error(`Failed to fetch expenses for year ${year}:`, error);
        throw error;
    }
}

export const getIncomesByDate = async (date: string) => {
    try {
        if (!date) {
            throw new Error("Date is required for fetching incomes by date");
        }
        const response = await axios.get(`${apiUrl}/incomes/date/${date}`, {
            headers: getAuthHeaders(store.getState().auth),
        });
        return response.data.map(mapIncome);
    } catch (error) {
        console.error(`Failed to fetch incomes for date ${date}:`, error);
        throw error;
    }
}

export const getIncomesByCategory = async (category: string) => {
    try {
        if (!category) {
            throw new Error("Category is required for fetching incomes by category");
        }
        const response = await axios.get(`${apiUrl}/incomes/category/${category}`, {
            headers: getAuthHeaders(store.getState().auth),
        });
        return response.data.map(mapIncome);
    } catch (error) {
        console.error(`Failed to fetch incomes for category ${category}:`, error);
        throw error;
    }
}

export const getIncomesByMonth = async (year: string, month: string) => {
    try {
        if (!year || !month) {
            throw new Error("Year and month are required for fetching incomes by month");
        }
        const response = await axios.get(`${apiUrl}/incomes/month/${year}/${month}`, {
            headers: getAuthHeaders(store.getState().auth),
        });
        return response.data.map(mapIncome);
    } catch (error) {
        console.error(`Failed to fetch incomes for month ${year}${month}:`, error);
        throw error;
    }
}

export const getIncomesByYear = async (year: string) => {
    try {
        if (!year) {
            throw new Error("Year is required for fetching incomes by year");
        }
        const response = await axios.get(`${apiUrl}/incomes/year/${year}`, {
            headers: getAuthHeaders(store.getState().auth),
        });
        return response.data.map(mapIncome);
    } catch (error) {
        console.error(`Failed to fetch incomes for year ${year}:`, error);
        throw error;
    }
}