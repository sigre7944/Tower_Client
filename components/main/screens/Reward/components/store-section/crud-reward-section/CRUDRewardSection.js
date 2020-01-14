import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing
} from "react-native";

import { Map, fromJS, OrderedMap, isKeyed } from "immutable";

import AddEditReward from "./add-edit-reward/AddEditReward.Container";

import InsufficientWarning from "./insufficient-warning/InsufficientWarning";
import InformPurchaseAction from "../../inform-purchase-action/InformPurchaseAction";

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
    } catch (error) {}
  };

  _getReward = (reward_id, reward_name, reward_value) => {
    let purchase_history_map = OrderedMap(this.props.purchase_history),
      rewards = OrderedMap(this.props.rewards),
      balance = parseInt(this.props.balance);

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
          balance={this.props.balance}
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

    this.setState(prevState => ({
      reward_data,
      should_flatlist_update: prevState.should_flatlist_update + 1
    }));
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
  inform_bought_item_translate_y_value = 30;
  inform_bought_item_easing = Easing.in();
  inform_bought_item_duration = 150;
  inform_bought_item_opacity = new Animated.Value(0);
  inform_bought_item_translate_y = new Animated.Value(
    this.inform_bought_item_translate_y_value
  );

  _start_anim_inform_bought_item_action = Animated.parallel([
    Animated.timing(this.inform_bought_item_opacity, {
      toValue: 1,
      duration: this.inform_bought_item_duration,
      easing: this.inform_bought_item_easing,
      isInteraction: true,
      useNativeDriver: true
    }),

    Animated.timing(this.inform_bought_item_translate_y, {
      toValue: 0,
      duration: this.inform_bought_item_duration,
      easing: this.inform_bought_item_easing,
      useNativeDriver: true
    })
  ]);

  _end_anim_inform_bought_item_action = Animated.parallel([
    Animated.timing(this.inform_bought_item_opacity, {
      toValue: 0,
      duration: this.inform_bought_item_duration,
      easing: this.inform_bought_item_easing,
      useNativeDriver: true
    }),

    Animated.timing(this.inform_bought_item_translate_y, {
      toValue: this.inform_bought_item_translate_y_value,
      duration: this.inform_bought_item_duration,
      easing: this.inform_bought_item_easing,
      useNativeDriver: true
    })
  ]);

  state = {
    can_choose: false,
    should_display_premium_ad: false,

    should_display_inform_bought_item: false,

    balance_anim_value: this.props.balance,

    new_balance: this.props.balance
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

      let balance = parseInt(this.props.balance);

      // If balance is enough to buy, indicate an bought animation
      if (balance >= parseInt(data_map.get("value"))) {
        // this._start_anim_inform_bought_item_action.stop();
        // this._end_anim_inform_bought_item_action.stop();
        this.setState(
          {
            should_display_inform_bought_item: true,
            new_balance: balance - parseInt(data_map.get("value"))
          },
          () => {
            // this._animateNumber(
            //   balance,
            //   balance - parseInt(data_map.get("value")),
            //   1000
            // );
          }
        );
      }
    } else {
      this._toggleShouldDisplayPremiumAd();
    }
  };

  _toggleDisplayInformBoughtItem = () => {
    this.setState(prevState => ({
      should_display_inform_bought_item: !prevState.should_display_inform_bought_item
    }));
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

  _startInformBoughtItemAnim = () => {
    this._start_anim_inform_bought_item_action.start(() => {
      setTimeout(() => {
        this._endInformBoughtItemAnim();
      }, 3000);
    });
  };

  _endInformBoughtItemAnim = () => {
    this._end_anim_inform_bought_item_action.start(() => {
      this._toggleDisplayInformBoughtItem();
    });
  };

  _animateNumber = (start, end, duration) => {
    let range = end - start;
    // no timer shorter than 50ms (not really visible any way)
    let minTimer = 50;
    // calc step time to show all intermediate values
    let stepTime = Math.abs(Math.floor(duration / range));

    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);

    // get current time and calculate desired end time
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;

    run = () => {
      let now = new Date().getTime();
      let remaining = Math.max((endTime - now) / duration, 0);
      let value = Math.round(end - remaining * range);

      this.setState(prevState => ({ balance_anim_value: value }));

      if (value == end) {
        this.setState({
          should_display_inform_bought_item: false
        });
        clearInterval(timer);
      }
    };

    timer = setInterval(run, stepTime);
    run();
  };

  componentDidMount() {
    this._checkIfCanChoose();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.account_plan !== prevProps.account_plan) {
      this._checkIfCanChoose();
    }

    if (
      this.state.should_display_inform_bought_item !==
      prevState.should_display_inform_bought_item
    ) {
      if (this.state.should_display_inform_bought_item) {
        // this._startInformBoughtItemAnim();
      }
    }
  }

  render() {
    let reward_value = Map(this.props.data).get("value"),
      reward_name = Map(this.props.data).get("name");

    reward_value = parseInt(reward_value).toLocaleString();

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

            {this.state.should_display_inform_bought_item ? (
              // <Animated.View
              //   style={{
              //     position: "absolute",
              //     top: normalize(50, "height"),
              //     justifyContent: "center",
              //     alignItems: "center",
              //     opacity: this.inform_bought_item_opacity,
              //     transform: [
              //       { translateY: this.inform_bought_item_translate_y }
              //     ]
              //   }}
              // >
              //   <Text style={styles.inform_bought_item_text}></Text>
              // </Animated.View>

              // <View
              //   style={{
              //     position: "absolute",
              //     top: normalize(50, "height"),
              //     justifyContent: "center",
              //     alignItems: "center"
              //   }}
              // >
              //   <Text>{this.state.balance_anim_value}</Text>
              // </View>

              <InformPurchaseAction
                reward_name={this.props.data.get("name")}
                balance={this.state.new_balance}
                _toggleDisplayInformBoughtItem={
                  this._toggleDisplayInformBoughtItem
                }
              />
            ) : null}
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
