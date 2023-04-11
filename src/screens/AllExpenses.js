import { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpenseContext } from '../store/expenseContext';

function AllExpenses() {
  const expenseCtx = useContext(ExpenseContext)

  return (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      expensesPeriod="Total"
      fallbackText={"no entry data"}
    />
  )
}

export default AllExpenses;
