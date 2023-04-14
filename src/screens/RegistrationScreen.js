import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import useAuth from '../../hook/useAuth';

const Registration = () => {
  
  const tailwind = useTailwind();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // const { signup } = useAuth()
  const auth = getAuth();

  const handleCreateUser = async () => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }


  return (
    <View style={tailwind('bg-yellow-400 relative h-full justify-center items-center')}>
        <Text style={tailwind('absolute top-20 text-xl font-bold')}>
          Sign UP
        </Text>
      <View style={tailwind('mt-3')}>
        <Text style={tailwind('text-lg')}>Step 1: Email</Text>
        <TextInput 
        placeholder='Enter Email'
        // onChangeText={(email) => setEmail(email)}
        onChangeText={setEmail}
        value={email}
        autoCapitalize='none'
        autoCorrect={false}
        style={tailwind('my-1 p-1')}
        />
      </View>
      <View style={tailwind('mt-3')}>
        <Text style={tailwind('text-lg')}>Step 2: Password</Text>
        <TextInput 
        placeholder='Enter Password'
        // onChangeText={(password) => setPassword(password)}
        onChangeText={setPassword}
        value={password}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
        style={tailwind('my-1 p-1')}
        />
      </View>
      <View style={tailwind('mt-3')}>
        <Text style={tailwind('text-lg')}>Step 3: Password Confirmation</Text>
        <TextInput 
        placeholder='Enter Password Again'
        // onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
        onChangeText={setPasswordConfirm}
        value={passwordConfirm}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
        style={tailwind('my-1 p-1')}
        />
      </View>
      <Button 
      title='Sign Up'
      color='#0235A3'
      onPress={() => handleCreateUser()}
      />
    </View>
  )
}

export default Registration