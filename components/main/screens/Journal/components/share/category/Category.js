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
    Easing
} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faList,
    faPlus,
    faTimes,
    faCheck
} from '@fortawesome/free-solid-svg-icons'

import { styles } from './styles/styles'
import { Map, fromJS } from "immutable"

import AddCategoryPanel from './add-category-panel/AddCategoryPanel.Container'

const panel_width = 338
const short_id = require("shortid")
const animation_duration = 250
const easing = Easing.inOut(Easing.linear)

export default class Category extends React.PureComponent {

    repeat_opacity_value = new Animated.Value(0.3)
    repeat_scale_value = new Animated.Value(0.3)

    state = {
        should_flatlist_update: 0,
        current_category_index: 0,
        last_category_index: -1,
        should_display_add_category_panel: false,
    }

    _displayAddCategoryPanel = () => {
        this.setState({
            should_display_add_category_panel: true
        })
    }

    _closeAddCategoryPanel = () => {
        this.setState({
            should_display_add_category_panel: false
        })
    }

    _chooseCategoryRow = (category_index) => {
        if (this.state.current_category_index !== category_index) {
            this.setState(prevState => ({
                current_category_index: category_index,
                last_category_index: prevState.current_category_index,
                should_flatlist_update: prevState.should_flatlist_update + 1
            }))
        }
    }

    _keyExtractor = (item, index) => `category-row-${item[0]}`

    _renderItem = ({ item, index }) => {
        return (
            <CategoryRow
                data={item[1]}
                category_index={index}
                _chooseCategoryRow={this._chooseCategoryRow}

                current_category_index={this.state.current_category_index}
                last_category_index={this.state.last_category_index}
            />
        )
    }

    _cancel = () => {
        this.props.hideAction()
    }

    _animate = () => {
        Animated.parallel([
            Animated.timing(
                this.repeat_opacity_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.repeat_scale_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            )
        ]).start()
    }

    componentDidMount() {
        this._animate()

        this.setState(prevState => ({
            should_flatlist_update: prevState.should_flatlist_update + 1
        }))
    }


    componentDidUpdate(prevProps, prevState){
        if(this.props.categories !== prevProps.categories){
            // console.log(this.props.categories)
        }
    }

    render() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: panel_width,
                    backgroundColor: "white",
                    borderRadius: 10,
                    overflow: "hidden",
                    transform: [{ scale: this.repeat_scale_value }],
                    opacity: this.repeat_opacity_value,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 30,
                        marginTop: 30,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faList}
                        color={"#2C2C2C"}
                        size={14}
                    />

                    <Text
                        style={styles.category_title}
                    >
                        Category
                            </Text>
                </View>

                <View
                    style={{
                        marginTop: 10,
                        marginHorizontal: 30,
                    }}
                >
                    <FlatList
                        data={Map(this.props.categories).toArray()}
                        extraData={this.state.should_flatlist_update}

                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </View>

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        marginTop: 20,
                        height: 25,
                        marginHorizontal: 30,
                        alignItems: "center"
                    }}

                    onPress={this._displayAddCategoryPanel}
                >
                    <View
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 7,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "rgba(0, 0, 0, 0.3)"
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            color="rgba(0, 0, 0, 0.3)"
                            size={7}
                        />
                    </View>

                    <Text
                        style={styles.category_text}
                    >
                        Add a new list
                            </Text>
                </TouchableOpacity>

                {this.state.should_display_add_category_panel ?
                    <AddCategoryPanel
                        _closeAddCategoryPanel={this._closeAddCategoryPanel}
                    />
                    :

                    null
                }

                <View
                    style={{
                        marginTop: 28,
                        marginHorizontal: 30,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginBottom: 35,
                    }}
                >
                    <TouchableOpacity
                        style={styles.close_icon_holder}
                        onPress={this._cancel}
                    >
                        <FontAwesomeIcon
                            icon={faTimes}
                            color="white"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.save_icon_holder}
                        onPress={this._save}
                    >
                        <FontAwesomeIcon
                            icon={faCheck}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }
}

class CategoryRow extends React.Component {


    shouldComponentUpdate(nextProps, nextState) {
        return this.props.category_index === nextProps.current_category_index
            || this.props.category_index === nextProps.last_category_index
    }

    _chooseCategoryRow = () => {
        this.props._chooseCategoryRow(this.props.category_index)
    }

    render() {
        let chosen = this.props.category_index === this.props.current_category_index,
            chosen_button_container_style = styles.unchosen_button_container

        if (chosen) {
            chosen_button_container_style = styles.chosen_button_container
        }

        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 25,
                    marginTop: 20,
                }}

                onPress={this._chooseCategoryRow}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 7,
                            backgroundColor: Map(this.props.data).get("color")
                        }}
                    >

                    </View>

                    <Text
                        style={styles.category_text}
                    >
                        {Map(this.props.data).get("name")}
                    </Text>
                </View>

                <View
                    style={chosen_button_container_style}
                >
                    {chosen ?
                        <View
                            style={styles.inner_button_container}
                        >
                        </View>

                        :
                        null
                    }
                </View>
            </TouchableOpacity>
        )
    }
}