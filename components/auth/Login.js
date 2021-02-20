import React, { useState } from 'react'
import { View, Button, TextInput } from 'react-native'
import firebase from 'firebase'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        try {
            let user = await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <TextInput
                placeholder='email'
                onChangeText={setEmail}
            />
            <TextInput
                placeholder='password'
                secureTextEntry={true}
                onChangeText={setPassword}
            />

            <Button 
                title='Submit' 
                onPress={login}
            />
        </View>
    )
}

export default Login
