import React, {useContext, useState} from 'react'
import { Alert } from 'react-native';
import { createUser } from '../util/http';
import AuthContent from '../components/Auth/AuthContent';
import LoadingScreen from '../components/UI/loadingScreen';
import { AuthContext } from '../store/authContext';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authCtx = useContext(AuthContext)

  async function signupHandler({email, password}) {
    setIsAuthenticating(true)
    try {
      const token = await createUser(email, password)
      authCtx.authenticate(token)
    } catch (error) {
      console.log(error.response.status)
      if(error.response.status == 400) {
        Alert.alert('authenticate failed', 'email already exist')
      }
      Alert.alert('authenticate failed', 'check your connection and try again later')
    }
    setIsAuthenticating(false)
  }

  if(isAuthenticating) {
    return <LoadingScreen message={'creating user..'} />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;