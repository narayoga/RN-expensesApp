import axios from "axios"

const url = 'thinkuh'

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
            amount : response.data[key].amount,
            date : new Date (response.data[key].date),
            description : response.data[key].description,
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