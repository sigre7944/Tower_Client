import React from 'react';
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import { styles } from "./styles/styles";

export default class BalanceHolder extends React.PureComponent {

    render() {
        return (
            <View>
                <Text
                    style={styles.balance_title}
                >
                    Balance
                </Text>

                <Text
                    style={styles.balance_value}
                >
                    {this.props.balance} €
                </Text>
            </View>
        )
    }
}