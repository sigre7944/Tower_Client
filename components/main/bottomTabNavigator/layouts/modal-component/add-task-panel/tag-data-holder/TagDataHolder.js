import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Animated,
    Keyboard,
    ScrollView,
    FlatList
} from 'react-native';

import { styles } from './styles/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faCalendarAlt,
    faRedoAlt,
    faFlag,
    faHourglassEnd,
    faList,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'

import { Map } from 'immutable'

export default class TagDataHolder extends React.PureComponent {

    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    marginLeft: 3,
                    marginRight: 20,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginBottom: 30,
                }}
                scrollEnabled={false}
                keyboardShouldPersistTaps="always"
            >
                {this.props.type === "day" ?
                    <DayTagDataList
                        currentTask={this.props.currentTask}
                        categories={this.props.categories}
                        priorities={this.props.priorities}
                    />

                    :

                    null
                }
            </ScrollView>
        )
    }
}

class DayTagDataList extends React.PureComponent {
    render() {
        return (
            <>
                {
                    Map(this.props.currentTask).toArray().map((data, index) => (
                        <DayTagDataElement
                            key={`tag-data-element-prop-${data[0]}`}
                            property={data[0]}
                            data={data[1]}
                            categories={this.props.categories}
                            priorities={this.props.priorities}
                        />
                    ))
                }
            </>
        )
    }
}

class DayTagDataElement extends React.PureComponent {
    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    state = {
        render_component: null
    }

    componentDidMount() {
        let { property } = this.props

        if (property === "schedule") {
            let day = Map(this.props.data).get("day"),
                month = Map(this.props.data).get("month"),
                year = Map(this.props.data).get("year"),
                date = new Date(year, month, day)

            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        <FontAwesomeIcon
                            icon={faCalendarAlt}
                            color="#BDBDBD"
                            size={14}
                        />
                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${this.daysInWeekText[date.getDay()]} ${date.getDate()} ${this.monthNames[date.getMonth()]}`}
                        </Text>
                    </View>
            })
        }

        else if (property === "repeat") {
            let value = Map(this.props.data).getIn(["interval", "value"]),
                type = Map(this.props.data).get("type")

            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        <FontAwesomeIcon
                            icon={faRedoAlt}
                            color="#BDBDBD"
                            size={14}
                        />
                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {type === "daily" ?
                                `every ${value} day(s)`

                                :

                                <>
                                    {type === "weekly" ?
                                        `every ${value} week(s)`
                                        :

                                        `every ${value} month(s)`
                                    }
                                </>
                            }
                        </Text>
                    </View>
            })
        }

        else if (property === "end") {
            let type = Map(this.props.data).getIn(["type"])

            if (type === "never") {
                this.setState({
                    render_component:
                        <View
                            style={styles.day_tag_container}
                        >
                            <FontAwesomeIcon
                                icon={faHourglassEnd}
                                color="#BDBDBD"
                                size={14}
                            />
                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                never
                            </Text>
                        </View>
                })
            }

            else if (type === "on") {
                let end_date = new Date(parseInt(Map(this.props.data).get("endAt")))

                this.setState({
                    render_component:
                        <View
                            style={styles.day_tag_container}
                        >
                            <FontAwesomeIcon
                                icon={faHourglassEnd}
                                color="#BDBDBD"
                                size={14}
                            />
                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                {`${this.daysInWeekText[end_date.getDay()]} ${end_date.getDate()} ${this.monthNames[end_date.getMonth()]}`}
                            </Text>
                        </View>
                })
            }

            else {
                let occurrences = Map(this.props.data).get("occurrence")

                this.setState({
                    render_component:
                        <View
                            style={styles.day_tag_container}
                        >
                            <FontAwesomeIcon
                                icon={faHourglassEnd}
                                color="#BDBDBD"
                                size={14}
                            />
                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                {`${occurrences} occurrence(s)`}
                            </Text>
                        </View>
                })
            }
        }

        else if (property === "category") {
            let category_name = Map(this.props.categories).getIn([this.props.data, "name"])

            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        <FontAwesomeIcon
                            icon={faList}
                            color="#BDBDBD"
                            size={14}
                        />
                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${category_name}`}
                        </Text>
                    </View>
            })
        }

        else if (property === "priority") {
            let prio = Map(this.props.priorities).getIn([Map(this.props.data).get("value"), "name"])

            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            color="#BDBDBD"
                            size={14}
                        />
                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${prio}`}
                        </Text>
                    </View>
            })
        }

        else if (property === "reward") {
            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            color="#BDBDBD"
                            size={14}
                        />
                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${this.props.data}`}
                        </Text>
                    </View>
            })
        }

        else if (property === "goal") {
            let value = Map(this.props.data).get("max")
            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            color="#BDBDBD"
                            size={14}
                        />
                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${value} time(s) per day(s)`}
                        </Text>
                    </View>
            })
        }
    }

    render() {
        return (
            <>
                {this.state.render_component}
            </>
        )
    }
}