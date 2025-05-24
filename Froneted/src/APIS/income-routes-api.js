const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const ADD_INCOME = `${BASE_URL}/api/v1/income/add-income`;
export const FETCH_INCOME = `${BASE_URL}/api/v1/income/get-all-income`;
export const TOTAL_INCOME = `${BASE_URL}/api/v1/income/total-income`;
export const AVERAGE_OF_INCOME = `${BASE_URL}/api/v1/income/average-of-income`;
export const RECENT_INCOME_EXPENSE_TRANSITION = `${BASE_URL}/api/v1/income/recent-transitions-income-expense`;

export const EDIT_INCOME = `${BASE_URL}/api/v1/income/edit-income`;
export const DELETE_INCOME = (id) =>
  `${BASE_URL}/api/v1/income/delete-income/${id}`;
