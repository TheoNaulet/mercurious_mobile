import { View, Text, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import { Button, Icon, Image } from 'react-native-elements';
import { signInUser, signUpUser } from '../services/authService';
import strings from '../services/strings';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const signIn = async () => {
        setLoading(true);
        try {
            await signInUser(email, password);
        } catch (error: any) {
            let errorMessage;
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = strings.login.invalidEmail;
                    break;
                case 'auth/user-disabled':
                    errorMessage = strings.login.userDisabled;
                    break;
                case 'auth/user-not-found':
                    errorMessage = strings.login.userNotFound;
                    break;
                case 'auth/wrong-password':
                    errorMessage = strings.login.wrongPassword;
                    break;
                default:
                    errorMessage = strings.login.defaultError;
            }  
            setErrorMessage(errorMessage);        
        } finally {
            setLoading(false);
        }
    };
    

    const signUp = async () => {
        setLoading(true);
        try {
            await signUpUser(email, password);
        } catch (error: any) {
            setErrorMessage(strings.login.signUpError);
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        alert('Fonctionnalité en cours de développement !')
    }
    
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/logo_mercurious.png')} />
                </View>
                <Text style={styles.textLogo}>MERCURIOUS</Text>
                <TextInput value={email} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)} style={styles.input}/>
                <TextInput secureTextEntry={true} value={password} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)} style={styles.input}/>
                {loading ? (
                    <ActivityIndicator size="large" color="#BB2649" />
                ) : (
                <>
                    {errorMessage && <Text style={{ color: '#BB2649' }}>{errorMessage}</Text>}

                    <TouchableOpacity style={styles.loginButton} onPress={signIn}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={signUp}>
                        <Text style={styles.loginButtonText}>Create Account</Text>
                    </TouchableOpacity>

                </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginBottom: 40,
        elevation: 2,
        alignItems:"center",
    },
    logo:{
        height:80,
        width:80,
    },
    textLogo:{
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold',
        color:'#BB2649',
        marginBottom:20,
    },
    login:{
        marginBottom: 20,
        borderRadius:10,
    },
    input: {
        width: 300,
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    loginButton:{
        backgroundColor:"#BB2649",
        marginBottom: 20,
        width: 300,
        height: 40,
        borderRadius:10,
        justifyContent:'center',
    },
    loginButtonText:{
        fontSize:20,
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
    }

});

export default Login;