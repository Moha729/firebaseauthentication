import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';

import * as Google from 'expo-auth-session/providers/google'
//ios 465955616883-cvt5getecfl41ksadkjlb7s1mbjlsr15.apps.googleusercontent.com
//and. 465955616883-p9sgqh6te34kd7msfg9djlvobajapogf.apps.googleusercontent.com

export default function App() {

  const API_KEY = 'AIzaSyBVyBmZKtDejLpAyD3BtVpgxZKutw4h9ek'
  const URL_firebase_login = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
  const URL_firebase_signup = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

  const [enteredEmail, setEnteredEmail] = useState("mo@stacks.dk")
  const [enteredPassword, setEnteredPassword] = useState('meus123')
  async function login () {
    try{
      const response = await axios.post(URL_firebase_login+API_KEY, {
        email: enteredEmail,
        password: enteredPassword,
        retrunSecureToken: true 
      })
      alert('Bruger logget ind: '+ response.data.idToken)
    }catch(err){
      alert('something went wrong: '+err.response.data.error.errors[0].message)
    }
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '465955616883-p9sgqh6te34kd7msfg9djlvobajapogf.apps.googleusercontent.com'
  })

  useEffect(() => {
    if(response?.type === 'success'){
      console.log('Tilbage fra Google: '+ response.authentication.accessToken);
    }
  })
  async function signup () {
    try{
      const response = await axios.post(URL_firebase_signup+API_KEY, {
        email: enteredEmail,
        password: enteredPassword,
        retrunSecureToken: true 
      })
      alert('burger oprettet: '+ response.data.idToken)
    }catch(err){
      alert('something went wrong: '+err.response.data.error.errors[0].message)
    }
  }

  return (
    <View style={styles.container}>
      <GoogleLogin promptAsync={promptAsync} />      
      <StatusBar style="auto" />
    </View>
  );
}

const GoogleLogin = (props) => {

  return (
    <View>
      <Button 
        onPress={() => props.promptAsync()}
        title='Google login'/>
    </View>
  )
}



const UserNameLogin = (props) => {

  return(

    <View style={styles.container}>
  <Text>Login</Text>

  <TextInput 
    onChangeText={txt => setEnteredEmail(txt)}
    value={enteredEmail}/>
  
  <TextInput 
    onChangeText={txt => setEnteredPassword(txt)}
    value={enteredPassword}/>
  
  <Button title='login' onPress={login} />

  
  <Text>Signup</Text>

  <TextInput 
    onChangeText={txt => setEnteredEmail(txt)}
    value={enteredEmail}/>
  
  <TextInput 
    onChangeText={txt => setEnteredPassword(txt)}
    value={enteredPassword}/>
  
  <Button title='signup' onPress={signup} />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
