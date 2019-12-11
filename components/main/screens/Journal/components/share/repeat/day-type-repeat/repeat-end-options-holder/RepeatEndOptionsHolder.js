import React, { Component } from 'react'

import {
    View,
    Text,
} from 'react-native';

import { styles } from './styles/styles'

import RepeatEndNeverOptionRow from './repeat-end-never-option-row/RepeatEndNeverOptionRow'
import RepeatEndOnOptionRow from './repeat-end-on-option-row/RepeatEndOnOptionRow'
import RepeatEndAfterOptionRow from './repeat-end-after-option-row/RepeatEndAfterOptionRow'

import {
    end_icon
} from "../../../../../../../../shared/icons";

const icon_color = "#2C2C2C"
const icon_size = 14

export default class RepeatEndOptionsHolder extends React.PureComponent {
    render() {
        return (
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        marginLeft: 30,
                        marginTop: 25,
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            width: icon_size,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {end_icon(icon_size, icon_color)}
                    </View>

                    <Text
                        style={styles.title_text}
                    >
                        Repeat end
                    </Text>
                </View>

                <RepeatEndNeverOptionRow
                    index={0}
                    chooseEndOption={this.props.chooseEndOption}
                    current_index={this.props.current_index}
                    last_index={this.props.last_index}
                />

                <RepeatEndOnOptionRow
                    index={1}
                    chooseEndOption={this.props.chooseEndOption}
                    current_index={this.props.current_index}
                    last_index={this.props.last_index}

                    _setEndAtDayMonthYear={this.props._setEndAtDayMonthYear}
                    chosen_day={this.props.chosen_day}
                    chosen_month={this.props.chosen_month}
                    chosen_year={this.props.chosen_year}
                />

                <RepeatEndAfterOptionRow
                    index={2}
                    chooseEndOption={this.props.chooseEndOption}
                    current_index={this.props.current_index}
                    last_index={this.props.last_index}
                    after_occurrence_value={this.props.after_occurrence_value}
                    _onChangeAfterOccurrenceValue={this.props._onChangeAfterOccurrenceValue}

                />
            </View>
        )
    }
}
