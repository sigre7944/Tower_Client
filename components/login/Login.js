import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback, Keyboard } from 'react-native';

const axios = require("axios")

export default class Login extends React.Component{

    state = {
        emailValue: '',
        passValue: ''
    }
    

    Login = () => {

    }

    SwitchToSignUp = () => {
        this.props.navigation.navigate('SignUp')
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