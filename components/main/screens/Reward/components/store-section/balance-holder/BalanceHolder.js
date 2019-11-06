import React from 'react';
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';

export default class BalanceHolder extends React.PureComponent {

    render() {
        return (
            <View>
                <Text
                    style={{
                        fontSize: 16,
                        lineHeight: 19,
                        letterSpacing: -0.02,
                        color: "rgba(0, 0, 0, 0.15)"
                    }}
                >
                    Balance
                </Text>

                <Text
                    style={{
                        marginTop: 3,
                        fontWeight: "500",
                        fontSize: 24,
                        lineHeight: 28,
                        letterSpacing: -0.02,
                        color: "rgba(0, 0, 0, 0.87)"
                    }}
                >
                    {this.props.balance} €
                </Text>
            </View>
        )
    }
}