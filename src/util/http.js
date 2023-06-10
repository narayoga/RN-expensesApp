import axios from "axios"

const API_KEY ='AIzaSyB8089yEryJkVCaBN6apIGEOqx70zK09-g'
const url = 'https://rn-expensedb-default-rtdb.firebaseio.com/'

// CRUD EXPENSES 
export const postExpense = async (expenseData) => {
    const response = await axios.post(`${url}/expenses.json`, expenseData)
    const id = response.data.name
    return id
}

export const getExpense = async () => {
    const response = await axios.get(`${url}/expenses.json`)
    console.log('http get', response.data)

    const expenses = []

    for (const key in response.data) {  //ini sintaks for loop untuk ngambil objek di dalam "key" lalu diubah kedalam bentuk objek baru kemudian dipush ke variabel baru

        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }

        expenses.push(expenseObj)
    }

    return expenses
}

export const putExpense = (id, expenseData) => {
    return axios.put(`${url}/expenses/${id}.json`, expenseData)
}

export const delExpense = (id) => {
    return axios.delete(`${url}/expenses/${id}.json`)
}

// AUTH HTTP 

async function authenticated(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
    const response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true
    });

    console.log(response.data)

    const token = response.data.idToken
    return token
}

export function createUser(email, password) {
    return authenticated('signUp', email, password)
}

export function login(email, password) {
    return authenticated('signInWithPassword', email, password)
}