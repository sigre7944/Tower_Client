import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Alert, TouchableOpacity, Text, View, StyleSheet, ImageBackground, Modal, TouchableHighlight, Image, TextInput, ScrollView, Platform } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CollapsibleList from './../shared/layouts/CollapsibleList';

const findAndToggle = (array, index) => {
    array[index] = !array[index]
    return array;
}

export default class Drawer extends Component {
    state={
        modalVisible: false,
        list: [
            {
                name: 'Folder 1',
                items: [
                    {
                    name: 'List1',
                    items: [
                        {
                            name: 'Item1'
                        },
                        {
                            name: 'Item2'
                        }
                    ]
                    },
                    {
                        name: 'List2',
                        items: [
                            {
                                name: 'Item1'
                            },
                            {
                                name: 'Item2'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Folder 2',
                items: [
                    {
                        name: 'List1',
                        items: [
                            {
                                name: 'Item1'
                            },
                            {
                                name: 'Item2'
                            }
                        ]
                        },
                        {
                            name: 'List2',
                            items: [
                                {
                                    name: 'Item1'
                                },
                                {
                                    name: 'Item2'
                                }
                            ]
                        }
                ]
            },
            {
                name: 'Uncategory',
                items: [
                    {
                        name: 'Item1'
                    },
                    {
                        name: 'Item1'
                    }
                ]
            }
        ]
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

    componentDidMount(){
    
    }

    handleListClick=(index) => {
        this.setState(prevState => ({toggleShow: findAndToggle(prevState.toggleShow, index)}))
    }

    handleAddList = () => {
        
        this.setState(prevState => ({
            list: prevState.list.concat([{name: 'Folder ' + (prevState.list.length), items: []}]), 
        }))
        
       this.setModalVisible(false)
    }

    render() {
        let bottom = (
            <View style={{
                alignSelf:"flex-end",
                flexDirection: "row",
                marginLeft: 16,
                alignSelf: "stretch",
            }}>
                
                <FontAwesome5 name={'search'} style={styles.icon}></FontAwesome5>
                <TextInput style={{height: 32,  width: 260}} placeholder="Search"/>
            </View>
          )
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <ImageBackground source={require('./drawer-background.png')} style={{flex: 1, width: 280, justifyContent: 'center'}} >
                        <Image
                            source={require('./icon.png')}
                            style={{
                                width: 80,
                                height: 80,
                                alignSelf: "center"
                            }}
                        />
                        <Text style={styles.headerText}>User Name</Text>
                    </ImageBackground>
                </View>
                {
                    bottom
                }
                <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.screenTitle} onPress={this.navigateToScreen('TabNavigator')}>                        
                        <FontAwesome5 name={'envelope'} style={styles.icon}/>
                        <Text>Inbox</Text>
                        <Text style={styles.amount}>5</Text>
                    </View>
                    <View style={styles.screenTitle} onPress={this.navigateToScreen('TabNavigator')}>
                        <FontAwesome5 name={'calendar'} style={styles.icon}/>
                        <Text>Today</Text>
                    </View>
                    <View style={styles.blackBar}></View>

                    {
                        this.state.list && this.state.list.map((element, index) => (
                            <View key={index}>
                                <CollapsibleList
                                    style={styles.screenSection}
                                    name={element.name}
                                    items={element.items}
                                />
                            </View> 
                        ))
                    }
                    
                    <View style={styles.blackBar}></View>
                    <TouchableOpacity 
                        style={styles.screenTitle} 
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <FontAwesome5 name={'plus'} style={styles.icon}/>                        
                        <Text>Add list</Text>
                    </TouchableOpacity>
                    <View style={styles.screenTitle} onPress={this.navigateToScreen('TabNavigator')}>
                        <FontAwesome5 name={'wrench'} style={styles.icon}/>
                        <Text>Manage list</Text>
                    </View>
                    
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <View style={styles.modalHeader}>
                                <TouchableHighlight
                                    onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <FontAwesome5 name={'times'} style={styles.icon}/>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <FontAwesome5 name={'check'} style={styles.icon}/>
                                </TouchableHighlight>
                            </View>

                            <View> 
                                <Text>Task Title</Text>
                                <TextInput placeholder="Search"></TextInput>
                                <Text>Task Title</Text>
                                <TextInput placeholder="Search"></TextInput>
                                <Text>Task Title</Text>
                                <TextInput placeholder="Search"></TextInput>
                                <Text>Task Title</Text>
                                <TextInput placeholder="Search"></TextInput>
                                <TouchableHighlight
                                    onPress={this.handleAddList}
                                >
                                    <Text>Add List</Text>
                                </TouchableHighlight>
                            </View>
                        
                        </View>
                    </View>
                </Modal>
            </View>
        
        )
      }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    headerContainer: {
        height: 160,
        alignItems: 'center'
    },
    headerText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 16
    },
    screenContainer: {
        height: 400,
        width: 280,
        alignSelf: "stretch",
        paddingTop: 8
    },
    screenStyle: {
        height: 30,
        paddingLeft: 16,
        marginTop: 4,
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20
    },
    blackBar: {
        height:2,
        backgroundColor: 'black',
        width: 240,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 12
    },
    icon:{
        fontSize: 24,
        marginRight: 8,
        marginLeft: 2
    },

    screenSection: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
      },
     
      iconStyle: {
     
        width: 30,
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
        tintColor: '#fff'
     
      },
     
      screenContentItem: {
        fontSize: 18,
        color: '#000',
        paddingLeft: 24,
        paddingBottom: 16
      },
     
      category_Text: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 21,
        padding: 16
      },
     
      screenTitle: {
        zIndex: 10,
        alignSelf: "stretch",
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
      },
      screenContent:{
       
      },    
      Btn: {
        padding: 10,
        backgroundColor: '#FF6F00'
      },
    modal: {

    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalBody: {

    },
    amount: {
        flex: 1,
        textAlign: 'right', alignSelf: 'stretch',
        paddingRight: 8
    }
});