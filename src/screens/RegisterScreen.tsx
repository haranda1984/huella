import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';

const reference = database().ref('http://10.0.2.2:9000');


const RegisterScreen = () => {
 /*   const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [disable, setDisable] = useState('true');

    const HandleSingUp = () => {
        auth()
        .createUserWithEmailAndPassword()
    }*/

        reference.set({
            name: 'Nicolas',
            age: 18,
            email: 'nico@rootinc.mx',
            password: '265Aa17B50.',
            displayName: 'Nicolas',
            disable: 'false'
        
        });

}

export default RegisterScreen;