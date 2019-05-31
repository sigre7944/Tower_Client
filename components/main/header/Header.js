import React from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet,
    Modal,
    Alert,
    Text,
    TouchableHighlight,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';

const styles = StyleSheet.create({
  icon: {
    width: 36,
    height: 36,
  },
});

export default class Header extends React.Component {

    state = {
      modalVisible: false,
      dropdownMenuVisible: false,
    };
  

    componentDidMount = () => {
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    render() {
      return (

        <View style={{
            paddingTop: 20,
            paddingHorizontal: 10,
            height: 80,
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'gray'
        }}>
            <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                <Image
                    source={require('./Hamburger_icon.png')}
                    style= {{
                        width: 30,
                        height: 30,
                        tintColor: 'white'
                    }}
                />
            </TouchableOpacity>
            <Text style= {{
                color: 'white',
                fontSize: 20,
                fontWeight: '500',
            }}>Today</Text>

            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                <Image 
                    source={require('./dots.png')}
                    style= {{
                        width: 36,
                        height: 36,
                        tintColor: 'white'
                    }}
                />
            </TouchableOpacity>

            <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    presentationStyle='formSheet'
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22, height: 200}}>
                        <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                        <View>
                            <View>
                                <Text>Add List</Text>
                                <Text>Task Title</Text>
                                <TextInput placeholder="Search"></TextInput>
                                <Text>Task Title</Text>
                                <TextInput placeholder="Search"></TextInput>
                                <Text>Task Title</Text>
                                <TextInput placeholder="Search"></TextInput>
                                <Text>Task Title</Text>
                                <TextInput placeholder="Search"></TextInput>
                            </View>
                        
                        </View>
                    </View>
                </Modal>
        </View>
      );
    }
}