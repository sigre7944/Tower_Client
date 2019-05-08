import React from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet,
    Modal,
    Alert,
    Text,
    TouchableHighlight
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';

const styles = StyleSheet.create({
  icon: {
    width: 36,
    height: 36,
  },
});

export default class Header extends React.Component {
    // static navigationOptions = {
    //   drawerLabel: 'Home',
    //   drawerIcon: ({ tintColor }) => (
    //     <Image
    //       source={require('./Hamburger_icon.png')}
    //       style={[styles.icon, {tintColor: tintColor}]}
    //     />
    //   ),
    // };

    state = {
      modalVisible: false,
      dropdownMenuVisible: false,
    };
  

    componentDidMount = () => {
        // console.log(this.props.navigation)
    }
    
    render() {
      return (
        // <View style={{
        //   zIndex: 1,
        //   justifyContent: 'space-between',
        //   flexDirection: 'row-reverse', 
        //   height: 52, 
        //   padding:8, 
        //   borderWidth: 1,
        //   borderRadius: 2,
        //   borderColor: '#ddd',
        //   borderBottomWidth: 0,
        //   shadowColor: '#000',
        //   shadowOffset: { width: 0, height: 2 },
        //   shadowOpacity: 0.8,
        //   shadowRadius: 2}}>
        // <Modal
        //   animationType="slide"
        //   transparent={false}
        //   visible={this.state.modalVisible}
        //   onRequestClose={() => {
        //     Alert.alert('Modal has been closed.');
        //   }}>
        //   <View style={{marginTop: 22}}>
        //     <View>
        //       <Text>Hello World!</Text>

        //       <TouchableHighlight
        //         onPress={() => {
        //           this.setModalVisible(!this.state.modalVisible);
        //         }}>
        //         <Text>Hide Modal</Text>
        //       </TouchableHighlight>
        //     </View>
        //   </View>
        // </Modal>
        
        // <TouchableHighlight onPress={this.toggleDropdownMenuVisible}>
        //   <Image
        //       onPress={this.toggleDropdownMenuVisible}
        //       source={require('./dots.png')}
        //       style={[styles.icon, {tintColor: 'black'}]}
        //   />
        // </TouchableHighlight>
        // {
        //   this.props.currentNavigationState.routeName === "Journal" && <TouchableHighlight onPress={() => this.props.openDrawer()}>
        //     <Image
        //         onPress={() => this.props.openDrawer()}
        //         source={require('./Hamburger_icon.png')}
        //         style={[styles.icon, {tintColor: 'black'}]}
        //     />
        //   </TouchableHighlight>
        // }
        // { this.state.dropdownMenuVisible && this.dropDownMenu}
        
        // </View>

        <View style={{
            paddingTop: 20,
            paddingHorizontal: 10,
            height: 100,
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'gray'
        }}>
            <TouchableHighlight onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                <Image
                    source={require('./Hamburger_icon.png')}
                    style= {{
                        width: 30,
                        height: 30,
                        tintColor: 'white'
                    }}
                />
            </TouchableHighlight>
            <Text style= {{
                color: 'white',
                fontSize: 20,
                fontWeight: '500',
            }}>Today</Text>

            <TouchableHighlight >
                <Image 
                    source={require('./dots.png')}
                    style= {{
                        width: 36,
                        height: 36,
                        tintColor: 'white'
                    }}
                />
            </TouchableHighlight>

            
        </View>
      );
    }
}