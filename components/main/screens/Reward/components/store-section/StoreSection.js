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

import { styles } from "./styles/styles";

export default class TrackingSection extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    paddingHorizontal: 22,
                    paddingTop: 32,
                    paddingBottom: 64,
                }}
            >
                <BalanceHolder />

                <View
                    style={styles.separating_line}
                >

                </View>

                <Text
                    style={styles.other_rewards_title}
                >
                    Other rewards
                </Text>

                <CRUDRewardSection />
            </View>
        )
    }
}