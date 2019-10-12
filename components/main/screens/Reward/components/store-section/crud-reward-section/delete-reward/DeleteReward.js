import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Modal,
    Switch
} from 'react-native';

export default class DeleteReward extends React.PureComponent {

    _dismissAction = () => {
        this.props.dismissAction()
    }

    cancel = () => {
        this.props.dismissAction()
    }

    delete = () => {
        this.props.deleteActionThunk(this.props.reward_id)
        this.props.dismissAction()
    }

    render() {
        return (
            <Modal
                transparent={true}
            >
                <View
                    style={{
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            width: Dimensions.get("window").width,
                            backgroundColor: "black",
                            opacity: 0.5
                        }}

                        onPress={this._dismissAction}
                    >

                    </TouchableOpacity>

                    <View
                        style={{
                            position: "absolute",
                            width: 200,
                            height: 130,
                            borderRadius: 10,
                            backgroundColor: "white",
                            paddingHorizontal: 22,
                            paddingVertical: 32,
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text>
                                Do you want to delete?
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 10,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    marginHorizontal: 10
                                }}
                                onPress={this.cancel}
                            >
                                <Text>
                                    No
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    marginHorizontal: 10
                                }}
                                onPress={this.delete}
                            >
                                <Text>
                                    Yes
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}