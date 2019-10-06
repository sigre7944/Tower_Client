import React from 'react';

import {
    View,
    ScrollView,
    StyleSheet,
    Keyboard,
    Animated,
    KeyboardAvoidingView,
    Dimensions,
    Modal,
    FlatList,
    Text,

} from 'react-native';

export default class PurchaseDate extends React.PureComponent {

    day_in_week_text = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    month_text = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    render() {
        let date = new Date(parseInt(this.props.data[0])),
            date_string = `${this.day_in_week_text[date.getDay()]} ${date.getDate()} ${this.month_text[date.getMonth()]} ${date.getFullYear()}`
        return (
            <View
                style={{

                }}
            >
                <Text>
                    {date_string}
                </Text>

                <View>

                </View>
            </View>
        )
    }
}