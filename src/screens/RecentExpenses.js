import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpenseContext } from '../store/expenseContext';
import { getDateMinusDays } from '../util/date';

function RecentExpenses() {
  const expenseCtx = useContext(ExpenseContext)

  const recentExpense = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const dateMonthAgo = getDateMinusDays(today, 30)

    return expense.date > dateMonthAgo
  })

  return (
    <ExpensesOutput
      expenses={recentExpense}
      expensesPeriod="Last 30 Days"
      fallbackText={"no expenses in 30 days"}
    />
  )
}

export default RecentExpenses;
