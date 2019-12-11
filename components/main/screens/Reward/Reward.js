import React from "react";

import {
  View,
  FlatList,
  Dimensions,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import TrackingSection from "./components/tracking-section/TrackingSection.Container";
import StoreSection from "./components/store-section/StoreSection";

import RewardHeader from "./components/header/RewardHeader";

import { plus_icon } from "../../../shared/icons";

const icon_size = 19;
const icon_color = "white";

import { OrderedMap } from "immutable";

import { styles } from "./styles/styles";

import AddEditReward from "./components/store-section/crud-reward-section/add-edit-reward/AddEditReward.Container";

const window_width = Dimensions.get("window").width;
const have_no_reward_1x = require("../../../../assets/pngs/have_no_reward_1x.png");

export default class Reward extends React.PureComponent {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: <RewardHeader navigation={navigation} />,
      swipeEnabled: false
    };
  };

  state = {
    data: [],
    should_flatlist_update: 0,
    should_display_no_rewards_svg: true,

    should_display_add_new_reward_modal: false
  };

  _keyExtractory = (item, index) => `reward-${item.id}-holder`;

  _renderItem = ({ item, index }) => {
    if (item.id === "tracking-main-reward") {
      return <TrackingSection />;
    }

    return <StoreSection />;
  };

  _checkIfThereIsAnyRewards = () => {
    let rewards_map = OrderedMap(this.props.rewards);

    if (rewards_map.size === 0) {
      return true;
    }
    return false;
  };

  _toggleShouldDisplayNewRewardModal = () => {
    this.setState(prevState => ({
      should_display_add_new_reward_modal: !prevState.should_display_add_new_reward_modal
    }));
  };

  componentDidMount() {
    const didFocusScreen = this.props.navigation.addListener(
      "didFocus",
      payload => {
        this.props.changeRouteAction(payload.state.routeName);
      }
    );

    let data = [];

    data.push({
      id: "tracking-main-reward"
    });
    data.push({
      id: "balance-store-section"
    });

    this.setState({
      data,
      should_display_no_rewards_svg: this._checkIfThereIsAnyRewards()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.rewards !== prevProps.rewards) {
      this.setState({
        should_display_no_rewards_svg: this._checkIfThereIsAnyRewards()
      });
    }
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1
        }}
      >
        {this.state.should_display_no_rewards_svg ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 172
              }}
            >
              <Image
                source={have_no_reward_1x}
                resizeMode="contain"
                style={{
                  flex: 1
                }}
              />
            </View>

            <View
              style={{
                marginTop: 48,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.informing_text}>
                Uh oh! - you don't have any reward.
              </Text>

              <Text style={styles.motivating_text}>
                Add one to stay motivated!
              </Text>
            </View>

            <TouchableOpacity
              style={styles.add_reward_button_container}
              onPress={this._toggleShouldDisplayNewRewardModal}
            >
              {plus_icon(icon_size, icon_color)}
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            keyExtractor={this._keyExtractory}
            renderItem={this._renderItem}
            data={this.state.data}
            extraData={this.state.should_flatlist_update}
          />
        )}

        {this.state.should_display_add_new_reward_modal ? (
          <AddEditReward
            dismissAction={this._toggleShouldDisplayNewRewardModal}
          />
        ) : null}
      </View>
    );
  }
}
