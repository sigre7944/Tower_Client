import React from 'react';
import {
    View,
    Text,
} from 'react-native';

export default class YearChart extends React.PureComponent {
    render() {
        let current_year = new Date().getFullYear()
        return (
            <View>
                <View
                    style={{
                        marginTop: 17,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text>
                        {current_year}
                    </Text>
                </View>
            </View>
        )
    }
}