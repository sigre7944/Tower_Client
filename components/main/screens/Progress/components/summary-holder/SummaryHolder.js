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

    state = {
        day_task_completions: 0,
        week_task_completions: 0,
        month_task_completions: 0,
    }

    shouldComponentUpdate(nextProps, nextState) {

        let chosen_month = this.props.chosen_month,
            chosen_year = this.props.chosen_year,
            month_timestamp_toString = new Date(chosen_year, chosen_month).getTime().toString()

        return this.props.chosen_month !== nextProps.chosen_month
            || this.props.chosen_year !== nextProps.chosen_year
            || Map(this.props.month_chart_stats).get(month_timestamp_toString) !== Map(nextProps.month_chart_stats).get(month_timestamp_toString)
    }

    _calculateDayTaskCompletions = () => {
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.chosen_month !== prevProps.chosen_month
            || this.props.chosen_year !== prevProps.chosen_year) {

        }

        else {
            let chosen_month = this.props.chosen_month,
                chosen_year = this.props.chosen_year,
                month_timestamp_toString = new Date(chosen_year, chosen_month).getTime().toString()
        }
    }

    render() {
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
                            20
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
                            50
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
                            30
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