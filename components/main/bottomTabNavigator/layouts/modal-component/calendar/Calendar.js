import React, { Component } from 'react'

import {
    View,

} from 'react-native';

import DayAnnotationPanel from './day-annotation/DayAnnotationPanel.Container'
import MonthAnnotationPanel from './month-annotation/MonthAnnotationPanel.Container'
import WeekAnnotationPanel from './week-annotation/WeekAnnotationPanel.Container'
import Repeat from '../../../../../shared/repeat/Repeat.Container'

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
                                    width: 338,
                                    height: 679,
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

                            <Fragment>
                                {this.props.currentAnnotation === 'week' ?
                                    <View
                                        style={{
                                            position: 'absolute',
                                            width: 338,
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
                                        width: 338,
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
                            </Fragment>
                        }
                    </>
                }
            </>
        )
    }
}