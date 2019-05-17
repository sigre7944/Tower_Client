import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Alert, TouchableOpacity, Text, View, StyleSheet, ImageBackground, Image, TextInput, ScrollView, Platform } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class Drawer extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

    componentDidMount(){
    
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
                <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.screenTitle} onPress={this.navigateToScreen('TabNavigator')}>
                        
                        <Text>Inbox</Text>
                        <FontAwesome5 name={'envelope'} style={styles.icon}/>
                    </View>
                    <View style={styles.screenTitle} onPress={this.navigateToScreen('TabNavigator')}>
                        
                        <Text>Today</Text>
                        <FontAwesome5 name={'calendar'} style={styles.icon}/>
                    </View>
                    <View style={styles.blackBar}></View>
                    <View style={styles.screenTitle} onPress={this.navigateToScreen('TabNavigator')}>
                        
                        <Text>Folder 1</Text>
                        <FontAwesome5 name={'folder'} style={styles.icon}/>
                    </View>

                    <View style={styles.screenSection}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.screenTitle} onPress={() => console.log('clicked')}>   
                            <Text>Folder 2 </Text>
                            <FontAwesome5 name={'arrow-right'} style={styles.icon}/>
                        </TouchableOpacity>
                        <View style={styles.screenContent}>
                
                
                            <TouchableOpacity style={styles.screenContentItem} >
                
                                <Text> Item 1 </Text>
                
                
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.screenContentItem} >
                
                                <Text> Item 2 </Text>
                
                
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.screenContentItem} >
                
                                <Text> Item 3 </Text>
                
                
                            </TouchableOpacity>

                        
                
                        </View>
                    </View>
                    <View style={styles.blackBar}></View>
                    <View style={styles.screenTitle} onPress={this.navigateToScreen('TabNavigator')}>
                        
                        <Text>Add list</Text>
                        <FontAwesome5 name={'plus'} style={styles.icon}/>
                    </View>
                    <View style={styles.screenTitle} onPress={this.navigateToScreen('TabNavigator')}>
                        
                        <Text>Manage list</Text>
                        <FontAwesome5 name={'wrench'} style={styles.icon}/>
                    </View>
                    
                </ScrollView>
                {
                    bottom
                }
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
        alignSelf: "stretch",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8
      },
      screenContent:{
       
      },    
      Btn: {
        padding: 10,
        backgroundColor: '#FF6F00'
      }
});