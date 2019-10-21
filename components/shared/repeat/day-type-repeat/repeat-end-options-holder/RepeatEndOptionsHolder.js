import React, { Component } from 'react'

import {
    View,
    Text,
} from 'react-native';

import { styles } from './styles/styles'

import RepeatEndNeverOptionRow from './repeat-end-never-option-row/RepeatEndNeverOptionRow'
import RepeatEndOnOptionRow from './repeat-end-on-option-row/RepeatEndOnOptionRow'
import RepeatEndAfterOptionRow from './repeat-end-after-option-row/RepeatEndAfterOptionRow'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faHourglassEnd,
} from '@fortawesome/free-solid-svg-icons'

export default class RepeatEndOptionsHolder extends React.PureComponent {
    state = {
        current_index: 0,
        last_index: -1
    }

    chooseEndOption = (index) => {
        if (this.state.current_index !== index) {
            this.setState(prevState => ({
                current_index: index,
                last_index: prevState.current_index
            }))
        }
    }

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
                    <FontAwesomeIcon
                        icon={faHourglassEnd}
                        color="#2C2C2C"
                        size={14}
                    />

                    <Text
                        style={styles.title_text}
                    >
                        Repeat end
                    </Text>
                </View>

                <RepeatEndNeverOptionRow
                    index={0}
                    chooseEndOption={this.chooseEndOption}
                    current_index={this.state.current_index}
                    last_index={this.state.last_index}
                />

                <RepeatEndOnOptionRow
                    index={1}
                    chooseEndOption={this.chooseEndOption}
                    current_index={this.state.current_index}
                    last_index={this.state.last_index}
                />

                <RepeatEndAfterOptionRow
                    index={2}
                    chooseEndOption={this.chooseEndOption}
                    current_index={this.state.current_index}
                    last_index={this.state.last_index}
                    {...this.props}
                />
            </View>
        )
    }
}
