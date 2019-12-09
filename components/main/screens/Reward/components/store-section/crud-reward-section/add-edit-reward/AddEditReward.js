import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Modal,
  Switch,
  ScrollView,
  Animated,
  Easing
} from "react-native";

import {
  reward_icon,
  check_icon,
  close_icon
} from "../../../../../../../shared/icons";

const icon_size = 14;
const icon_color = "#2C2C2C";

import { styles } from "./styles/styles";
import PremiumAd from "../../../../../../../shared/components/premium-ad/PremiumAd";
import { Map, fromJS, OrderedMap } from "immutable";

const shortid = require("shortid");
const animation_duration = 250;
const easing = Easing.in();

export default class AddEditReward extends React.PureComponent {
  scale_value = new Animated.Value(0.3);
  opacity_value = this.scale_value.interpolate({
    inputRange: [0.3, 0.5, 0.7, 1],
    outputRange: [0.3, 0.5, 0.7, 1],
    extrapolate: "clamp"
  });

  state = {
    reward_title: "",
    reward_value: "",
    is_main: false,
    toggle_delete: false,
    should_display_premium_ad: false
  };

  _dismissAction = () => {
    this.props.dismissAction();
  };

  _toggleDelete = () => {
    this.setState(
      prevState => ({
        toggle_delete: !prevState.toggle_delete
      }),
      () => {
        if (!this.state.toggle_delete) {
          this.scale_value.setValue(1);
        }
      }
    );
  };

  _delete = () => {
    let edit_reward_data_map = Map(this.props.edit_reward_data),
      sending_obj = {
        delete_reward_data: {
          keyPath: [edit_reward_data_map.get("id")]
        }
      };

    this.props.deleteReward(sending_obj);
    this._dismissAction();
  };

  _cancel = () => {
    this._animateEnd(this.props.dismissAction);
    // this.props.dismissAction()
  };

  onChangeRewardTitle = e => {
    this.setState({
      reward_title: e.nativeEvent.text
    });
  };

  onChangeRewardValue = e => {
    this.setState({
      reward_value: e.nativeEvent.text.replace(/[,]/g, ".")
    });
  };

  onChangeTrackReward = () => {
    this.setState(prevState => ({
      is_main: !prevState.is_main
    }));
  };

  _toggleShouldDisplayPremiumAd = () => {
    this.setState(prevState => ({
      should_display_premium_ad: !prevState.should_display_premium_ad
    }));
  };

  _save = () => {
    if (
      this.state.reward_title.length > 0 &&
      this.state.reward_value.length > 0
    ) {
      if (this.props.edit) {
        let edit_reward_data_map = Map(this.props.edit_reward_data),
          sending_obj = {
            edit_reward_data: {
              keyPath: [edit_reward_data_map.get("id")],
              notSetValue: {},
              updater: value =>
                fromJS({
                  id: edit_reward_data_map.get("id"),
                  name: this.state.reward_title,
                  value: parseFloat(this.state.reward_value),
                  created_at: edit_reward_data_map.get("created_at")
                })
            },

            update_main_reward_data: {
              should_update: this.state.is_main,
              id: edit_reward_data_map.get("id"),
              current_main_reward: this.props.main_reward
            }
          };

        this.props.editRewardAndMainReward(sending_obj);

        this._cancel();
      } else {
        let plan = Map(this.props.generalSettings).getIn([
            "account",
            "package",
            "plan"
          ]),
          number_of_rewards = Map(this.props.generalSettings).getIn([
            "package_limitations",
            plan,
            "number_of_rewards"
          ]),
          current_number_of_rewards = OrderedMap(this.props.rewards).size;

        if (current_number_of_rewards < number_of_rewards) {
          let reward_id = `reward-${shortid.generate()}`,
            sending_obj = {
              new_reward_data: {
                keyPath: [reward_id],
                notSetValue: {},
                updater: value =>
                  fromJS({
                    id: reward_id,
                    name: this.state.reward_title,
                    value: parseFloat(this.state.reward_value),
                    created_at: new Date().getTime()
                  })
              },
              update_main_reward_data: {
                should_update: this.state.is_main,
                id: reward_id
              }
            };

          this.props.addRewardAndMainReward(sending_obj);
          this._cancel();
        } else {
          this._toggleShouldDisplayPremiumAd();
        }
      }
    }
  };

  _animate = () => {
    Animated.timing(this.scale_value, {
      toValue: 1,
      duration: animation_duration,
      easing
      // useNativeDriver: true
    }).start();
  };

  _animateEnd = callback => {
    Animated.timing(this.scale_value, {
      toValue: 0,
      duration: animation_duration,
      easing
      // useNativeDriver: true
    }).start(() => {
      callback();
    });
  };

  componentDidMount() {
    this._animate();

    if (this.props.edit) {
      let { edit_reward_data } = this.props;

      this.setState({
        reward_title: Map(edit_reward_data).get("name"),
        reward_value: `${Map(edit_reward_data).get("value")}`,
        is_main: Map(edit_reward_data).get("id") === this.props.main_reward
      });
    }
  }

  render() {
    return (
      <Modal transparent={true}>
        <View
          style={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
        >
          <TouchableWithoutFeedback onPress={this._cancel}>
            <View
              style={{
                flex: 1,
                width: Dimensions.get("window").width,
                backgroundColor: "black",
                opacity: 0.5
              }}
            ></View>
          </TouchableWithoutFeedback>

          {this.state.toggle_delete ? (
            <View
              style={{
                position: "absolute",
                width: 331,
                borderRadius: 10,
                backgroundColor: "white",
                paddingHorizontal: 32,
                paddingVertical: 32
              }}
            >
              <Text style={styles.delete_warning_text}>
                Are you sure you want to delete this reward?
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 32
                }}
              >
                <TouchableOpacity
                  style={styles.cancel_container}
                  onPress={this._toggleDelete}
                >
                  {close_icon(19, "white")}
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    ...styles.save_container,
                    ...{ backgroundColor: "#EB5757" }
                  }}
                  onPress={this._delete}
                >
                  {check_icon(19, "white")}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Animated.View
              style={{
                position: "absolute",
                width: 331,
                borderRadius: 10,
                backgroundColor: "white",
                paddingHorizontal: 32,
                paddingVertical: 32,
                transform: [{ scale: this.scale_value }],
                opacity: this.opacity_value
              }}
            >
              <ScrollView keyboardDismissMode="on-drag" scrollEnabled={false}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  {!this.props.edit ? (
                    <>
                      {reward_icon(icon_size, icon_color)}

                      <Text style={styles.title}>Add Reward</Text>
                    </>
                  ) : (
                    <>
                      {reward_icon(icon_size, icon_color)}

                      <Text style={styles.title}>Edit Reward</Text>
                    </>
                  )}
                </View>

                <View
                  style={{
                    marginTop: 32
                  }}
                >
                  <Text style={styles.reward_title_informer}>Title</Text>
                  <TextInput
                    style={styles.reward_input}
                    onChange={this.onChangeRewardTitle}
                    maxLength={32}
                    value={this.state.reward_title}
                    placeholder={
                      this.props.edit_reward_data
                        ? `${this.props.edit_reward_data.name}`
                        : "Enter a reward title"
                    }
                  />
                </View>

                <View
                  style={{
                    marginTop: 22
                  }}
                >
                  <Text style={styles.reward_title_informer}>Value</Text>
                  <TextInput
                    style={styles.reward_input}
                    onChange={this.onChangeRewardValue}
                    value={this.state.reward_value}
                    keyboardType={"numeric"}
                    placeholder={
                      this.props.edit_reward_data
                        ? `${this.props.edit_reward_data.value}`
                        : "Enter a value for the reward"
                    }
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 22
                  }}
                >
                  <Text style={styles.set_as_main_reward_text}>
                    Set as main reward
                  </Text>

                  <Switch
                    value={this.state.is_main}
                    onValueChange={this.onChangeTrackReward}
                    trackColor={{
                      false: "rgba(189, 189, 189, 0.2)",
                      true: "#05838B"
                    }}
                    ios_backgroundColor="rgba(189, 189, 189, 0.2)"
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 40
                  }}
                >
                  <TouchableOpacity onPress={this._toggleDelete}>
                    <Text style={styles.delete_reward_text}>
                      {this.props.edit ? `Delete reward` : null}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <TouchableOpacity
                      style={styles.cancel_container}
                      onPress={this._cancel}
                    >
                      {close_icon(19, "white")}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.save_container}
                      onPress={this._save}
                    >
                      {check_icon(19, "white")}
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </Animated.View>
          )}
        </View>

        {this.state.should_display_premium_ad ? (
          <PremiumAd
            dismissAction={this._toggleShouldDisplayPremiumAd}
            motivation_text="You've reached Free plan's limits"
          />
        ) : null}
      </Modal>
    );
  }
}
