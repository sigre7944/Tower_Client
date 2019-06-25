import React, { Component } from 'react'

import {
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableHighlight
} from 'react-native';

export default class CalendarDisplayHolder extends React.PureComponent{

    render(){
        return(
            <>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 40,
                    }}
                >
                    <WeekNumberHolder noWeek = {this.props.weekData.noWeek}/>
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[0]} />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[1]} />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[2]} />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[3]} />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[4]} />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[5]} />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[6]} />
                </View>
            </>
        )
    }
}


class WeekNumberHolder extends React.PureComponent{

    render(){
        return(
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text>
                    {this.props.noWeek}
                </Text>
            </View>
        )
    }
}

class DayHolder extends React.PureComponent{


    render(){
        return(
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text>
                    {new Date(this.props.dayTimeInMili).getDate()? new Date(this.props.dayTimeInMili).getDate() : null}
                </Text>
            </View>
        )
    }
}