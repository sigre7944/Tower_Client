import React, { Component } from 'react';
import { Alert, Modal, TouchableOpacity, Text, View, StyleSheet, ImageBackground, Image, TextInput, ScrollView, Platform } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CheckBox } from 'react-native-elements'

export default class TaskDetailModal extends Component {
    state={
        isOpened: false,
        isEditing: false
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    toggleEdit = (visible) => {
        this.setState(() => ({isEditing: visible}));
    }

    compo

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.isOpened}
                onRequestClose={() => {
                    Alert.alert('Modal will be closed.');
                    this.props.toggleModal(false);
                }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    {
                        !this.state.isEditing ? 
                            <TouchableOpacity style={{alignSelf: 'stretch', flex: 1, justifyContent: 'flex-end',}}>
                                <View style={{marginTop: 50, alignSelf: 'stretch', flex:1, backgroundColor: 'grey'}}>
                                    <View style={{flexDirection: 'row-reverse', alignItems: 'flex-start'}}>
                                        <TouchableOpacity onPress={() => this.props.toggleModal(false)}>
                                            <FontAwesome5 name={'trash'} style={{width: 50, height: 50, fontSize: 24, lineHeight: 50}} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.toggleEdit(true)}>
                                            <FontAwesome5 name={'edit'} style={{width: 50, height: 50, fontSize: 24,lineHeight: 50}}/>
                                        </TouchableOpacity>  
                                    </View>
                                    <View>
                                        <Text>color</Text>
                                        <Text>text</Text>
                                        <Text>deadline</Text>
                                    </View> 
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={{alignSelf: 'stretch', flex: 1, justifyContent: 'flex-end',}} onPress={() => this.setModalVisible(false)}>
                                <View style={{marginTop: 22, height: 200, backgroundColor: 'grey'}}>
                                    <TouchableOpacity onPress={() => this.props.toggleModal(false)}>
                                        <Text>Close</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.toggleEdit(false)}>
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
                                    <View>
                                        <Text>Edit Multiple Tasks</Text>
                                        <Text>Sort</Text>
                                        <Text>Share</Text>
                                    </View>   
                                </View>
                            </TouchableOpacity>
                    }
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        borderWidth: 1,
        borderColor: 'grey',
        borderLeftWidth: 3,
        marginBottom: 4
    },
    checkBox: {
        width: 50,
        height: 60
    },
    description: {
        flex: 1
    },
    descriptionText:{
        lineHeight: 25,
        fontSize: 16
    },
    descriptionAmount: {
        lineHeight: 25,
        opacity: 0.5
    },
    share: {
        width: 50,
        height: 60,
    },
    colorBox: {
        width: 50,
        height: 60
    },
    icon: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        lineHeight: 60
    }
});