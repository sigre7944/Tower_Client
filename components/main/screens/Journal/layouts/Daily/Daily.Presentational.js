import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    Button,
    FlatList
} from 'react-native';

import JournalTab from '../../../../../shared/journal/JournalTab.Container'

export default class Daily extends React.Component {
    static navigationOptions = {
        swipeEnabled: false,
        header: null
    }

    render() {
        return (
            <JournalTab
                type="day"
                action_type="ADD_EDIT_DAY_TASK"
                {... this.props}
            />
        )
    }
}
