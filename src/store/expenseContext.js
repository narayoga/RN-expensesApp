import { createContext, useReducer } from 'react'
import { db } from './db'

export const ExpenseContext = createContext(null)

const expenseReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // const id = Math.random().toString(36).substring(2, 4);
            // return [...state, { ...action.payload, id: id }]
            return [action.payload, ...state];
        case "SET":
            const invertedList = action.payload.reverse()
            return invertedList;
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
            return state;
    }
}

export const ExpenseContextProvider = ({ children }) => {
    const [expenseState, dispatch] = useReducer(expenseReducer, []) //array kosong tempat initial state, bisa diisi db buat dummy data

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function setExpense(expenseData) {
        dispatch({ type: 'SET', payload: expenseData });
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
        setExpense,
        deleteExpense,
        updateExpense
    }

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )
}
