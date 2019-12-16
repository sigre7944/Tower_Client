import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList
} from "react-native";

import { Map, fromJS, OrderedMap, isKeyed } from "immutable";

import AddEditReward from "./add-edit-reward/AddEditReward.Container";

import InsufficientWarning from "./insufficient-warning/InsufficientWarning";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { styles } from "./styles/styles";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";

import PremiumAd from "../../../../../../shared/components/premium-ad/PremiumAd.Container";
import { normalize } from "../../../../../../shared/helpers";

const window_width = Dimensions.get("window").width;
const number_of_columns = 2;
const reward_holder_width =
  (window_width -
    (normalize(22, "width") * 2 +
      normalize(23, "width") * (number_of_columns - 1))) /
  number_of_columns; //22 = paddingHorizontal value, 23 = margin between 2 cols

export default class CRUDRewardSection extends React.PureComponent {
  edit_reward_data = {};

  state = {
    should_flatlist_update: 0,
    reward_data: [],
    is_add_new_reward: false,
    is_edit_reward: false,

    should_display_insufficient: false
  };

  addNewReward = () => {
    this.setState({
      is_add_new_reward: true,
      is_edit_reward: false,
      should_display_insufficient: false
    });
  };

  editReward = edit_reward_data => {
    this.setState({
      is_add_new_reward: false,
      is_edit_reward: true,
      should_display_insufficient: false
    });

    this.edit_reward_data = edit_reward_data;
  };

  _promptInsufficientFundWarning = () => {
    this.setState({
      is_add_new_reward: false,
      is_edit_reward: false,
      should_display_insufficient: true
    });
  };

  dismissAction = should_go_to_login => {
    this.setState(
      {
        is_add_new_reward: false,
        is_edit_reward: false,
        should_display_insufficient: false
      },
      () => {
        if (should_go_to_login) {
          this.props.navigation.navigate("SignInScreen");
        }
      }
    );
  };

  _playingSound = async () => {
    try {
      const completing_sound = new Audio.Sound();
      await completing_sound.loadAsync(
        require("../../../../../../../assets/sounds/GetReward01.wav")
      );
      await completing_sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  _getReward = (reward_id, reward_name, reward_value) => {
    let purchase_history_map = OrderedMap(this.props.purchase_history),
      rewards = OrderedMap(this.props.rewards),
      balance = parseFloat(this.props.balance);

    // Can buy when have enough balance
    if (balance >= reward_value) {
      if (rewards.has(reward_id)) {
        let date = new Date(),
          day_timestamp = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          ).getTime(),
          day_timestamp_toString = day_timestamp.toString(),
          timestamp_without_seconds =
            day_timestamp +
            date.getHours() * 3600 * 1000 +
            date.getMinutes() * 60 * 1000,
          timestamp_without_seconds_toString = timestamp_without_seconds.toString(),
          sending_obj = {
            purchase_item_data: {},
            balance_data: {
              type: "WITHDRAW_BALANCE_AMOUNT",
              amount: reward_value
            }
          };

        if (
          purchase_history_map.hasIn([
            day_timestamp_toString,
            timestamp_without_seconds_toString,
            reward_id,
            "quantity"
          ])
        ) {
          sending_obj.purchase_item_data = {
            keyPath: [
              day_timestamp_toString,
              timestamp_without_seconds_toString,
              reward_id,
              "quantity"
            ],
            notSetValue: 0,
            updater: value => value + 1
          };
        } else {
          if (
            purchase_history_map.hasIn([
              day_timestamp_toString,
              timestamp_without_seconds_toString
            ])
          ) {
            let updater_data = OrderedMap(
              purchase_history_map.getIn([
                day_timestamp_toString,
                timestamp_without_seconds_toString
              ])
            ).asMutable();

            updater_data.set(
              reward_id,
              fromJS({
                id: reward_id,
                value: reward_value,
                name: reward_name,
                quantity: 1,
                latest_timestamp: timestamp_without_seconds
              })
            );

            sending_obj.purchase_item_data = {
              keyPath: [
                day_timestamp_toString,
                timestamp_without_seconds_toString
              ],
              notSetValue: {},
              updater: value => updater_data.toOrderedMap()
            };
          } else {
            if (purchase_history_map.has(day_timestamp_toString)) {
              let updater_data = {};

              updater_data[reward_id] = {
                id: reward_id,
                value: reward_value,
                name: reward_name,
                quantity: 1,
                latest_timestamp: timestamp_without_seconds
              };

              sending_obj.purchase_item_data = {
                keyPath: [
                  day_timestamp_toString,
                  timestamp_without_seconds_toString
                ],
                notSetValue: {},
                updater: value =>
                  fromJS(updater_data, (key, value, path) => {
                    return isKeyed(value)
                      ? value.toOrderedMap()
                      : value.toList();
                  })
              };
            } else {
              let updater_data = {};
              updater_data[timestamp_without_seconds_toString] = {};
              updater_data[timestamp_without_seconds_toString][reward_id] = {
                id: reward_id,
                value: reward_value,
                name: reward_name,
                quantity: 1,
                latest_timestamp: timestamp_without_seconds
              };

              sending_obj.purchase_item_data = {
                keyPath: [day_timestamp_toString],
                notSetValue: {},
                updater: value =>
                  fromJS(updater_data, (key, value, path) => {
                    return isKeyed(value)
                      ? value.toOrderedMap()
                      : value.toList();
                  })
              };
            }
          }
        }

        this.props.updatePurchaseItemThunk(sending_obj);

        let general_settings = Map(this.props.generalSettings);

        if (general_settings.get("vibration")) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }

        if (general_settings.get("sound")) {
          this._playingSound();
        }
      }
    } else {
      this._promptInsufficientFundWarning();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  _setFlatListRef = ref => {
    this._flatlistReft = ref;
  };

  _keyExtractor = (item, index) => `reward-CRUD-Store-${item[0]}`;

  _renderItem = ({ item, index }) => {
    if (item[0] === "is_add_button") {
      return <AddRewardHolder addNewReward={this.addNewReward} />;
    } else {
      return (
        <RewardHolder
          data={item[1]}
          editReward={this.editReward}
          _getReward={this._getReward}
          account_plan={Map(this.props.generalSettings).getIn([
            "account",
            "package",
            "plan"
          ])}
          navigation={this.props.navigation}
        />
      );
    }
  };

  _updateRewardData = () => {
    let rewards_map = OrderedMap(this.props.rewards),
      reward_data = [];

    reward_data.push([
      "is_add_button",
      {
        is_add_button: true
      }
    ]);

    rewards_map.entrySeq().forEach((entry, index) => {
      reward_data.push(entry);
    });

    this.setState({
      reward_data
    });
  };

  componentDidMount() {
    this._updateRewardData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.rewards !== prevProps.rewards) {
      this._updateRewardData();
    }
  }

  render() {
    return (
      <View
        style={{
          marginTop: normalize(22, "height")
        }}
      >
        <FlatList
          data={this.state.reward_data}
          extraData={this.state.should_flatlist_update}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          numColumns={2}
          ref={this._setFlatListRef}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginTop: normalize(22, "height")
          }}
          windowSize={5}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          removeClippedSubviews={true}
        />

        {this.state.is_add_new_reward ? (
          <AddEditReward
            dismissAction={this.dismissAction}
            navigation={this.props.navigation}
          />
        ) : (
          <>
            {this.state.is_edit_reward ? (
              <AddEditReward
                dismissAction={this.dismissAction}
                edit={true}
                edit_reward_data={this.edit_reward_data}
              />
            ) : (
              <>
                {this.state.should_display_insufficient ? (
                  <InsufficientWarning dismissAction={this.dismissAction} />
                ) : null}
              </>
            )}
          </>
        )}
      </View>
    );
  }
}

class RewardHolder extends React.PureComponent {
  state = {
    can_choose: false,
    should_display_premium_ad: false
  };

  _toggleShouldDisplayPremiumAd = () => {
    this.setState(prevState => ({
      should_display_premium_ad: !prevState.should_display_premium_ad
    }));
  };

  _editReward = () => {
    if (this.state.can_choose) {
      this.props.editReward(this.props.data);
    } else {
      this._toggleShouldDisplayPremiumAd();
    }
  };

  _getReward = () => {
    if (this.state.can_choose) {
      let data_map = Map(this.props.data);
      this.props._getReward(
        data_map.get("id"),
        data_map.get("name"),
        data_map.get("value")
      );
    } else {
      this._toggleShouldDisplayPremiumAd();
    }
  };

  _checkIfCanChoose = () => {
    let account_plan = this.props.account_plan,
      reward_plan = Map(this.props.data).get("plan"),
      can_choose = false;

    if (reward_plan === "free") {
      can_choose = true;
    } else {
      can_choose = account_plan === reward_plan;
    }

    this.setState({
      can_choose
    });
  };

  _goToLogin = () => {
    this.setState(
      {
        should_display_premium_ad: false
      },
      () => {
        this.props.navigation.navigate("SignInScreen");
      }
    );
  };

  componentDidMount() {
    this._checkIfCanChoose();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.account_plan !== prevProps.account_plan) {
      this._checkIfCanChoose();
    }
  }

  render() {
    let reward_value = Map(this.props.data).get("value"),
      reward_name = Map(this.props.data).get("name");

    return (
      <View
        style={{
          opacity: this.state.can_choose ? 1 : 0.5
        }}
      >
        <View
          style={{
            ...{ width: reward_holder_width },
            ...styles.reward_holder_container
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: reward_holder_width
            }}
          >
            <TouchableOpacity
              style={{
                height: normalize(24, "width"),
                width: normalize(24, "width"),
                alignItems: "flex-start",
                justifyContent: "flex-end"
              }}
              onPress={this._editReward}
            >
              <FontAwesomeIcon
                icon={faEdit}
                color="#05838B"
                size={normalize(14, "width")}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: normalize(10, "height"),
              alignItems: "center",
              paddingHorizontal: normalize(10, "width")
            }}
          >
            <Text style={reward_name}>{reward_name}</Text>
          </View>

          <View
            style={{
              marginTop: normalize(22, "height"),
              alignItems: "center",
              paddingHorizontal: normalize(10, "width")
            }}
          >
            <Text style={styles.reward_value}>{reward_value}</Text>
            <View
              style={{
                marginTop: normalize(5, "height")
              }}
            >
              <Text style={styles.currency_text}>pts</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.reward_get_button_container}
            onPress={this._getReward}
          >
            <Text style={styles.reward_get_text}>Get</Text>
          </TouchableOpacity>
        </View>

        {this.state.should_display_premium_ad ? (
          <PremiumAd
            dismissAction={this._toggleShouldDisplayPremiumAd}
            motivation_text="The reward was disabled due to Free plan"
            _goToLogin={this._goToLogin}
          />
        ) : null}
      </View>
    );
  }
}

class AddRewardHolder extends React.PureComponent {
  addNewReward = () => {
    this.props.addNewReward();
  };

  render() {
    return (
      <TouchableOpacity
        style={{
          ...{ width: reward_holder_width },
          ...styles.add_button_container
        }}
        onPress={this.addNewReward}
      >
        <FontAwesomeIcon
          icon={faPlus}
          color="white"
          size={normalize(45, "width")}
        />
      </TouchableOpacity>
    );
  }
}
