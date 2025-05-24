const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const ADD_EXPENSE = `${BASE_URL}/api/v1/expense/add-expense`;
export const FETCH_EXPENSE = `${BASE_URL}/api/v1/expense/get-all-expense`;
export const TOTAL_EXPENSE = `${BASE_URL}/api/v1/expense/total-expense`;
export const AVERAGE_OF_EXPENSE = `${BASE_URL}/api/v1/expense/average-of-expense`;
export const LAST_30_DAYS = `${BASE_URL}/api/v1/expense/last-30-days`;

export const EDIT_EXPENSE = `${BASE_URL}/api/v1/expense/edit-expense`;
export const DELETE_EXPENSE = (id) =>
  `${BASE_URL}/api/v1/expense/delete-expense/${id}`;
