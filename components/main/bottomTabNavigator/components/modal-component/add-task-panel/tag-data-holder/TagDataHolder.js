import React, { Component } from 'react'

import {
    View,
    Text,
    ScrollView,
} from 'react-native';

import { styles } from './styles/styles'
import { Map, List } from 'immutable'

import {
    calendar_icon,
    repeat_icon,
    category_icon,
    priority_icon,
    goal_icon,
    end_icon,
    reward_icon
} from "../../../../../../shared/icons";

const icon_color = "#6E6E6E"
const icon_size = 19


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
                {this.props.currentAnnotation === "day" ?
                    <DayTagDataList
                        currentTask={this.props.currentTask}
                        categories={this.props.categories}
                        priorities={this.props.priorities}
                    />

                    :

                    <>
                        {
                            this.props.currentAnnotation === "week" ?
                                <WeekTagDataList
                                    currentTask={this.props.currentTask}
                                    categories={this.props.categories}
                                    priorities={this.props.priorities}
                                />

                                :

                                <MonthTagDataList
                                    currentTask={this.props.currentTask}
                                    categories={this.props.categories}
                                    priorities={this.props.priorities}
                                />
                        }
                    </>
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
                            key={`day-tag-data-element-prop-${data[0]}`}
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

    short_daysInWeekText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

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
            let day = parseInt(Map(this.props.data).get("day")),
                month = parseInt(Map(this.props.data).get("month")),
                year = parseInt(Map(this.props.data).get("year")),
                date = new Date(year, month, day)

            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        {calendar_icon(icon_size, icon_color)}
                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${this.daysInWeekText[date.getDay()]} ${date.getDate()} ${this.monthNames[date.getMonth()]} ${year}`}
                        </Text>
                    </View>
            })
        }

        else if (property === "repeat") {
            let value = Map(this.props.data).getIn(["interval", "value"]),
                type = Map(this.props.data).get("type")

            if (type === "weekly") {
                let days_in_week = List(Map(this.props.data).getIn(["interval", "daysInWeek"])).toArray(),
                    string = ""

                days_in_week.forEach((value, index) => {
                    if (value) {
                        let day_index = index + 1 === 7 ? 0 : index + 1

                        string += this.short_daysInWeekText[day_index] + ", "
                    }
                })

                if (string !== "" || string.length > 0) {
                    string = "(" + string.substring(0, string.length - 2) + ")"
                }

                this.setState({
                    render_component:
                        <View
                            style={styles.day_tag_container}
                        >
                            {repeat_icon(icon_size, icon_color)}

                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                {`every ${value} week ${string}`}
                            </Text>
                        </View>
                })
            }

            else {
                this.setState({
                    render_component:
                        <View
                            style={styles.day_tag_container}
                        >
                            {repeat_icon(icon_size, icon_color)}

                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                {type === "daily" ?
                                    `every ${value} day`

                                    :

                                    `every ${value} month`
                                }
                            </Text>
                        </View>
                })
            }
        }

        else if (property === "end") {
            let type = Map(this.props.data).getIn(["type"])

            if (type === "never") {
                this.setState({
                    render_component:
                        <View
                            style={styles.day_tag_container}
                        >
                            {end_icon(14, icon_color)}
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
                            {end_icon(14, icon_color)}

                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                {`${this.daysInWeekText[end_date.getDay()]} ${end_date.getDate()} ${this.monthNames[end_date.getMonth()]} ${end_date.getFullYear()}`}
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
                            {end_icon(14, icon_color)}

                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                {`${occurrences} occurrence`}
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
                        {category_icon(icon_size, icon_color)}

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
                        {priority_icon(icon_size, icon_color)}

                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${prio}`}
                        </Text>
                    </View>
            })
        }

        else if (property === "reward") {
            let value = Map(this.props.data).get("value")
            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        {reward_icon(icon_size, icon_color)}

                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${value} €`}
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
                        {goal_icon(icon_size, icon_color)}

                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${value} time per occurrence`}
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

class WeekTagDataList extends React.PureComponent {
    render() {
        return (
            <>
                {
                    Map(this.props.currentTask).toArray().map((data, index) => (
                        <WeekTagDataElement
                            key={`week-tag-data-element-prop-${data[0]}`}
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

class WeekTagDataElement extends React.PureComponent {
    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    state = {
        render_component: null
    }

    getMonday = (date) => {
        let dayInWeek = new Date(date).getDay()
        let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000)).getDate()
    }

    getNoWeekInMonth = (date) => {
        let nearest_monday = this.getMonday(date)
        let first_moday_of_month = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 7))

        return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1
    }

    componentDidMount() {
        let { property } = this.props

        if (property === "schedule") {
            let week = Map(this.props.data).get("week"),
                monday = Map(this.props.data).get("monday"),
                start_month = parseInt(Map(this.props.data).get("start_month")),
                sunday = Map(this.props.data).get("sunday"),
                end_month = parseInt(Map(this.props.data).get("end_month")),
                start_year = Map(this.props.data).get("start_year"),
                end_year = Map(this.props.data).get("end_year"),
                string = `(${monday} ${this.month_names_in_short[start_month]} ${start_year} - ${sunday} ${this.month_names_in_short[end_month]} ${end_year})`

            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        {calendar_icon(icon_size, icon_color)}

                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`Week ${week} ${string}`}
                        </Text>
                    </View>
            })
        }

        else if (property === "repeat") {
            let value = parseInt(Map(this.props.data).getIn(["interval", "value"])),
                type = Map(this.props.data).get("type")

            if (type === "weekly-m") {
                let no_week_in_month = parseInt(Map(this.props.data).getIn(["interval", "noWeekInMonth"])),
                    nth_week_array = ["1st", "2nd", "3rd", "4th"],
                    string = ""

                if (no_week_in_month > 4) {
                    no_week_in_month = 4
                }

                string = `${nth_week_array[no_week_in_month - 1]} week every ${value} month`

                this.setState({
                    render_component:
                        <View
                            style={styles.day_tag_container}
                        >

                            {repeat_icon(icon_size, icon_color)}

                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                {string}
                            </Text>
                        </View>
                })
            }

            else {
                this.setState({
                    render_component:
                        <View
                            style={styles.day_tag_container}
                        >
                            {repeat_icon(icon_size, icon_color)}

                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                {`every ${value} week`}
                            </Text>
                        </View>
                })
            }
        }

        else if (property === "end") {
            let type = Map(this.props.data).getIn(["type"])

            if (type === "never") {
                this.setState({
                    render_component:
                        <View
                            style={styles.day_tag_container}
                        >
                            {end_icon(14, icon_color)}

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
                            {end_icon(14, icon_color)}

                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                {`${this.daysInWeekText[end_date.getDay()]} ${end_date.getDate()} ${this.monthNames[end_date.getMonth()]} ${end_date.getFullYear()}`}
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
                            {end_icon(14, icon_color)}

                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                {`${occurrences} occurrence`}
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
                        {category_icon(icon_size, icon_color)}

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
                        {priority_icon(icon_size, icon_color)}

                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${prio}`}
                        </Text>
                    </View>
            })
        }

        else if (property === "reward") {
            let value = Map(this.props.data).get("value")
            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        {reward_icon(icon_size, icon_color)}

                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${value} €`}
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
                        {goal_icon(icon_size, icon_color)}

                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${value} time per occurrence`}
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

class MonthTagDataList extends React.PureComponent {
    render() {
        return (
            <>
                {
                    Map(this.props.currentTask).toArray().map((data, index) => (
                        <MonthTagDataElement
                            key={`month-tag-data-element-prop-${data[0]}`}
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

class MonthTagDataElement extends React.PureComponent {
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
            let month = Map(this.props.data).get("month"),
                year = Map(this.props.data).get("year")

            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        {calendar_icon(icon_size, icon_color)}

                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${this.monthNames[month]} ${year}`}
                        </Text>
                    </View>
            })
        }

        else if (property === "repeat") {
            let value = Map(this.props.data).getIn(["interval", "value"])

            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        {repeat_icon(icon_size, icon_color)}

                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            every {value} month
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
                            {end_icon(14, icon_color)}

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
                            {end_icon(14, icon_color)}

                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                {`${this.daysInWeekText[end_date.getDay()]} ${end_date.getDate()} ${this.monthNames[end_date.getMonth()]} ${end_date.getFullYear()}`}
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
                            {end_icon(14, icon_color)}

                            <Text
                                style={styles.day_tag_uncolorful_text}
                            >
                                {`${occurrences} occurrence`}
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
                        {category_icon(icon_size, icon_color)}

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
                        {priority_icon(icon_size, icon_color)}

                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${prio}`}
                        </Text>
                    </View>
            })
        }

        else if (property === "reward") {
            let value = Map(this.props.data).get("value")
            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        {reward_icon(icon_size, icon_color)}

                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${value} €`}
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
                        {goal_icon(icon_size, icon_color)}

                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            {`${value} time per occurrence`}
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