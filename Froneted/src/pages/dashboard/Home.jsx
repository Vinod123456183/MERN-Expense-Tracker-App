import React, { useEffect, useRef } from "react";
import { useThemeColors } from "../core/colors";
import Header from "../core/Header";
import SideBar from "../core/SideBar";
import Welcome from "../../components/Welcome";
import BalanceComponent from "../../components/BalanceComponent";
import LatestTransition from "../../components/LatestTransition";
import PieChart from "../../components/PieChart";
import { motion, useInView } from "framer-motion";
import { useDashBoard as incomeUseDashBoard } from "../../context/IncomeDashBoardContext";
import { useDashBoard as expenseUseDashBoard } from "../../context/ExpenseDashBoardContext";

// ✅ Scroll animation wrapper component
const ScrollAnimationWrapper = ({ children, delay = 0.3 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

function Home() {
  const {
    totalIncomeLeft,
    totalIncome,
    averageIncomeTotal,
    averageOFTheIncome,
  } = incomeUseDashBoard();
  const {
    totalExpenseAmount,
    totalExpense,
    averageExpenseTotal,
    averageOFTheExpense,
  } = expenseUseDashBoard();

  useEffect(() => {
    totalIncome();
    totalExpense();
    averageOFTheIncome();
    averageOFTheExpense();
  }, []);

  const { borderGrey, greyText } = useThemeColors();

  return (
    <div className="w-full max-w-[1440px] flex flex-col">
      <Header />

      <div className="flex">
        <SideBar expanded={false} setExpanded={() => {}} isMobile={false} />

        <div className={`transition-all duration-300 w-full px-2 pt-4 ml-16`}>
          <div className={`text-3xl rounded-lg p-2 font-raleway ${greyText}`}>
            <ScrollAnimationWrapper delay={0.2}>
              <Welcome name="Dear" />
            </ScrollAnimationWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <ScrollAnimationWrapper delay={0.3}>
              <BalanceComponent
                text="Total Income Insights"
                amount={totalIncomeLeft}
                about="Go Out Earn Something"
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper delay={0.4}>
              <BalanceComponent
                text="Total Expenses"
                amount={totalExpenseAmount}
                about="Uda Diye BC"
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper delay={0.5}>
              <BalanceComponent
                text="Final Balance Overview"
                amount={totalIncomeLeft - totalExpenseAmount}
                about="Aaukat 2.0"
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper delay={0.6}>
              <BalanceComponent
                text="Average Income Earned"
                amount={averageIncomeTotal}
                about="Espresso Level!"
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper delay={0.7}>
              <BalanceComponent
                text="Average Expense"
                amount={averageExpenseTotal}
                about="Sad Hours"
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper delay={0.8}>
              <BalanceComponent
                text="Income Expense Ratio"
                amount={
                  totalExpenseAmount === 0
                    ? "0"
                    : (totalIncomeLeft / totalExpenseAmount).toFixed(3)
                }
                about="A never-ending tug-of-war!"
              />
            </ScrollAnimationWrapper>
          </div>

          <div className={`pt-4 grid grid-cols-1 lg:grid-cols-2 gap-2 rounded`}>
            <ScrollAnimationWrapper delay={0.9}>
              <LatestTransition />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper delay={1}>
              <PieChart />
            </ScrollAnimationWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
