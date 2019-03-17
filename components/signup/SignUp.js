import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback, Keyboard } from 'react-native';

import {Ionicons} from '@expo/vector-icons'

const axios = require("axios")

export default class SignUp extends React.Component{

    state = {
        emailValue: '',
        passValue: '',
        rePassValue: '',
        fullNameValue: '',
        fillingInput : {
            borderBottomWidth: 1,
            width: 300,
            margin: 5,
            borderRadius: 5,
            padding: 20,
        },
        isEmailValid: false,
        isPasswordValid: false,
        isRePasswordValid: false
    }

    SwitchToLoginScreen = () => {
        this.props.navigation.navigate('Login')
    }

    SignUp = () => {

    }

    componentDidUpdate(prevProps, prevState){
        //Check if the input email is valid of a correct email format
        if(prevState.emailValue !== this.state.emailValue){
            let re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

            if(re.test(this.state.emailValue))
                this.setState({isEmailValid: true})
            
            else
                this.setState({
                    isEmailValid: false,
                    isAbleToSignUp: false
                }) 
        }

        //Check if the length of password is greater than 5
        if(prevState.passValue !== this.state.passValue){
            if(this.state.passValue.length >= 5)
                this.setState({isPasswordValid: true})
            else
                this.setState({
                    isPasswordValid: false,
                    isAbleToSignUp: false
                })


            //Check if the re-entered password matches the password, then set the re-entered password field the correct status regardlessly
            if(this.state.rePassValue === this.state.passValue && this.state.passValue !== "")
                this.setState({isRePasswordValid: true})
            
            else
                this.setState({
                    isRePasswordValid: false,
                    isAbleToSignUp: false
                })
        }

        //Check if the re-entered password matches the password
        if(prevState.rePassValue !== this.state.rePassValue){
            if(this.state.rePassValue === this.state.passValue && this.state.passValue !== "")
                this.setState({isRePasswordValid: true})
            

            else
                this.setState({
                    isRePasswordValid: false,
                    isAbleToSignUp: false
                })
        }
    }

    render(){
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style = {styles.container}>
                    <Text style = {styles.title}>Sign Up</Text>

                     
                    <View style={styles.overlayContainer}>
                        <TextInput style= {this.state.fillingInput} 
                            placeholder="Fill in your full name*"
                            keyboardType="default"
                            onChangeText={(fullNameValue) => this.setState({fullNameValue})} 
                            value={this.state.fullNameValue} />
                        
                        <View style={styles.overLayout}>
                            {this.state.fullNameValue.length > 0 ?
                                <Ionicons name="ios-checkmark" size={32} color="green"/> : null
                            }
                        </View>
                    </View>
                            
                    <View style={styles.overlayContainer}>
                        <TextInput style= {this.state.fillingInput}
                            placeholder="Email*"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            onChangeText={emailValue => this.setState({emailValue})}
                            value={this.state.emailValue}/>

                        <View style={styles.overLayout}>
                            {this.state.isEmailValid ?
                                <Ionicons name="ios-checkmark" size={32} color="green"/> : null
                            }
                        </View>
                    </View>
                    
                    <View style={styles.overlayContainer}>
                        <TextInput style= {this.state.fillingInput}
                            placeholder="Password* (at least 5 characters)"
                            textContentType="password"
                            secureTextEntry={true}
                            keyboardType="visible-password"
                            onChangeText={passValue => this.setState({passValue})}
                            value={this.state.passValue}/>

                        <View style={styles.overLayout}>
                            {this.state.isPasswordValid ?
                                <Ionicons name="ios-checkmark" size={32} color="green"/> : null
                            }
                        </View>
                    </View>
                    
                    <View style={styles.overlayContainer}>
                        <TextInput style= {this.state.fillingInput}
                            placeholder="Re-enter password*"
                            textContentType="password"
                            secureTextEntry={true}
                            keyboardType="visible-password"
                            onChangeText={rePassValue => this.setState({rePassValue})}
                            value={this.state.rePassValue}/>
                        
                        <View style={styles.overLayout}>
                            {this.state.isRePasswordValid ?
                                <Ionicons name="ios-checkmark" size={32} color="green"/> : null
                            }
                        </View>
                    </View>
                    
                    {this.state.isEmailValid && this.state.isPasswordValid && this.state.isRePasswordValid && (this.state.fullNameValue.length > 0) ?
                        <TouchableOpacity  onPress={this.SignUp} title="Sign Up">
                            <View style={styles.activeSignUpButton}>
                                <Text>Sign Up</Text>
                            </View>
                        </TouchableOpacity>

                        :

                        <View style={styles.nonActiveSignUpButton}>
                            <Text>Sign Up</Text>
                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    },
    activeSignUpButton: {
        height: 40,
        width: 100,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 10
    },
    nonActiveSignUpButton: {
        height: 40,
        width: 100,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 10,
        color: "whitesmoke",
        backgroundColor: "whitesmoke"
    },
    overlayContainer: {         //Overlay container, which is used to store 2 layer to form a overlaying construct (one layer lies on top of another)
        alignItems: "center",
        justifyContent: "center"
    },
    overLayout: {               //Overlaying layout, using absolute position to place over a relative postion layout (Css rule)
        position: "absolute",
        right: 20,
        
    }
})