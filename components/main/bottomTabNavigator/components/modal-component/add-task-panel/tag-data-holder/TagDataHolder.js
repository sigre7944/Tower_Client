import React, { Component } from 'react'

import {
    View,
    Text,
    ScrollView,
} from 'react-native';

import { styles } from './styles/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faCalendarAlt,
    faRedoAlt,
    faFlag,
    faHourglassEnd,
    faList,
    faExclamationTriangle,
    faTrophy
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
            let value = Map(this.props.data).get("value")
            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        <FontAwesomeIcon
                            icon={faTrophy}
                            color="#BDBDBD"
                            size={14}
                        />
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
                        <FontAwesomeIcon
                            icon={faFlag}
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
            let week = Map(this.props.data).get("week")

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
                            {`Week ${week}`}
                        </Text>
                    </View>
            })
        }

        else if (property === "repeat") {
            let value = parseInt(Map(this.props.data).getIn(["interval", "value"])),
                type = Map(this.props.data).get("type"),
                nth_week_array = ["First", "Second", "Third", "Last"],
                nth_week_text = ""

            if (type === "weekly-nth") {
                if (value > 4) {
                    value = 4
                }
                nth_week_text = nth_week_array[value - 1] + " week every month"
            }

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
                            {type === "weekly-w" ?
                                `every ${value} week(s)`

                                :

                                <>
                                    {type === "weekly-nth" ?
                                        `${nth_week_text}`
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
            let value = Map(this.props.data).get("value")
            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        <FontAwesomeIcon
                            icon={faTrophy}
                            color="#BDBDBD"
                            size={14}
                        />
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
                        <FontAwesomeIcon
                            icon={faFlag}
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
            let month = Map(this.props.data).get("month")

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
                            {`${this.monthNames[month]}`}
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
                        <FontAwesomeIcon
                            icon={faRedoAlt}
                            color="#BDBDBD"
                            size={14}
                        />
                        <Text
                            style={styles.day_tag_uncolorful_text}
                        >
                            every {value} month(s)
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
            let value = Map(this.props.data).get("value")
            this.setState({
                render_component:
                    <View
                        style={styles.day_tag_container}
                    >
                        <FontAwesomeIcon
                            icon={faTrophy}
                            color="#BDBDBD"
                            size={14}
                        />
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
                        <FontAwesomeIcon
                            icon={faFlag}
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