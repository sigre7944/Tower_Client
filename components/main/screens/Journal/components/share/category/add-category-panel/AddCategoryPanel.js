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
    Dimensions
} from 'react-native'

const window_height = Dimensions.get("window").height
const window_width = Dimensions.get("window").width
const easing = Easing.inOut(Easing.linear)
const animation_duration = 250

export default class AddCategoryPanel extends React.PureComponent {

    anim_translate_y = new Animated.Value(window_height)

    _animate = () => {
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

    componentDidMount(){
        this._animate()
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
                            transform: [{translateY: this.anim_translate_y}],
                            position: "absolute"
                        }}
                    >

                    </Animated.View>
                </View>
            </Modal>
        )
    }
}