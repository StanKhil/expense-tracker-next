import axios from 'axios';
import { Income } from './defenition';
import { store } from '../store/store';
import { getAuthHeaders } from '../store/authSlice';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';


const mapIncome = (income: any): Income => ({
  ...income,
  id: income._id,
});

export const getIncomes = async (): Promise<Income[]> => {
  try {
    const response = await axios.get(`${apiUrl}/incomes`, {
      headers: getAuthHeaders(store.getState().auth),
    });
    return response.data.map(mapIncome);
  } catch (error) {
    console.error('Failed to fetch incomes:', error);
    throw error;
  }
};

export const getIncomeById = async (id: string): Promise<Income> => {
  try {
    const response = await axios.get(`${apiUrl}/incomes/${id}`, {
      headers: getAuthHeaders(store.getState().auth),
    });
    return mapIncome(response.data);
  } catch (error) {
    console.error(`Failed to fetch income with ID ${id}:`, error);
    throw error;
  }
};

export const createIncome = async (income: Income): Promise<Income> => {
  try {
    if (!income.userId || !income.title || !income.amount || !income.date || !income.category) {
      throw new Error("Missing required fields for income creation");
    }
    const response = await axios.post(`${apiUrl}/incomes`, income, {
      headers: getAuthHeaders(store.getState().auth),
    });
    return mapIncome(response.data);
  } catch (error) {
    console.error('Failed to create income:', error);
    throw error;
  }
};

export const updateIncome = async (id: string, income: Income): Promise<Income> => {
  try {
    if (!income.userId || !income.title || !income.amount || !income.date || !income.category) {
      throw new Error("Missing required fields for income update");
    }
    const response = await axios.put(`${apiUrl}/incomes/${id}`, income, {
      headers: getAuthHeaders(store.getState().auth),
    });
    return mapIncome(response.data);
  } catch (error) {
    console.error(`Failed to update income with ID ${id}:`, error);
    throw error;
  }
};

export const deleteIncome = async (id: string): Promise<{ success: boolean }> => {
  try {
    if (!id) {
      throw new Error("Income ID is required for deletion");
    }
    const response = await axios.delete(`${apiUrl}/incomes/${id}`, {
      headers: getAuthHeaders(store.getState().auth),
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to delete income with ID ${id}:`, error);
    throw error;
  }
};
