import { createContext, useReducer } from 'react'
import { db } from './db'

export const ExpenseContext = createContext(null)

const expenseReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const id = Math.random().toString(36).substring(2, 4);
            return [...state, { ...action.payload, id: id }]
        case "UPDATE":
            const expenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            const updatableExpense = state[expenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[expenseIndex] = updatedItem;
            return updatedExpenses;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state
    }
}

export const ExpenseContextProvider = ({ children }) => {
    const [expenseState, dispatch] = useReducer(expenseReducer, db)

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    }

    const value = {
        expenses: expenseState,
        addExpense,
        deleteExpense,
        updateExpense
    }

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )
}
