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
import { Map, List, OrderedMap } from 'immutable'
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
const window_width = Dimensions.get("window").width

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

    _toggleEditCategory = (data) => {
        this.category_data = data
        this.setState(prevState => ({
            edit_category_bool: !prevState.edit_category_bool,
        }))
    }

    _toggleDeleteWarning = (data) => {
        this.category_data = data
        this.setState(prevState => ({
            delete_category_bool: !prevState.delete_category_bool,
        }))
    }

    _updateNewData = () => {
        let new_day_stats = Map(this.props.day_stats).asMutable(),
            new_week_stats = Map(this.props.week_stats).asMutable(),
            new_month_stats = Map(this.props.day_stats).asMutable(),
            new_week_chart_stats = Map(this.props.week_chart_stats).asMutable(),
            new_month_chart_stats = Map(this.props.month_chart_stats).asMutable(),
            new_year_chart_stats = Map(this.props.year_chart_stats).asMutable(),
            completed_day_tasks_map = Map(this.props.completed_day_tasks),
            completed_week_tasks_map = Map(this.props.completed_week_tasks),
            completed_month_tasks_map = Map(this.props.completed_month_tasks),
            category_data = Map(this.category_data),
            category_id = category_data.get("id")

        completed_day_tasks_map.valueSeq().forEach((completed_day_task, index) => {
            let completed_day_task_map = Map(completed_day_task)
            if (completed_day_task_map.get("category") === category_id) {
                completed_day_task_map.entrySeq().forEach((tuple, tuple_index) => {
                    let key = tuple[0],
                        data = typle[1]

                    if (key !== "id" && key !== "category") {
                        let completed_priority_array = List(data.get("completed_priority_array")),
                            timestamp = key,
                            day_in_week_toString = new Date(timestamp).getDay().toString(),
                            day_in_month_toString = new Date(timestamp).getDate().toString(),
                            month = new Date(timestamp).getMonth(),
                            month_toString = month.toString(),
                            year = new Date(timestamp).getFullYear(),
                            year_toString = year.toString(),
                            monday = this.getMonday(new Date(timestamp)),
                            week_timestamp_toString = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()).getTime().toString(),
                            month_timestamp_toString = new Date(year, month).getTime().toString()

                        completed_priority_array.forEach((completed_value, priority_index) => {
                            if (new_day_stats.hasIn([timestamp, "current"])) {
                                new_day_stats.updateIn([timestamp, "current"], (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value))
                            }

                            if (new_week_chart_stats.hasIn([week_timestamp_toString, day_in_week_toString, "current"])) {
                                new_week_chart_stats.updateIn(
                                    [week_timestamp_toString, day_in_week_toString, "current"],
                                    (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                )
                            }

                            if (new_month_chart_stats.hasIn([month_timestamp_toString, day_in_month_toString, "current"])) {
                                new_month_chart_stats.updateIn(
                                    [month_timestamp_toString, day_in_month_toString, "current"],
                                    (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                )
                            }

                            if (new_year_chart_stats.hasIn([year_toString, month_toString, "current"])) {
                                new_year_chart_stats.updateIn(
                                    [year_toString, month_toString, "current"],
                                    (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                )
                            }
                        })

                    }
                })
            }
        })

        completed_week_tasks_map.valueSeq().forEach((completed_week_task, index) => {
            let completed_week_task_map = Map(completed_week_task)

            if (completed_week_task_map.get("category") === category_id) {
                completed_week_task_map.entrySeq().forEach((tuple, tuple_index) => {
                    let key = tuple[0],
                        data = typle[1]

                    if (key !== "id" && key !== "category") {
                        let completed_priority_array = List(data.get("completed_priority_array")),
                            week_timestamp_toString = key

                        completed_priority_array.forEach((completed_value_array, day_in_week_index) => {
                            if (day_in_week_index === 0) {
                                day_in_week_index = 7
                            }

                            let day_in_week_toString = (parseInt(day_in_week_index) % 7).toString(),
                                date = new Date(timestamp + (day_in_week_index - 1) * 86400 * 1000),
                                day_in_month_toString = date.getDate().toString(),
                                month = date.getMonth(),
                                month_toString = month.toString(),
                                year = date.getFullYear(),
                                year_toString = year.toString(),
                                month_timestamp_toString = new Date(year, month).getTime()

                            List(completed_value_array).forEach((completed_value, priority_index) => {
                                if (new_week_stats.hasIn([week_timestamp_toString, "current"])) {
                                    new_week_stats.updateIn([week_timestamp_toString, "current"], (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value))
                                }

                                if (new_week_chart_stats.hasIn([week_timestamp_toString, day_in_week_toString, "current"])) {
                                    new_week_chart_stats.updateIn(
                                        [week_timestamp_toString, day_in_week_toString, "current"],
                                        (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    )
                                }

                                if (new_month_chart_stats.hasIn([month_timestamp_toString, day_in_month_toString, "current"])) {
                                    new_month_chart_stats.updateIn(
                                        [month_timestamp_toString, day_in_month_toString, "current"],
                                        (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    )
                                }

                                if (new_year_chart_stats.hasIn([year_toString, month_toString, "current"])) {
                                    new_year_chart_stats.updateIn(
                                        [year_toString, month_toString, "current"],
                                        (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    )
                                }
                            })
                        })
                    }
                })
            }
        })

        completed_month_tasks_map.valueSeq().forEach((completed_month_task, index) => {
            let completed_month_task_map = Map(completed_month_task)

            if (completed_month_task_map.get("category") === category_id) {
                completed_month_task_map.entrySeq().forEach((tuple, tuple_index) => {
                    let key = tuple[0],
                        data = typle[1]

                    if (key !== "id" && key !== "category") {
                        let completed_priority_array = List(data.get("completed_priority_array")),
                            month_timestamp_toString = key

                        completed_priority_array.forEach((completed_value_array, day_in_month_index) => {

                            let day_in_month = parseInt(day_in_month_index) + 1,
                                day_in_month_toString = day_in_month.toString(),
                                date = new Date(month_timestamp_toString),
                                day_in_week_toString = date.getDay().toString(),
                                month = date.getMonth(),
                                month_toString = date.getMonth().toString(),
                                year = date.getFullYear(),
                                year_toString = date.getFullYear().toString(),
                                monday = this.getMonday(new Date(year, month, day_in_month)),
                                week_timestamp_toString = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()).getTime()

                            List(completed_value_array).forEach((completed_value, priority_index) => {
                                if (new_month_stats.hasIn([month_timestamp_toString, "current"])) {
                                    new_month_stats.updateIn([month_timestamp_toString, "current"], (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value))
                                }

                                if (new_week_chart_stats.hasIn([week_timestamp_toString, day_in_week_toString, "current"])) {
                                    new_week_chart_stats.updateIn(
                                        [week_timestamp_toString, day_in_week_toString, "current"],
                                        (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    )
                                }

                                if (new_month_chart_stats.hasIn([month_timestamp_toString, day_in_month_toString, "current"])) {
                                    new_month_chart_stats.updateIn(
                                        [month_timestamp_toString, day_in_month_toString, "current"],
                                        (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    )
                                }

                                if (new_year_chart_stats.hasIn([year_toString, month_toString, "current"])) {
                                    new_year_chart_stats.updateIn(
                                        [year_toString, month_toString, "current"],
                                        (current) => List(current).update(priority_index, (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    )
                                }
                            })
                        })
                    }
                })
            }
        })

        return ({
            new_day_stats,
            new_week_stats,
            new_month_stats,
            new_week_chart_stats,
            new_month_chart_stats,
            new_year_chart_stats,
        })
    }

    _updateNewPriorities = () => {
        let new_priorities = Map(this.props.priorities).asMutable(),
            category_data = Map(this.category_data),
            category_id = category_data.get("id")

        Map(this.props.priorities).entrySeq().forEach((tuple, index) => {
            let key = tuple[0],
                priority_data = tuple[1]
            let tasks_list = List(Map(priority_data).get("tasks"))

            tasks_list.forEach((task_data, task_index) => {
                if (Map(task_data).get("category") === category_id) {
                    new_priorities.deleteIn([key, "tasks", task_index])
                }
            })
        })

        return new_priorities
    }

    _deleteCategoryAffectingTasksAndHistory = () => {
        let category_data = Map(this.category_data),
            new_data = this._updateNewData()

        let sending_obj = {
            category_id: category_data.get("id"),
            new_priorities: this._updateNewPriorities(),
            new_day_stats: new_data.new_day_stats,
            new_week_stats: new_data.new_week_stats,
            new_month_stats: new_data.new_month_stats,
            new_week_chart_stats: new_data.new_week_chart_stats,
            new_month_chart_stats: new_data.new_month_chart_stats,
            new_year_chart_stats: new_data.new_year_chart_stats,
        }

        this.props.deleteTasksAndHistory(sending_obj)
        this._toggleDeleteWarning()
    }

    _deleteCategoryAffectingOnlyTasks = () => {
        let category_data = Map(this.category_data),
            new_priorities = this._updateNewPriorities()

        let sending_obj = {
            category_id: category_data.get("id"),
            new_priorities,
        }

        this.props.deleteOnlyTasks(sending_obj)
        this._toggleDeleteWarning()
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
                    current_chosen_category={this.props.current_chosen_category}
                    chooseCategory={this.props.chooseCategory}

                    _toggleDeleteWarning={this._toggleDeleteWarning}
                    navigation={this.props.navigation}
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

                            <>
                                {this.state.delete_category_bool ?
                                    <DeleteWarning
                                        _deleteCategoryAffectingTasksAndHistory={this._deleteCategoryAffectingTasksAndHistory}
                                        _deleteCategoryAffectingOnlyTasks={this._deleteCategoryAffectingOnlyTasks}
                                        _toggleDeleteWarning={this._toggleDeleteWarning}
                                    />

                                    :

                                    null
                                }
                            </>
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

    _chooseCategoryIndex = (index, category_data) => {
        this.setState(prevState => ({
            current_category_index: index,
            last_category_index: prevState.current_category_index,
            should_flatlist_update: prevState.should_flatlist_update + 1
        }), () => {
            this._scrollToRow()
            this.props._setEditCategoryData(category_data)
            this.props.chooseCategory(Map(category_data).get("id"))

            this.props.navigation.dispatch(DrawerActions.closeDrawer())
        })
    }

    _setRef = (r) => this._flatlist_ref = r

    _scrollToRow = (index) => {
        if (this._flatlist_ref) {
            this._flatlist_ref.scrollToOffset({ animated: true, offest: index * (category_row_height + 20) })
        }
    }

    _getItemLayout = (data, index) => ({
        length: category_row_height + 20,
        offset: index * (category_row_height + 20),
        index
    })

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

                _toggleDeleteWarning={this.props._toggleDeleteWarning}
            />
        )
    }

    _findStartIndex = () => {
        let { current_chosen_category } = this.props,
            categories_map = OrderedMap(this.props.categories)

        categories_map.valueSeq().every((category_data, index) => {
            if (Map(category_data).get("id") === current_chosen_category) {
                this._chooseCategoryIndex(index, current_chosen_category)
                return false
            }

            return true
        })
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.categories !== prevProps.categories) {
            this.setState(prevState => ({
                should_flatlist_update: prevState.should_flatlist_update + 1
            }))
        }
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
                    data={OrderedMap(this.props.categories).toArray()}
                    extraData={this.state.should_flatlist_update}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    getItemLayout={this._getItemLayout}
                    ref={this._setRef}
                />


            </View>
        )
    }
}

class InboxRow extends React.Component {

    _chooseCategory = () => {
        this.props._chooseCategoryIndex(this.props.index, this.props.data)
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
        this.props._chooseCategoryIndex(this.props.index, this.props.data)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.index === nextProps.current_category_index && this.props.current_category_index !== nextProps.current_category_index)
            || (this.props.index === nextProps.last_category_index && this.props.last_category_index !== nextProps.last_category_index)
            || (this.props.data !== nextProps.data)
    }

    _editCategory = () => {
        this.props._toggleEditCategory(this.props.data)
    }

    _deleteCategory = () => {
        this.props._toggleDeleteWarning(this.props.data)
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
                    onPress={this._deleteCategory}
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
                    marginTop: 20,
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

class DeleteWarning extends React.PureComponent {

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

                        onPress={this.props._toggleDeleteWarning}
                    >

                    </TouchableOpacity>

                    <View
                        style={{
                            position: "absolute",
                            borderRadius: 20,
                            width: 330,
                            backgroundColor: "white",
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            alignItems: "center",
                        }}
                    >
                        {/* <Text
                            style={styles.text}
                        >
                            Are you sure you want to delete this task?
                        </Text> */}

                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#ff3006",
                            }}

                            onPress={this.props._deleteCategoryAffectingTasksAndHistory}
                        >
                            <Text
                                style={{ ...styles.text, ...{ color: "white" } }}
                            >
                                {"DELETE TASKS & HISTORY"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#ffb948",
                                marginTop: 20,
                            }}

                            onPress={this.props._deleteCategoryAffectingOnlyTasks}
                        >
                            <Text
                                style={{ ...styles.text, ...{ color: "white" } }}
                            >
                                {"DELETE ONLY TASKS"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 20,
                            }}

                            onPress={this.props._toggleDeleteWarning}
                        >
                            <Text
                                style={{ ...styles.text, ...{ color: "#6E6E6E" } }}
                            >
                                {"CANCEL"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}