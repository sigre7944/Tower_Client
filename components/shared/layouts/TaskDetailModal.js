import React, { Component } from 'react';
import { Alert, TouchableOpacity, Text, View, StyleSheet, ImageBackground, Image, TextInput, ScrollView, Platform } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modalbox';

export default class TaskDetailModal extends Component {

    state = {
        isOpened: false,
        isEditing: false
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    toggleEdit = (visible) => {
        this.setState(() => ({ isEditing: visible }));
    }

    componentDidMount = () => {
        //this.props.setRef(this.refs.modalRef)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.isOpened !== prevProps.isOpened) {
            if (this.props.isOpened) {
                this.openModal()
            }
            else {
                this.closeModal()
            }
        }
    }

    openModal = () => {
        this.refs.taskInfoModal.open()
    }

    closeModal = () => {
        this.refs.taskInfoModal.close()

    }

    onClose = () => {
        this.toggleEdit(false)
        this.props.closeModal()
    }

    render() {
        return (
            <Modal
                style={{ marginTop: 50, borderRadius: 10 }}
                backButtonClose={true}
                coverScreen={true}
                isOpen={this.props.isOpened}
                ref={'taskInfoModal'}
                swipeToClose={true}
                swipeArea={500}
                onClosed={this.onClose}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    {
                        !this.state.isEditing ?
                            <View style={{ alignSelf: 'stretch', flex: 1, justifyContent: 'flex-end' }}>
                                <View style={{ alignSelf: 'stretch', flex: 1, zIndex: 10 }}>
                                    <View>
                                        <Text style={{ textAlign: 'center' }}><FontAwesome name="minus" style={{ fontSize: 26, color: "grey" }} /></Text>
                                    </View>
                                    <View style={{ flexDirection: 'row-reverse', alignItems: 'flex-start' }}>
                                        <TouchableOpacity onPress={() => () => this.closeModal()}>
                                            <FontAwesome name={'trash'} style={{ width: 50, height: 50, fontSize: 24, lineHeight: 50 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.toggleEdit(true)}>
                                            <FontAwesome name={'edit'} style={{ width: 50, height: 50, fontSize: 24, lineHeight: 50 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <View style={styles.container}>
                                            <View style={styles.head}>
                                                <CheckBox
                                                    center
                                                    checkedIcon='dot-circle-o'
                                                    uncheckedIcon='circle-o'
                                                    checked={this.props.checked}
                                                />
                                            </View>
                                            <View style={styles.body}>
                                                <Text style={styles.text}>{this.props.task_data.title}</Text>
                                            </View>
                                        </View>
                                        {this.props.task_data.schedule ?
                                            <View style={styles.container}>
                                                <View style={styles.head}>
                                                    <FontAwesome name={'calendar'} style={styles.icon} />
                                                </View>
                                                <View style={styles.body}>
                                                    <Text style={styles.text}>Thursday, June 13</Text>
                                                </View>
                                            </View>

                                            :

                                            <></>
                                        }

                                        <View style={styles.container}>
                                            <View style={styles.head}>
                                                <FontAwesome name={'circle'} style={styles.icon} />
                                            </View>
                                            <View style={styles.body}>
                                                <Text style={styles.text}>Leisure</Text>
                                            </View>
                                        </View>
                                        <View style={styles.container}>
                                            <View style={styles.head}>
                                                <FontAwesome name={'warning'} style={styles.icon} />
                                            </View>
                                            <View style={styles.body}>
                                                <Text style={styles.text}>Do first</Text>
                                            </View>
                                        </View>
                                        <View style={styles.container}>
                                            <View style={styles.head}>
                                                <FontAwesome name={'link'} style={styles.icon} />
                                            </View>
                                            <View style={styles.body}>
                                                <Text style={styles.text}>Link enabled</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            :
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                            </View>
                    }
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        borderColor: 'grey',
        borderLeftWidth: 3,
        marginBottom: 4
    },
    containerEdit: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-around'
    },
    checkBox: {
        width: 50,
        height: 60
    },
    description: {
        flex: 1
    },
    descriptionText: {
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
        lineHeight: 50
    },
    head: {
        width: 50,
        height: 50
    },
    body: {
        lineHeight: 50
    },
    text: {
        lineHeight: 45
    }
});


