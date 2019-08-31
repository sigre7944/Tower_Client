import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Keyboard,
    Modal,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Animated
} from 'react-native';

export default class AddCategoryPanel extends React.PureComponent {


    render() {
        return (
            <View
                style={{
                    flex: 1,
                    position: "absolute",
                }}
            >
                <View>
                    <Text>Add Category</Text>
                </View>

                <View
                    style={{
                        marginTop: 20,
                    }}
                >
                    <TextInput
                        style={{
                            backgroundColor: "gainsboro",
                            borderRadius: 10,
                            height: 40,
                            flex: 1,
                        }}
                    />
                </View>

                <TouchableOpacity
                    style={{
                        marginTop: 20,
                        height: 40,
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Text>
                            Choose Color
                        </Text>

                        <View
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: "red",
                            }}
                        >
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        marginTop: 20,
                        height: 40,
                        flex: 1, 
                    }}
                >
                    <Text>
                        Share with friends
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    <View
                        style={{
                            height: 100,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "pink",
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    marginLeft: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>
                                    Clear
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: "pink",
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    marginLeft: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>
                                    X
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: "pink",
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    marginLeft: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>
                                    OK
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}