import React, {useContext, useState} from 'react'
import { Alert } from 'react-native';
import { login } from '../util/http';
import LoadingScreen from '../components/UI/loadingScreen';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/authContext';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authCtx = useContext(AuthContext)

  async function loginHandler({email, password}) {
    setIsAuthenticating(true)
    try {
      const token = await login(email, password)
      authCtx.authenticate(token)
    } catch (error) {
      console.log(error)
      Alert.alert('login failed', 'please check your credentials')
    }
    setIsAuthenticating(false)
  }

  if(isAuthenticating) {
    return <LoadingScreen message={'logging in...'} />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler}  />;
}

export default LoginScreen;