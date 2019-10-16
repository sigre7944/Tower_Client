import React, { Component } from 'react'

import {
    View,
    Dimensions
} from 'react-native';

import DayAnnotationPanel from './day-annotation/DayAnnotationPanel.Container'
import MonthAnnotationPanel from './month-annotation/MonthAnnotationPanel.Container'
import WeekAnnotationPanel from './week-annotation/WeekAnnotationPanel.Container'
import Repeat from '../../../../../shared/repeat/Repeat.Container'

const panel_width = 338
const day_calendar_height = 572

const window_width = Dimensions.get("window").width
const window_height = Dimensions.get("window").height

export default class Calendar extends Component {

    state = {
        repeatChosen: false
    }

    chooseRepeatOption = () => {
        this.setState(prevState => ({
            repeatChosen: !prevState.repeatChosen
        }))
    }

    render() {
        return (
            <>
                {this.state.repeatChosen ?
                    <Repeat
                        currentAnnotation={this.props.currentAnnotation}
                        hideAction={this.chooseRepeatOption}
                        edit={false}
                    />

                    :

                    <>
                        {this.props.currentAnnotation === 'day' ?
                            <View
                                style={{
                                    position: 'absolute',
                                    width: panel_width,
                                    height: day_calendar_height,
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                }}
                            >
                                <DayAnnotationPanel
                                    chooseRepeatOption={this.chooseRepeatOption}
                                    disableAllTabs={this.props.disableAllTabs}
                                />
                            </View>

                            :

                            <>
                                {this.props.currentAnnotation === 'week' ?
                                    <View
                                        style={{
                                            position: 'absolute',
                                            width: panel_width,
                                            height: 446,
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                        }}
                                    >
                                        <WeekAnnotationPanel
                                            chooseRepeatOption={this.chooseRepeatOption}

                                            disableAllTabs={this.props.disableAllTabs}
                                        />
                                    </View>

                                    :

                                    <View style={{
                                        position: 'absolute',
                                        width: panel_width,
                                        height: 546,
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                    }}>
                                        <MonthAnnotationPanel
                                            chooseRepeatOption={this.chooseRepeatOption}

                                            disableAllTabs={this.props.disableAllTabs}
                                        />
                                    </View>

                                }
                            </>
                        }
                    </>
                }
            </>
        )
    }
}