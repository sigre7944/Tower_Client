import React from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet,
    Alert,
    Text,
    TouchableHighlight,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modalbox';
import { DrawerActions } from 'react-navigation-drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
        <>
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

            <TouchableOpacity onPress={() => this.refs.optionModal.open()}>
                <Image 
                    source={require('./dots.png')}
                    style= {{
                        width: 36,
                        height: 36,
                        tintColor: 'white'
                    }}
                />
            </TouchableOpacity>

            </View> 
            <Modal
                    //animationType="slide"
                    //transparent={true}
                    style={{marginTop: 300, borderRadius: 10}}
                    backButtonClose={true}
                    coverScreen={true}
                    isOpen={this.state.modalVisible}
                    ref={"optionModal"}
                    swipeToClose={true}
                    swipeArea={500}
                    >
                        <View 
                            style={{flex: 1, alignSelf:"stretch"}}
                        >
                            <View>
                                <Text style={{textAlign: 'center'}}><FontAwesome name="minus" style={{fontSize: 26, color:"grey"}}/></Text>
                            </View>
                            <View style={{flex: 1, alignSelf:"stretch"}}>
                                <Text>Edit Multiple Tasks</Text>
                                <Text>Sort</Text>
                                <Text>Share</Text>
                                <TouchableOpacity onPress={() => this.refs.optionModal.close()}>
                                    <Text>CLOSE</Text>
                                </TouchableOpacity>
                            </View>     
                        </View>
                </Modal>
        </View>

        </>
      );
    }
}