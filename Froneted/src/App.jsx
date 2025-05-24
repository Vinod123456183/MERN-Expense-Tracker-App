import React from "react";
import { ThemeProvider } from "./pages/core/ThemeContext";
import { DashBoardProvider } from "./context/IncomeDashBoardContext"; // ✅ make sure path is correct
import { Outlet } from "react-router-dom";
import { DashBoardProvider as IncomeProvider } from "./context/IncomeDashBoardContext";
import { DashBoardProvider as ExpenseProvider } from "./context/ExpenseDashBoardContext"; // ✅ Add this line

function App() {
  return (
    <ThemeProvider>
      <IncomeProvider>
        <ExpenseProvider>
          <Outlet />
        </ExpenseProvider>
      </IncomeProvider>
    </ThemeProvider>
  );
}

export default App;
