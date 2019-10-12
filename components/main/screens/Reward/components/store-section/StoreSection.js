import React from 'react';
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import CRUDRewardSection from './crud-reward-section/CRUDRewardSection.Container'
import BalanceHolder from './balance-holder/BalanceHolder.Container'
export default class TrackingSection extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    backgroundColor: "white",
                    shadowOffset: {
                        width: 0,
                        height: 0
                    },
                    shadowRadius: 8,
                    shadowOpacity: 1,
                    shadowColor: "rgba(0, 0, 0, 0.12)",
                    paddingHorizontal: 22,
                    paddingTop: 32,
                    paddingBottom: 64,
                }}
            >
                <BalanceHolder />

                <View
                    style={{
                        flexDirection: "row",
                        height: 1,
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        marginTop: 22,
                    }}
                >

                </View>

                <Text
                    style={{
                        color: "rgba(0, 0, 0, 0.87)",
                        fontWeight: "500",
                        fontSize: 20,
                        lineHeight: 23,
                        letterSpacing: -0.02,
                        marginTop: 22,
                    }}
                >
                    Other rewards
                </Text>

                <CRUDRewardSection />
            </View>
        )
    }
}