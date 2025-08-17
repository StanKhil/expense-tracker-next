export enum IncomeCategory{
  Salary = 'Salary',
  Gift = 'Gift',
  Sale = 'Sale',
  Credit = 'Credit',
  Dividends = 'Dividends',
  Other = 'Other',
};

export enum ExpenseCategory {
  Products = "Products",
  Medicine = "Medicine",
  Entertainment = "Entertainment",
  Animals = "Animals",
  Transportation = "Transportation",
  Plants = "Plants",
  Education = "Education",
  Food = "Food",
  Business = "Business",
  Other = "Other"
}



export type User = {
    id: string;
    name: string;
    pasword: string;
};

export type Income = {
    id?: string;
    userId: string;
    title: string;
    amount: number;
    date: string;
    category: IncomeCategory;
};

export type Expense = {
    id?: string;
    userId: string;
    title: string;
    amount: number;
    date: string;
    category: ExpenseCategory;
};