import React from "react";
import { View, Text } from "react-native";

import CRUDRewardSection from "./crud-reward-section/CRUDRewardSection.Container";
import BalanceHolder from "./balance-holder/BalanceHolder.Container";

import { normalize } from "../../../../../shared/helpers";
import { styles } from "./styles/styles";

export default class TrackingSection extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          paddingHorizontal: normalize(22, "width"),
          paddingTop: normalize(32, "height"),
          paddingBottom: normalize(64, "height")
        }}
      >
        <BalanceHolder />

        <View style={styles.separating_line}></View>

        <Text style={styles.other_rewards_title}>Other rewards</Text>

        <CRUDRewardSection navigation={this.props.navigation} />
      </View>
    );
  }
}
