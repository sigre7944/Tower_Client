import React from 'react';
import { DrawerActions } from 'react-navigation-drawer'
import {
    TouchableOpacity,
    Text,
    View,
    Modal,
    TextInput,
    FlatList,
    Dimensions
} from 'react-native'

import AddCategoryPanel from '../shared/category/add-category/AddCategoryPanel.Container'

import { Map, List } from 'immutable'

export default class Drawer extends React.PureComponent {
    priority_order = {
        pri_01: 0,
        pri_02: 1,
        pri_03: 2,
        pri_04: 3
    }

    chosen_delete_category_key = {}


    state = {
        open_modal_bool: false,

        edit_task_bool: false,

        edit_category_data: {},

        delete_category_bool: false,

        agree_on_deleting_history: false,
    }

    toggleAgreeDeletingHistory = () => {
        this.setState(prevState => ({
            agree_on_deleting_history: !prevState.agree_on_deleting_history
        }))
    }

    chooseEditCategory = (category_data) => {
        this.setState(prevState => ({
            edit_category_data: { ...category_data },
            edit_task_bool: !prevState.edit_task_bool
        }))

        this.toggleModalBool()
    }

    toggleModalBool = () => {
        this.setState({
            open_modal_bool: true
        })
    }

    dismissModal = () => {
        this.toggleModalBool()
        this.setState({
            edit_task_bool: false,
            edit_category_data: {},
            open_modal_bool: false
        })
    }

    toggleDeleteCategoryBool = (category_key) => {
        this.setState({
            delete_category_bool: true
        })

        this.chosen_delete_category_key = category_key
    }

    dissmissDeleteCategoryBool = () => {
        this.setState({
            delete_category_bool: false
        })
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

    deleteGoalCurrentValueOnStatsAndCharts = (sending_obj, id, type) => {
        let completed_tasks_map,
            stats_map,
            week_chart_stats_map = Map(sending_obj.week_chart_stats).asMutable(),
            month_chart_stats_map = Map(sending_obj.month_chart_stats).asMutable(),
            year_chart_stats_map = Map(sending_obj.year_chart_stats).asMutable()

        if (type === "day") {
            completed_tasks_map = Map(this.props.completed_day_tasks)

            stats_map = Map(sending_obj.day_stats).asMutable()

            if (completed_tasks_map.has(id)) {
                let completed_task_data = Map(completed_tasks_map.get(id)),
                    priority_value = completed_task_data.get("priority_value")

                completed_task_data.keySeq().forEach((key) => {
                    if (key !== "id" && key !== "category" && key !== "priority_value") {
                        let completed_timestamp = parseInt(key),
                            completed_value = completed_task_data.getIn([key, "current"]),
                            near_monday = this.getMonday(completed_timestamp),
                            day_in_week = new Date(completed_timestamp).getDay(),
                            year = new Date(completed_timestamp).getFullYear(),
                            month = new Date(completed_timestamp).getMonth(),
                            day = new Date(completed_timestamp).getDate(),
                            week_completed_timestamp = new Date(near_monday.getFullYear(), near_monday.getMonth(), near_monday.getDate()).getTime(),
                            month_completed_timestamp = new Date(year, month).getTime()


                        if (stats_map.has(completed_timestamp)) {
                            stats_map.updateIn([completed_timestamp, "current"], (value) => {
                                return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                            })
                        }

                        if (week_chart_stats_map.hasIn([week_completed_timestamp, day_in_week.toString()])) {
                            week_chart_stats_map.updateIn([week_completed_timestamp, day_in_week.toString(), "current"], (value) => {
                                return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                            })

                        }

                        if (month_chart_stats_map.hasIn([month_completed_timestamp, day.toString()])) {
                            month_chart_stats_map.updateIn([month_completed_timestamp, day.toString(), "current"], (value) => {
                                return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                            })
                        }

                        if (year_chart_stats_map.hasIn([year, month.toString()])) {
                            year_chart_stats_map.updateIn([year, month.toString(), "current"], (value) => {
                                return List(value).update(this.priority_order[priority_value].toString(), (v) => v - completed_value < 0 ? 0 : v - completed_value)
                            })
                        }
                    }
                })
            }
        }

        else if (type === "week") {
            completed_tasks_map = this.props.completed_week_tasks
            stats_map = Map(sending_obj.week_stats).asMutable()

            if (completed_tasks_map.has(id)) {
                let completed_task_data = Map(completed_tasks_map.get(id))

                completed_task_data.keySeq().forEach((key) => {
                    if (key !== "id" && key !== "category" && key !== "priority_value") {
                        let completed_timestamp = parseInt(key)

                        if (completed_task_data.hasIn([key, "day_completed_array"]) && completed_task_data.hasIn([key, "priority_value_array"])) {
                            let day_completed_array = List(completed_task_data.getIn([key, "day_completed_array"])),
                                priority_value_array = List(completed_task_data.getIn([key, "priority_value_array"]))

                            day_completed_array.forEach((completed_value, index) => {
                                if (completed_value > 0) {
                                    let i = index
                                    if (i === 0) i = 7

                                    let date = new Date(completed_timestamp + (i - 1) * 86400 * 1000),
                                        day = date.getDate(),
                                        month = date.getMonth(),
                                        year = date.getFullYear(),
                                        month_timestamp = new Date(year, month).getTime(),
                                        priority_value = priority_value_array.get(index)

                                    if (stats_map.has(completed_timestamp)) {
                                        stats_map.updateIn([completed_timestamp, "current"], (value) => {
                                            return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                                        })
                                    }

                                    if (week_chart_stats_map.hasIn([completed_timestamp, index.toString()])) {
                                        week_chart_stats_map.updateIn([completed_timestamp, index.toString(), "current"], (value) => {
                                            return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                                        })
                                    }

                                    if (month_chart_stats_map.hasIn([month_timestamp, day.toString()])) {
                                        month_chart_stats_map.updateIn([month_timestamp, day.toString(), "current"], (value) => {
                                            return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                                        })
                                    }

                                    if (year_chart_stats_map.hasIn([year, month.toString()])) {
                                        year_chart_stats_map.updateIn([year, month.toString(), "current"], (value) => {
                                            return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }

        else {
            completed_tasks_map = this.props.completed_month_tasks
            stats_map = Map(sending_obj.month_stats).asMutable()

            if (completed_tasks_map.has(id)) {

                let completed_task_data = Map(completed_tasks_map.get(id))

                completed_task_data.keySeq().forEach((key) => {
                    if (key !== "id" && key !== "category" && key !== "priority_value") {
                        let completed_timestamp = parseInt(key),
                            completed_month = new Date(completed_timestamp).getMonth(),
                            completed_year = new Date(completed_timestamp).getFullYear()

                        if (completed_task_data.hasIn([key, "day_completed_array"]) && completed_task_data.hasIn([key, "priority_value_array"])) {
                            let day_completed_array = List(completed_task_data.getIn([key, "day_completed_array"])),
                                priority_value_array = List(completed_task_data.getIn([key, "priority_value_array"]))

                            day_completed_array.forEach((completed_value, index) => {
                                if (completed_value > 0) {
                                    let day = index + 1,
                                        date = new Date(completed_year, completed_month, day),
                                        near_monday = this.getMonday(date),
                                        completed_week_timestamp = new Date(near_monday.getFullYear(), near_monday.getMonth(), near_monday.getDate()).getTime(),
                                        day_in_week = date.getDay(),
                                        priority_value = priority_value_array.get(index)

                                    if (stats_map.has(completed_timestamp)) {
                                        stats_map.updateIn([completed_timestamp, "current"], (value) => {
                                            return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                                        })
                                    }

                                    if (week_chart_stats_map.hasIn([completed_week_timestamp, day_in_week.toString()])) {
                                        week_chart_stats_map.updateIn([completed_week_timestamp, day_in_week.toString(), "current"], (value) => {
                                            return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                                        })
                                    }

                                    if (month_chart_stats_map.hasIn([completed_timestamp, day.toString()])) {
                                        month_chart_stats_map.updateIn([completed_timestamp, day.toString(), "current"], (value) => {
                                            return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                                        })
                                    }

                                    if (year_chart_stats_map.hasIn([completed_year, completed_month.toString()])) {
                                        year_chart_stats_map.updateIn([completed_year, completed_month.toString(), "current"], (value) => {
                                            return List(value).update(this.priority_order[priority_value], (v) => v - completed_value < 0 ? 0 : v - completed_value)
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }

        return ({
            stats: stats_map,
            week_chart_stats: week_chart_stats_map,
            month_chart_stats: month_chart_stats_map,
            year_chart_stats: year_chart_stats_map,
        })
    }

    deleteCategory = () => {
        let day_tasks_map = this.props.day_tasks,
            week_tasks_map = this.props.week_tasks,
            month_tasks_map = this.props.month_tasks,

            day_stats = Map(this.props.day_stats).asMutable(),
            week_stats = Map(this.props.week_stats).asMutable(),
            month_stats = Map(this.props.month_stats).asMutable(),

            week_chart_stats = Map(this.props.week_chart_stats).asMutable(),
            month_chart_stats = Map(this.props.month_chart_stats).asMutable(),
            year_chart_stats = Map(this.props.year_chart_stats).asMutable(),

            sending_obj = {
                category_id: this.chosen_delete_category_key,
                day_stats,
                week_stats,
                month_stats,
                week_chart_stats,
                month_chart_stats,
                year_chart_stats
            }

        day_tasks_map.valueSeq().forEach((task) => {
            if (task.category === this.chosen_delete_category_key) {
                this.deleteGoalCurrentValueOnStatsAndCharts(sending_obj, task.id, task.type)
            }
        })

        week_tasks_map.valueSeq().forEach((task) => {
            if (task.category === this.chosen_delete_category_key) {
                this.deleteGoalCurrentValueOnStatsAndCharts(sending_obj, task.id, task.type)
            }
        })

        month_tasks_map.valueSeq().forEach((task) => {
            if (task.category === this.chosen_delete_category_key) {
                this.deleteGoalCurrentValueOnStatsAndCharts(sending_obj, task.id, task.type)
            }
        })

        this.props.deleteAndAffectThePast(sending_obj)

        this.props.chooseCategory("general")
        this.dissmissDeleteCategoryBool()
    }

    render() {
        return (
            <View
                style={{
                    paddingHorizontal: 16,
                    paddingBottom: 24,
                    paddingTop: 34,
                    flex: 1
                }}
            >
                <View
                    style={{
                        height: 28,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text>
                        Sign in or Sign up
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 18,
                        height: 30,
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(196, 196, 196, 0.7)",
                            borderRadius: 5,
                        }}
                    />
                </View>

                <CategoryList
                    {... this.props}
                    toggleModalBool={this.toggleModalBool}
                    chooseEditCategory={this.chooseEditCategory}

                    toggleDeleteCategoryBool={this.toggleDeleteCategoryBool}
                />

                {this.state.open_modal_bool ?
                    <Modal
                        transparent={true}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    width: Dimensions.get("window").width,
                                    backgroundColor: "black",
                                    opacity: 0.5
                                }}

                                onPress={this.dismissModal}
                            >

                            </TouchableOpacity>

                            <View
                                style={{
                                    position: 'absolute',
                                    width: 338,
                                    height: 390,
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                }}
                            >

                                <AddCategoryPanel
                                    hideAction={this.dismissModal}
                                    edit={this.state.edit_task_bool}
                                    category={this.state.edit_category_data}
                                />
                            </View>
                        </View>

                    </Modal>

                    :

                    <>
                        {this.state.delete_category_bool ?
                            <Modal
                                transparent={true}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        position: "relative",
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            width: Dimensions.get("window").width,
                                            backgroundColor: "black",
                                            opacity: 0.5
                                        }}

                                        onPress={this.dissmissDeleteCategoryBool}
                                    >

                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            position: 'absolute',
                                            width: 300,
                                            height: 200,
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            paddingHorizontal: 30,
                                            paddingVertical: 20,
                                        }}
                                    >
                                        <Text>
                                            Are you sure deleting all tasks in this category?
                                        </Text>

                                        <View
                                            style={{
                                                marginTop: 20,
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignContent: "center"
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={this.toggleAgreeDeletingHistory}

                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: "black",
                                                    borderRadius: 7,
                                                    width: 20,
                                                    height: 20,
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}
                                            >
                                                {this.state.agree_on_deleting_history ?
                                                    <View
                                                        style={{
                                                            width: 15,
                                                            height: 15,
                                                            borderRadius: 15,
                                                            backgroundColor: "black"
                                                        }}
                                                    >
                                                    </View>
                                                    :
                                                    null
                                                }
                                            </TouchableOpacity>
                                            <Text
                                                style={{
                                                    marginLeft: 5
                                                }}
                                            >
                                                Do you want to erase the history?
                                            </Text>
                                        </View>

                                        <View
                                            style={{
                                                marginTop: 20,
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 20,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    backgroundColor: "pink"
                                                }}

                                                onPress={this.dissmissDeleteCategoryBool}
                                            >
                                                <Text>
                                                    No
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 20,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    backgroundColor: "pink",
                                                    marginLeft: 20,
                                                }}

                                                onPress={this.deleteCategory}
                                            >
                                                <Text>
                                                    Yes
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            :

                            null
                        }
                    </>
                }

            </View>
        )
    }
}

class CategoryList extends React.PureComponent {

    state = {
        category_arr: [],
        should_flatlist_update: 0
    }

    _keyExtractor = (item, index) => `category-${index}`

    _renderItem = ({ item, index }) => {
        if (index === 0) {
            return (
                <GeneralCategoryRow
                    chooseCategory={this.props.chooseCategory}
                    navigation={this.props.navigation}
                />
            )
        }
        else if (index < this.state.category_arr.length - 1 && index > 0) {
            return (
                <CategoryRow
                    data={item}
                    category_key={Map(this.props.categories).keySeq().toArray()[index - 1]}
                    category_index={index}
                    chooseEditCategory={this.props.chooseEditCategory}
                    chooseCategory={this.props.chooseCategory}
                    navigation={this.props.navigation}

                    toggleDeleteCategoryBool={this.props.toggleDeleteCategoryBool}
                />
            )
        }

        return (
            <AddCategoryRow
                toggleModalBool={this.props.toggleModalBool}
            />
        )
    }

    loadCategories = (categories_map) => {
        let category_arr = [{ name: "General" }]

        category_arr = [...category_arr, ...Map(categories_map).valueSeq().map((value) => value).toArray()]

        category_arr.push({
            name: "Add category"
        })

        this.setState(prevState => ({
            category_arr: [...category_arr],
            should_flatlist_update: prevState.should_flatlist_update + 1
        }))
    }

    componentDidMount() {
        this.loadCategories(this.props.categories)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.categories !== prevProps.categories) {
            this.loadCategories(this.props.categories)
        }
    }

    render() {
        return (
            <FlatList
                data={this.state.category_arr}
                extraData={this.state.should_flatlist_update}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        )
    }
}

class GeneralCategoryRow extends React.PureComponent {
    _onPress = () => {
        this.props.chooseCategory("general")
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }
    render() {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 50,
                    marginTop: 10,
                    justifyContent: "center"
                }}

                onPress={this._onPress}
            >
                <Text>
                    General
                </Text>
            </TouchableOpacity>
        )
    }
}

class CategoryRow extends React.PureComponent {

    editCategory = () => {
        this.props.chooseEditCategory({ data: this.props.data, key: this.props.category_key })
    }

    _chooseCategory = () => {
        this.props.chooseCategory(this.props.category_key)
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    chooseDeleteCategory = () => {
        this.props.toggleDeleteCategoryBool(this.props.category_key)
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    height: 50,
                    marginTop: 10,
                }}

                onPress={this._chooseCategory}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <View>
                        <Text>
                            {this.props.data.name}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text>
                            {this.props.data.quantity}
                        </Text>

                        <TouchableOpacity
                            style={{
                                marginLeft: 10,
                            }}

                            onPress={this.editCategory}
                        >
                            <Text>
                                edit
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginLeft: 10,
                            }}

                            onPress={this.chooseDeleteCategory}
                        >
                            <Text>
                                delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

class AddCategoryRow extends React.PureComponent {

    _onPress = () => {
        this.props.toggleModalBool()
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 50,
                    marginTop: 10,
                    justifyContent: "center"
                }}

                onPress={this._onPress}
            >
                <Text>
                    Add Category
                </Text>
            </TouchableOpacity>
        )
    }
}