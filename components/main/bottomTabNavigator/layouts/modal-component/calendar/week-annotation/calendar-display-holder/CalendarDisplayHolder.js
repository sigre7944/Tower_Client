import React, { Component } from 'react'

import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

export default class CalendarDisplayHolder extends React.Component{

    shouldComponentUpdate(nextProps, nextState){
        return this.props.index === nextProps.lastWeekIndex || this.props.index === nextProps.currentWeekIndex
    }

    _scrollToWeekRow = () => {
        this.props.scrollToWeekRow(this.props.index)
    }

    render(){
        return(
            <>
                <TouchableHighlight
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 40,
                    }}

                    onPress={this._scrollToWeekRow}
                    underlayColor = {"gainsboro"}
                >
                    <>
                    <WeekNumberHolder 
                        noWeek = {this.props.weekData.noWeek} 
                        currentWeekIndex = {this.props.currentWeekIndex}
                        lastWeekIndex = {this.props.lastWeekIndex}
                        index = {this.props.index}
                    />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[0]} />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[1]} />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[2]} />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[3]} />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[4]} />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[5]} />
                    <DayHolder dayTimeInMili = {this.props.weekData.week_day_array[6]} />
                    </>
                </TouchableHighlight>
            </>
        )
    }
}


class WeekNumberHolder extends React.Component{

    state={
        style: styles.unchosenWeek
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState){

        if(this.props.index === nextProps.currentWeekIndex){
            this.setState({
                style: styles.chosenWeek
            })
        }

        else if(this.props.index === nextProps.lastWeekIndex){
            this.setState({
                style: styles.unchosenWeek
            })
        }
    }

    render(){
        return(
            <View style={this.state.style}>
                <Text>
                    {this.props.noWeek}
                </Text>
            </View>
        )
    }
}

class DayHolder extends React.Component{

    shouldComponentUpdate(){
        return false
    }

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


const styles = StyleSheet.create({
    unchosenWeek: {
        width: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    chosenWeek: {
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gainsboro",
        borderRadius: 100,
    }
})