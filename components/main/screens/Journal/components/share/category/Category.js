import React from 'react'

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
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
const animation_duration = 250
const easing = Easing.inOut(Easing.linear)
const category_height = 45 // row's height = 25 + margin top = 20

const list_max_height = 8 * category_height


export default class Category extends React.PureComponent {

    repeat_opacity_value = new Animated.Value(0.3)
    repeat_scale_value = new Animated.Value(0.3)

    start_index = 0

    chosen_category_id = ""

    state = {
        should_flatlist_update: 0,
        current_category_index: 0,
        last_category_index: -1,
        should_display_add_category_panel: false,

        can_close_add_category_panel: false,
    }

    _displayAddCategoryPanel = () => {
        this.setState({
            should_display_add_category_panel: true
        })
    }

    _closeAddCategoryPanel = () => {
        this.setState({
            should_display_add_category_panel: false,
            can_close_add_category_panel: false
        })
    }

    _chooseCategoryRow = (category_index, category_id) => {
        if (this.state.current_category_index !== category_index) {

            this.chosen_category_id = category_id

            this.setState(prevState => ({
                current_category_index: category_index,
                last_category_index: prevState.current_category_index,
                should_flatlist_update: prevState.should_flatlist_update + 1
            }), () => {
                this._scrollToRow(category_index)
            })
        }
    }

    _scrollToRow = (category_index) => {
        if (this._flatlist_ref) {
            this._flatlist_ref.scrollToOffset({ animated: true, offset: category_index * category_height })
        }
    }

    _scrollToEnd = () => {
        if (this._flatlist_ref) {
            this._flatlist_ref.scrollToEnd({ animated: false })
        }
    }

    _getItemLayout = (data, index) => ({
        length: category_height,
        offset: category_height * index,
        index
    })

    _setRef = (r) => this._flatlist_ref = r

    _findStartIndex = (task_data) => {
        if (task_data) {
            let category_id = Map(task_data).get("category"),
                counter = 0

            Map(this.props.categories).keySeq().every((key) => {
                if (key === category_id) {
                    return false
                }

                counter += 1
                return true
            })

            this.start_index = counter

            this._chooseCategoryRow(this.start_index, category_id)
        }

        else {
            let category_id = Map(this.props.categories).keySeq().get(0)
            this.start_index = 0

            this._chooseCategoryRow(this.start_index, category_id)

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

    _save = () => {
        if (this.props.edit) {
            let keyPath = ["category"],
                notSetValue = this.chosen_category_id,
                updater = (value) => this.chosen_category_id

            this.props._editFieldData(keyPath, notSetValue, updater)
        }

        else {
            let sending_obj = {
                keyPath: ["category"],
                notSetValue: this.chosen_category_id,
                updater: (value) => this.chosen_category_id
            }

            this.props.updateTaskCategory(sending_obj)
        }

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

    _chooseNewCreatedCategory = () => {
        let latest_index = Map(this.props.categories).toArray().length - 1

        this.chosen_category_id = Map(Map(this.props.categories).toArray()[latest_index][1]).get("id")

        this.setState(prevState => ({
            current_category_index: latest_index,
            last_category_index: prevState.current_category_index,
            should_flatlist_update: prevState.should_flatlist_update + 1
        }), () => {
            this.setState({
                can_close_add_category_panel: true
            })
        })
    }

    _onContentSizeChange = (width, height) => {
        this._scrollToEnd()
    }

    componentDidMount() {
        this._animate()

        if (this.props.edit) {
            this._findStartIndex(this.props.edit_task_data)
        }

        else {
            this._findStartIndex(this.props.task_data)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.categories !== prevProps.categories) {
            this._chooseNewCreatedCategory()
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
                        maxHeight: list_max_height
                    }}
                >
                    <FlatList
                        data={Map(this.props.categories).toArray()}
                        extraData={this.state.should_flatlist_update}

                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}

                        showsVerticalScrollIndicator={false}
                        ref={this._setRef}
                        getItemLayout={this._getItemLayout}
                        // initialScrollIndex={this.start_index}
                        windowSize={5}

                        onContentSizeChange={this._onContentSizeChange}
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
                        can_close_add_category_panel={this.state.can_close_add_category_panel}
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
        this.props._chooseCategoryRow(this.props.category_index, Map(this.props.data).get("id"))
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
                    height: 45,
                }}

                onPress={this._chooseCategoryRow}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 20,
                    }}
                >
                    {Map(this.props.data).get("color") === "no color" || Map(this.props.data).get("color") === "white" ?
                        <View
                            style={{
                                width: 14,
                                height: 14,
                                borderRadius: 7,
                                borderWidth: 1,
                                borderColor: "#2C2C2C",
                                justifyContent: "center",
                                alignItems: "center"
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
                                width: 14,
                                height: 14,
                                borderRadius: 7,
                                backgroundColor: Map(this.props.data).get("color")
                            }}
                        >

                        </View>
                    }

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