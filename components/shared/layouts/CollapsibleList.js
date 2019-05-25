import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Alert, TouchableOpacity, Text, View, StyleSheet, ImageBackground, Image, TextInput, ScrollView, Platform } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class CollapsibleList extends Component {
    state = {
        isOpened: false
    }

    handleListClick = () => {
        this.setState(prevState => ({isOpened: !prevState.isOpened}))
    }

    render() {
        return (
            <View style={this.props.style}>
                <TouchableOpacity style={styles.screenTitle} onPress={this.handleListClick}>   
                    <Text>{this.props.name}</Text>
                    { this.props.items && <FontAwesome5 name={'arrow-right'} style={styles.icon}/>}
                </TouchableOpacity>
                <View style={styles.screenContent}>
                    {
                        this.props.items && this.state.isOpened && this.props.items.map((item, i) => (
                            <View key={i}>
                                <CollapsibleList 
                                    style={styles.screenSection}
                                    name={item.name}
                                    items={item.items}
                                />
                            </View>
                        ))
                    }
                </View>
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
        paddingLeft: 16
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