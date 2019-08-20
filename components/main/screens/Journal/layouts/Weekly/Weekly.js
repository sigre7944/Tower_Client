import React from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import WeekFlatlist from '../../../../../shared/journal/week-flatlist/WeekFlatlist.Container'

let weekHolderWith = 60

export default class Weekly extends React.Component {
    static navigationOptions = {
        swipeEnabled: false,
    }


    render() {
        return (
            <WeekFlatlist />
        )
    }
}
