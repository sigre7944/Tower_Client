import React from 'react';
import { DrawerActions } from 'react-navigation-drawer'
import {
    TouchableOpacity,
    Text,
    View,
    Modal,
    TextInput,
    FlatList,
    Dimensions,
    Animated
} from 'react-native'

import AddCategoryPanel from '../main/screens/Journal/components/share/category/add-category-panel/AddCategoryPanel.Container'
import EditCategoryPanel from '../main/screens/Journal/components/share/category/edit-category-panel/EditCategoryPanel.Container'
import { Map, List } from 'immutable'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faUser,
    faList,
    faInbox,
    faEdit,
    faTrashAlt,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import { styles } from './styles/styles'

import Swipeable from 'react-native-gesture-handler/Swipeable'

const category_row_height = 42

export default class Drawer extends React.PureComponent {
    priority_order = {
        pri_01: 0,
        pri_02: 1,
        pri_03: 2,
        pri_04: 3
    }

    category_data = Map()

    state = {
        delete_category_bool: false,

        add_new_category_bool: false,

        edit_category_bool: false,

    }


    getWeek = (date) => {
        let target = new Date(date);
        let dayNr = (date.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        let firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() != 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target) / 604800000);
    }

    getMonday = (date) => {
        let dayInWeek = new Date(date).getDay()
        let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000))
    }

    _toggleAddNewCategory = () => {
        this.setState(prevState => ({
            add_new_category_bool: !prevState.add_new_category_bool,
        }))
    }

    _setEditCategoryData = (data) => {
        this.category_data = data
    }

    _toggleEditCategory = () => {
        this.setState(prevState => ({
            edit_category_bool: !prevState.edit_category_bool,
        }))
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <TouchableOpacity
                    style={{
                        marginTop: 45,
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 22,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faUser}
                        color="white"
                        size={22}
                    />

                    <Text
                        style={styles.sign_in_sign_up_text}
                    >
                        Sign in or Sign up
                    </Text>
                </TouchableOpacity>

                <CategoryFlatlist
                    categories={this.props.categories}
                    _toggleEditCategory={this._toggleEditCategory}
                    _setEditCategoryData={this._setEditCategoryData}
                />

                <AddNewCategory
                    _toggleAddNewCategory={this._toggleAddNewCategory}
                />

                {this.state.add_new_category_bool ?
                    <AddCategoryPanel
                        _closeAddCategoryPanel={this._toggleAddNewCategory}
                        at_drawer={true}
                    />
                    :
                    <>
                        {this.state.edit_category_bool ?
                            <EditCategoryPanel
                                _closeAddCategoryPanel={this._toggleEditCategory}
                                category_data={this.category_data}
                            />
                            :

                            null
                        }
                    </>
                }
            </View>
        )
    }
}

class CategoryFlatlist extends React.PureComponent {

    state = {
        current_category_index: 0,
        last_category_index: -1,
        should_flatlist_update: 0,
    }

    _chooseCategoryIndex = (index) => {
        this.setState(prevState => ({
            current_category_index: index,
            last_category_index: prevState.current_category_index,
            should_flatlist_update: prevState.should_flatlist_update + 1
        }))
    }

    _keyExtractor = (item, index) => `drawer-category-${item[0]}`

    _renderItem = ({ item, index }) => {
        if (Map(item[1]).get("name") === "Inbox") {
            return (
                <InboxRow
                    data={item[1]}
                    index={index}
                    current_category_index={this.state.current_category_index}
                    last_category_index={this.state.last_category_index}
                    _chooseCategoryIndex={this._chooseCategoryIndex}
                />
            )
        }
        return (
            <CategoryRow
                data={item[1]}
                _toggleEditCategory={this.props._toggleEditCategory}
                _setEditCategoryData={this.props._setEditCategoryData}
                index={index}
                current_category_index={this.state.current_category_index}
                last_category_index={this.state.last_category_index}
                _chooseCategoryIndex={this._chooseCategoryIndex}
            />
        )
    }

    componentDidUpdate(prevProps, prevState) {
        // if (this.props.categories !== prevProps.categories) {
        //     this.setState(prevState => ({
        //         should_flatlist_update: prevState.should_flatlist_update + 1
        //     }))
        // }
    }

    render() {
        return (
            <View
                style={{
                    marginTop: 20,
                    flex: 1,
                }}
            >
                <FlatList
                    data={Map(this.props.categories).toArray()}
                    extraData={this.state.should_flatlist_update}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

class InboxRow extends React.Component {

    _chooseCategory = () => {
        this.props._chooseCategoryIndex(this.props.index)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.index === nextProps.current_category_index && this.props.current_category_index !== nextProps.current_category_index)
            || (this.props.index === nextProps.last_category_index && this.props.last_category_index !== nextProps.last_category_index)
            || (this.props.data !== nextProps.data)
    }

    render() {
        let category_color = Map(this.props.data).get("color") === "white" || Map(this.props.data).get("color") === "no color" ? "transparent" : Map(this.props.data).get("color"),
            category_name = Map(this.props.data).get("name"),
            category_quantity = Map(this.props.data).get("quantity"),
            row_color = category_color,
            alpha_hex = "CC"

        if (this.props.index === this.props.current_category_index) {
            row_color = row_color + alpha_hex
        }

        else {
            row_color = "transparent"
        }

        return (
            <TouchableOpacity
                style={{
                    marginTop: 20,
                    height: category_row_height,
                    flexDirection: "row",
                    backgroundColor: row_color
                }}

                onPress={this._chooseCategory}
            >
                <View
                    style={{
                        height: category_row_height,
                        width: 4,
                        backgroundColor: category_color,
                        borderTopRightRadius: 3,
                        borderBottomRightRadius: 3,
                    }}
                >

                </View>

                <View
                    style={{
                        flex: 1,
                        marginLeft: 18,
                        marginRight: 22,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            alignItems: "center",
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faInbox}
                            color="white"
                            size={18}
                        />

                        <Text
                            style={{ ...styles.text, ...{ marginLeft: 16 } }}
                        >
                            {category_name}
                        </Text>
                    </View>

                    <Text
                        style={styles.text}
                    >
                        {category_quantity}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

class CategoryRow extends React.PureComponent {

    translate_x = new Animated.Value(0)
    old_translate_x = 0

    _chooseCategory = () => {
        this.props._chooseCategoryIndex(this.props.index)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.index === nextProps.current_category_index && this.props.current_category_index !== nextProps.current_category_index)
            || (this.props.index === nextProps.last_category_index && this.props.last_category_index !== nextProps.last_category_index)
            || (this.props.data !== nextProps.data)
    }

    _editCategory = () => {
        this.props._setEditCategoryData(this.props.data)
        this.props._toggleEditCategory()
    }

    _renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View
                style={{
                    marginTop: 20,
                    flexDirection: "row",
                    transform: [{ translateX: trans }]
                }}
            >
                <TouchableOpacity
                    style={styles.edit_container}
                    onPress={this._editCategory}
                >
                    <FontAwesomeIcon
                        icon={faEdit}
                        color="white"
                        size={16}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.delete_container}
                >
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        color="white"
                        size={14}
                    />
                </TouchableOpacity>
            </Animated.View>
        )
    }

    render() {
        let category_color = Map(this.props.data).get("color") === "white" || Map(this.props.data).get("color") === "no color" ? "transparent" : Map(this.props.data).get("color"),
            category_name = Map(this.props.data).get("name"),
            category_quantity = Map(this.props.data).get("quantity"),
            row_color = category_color,
            alpha_hex = "CC"

        if (this.props.index === this.props.current_category_index) {
            if (row_color === "transparent") {
                row_color = "#BDBDBDCC"
            }
            else {
                row_color = row_color + alpha_hex
            }
        }

        else {
            row_color = "transparent"
        }

        return (
            <Swipeable
                renderRightActions={this._renderRightActions}
                overshootRight={false}
                useNativeAnimations={true}
                rightThreshold={1}
                friction={2}
                overshootFriction={8}
            >
                <TouchableOpacity
                    style={{
                        marginTop: 20,
                        height: category_row_height,
                        flexDirection: "row",
                        backgroundColor: row_color
                    }}

                    onPress={this._chooseCategory}
                >
                    <View
                        style={{
                            height: category_row_height,
                            width: 4,
                            backgroundColor: category_color,
                            borderTopRightRadius: 3,
                            borderBottomRightRadius: 3,
                        }}
                    >

                    </View>

                    <View
                        style={{
                            flex: 1,
                            marginLeft: 18,
                            marginRight: 22,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                alignItems: "center",
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faList}
                                color="white"
                                size={18}
                            />

                            <Text
                                style={{ ...styles.text, ...{ marginLeft: 16 } }}
                            >
                                {category_name}
                            </Text>
                        </View>

                        <Text
                            style={styles.text}
                        >
                            {category_quantity}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        )
    }
}

class AddNewCategory extends React.PureComponent {

    render() {
        return (
            <TouchableOpacity
                style={{
                    marginBottom: 42,
                    marginHorizontal: 22,
                    flexDirection: "row",
                    alignItems: "center"
                }}

                onPress={this.props._toggleAddNewCategory}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    color="white"
                    size={17}
                />

                <Text
                    style={{ ...styles.text, ...{ marginLeft: 16 } }}
                >
                    Add Category
                </Text>
            </TouchableOpacity>
        )
    }
}