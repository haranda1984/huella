/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState,useEffect} from 'react';
import {ScrollView,View,TextInput,Image,Text,StyleSheet, Alert,TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

// Si estás utilizando TypeScript y tienes un tipo para los parámetros de tu navegador
// import { RootStackParamList } from 'path-to-your-root-stack-param-list';

import auth from '@react-native-firebase/auth';


type LoginScreenProps = {
    onLoginSuccess: () => void;
    navigation: StackNavigationProp<any, 'Login'>;
  };

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
      const emulatorHost = 'http://10.0.2.2:9099';
      auth().useEmulator(emulatorHost);
    }, []);

    const navigateToRegister = () => {
      navigation.navigate('Register');
  };

    const handleSignUp = () => {
      if(email.trim() ==='' || password.trim() ==='') {
        Alert.alert("Error", "El correo electrónico y la contraseña son obligatorios.");
        return;
      }
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          Alert.alert("Cuenta Creada", "Cuenta de usuario creada y conectada.");
          onLoginSuccess();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert("Error", "Esa dirección de correo electrónico ya está en uso.");
          } else if (error.code === 'auth/invalid-email') {
            Alert.alert("Error", "Esa dirección de correo electrónico es inválida.");
          } else {
            Alert.alert("Error de autenticación", error.message);
          }
        });
    };

    const handleLogin = () => {
      if(email.trim() ==='' || password.trim() ==='') {
        Alert.alert("Error", "El correo electrónico y la contraseña son obligatorios.");
        return;
      }
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert("Inicio de sesión exitoso", "Has iniciado sesión correctamente.");
          onLoginSuccess();
        })
        .catch(error => {
          Alert.alert("Error de autenticación", error.message);
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.logoContainer}>
                <Image
                    //source={{ uri: 'https://rootinc.mx/images/logo.png'}}
                    source={require('../../assets/images/logo/logohuellatres.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                {/*<TouchableOpacity onPress={handleSignUp} style={styles.button}>*/}
                <TouchableOpacity onPress={navigateToRegister} style={styles.button}>
                  <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6f7755', // Color de fondo para toda la pantalla
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  inputContainer: {
    width: '90%',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 38,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: '#EFEFEF', // Color de fondo para los TextInput
    fontFamily: 'Ubuntu-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',  // Organiza los hijos en línea
    justifyContent: 'space-around', // Distribuye espacio alrededor de los botones
    alignItems: 'center', // Alinea los botones verticalmente al centro
  },
  button: {
    backgroundColor: '#FFFFFF', // Color de fondo del botón
    width: 100,
    padding: 5,
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: '#6f7755', // Color del texto del botón
    fontSize: 15,
    fontFamily: 'Ubuntu-Regular',
  }
});

export default LoginScreen;