import React from 'react'

import {
    Text,
    TouchableHighlight,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { primary_color } from '../../../shared/styles/style'
export default class AddTaskButton extends React.PureComponent {
    _onPress = () => {
        this.props.activateAddTask()
    }
    render() {
        return (
            <TouchableHighlight
                onPress={this._onPress}

                style={{
                    height: 56,
                    width: 56,
                    borderRadius: 56,
                    backgroundColor: primary_color,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: -35,
                    zIndex: 10,
                }}
            >
                <FontAwesome
                    name="plus"
                    style={{
                        color: "#FFFFFF",
                        fontSize: 18,
                    }}
                />
            </TouchableHighlight>
        )
    }
}