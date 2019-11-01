import React from 'react'

import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    FlatList,
    TouchableOpacity,
    TextInput,
    Animated,
    Easing,
    Modal,
    Dimensions,
    SafeAreaView
} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faTimes,
    faCheck
} from '@fortawesome/free-solid-svg-icons'

import { styles } from './styles/styles'

import { Map, fromJS } from 'immutable'

const window_height = Dimensions.get("window").height
const window_width = Dimensions.get("window").width
const easing = Easing.inOut(Easing.linear)
const animation_duration = 250
const short_id = require("shortid")

export default class AddCategoryPanel extends React.PureComponent {

    anim_translate_y = new Animated.Value(window_height)

    state = {
        category_title: "",

        color: "no color",

        should_color_panel_display: false,

        category_title_exists: false
    }

    _closeTitleWarning = () => {
        this.setState({
            category_title_exists: false
        })
    }

    _setColor = (color) => {
        this.setState({
            color
        })
    }

    _appearAnim = () => {
        Animated.timing(
            this.anim_translate_y,
            {
                toValue: 0,
                duration: animation_duration,
                easing,
                useNativeDriver: true
            }
        ).start()
    }

    _disappearAnim = () => {
        Animated.timing(
            this.anim_translate_y,
            {
                toValue: window_height,
                duration: animation_duration,
                easing,
                useNativeDriver: true
            }
        ).start(() => { this.props._closeAddCategoryPanel() })
    }

    _close = () => {
        // this._disappearAnim()
        this.props._closeAddCategoryPanel()
    }

    _save = () => {
        if (this.state.category_title.length > 0 && !this._checkIfCategoryNameExists(this.state.category_title)) {
            let id = `category-${short_id.generate()}`,
                category_obj = fromJS({
                    id,
                    name: this.state.category_title,
                    color: this.state.color,
                    quantity: 0
                }),

                sending_data = {
                    keyPath: [id],
                    notSetValue: {},
                    updater: (value) => category_obj
                }

            this.props.updateCategory(sending_data)
        }
    }

    _checkIfCategoryNameExists = (name) => {
        let found = false
        Map(this.props.categories).valueSeq().every((value) => {
            if (Map(value).get("name") === name) {
                found = true
                return false
            }

            return true
        })

        this.setState({
            category_title_exists: found
        })

        return found
    }

    _onCategoryTitleChange = (e) => {
        this.setState({
            category_title: e.nativeEvent.text
        })
    }

    _openColorPanel = () => {
        this.setState({
            should_color_panel_display: true
        })
    }

    _closeColorPanel = () => {
        this.setState({
            should_color_panel_display: false
        })
    }

    componentDidMount() {
        this._appearAnim()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.can_close_add_category_panel !== prevProps.can_close_add_category_panel && this.props.can_close_add_category_panel) {
            this.props._closeAddCategoryPanel()
        }
    }

    render() {
        return (
            <Modal
                transparent={true}
            >
                <View
                    style={{
                        flex: 1,
                        position: "relative"

                    }}
                >
                    <Animated.View
                        style={{
                            width: window_width,
                            height: window_height,
                            backgroundColor: "white",
                            transform: [{ translateY: this.anim_translate_y }],
                            position: "absolute"
                        }}
                    >
                        <SafeAreaView>
                            <ScrollView
                                scrollEnabled={false}
                                keyboardDismissMode="on-drag"
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginHorizontal: 20,
                                        marginTop: 15,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: 40,
                                            height: 40,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                        onPress={this._close}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            size={20}
                                            color="#2C2C2C"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            width: 40,
                                            height: 40,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                        onPress={this._save}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            size={20}
                                            color={this.state.category_title.length > 0 ? "#05838B" : "#BDBDBD"}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Text
                                    style={styles.title_text}
                                >
                                    Add category
                            </Text>

                                <View
                                    style={{
                                        marginTop: 30,
                                    }}
                                >
                                    <Text
                                        style={styles.small_text}
                                    >
                                        Category Title
                                </Text>

                                    <View
                                        style={styles.button_container}
                                    >
                                        <TextInput
                                            style={styles.text_input}
                                            placeholder="Work"
                                            value={this.state.category_title}
                                            onChange={this._onCategoryTitleChange}
                                        />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        marginTop: 30,
                                    }}
                                >
                                    <Text
                                        style={styles.small_text}
                                    >
                                        Colour
                                </Text>

                                    <TouchableOpacity
                                        style={styles.button_container}

                                        onPress={this._openColorPanel}
                                    >

                                        {this.state.color === "no color" || this.state.color === "white" ?
                                            <View
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: 12,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderWidth: 1,
                                                    borderColor: "#2C2C2C",
                                                    marginBottom: 10,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        width: 1,
                                                        backgroundColor: "#2C2C2C",
                                                        transform: [{ rotate: "45deg" }]
                                                    }}
                                                >
                                                </View>
                                            </View>
                                            :
                                            <View
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: 12,
                                                    backgroundColor: this.state.color,
                                                    marginBottom: 10,
                                                }}
                                            >

                                            </View>
                                        }
                                    </TouchableOpacity>
                                </View>

                                {this.state.should_color_panel_display ?
                                    <ColorPanel
                                        _closeColorPanel={this._closeColorPanel}
                                        _setColor={this._setColor}
                                    />
                                    :

                                    null
                                }

                                {this.state.category_title_exists ?
                                    <NameExistsWarning
                                        _closeTitleWarning={this._closeTitleWarning}
                                    />
                                    :
                                    null
                                }

                                <View
                                    style={{
                                        marginTop: 30,
                                    }}
                                >
                                    <Text
                                        style={styles.small_text}
                                    >
                                        Shared with
                                </Text>

                                    <TouchableOpacity
                                    >
                                        <Text
                                            style={styles.invite_friends_text}
                                        >
                                            Invite friends
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    </Animated.View>
                </View>
            </Modal>
        )
    }
}

class NameExistsWarning extends React.PureComponent {

    render() {
        return (
            <Modal
                transparent={true}
            >
                <View
                    style={{
                        flex: 1,
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            width: window_width,
                            backgroundColor: "black",
                            opacity: 0.2
                        }}

                        onPress={this.props._closeTitleWarning}
                    >

                    </TouchableOpacity>

                    <View
                        style={{
                            position: "absolute",
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 30,
                        }}
                    >
                        <Text
                            style={styles.title_warning_text}
                        >
                            Category's title exists
                        </Text>
                        <TouchableOpacity
                            style={{
                                marginTop: 18,
                                height: 25,
                                justifyContent: "center",
                                alignItems: "center",
                            }}

                            onPress={this.props._closeTitleWarning}
                        >
                            <Text
                                style={styles.warning_close_text}
                            >
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

class ColorPanel extends React.PureComponent {
    render() {
        return (
            <Modal
                transparent={true}
            >
                <View
                    style={{
                        flex: 1,
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            width: window_width,
                            backgroundColor: "black",
                            opacity: 0.2
                        }}

                        onPress={this.props._closeColorPanel}
                    >

                    </TouchableOpacity>

                    <View
                        style={{
                            position: "absolute",
                            width: 200,
                            height: 200,
                            backgroundColor: "white",
                            borderRadius: 10,
                            padding: 32,
                            justifyContent: "space-between"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <NoColorButton
                                {...this.props}
                            />
                            <ColorButton
                                color="#F78096"
                                {...this.props}
                            />
                            <ColorButton
                                color="#6F73D9"
                                {...this.props}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <ColorButton
                                color="#3D868B"
                                {...this.props}
                            />
                            <ColorButton
                                color="#CCF3F3"
                                {...this.props}
                            />
                            <ColorButton
                                color="#DDC8C4"
                                {...this.props}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <ColorButton
                                color="#995852"
                                {...this.props}
                            />
                            <ColorButton
                                color="#EFDA6E"
                                {...this.props}
                            />
                            <ColorButton
                                color="#003F5C"
                                {...this.props}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

class NoColorButton extends React.PureComponent {

    _choose = () => {
        this.props._setColor("no color")
        this.props._closeColorPanel()
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    width: 23,
                    height: 23,
                    borderRadius: 23,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#2C2C2C"
                }}

                onPress={this._choose}
            >
                <View
                    style={{
                        flex: 1,
                        width: 1,
                        backgroundColor: "#2C2C2C",
                        transform: [{ rotate: "45deg" }]
                    }}
                >

                </View>
            </TouchableOpacity>
        )
    }
}

class ColorButton extends React.PureComponent {

    _chooseColor = () => {
        this.props._setColor(this.props.color)
        this.props._closeColorPanel()
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    width: 23,
                    height: 23,
                    borderRadius: 23,
                    backgroundColor: this.props.color
                }}

                onPress={this._chooseColor}
            >

            </TouchableOpacity>
        )
    }
}