import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';

import { styles } from "./styles/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

import { Map, List } from "immutable";

export default class SortPanel extends React.PureComponent {
    data = [
        { id: "sort-by-priority" },
        { id: "sort-by-name" },
        { id: "sort-by-reward" },
    ]

    start_index = 0

    state = {
        should_flatlist_update: 0,
        current_index: 0,
        last_index: -1,
    }

    _ChooseSortRow = (index) => {
        if (this.state.current_index !== index) {
            this.setState(prevState => ({
                current_index: index,
                last_index: prevState.current_index,
                should_flatlist_update: prevState.should_flatlist_update + 1
            }))
        }
    }

    _keyExtractor = (item, index) => `sort-settings-${item.id}`

    _renderItem = ({ item, index }) => {
        return (
            <SortPriorityRow
                index={index}
                sort_type={item.id}
                current_index={this.state.current_index}
                last_index={this.state.last_index}
                _ChooseSortRow={this._ChooseSortRow}
            />
        )
    }

    _getItemLayout = (data, index) => ({
        length: 52,
        offset: 52 * index,
        index
    })

    _findStartIndex = () => {
        let sort_settings = List(this.props.sortSettings),
            start_index = 0

        sort_settings.every((bool, index) => {
            if (bool) {
                start_index = index

                this._ChooseSortRow(start_index)

                return false
            }

            return true
        })

        return start_index
    }

    _save = () => {
        let new_sort_settings = List([false, false, false]).asMutable()

        new_sort_settings.set(this.state.current_index, true)

        this.props.returnNewSortSettings(new_sort_settings)
        this.props.hideAction()
    }

    componentDidMount() {
        this.start_index = this._findStartIndex()
    }

    render() {
        return (
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: 26
                        }}
                    >
                        <MaterialIcons
                            name="sort"
                            color="#2C2C2C"
                            size={26}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft: 14
                        }}
                    >
                        <Text
                            style={styles.title}
                        >
                            Sort by
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 30,
                    }}
                >
                    <FlatList
                        data={this.data}
                        extraData={this.state.should_flatlist_update}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        scrollEnabled={false}
                        getItemLayout={this._getItemLayout}
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        marginTop: 10
                    }}
                >
                    <TouchableOpacity
                        style={styles.close_button_container}
                        onPress={this.props.hideAction}
                    >
                        <AntDesign
                            name="close"
                            size={23}
                            color="white"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.save_button_container}
                        onPress={this._save}
                    >
                        <Feather
                            name="check"
                            size={23}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class SortPriorityRow extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.index === nextProps.current_index || this.props.index === nextProps.last_index
    }

    _ChooseSortRow = () => {
        this.props._ChooseSortRow(this.props.index)
    }

    render() {
        let icon_component = null,
            icon_color = "#BDBDBD",
            row_name = "",
            row_name_style = styles.row_name

        if (this.props.index === this.props.current_index) {
            icon_color = "#05838B"
            row_name_style = { ...styles.row_name, ...{ color: icon_color } }
        }

        if (this.props.sort_type === "sort-by-priority") {
            icon_component = (
                <MaterialIcons
                    name="priority-high"
                    color={icon_color}
                    size={26}
                />
            )

            row_name = "Priority"
        }

        else if (this.props.sort_type === "sort-by-name") {
            icon_component = (
                <FontAwesome
                    name="sort-alpha-asc"
                    color={icon_color}
                    size={26}
                />
            )

            row_name = "Name"
        }

        else {
            icon_component = (
                <MaterialIcons
                    name="attach-money"
                    color={icon_color}
                    size={26}
                />
            )

            row_name = "Reward"
        }

        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 22,
                    height: 30,
                }}

                onPress={this._ChooseSortRow}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            width: 26,
                            alignItems: "center"
                        }}
                    >
                        {icon_component}
                    </View>
                    <View
                        style={{
                            marginLeft: 14
                        }}
                    >
                        <Text
                            style={row_name_style}
                        >
                            {row_name}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: icon_color,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {this.props.index === this.props.current_index ?
                        <View
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: icon_color
                            }}
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