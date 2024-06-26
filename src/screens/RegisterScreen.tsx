/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {View,TextInput,Button,Alert,StyleSheet} from 'react-native';
import ProjectsScreen from './src/screens/ProjectsScreen';
import LoginScreen from './src/screens/LoginScreen';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

/*const reference = database().ref('http://10.0.2.2:9000');


const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [disable, setDisable] = useState('true');

    const HandleSingUp = () => {
        auth()
        .createUserWithEmailAndPassword()
    }

        reference.set({
            name: 'Nicolas',
            age: 18,
            email: 'nico@rootinc.mx',
            password: '265Aa17B50.',
            displayName: 'Nicolas',
            disable: 'false',

        });*/


        const RegisterScreen = () => {
            // Función para mostrar el mensaje de bienvenida
            const showWelcomeMessage = () => {
                Alert.alert(
                    'Bienvenido al Registro',
                    'Gracias por registrarte en nuestra aplicación. ¡Esperamos que disfrutes tu experiencia!'
                );
            };
            // Renderización del componente
            return (
                <View style={styles.container}>
                    {/* Botón para mostrar el mensaje de bienvenida */}
                    <Button title="Mostrar Mensaje de Bienvenida" onPress={showWelcomeMessage} />
                </View>
            );
        };
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
        });
        export default RegisterScreen;
