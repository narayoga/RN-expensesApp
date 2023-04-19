import { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(null)

export default function AuthContextProvider({children}) {
    const [token, setToken] = useState('')
    const [isAuthenticate, setIsAuthenticate] = useState(false)

    function authenticate(token) {
        setToken(token)
        AsyncStorage.setItem('token', token)
    }

    function logout() {
        setToken(null)
        AsyncStorage.removeItem('token')
    }

    const value = {
        token,
        isAuthenticate: !!token, // "!!"" fungsi switch
        authenticate,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}