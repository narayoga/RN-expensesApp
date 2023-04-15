import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpenseContext } from '../store/expenseContext';
import { getDateMinusDays } from '../util/date';
import { getExpense } from '../util/http'
import LoadingScreen from '../components/UI/loadingScreen';
import ErrorScreen from '../components/UI/ErrorScreen';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState('')
  const expenseCtx = useContext(ExpenseContext)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getExpense()
        expenseCtx.setExpense(response)
      } catch (error) {
        setError('internal server error')
      }
      setIsFetching(false)
    }

    fetchData()
  }, [])
  
  function confirmHandler() {
    setError(null)
  }

  if (error) {
    return <ErrorScreen message={error} confirmHandler={confirmHandler} />
  }

  if (isFetching) {
    return <LoadingScreen/>
  }

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
