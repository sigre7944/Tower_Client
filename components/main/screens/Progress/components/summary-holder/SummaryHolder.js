import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Map, List } from 'immutable'
import { styles } from './styles/styles'

export default class SummaryHolder extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {

        let chosen_month = this.props.chosen_month,
            chosen_year = this.props.chosen_year,
            month_timestamp_toString = new Date(chosen_year, chosen_month).getTime().toString()

        return this.props.chosen_month !== nextProps.chosen_month
            || this.props.chosen_year !== nextProps.chosen_year
            || Map(this.props.month_chart_stats).getIn([month_timestamp_toString, "task_type_completions"]) !== Map(nextProps.month_chart_stats).getIn([month_timestamp_toString, "task_type_completions"])
    }

    _calculateTaskCompletions = () => {
        let month_chart_stats_map = Map(this.props.month_chart_stats),
            chosen_month = this.props.chosen_month,
            chosen_year = this.props.chosen_year,
            month_timestamp_toString = new Date(chosen_year, chosen_month).getTime().toString(),
            task_type_completions = List(month_chart_stats_map.getIn([month_timestamp_toString, "task_type_completions"]))

        return ({
            day_task_completions: task_type_completions.get(0),
            week_task_completions: task_type_completions.get(1),
            month_task_completions: task_type_completions.get(2)
        })
    }

    render() {
        let { day_task_completions, week_task_completions, month_task_completions } = this._calculateTaskCompletions()

        if (!day_task_completions) {
            day_task_completions = 0
        }

        if (!week_task_completions) {
            week_task_completions = 0
        }

        if (!month_task_completions) {
            month_task_completions = 0
        }

        return (
            <View
                style={{
                    marginTop: 50,
                    flex: 1,
                }}
            >
                {/* Separating line */}
                <View
                    style={styles.separating_line}
                >
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        marginVertical: 32,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            height: 81,
                        }}
                    >
                        <Text
                            style={styles.big_completions_text}
                        >
                            {day_task_completions}
                        </Text>

                        <Text
                            style={{ ...styles.informing_text, ...{ marginTop: 12 } }}
                        >
                            Day tasks
                        </Text>
                        <Text
                            style={styles.informing_text}
                        >
                            completed
                        </Text>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            height: 81,
                            borderRightWidth: 1,
                            borderLeftWidth: 1,
                            borderColor: "#05838B"
                        }}
                    >
                        <Text
                            style={styles.big_completions_text}
                        >
                            {week_task_completions}
                        </Text>

                        <Text
                            style={{ ...styles.informing_text, ...{ marginTop: 12 } }}
                        >
                            Week tasks
                        </Text>
                        <Text
                            style={styles.informing_text}
                        >
                            completed
                        </Text>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            height: 81,
                        }}
                    >
                        <Text
                            style={styles.big_completions_text}
                        >
                            {month_task_completions}
                        </Text>

                        <Text
                            style={{ ...styles.informing_text, ...{ marginTop: 12 } }}
                        >
                            Month tasks
                        </Text>
                        <Text
                            style={styles.informing_text}
                        >
                            completed
                        </Text>
                    </View>
                </View>

                {/* Separating line */}
                <View
                    style={styles.separating_line}
                >
                </View>
            </View>
        )
    }
}