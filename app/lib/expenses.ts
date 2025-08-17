import axios from 'axios';
import { Expense } from './defenition';
import { store } from '../store/store';
import { getAuthHeaders } from '../store/authSlice';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const mapExpense = (expense: any): Expense => ({
  ...expense,
  id: expense._id,
});

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${apiUrl}/expenses/`, {
      headers: getAuthHeaders(store.getState().auth),
    });
    
    return response.data.map(mapExpense);
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    throw error;
  }
};

export const getExpenseById = async (id: string) => {
    try {
        if(!id) {
            throw new Error("Expense ID is required");
        }
        const response = await axios.get(`${apiUrl}/expenses/${id}`, {
            headers: getAuthHeaders(store.getState().auth),
        });
        return mapExpense(response.data);
    } catch (error) {
        console.error(`Failed to fetch expense with ID ${id}:`, error);
        throw error;
    }
};

export const createExpense = async (expense: Expense) => {
  try {
    if (!expense || !expense.title || !expense.amount || !expense.date || !expense.category) {
      throw new Error("Invalid expense data");
    }
    const response = await axios.post(`${apiUrl}/expenses/`, expense, {
      headers: getAuthHeaders(store.getState().auth),
    });
    return mapExpense(response.data);
  } catch (error) {
    console.error("Failed to create expense:", error);
    throw error;
  }
};

export const updateExpense = async (id: string, expense: Expense) => {
    try {
        if (!id || !expense) {
            throw new Error("Expense ID and data are required");
        }
        const response = await axios.put(`${apiUrl}/expenses/${id}`, expense, {
            headers: getAuthHeaders(store.getState().auth),
        });
        return mapExpense(response.data);
    } catch (error) {
        console.error(`Failed to update expense with ID ${id}:`, error);
        throw error;
    }
};

export const deleteExpense = async (id: string) => {
    try {
        if (!id) {
            throw new Error("Expense ID is required");
        }
        const response = await axios.delete(`${apiUrl}/expenses/${id}`, {
            headers: getAuthHeaders(store.getState().auth),
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to delete expense with ID ${id}:`, error);
        throw error;
    }
};

