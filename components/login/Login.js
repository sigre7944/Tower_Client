import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback, Keyboard } from 'react-native';
// import { GoogleSignIn } from 'expo'
import { Facebook } from 'expo'

import firebase from 'firebase'

const axios = require("axios")

const config = {
    apiKey: "AIzaSyBt1JPKlumZRjBKtlvgW8Hn7gYY8yidfQo",
    authDomain: "tower-8ed43.firebaseapp.com",
    databaseURL: "https://tower-8ed43.firebaseio.com",
    projectId: "tower-8ed43",
    storageBucket: "tower-8ed43.appspot.com",
    messagingSenderId: "129611253621"
}

firebase.initializeApp(config)

export default class Login extends React.Component{
    state = {
        emailValue: '',
        passValue: ''
    }
    
    //Google Sign In from expo-google-sign-in library is for standalone app (built one), thus cannot be used in expo developing environment

    // initAsync = async () => {
    //     await GoogleSignIn.initAsync({
    //         clientId: '129611253621-uveutitfi5g84q1g7fv7rnkos64clg31.apps.googleusercontent.com',
    //     })
    //     this._syncUserWithStateAsync();
    // }

    LoginWithFaceBook = async () => {
        // try{
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
                behevior,
            } = await Facebook.logInWithReadPermissionsAsync('425642994856328',
            {
                permissions: ['public_profile'],
                behevior: 'browser'
            })

            console.log(type)

            console.log(token)

            if(type === 'success'){
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                console.debug('Logged in!', `Hi ${(await response.json()).name}!`);
            }

            else{
                console.log("cancel")
            }
        // }
        // catch ({ message }) {
        //     console.log(`Facebook Login Error: ${message}`)
        // }
    }

    Login = () => {
        // temporary
        this.props.navigation.navigate('Main')
    }

    LoginInWithGoogle = () => {

    }

    SwitchToSignUp = () => {
        this.props.navigation.navigate('SignUp')
    }

    componentDidMount(){

        //Use React Native Navigation Lifecycle events to handle different states of a screen (willFocus, didFocus, willBlur and didBlur)

        // const willFocusSubscription = this.props.navigation.addListener(
        //     'willFocus',
        //     payload => {
        //       console.debug('willFocus', payload);
        //     }
        // );

        // this.initAsync()
    }

    render(){   
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style = {styles.container}>
                    <Text style = {styles.title}>Welcome to our App!</Text>

                    <TextInput style= {styles.loginInput} 
                        textContentType="emailAddress"
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={(emailValue) => this.setState({emailValue})} 
                        value={this.state.emailValue} />

                    <TextInput style= {styles.loginInput}
                        placeholder="Password"
                        textContentType="password"
                        secureTextEntry={true}
                        keyboardType="default"
                        onChangeText={passValue => this.setState({passValue})}
                        value={this.state.passValue}/>

                    

                    <TouchableOpacity  onPress={this.Login} title="Login">
                        <View style={styles.loginButton}>
                            <Text>Login</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <Text>Or   <Text style={styles.SignUpAnchor} onPress={this.SwitchToSignUp}>Sign Up</Text></Text>
                    
                    <Text>Or   <Text style={styles.SignUpAnchor} onPress={this.LoginWithFaceBook}>Login With FaceBook</Text></Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 24,
        marginBottom: 20
    },

    loginInput : {
        borderColor: 'blue',
        borderWidth: 1,
        width: 300,
        margin: 5,
        borderRadius: 5,
        padding: 20,
    },

    loginButton: {
        height: 40,
        width: 100,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 10
    },

    SignUpAnchor: {
        fontSize: 20,
        textDecorationLine: "underline",
        color: "red"
    }
  });