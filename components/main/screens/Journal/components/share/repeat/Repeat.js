import React, { Component } from 'react'

import {
    View,
} from 'react-native';

import DayTypeRepeat from './day-type-repeat/DayTypeRepeat.Container'

export default class Repeat extends Component {

    render() {
        return (
            <>
                {this.props.currentAnnotation === "day" ?
                    <DayTypeRepeat
                        hideAction={this.props.hideAction}
                        edit={this.props.edit}
                    />
                    :

                    null
                }
            </>
        )
    }

}