import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'

import ManageExpense from './src/screens/ManageExpense';
import RecentExpenses from './src/screens/RecentExpenses';
import AllExpenses from './src/screens/AllExpenses';
import LoginScreen from './src/screens/Login';
import SignupScreen from './src/screens/SignUp';
import LoadingScreen from './src/components/UI/loadingScreen';

import { GlobalStyles } from './src/constants/styles';
import IconButton from './src/components/UI/IconButton';
import { ExpenseContextProvider } from './src/store/expenseContext';
import AuthContextProvider, { AuthContext } from './src/store/authContext';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  const authCtx = useContext(AuthContext)
  const handleLogout = () => {
    authCtx.logout()
  };
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpense');
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Logout"
        component={AllExpenses}
        listeners={{
          tabPress: handleLogout,
        }}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-log-out-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function Navigation() {
  const [isLogin, setIsLogin] = useState(true)
  const authCtx = useContext(AuthContext)
  console.log(authCtx.isAuthenticate)

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token')

      if(storedToken){
        authCtx.authenticate(storedToken)
      }

      setIsLogin(false)
    }

    fetchToken()
  }, [])

  if(isLogin){
    return <LoadingScreen/>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white',
        }}
      >
        {!authCtx.isAuthenticate ? (
          <>
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
          </>
        ) :
          <>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal',
              }}
            />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <ExpenseContextProvider>
          <Navigation />
        </ExpenseContextProvider>
      </AuthContextProvider>
    </>
  );
}
