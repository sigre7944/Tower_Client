import React, { Component } from 'react'

import {
    View,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';

import DayAnnotationPanel from './day-annotation/DayAnnotationPanel.Container'
import MonthAnnotationPanel from './month-annotation/MonthAnnotationPanel.Container'
import WeekAnnotationPanel from './week-annotation/WeekAnnotationPanel.Container'
import Repeat from '../../../../../shared/repeat/Repeat.Container'
import DayTypeRepeat from '../../../../../shared/repeat/day-type-repeat/DayTypeRepeat.Container'

const panel_width = 338

export default class Calendar extends Component {

    state = {
        repeat_chosen: false,
        calendar_chosen: true,
    }

    chooseRepeatOption = () => {
        this.setState(prevState => ({
            repeat_chosen: !prevState.repeat_chosen,
            calendar_chosen: !prevState.calendar_chosen
        }))
    }


    render() {
        return (
            <>
                {this.state.repeat_chosen && !this.state.calendar_chosen ?
                    <>
                        {this.props.currentAnnotation === "day" ?
                            <DayTypeRepeat
                                hideAction={this.chooseRepeatOption}
                                edit={false}
                            />

                            :

                            <Repeat
                                currentAnnotation={this.props.currentAnnotation}
                                hideAction={this.chooseRepeatOption}
                                edit={false}
                            />

                        }
                    </>
                    :
                    <>
                        {
                            this.props.currentAnnotation === 'day' ?
                                <DayAnnotationPanel
                                    chooseRepeatOption={this.chooseRepeatOption}
                                    disableAllTabs={this.props.disableAllTabs}
                                />

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