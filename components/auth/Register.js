import React, { useState } from 'react'
import { View, Button, TextInput } from 'react-native'
import firebase from 'firebase'

export const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const register = async () => {
        try {
            let user = await firebase.auth().createUserWithEmailAndPassword(email, password)
            firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email
                })
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <TextInput
                placeholder='name'
                onChangeText={setName}
            />
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
                onPress={register}
            />
        </View>
    )
}

export default Register
