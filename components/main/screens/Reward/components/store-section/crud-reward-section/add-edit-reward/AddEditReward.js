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
  Easing,
  Platform,
  Keyboard,
  UIManager
} from "react-native";

import {
  reward_icon,
  check_icon,
  close_icon
} from "../../../../../../../shared/icons";

import { normalize } from "../../../../../../../shared/helpers";

const icon_size = normalize(14, "width");
const icon_color = "#2C2C2C";

import { styles } from "./styles/styles";
import PremiumAd from "../../../../../../../shared/components/premium-ad/PremiumAd.Container";
import { Map, fromJS, OrderedMap } from "immutable";

const shortid = require("shortid");
const animation_duration = 250;
const easing = Easing.in();

const text_input_state = TextInput.State;
const window_height = Dimensions.get("window").height;
const extra_margin_from_keyboard = normalize(10, "height");

export default class AddEditReward extends React.PureComponent {
  opacity_value = new Animated.Value(0);

  translate_y_value = new Animated.Value(0);

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
          this.opacity_value.setValue(1);
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
      reward_value: e.nativeEvent.text.replace(/[^0-9]/g, "")
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

  _checkIfCanChoose = () => {
    let account_plan = this.props.account_plan,
      category_plan = Map(this.props.data).get("plan"),
      can_choose = false;

    if (category_plan === "free") {
      can_choose = true;
    } else {
      can_choose = account_plan === category_plan;
    }

    this.setState({
      can_choose
    });
  };

  _save = () => {
    if (
      this.state.reward_title.length > 0 &&
      this.state.reward_value.length > 0 &&
      parseInt(this.state.reward_value) > 0
    ) {
      if (this.props.edit) {
        let edit_reward_id = Map(this.props.edit_reward_data).get("id");

        let new_reward_data = Map(this.props.edit_reward_data).asMutable();

        new_reward_data.update("name", v => this.state.reward_title);
        new_reward_data.update("value", v => parseInt(this.state.reward_value));

        let sending_obj = {
          edit_reward_data: {
            keyPath: [edit_reward_id],
            notSetValue: {},
            updater: value => new_reward_data.toMap()
          },

          update_main_reward_data: {
            should_update: this.state.is_main,
            id: edit_reward_id,
            current_main_reward: this.props.main_reward
          }
        };

        this.props.editRewardAndMainReward(sending_obj);

        this._cancel();
      } else {
        // Every user will have a fixed default number of rewards, which will be always available.
        // If the current number of rewards don't exceed the limit, we will assign the new reward with
        // free plan. After the limit, we assign normally based on user's plan.

        let free_plan_number_of_rewards = Map(
          this.props.generalSettings
        ).getIn(["package_limitations", "free", "number_of_rewards"]);

        let current_number_of_rewards = OrderedMap(this.props.rewards).size;

        let assigned_plan = "free";

        // If current number of rewards doesnt exceed the limit
        if (current_number_of_rewards < free_plan_number_of_rewards) {
          assigned_plan = "free";
        }
        // If it does
        else {
          assigned_plan = Map(this.props.generalSettings).getIn([
            "account",
            "package",
            "plan"
          ]);
        }

        let assigned_plan_number_of_rewards = Map(
          this.props.generalSettings
        ).getIn(["package_limitations", assigned_plan, "number_of_rewards"]);

        if (current_number_of_rewards < assigned_plan_number_of_rewards) {
          let reward_id = `reward-${shortid.generate()}`,
            sending_obj = {
              new_reward_data: {
                keyPath: [reward_id],
                notSetValue: {},
                updater: value =>
                  fromJS({
                    id: reward_id,
                    name: this.state.reward_title,
                    value: parseInt(this.state.reward_value),
                    created_at: new Date().getTime(),
                    plan: assigned_plan
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
    Animated.timing(this.opacity_value, {
      toValue: 1,
      duration: animation_duration,
      easing,
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start();
  };

  _animateEnd = callback => {
    Animated.timing(this.opacity_value, {
      toValue: 0,
      duration: animation_duration,
      easing,
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start(() => {
      callback();
    });
  };

  _goToLogin = () => {
    this.setState(
      {
        should_display_premium_ad: false
      },
      () => {
        this.props.dismissAction(true);
      }
    );
  };

  _keyboardWillHideHandler = e => {
    Animated.timing(this.translate_y_value, {
      toValue: 0,
      duration: e.duration,
      useNativeDriver: true
    }).start();
  };

  _keyboardWillShowHandler = e => {
    let keyboard_height = e.endCoordinates.height,
      keyboard_duration = e.duration;

    let currently_focused_input = text_input_state.currentlyFocusedField();

    UIManager.measure(
      currently_focused_input,
      (x, y, width, height, pageX, pageY) => {
        let input_height = height,
          input_py = pageY;

        let gap =
          window_height -
          keyboard_height -
          (input_height + input_py) -
          extra_margin_from_keyboard;

        if (gap < 0) {
          Animated.timing(this.translate_y_value, {
            toValue: gap,
            duration: keyboard_duration,
            useNativeDriver: true
          }).start();
        }
      }
    );
  };

  _keyboardDidHideHandler = e => {
    Animated.timing(this.translate_y_value, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  _keyboardDidShowHandler = e => {
    let keyboard_height = e.endCoordinates.height,
      keyboard_duration = e.duration;

    let currently_focused_input = text_input_state.currentlyFocusedField();

    UIManager.measure(
      currently_focused_input,
      (x, y, width, height, pageX, pageY) => {
        let input_height = height,
          input_py = pageY;

        let gap =
          window_height -
          keyboard_height -
          (input_height + input_py) -
          extra_margin_from_keyboard;

        if (gap < 0) {
          Animated.timing(this.translate_y_value, {
            toValue: gap,
            duration: 100,
            useNativeDriver: true
          }).start();
        }
      }
    );
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

    if (Platform.OS === "ios") {
      this.keyboardWillHideListener = Keyboard.addListener(
        "keyboardWillHide",
        this._keyboardWillHideHandler
      );

      this.keyboardWillShowListener = Keyboard.addListener(
        "keyboardWillShow",
        this._keyboardWillShowHandler
      );
    } else {
      this.keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        this._keyboardDidHideHandler
      );
      this.keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        this._keyboardDidShowHandler
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "ios") {
      Keyboard.removeListener(
        "keyboardWillHide",
        this._keyboardWillHideHandler
      );
      Keyboard.removeListener(
        "keyboardWillShow",
        this._keyboardWillShowHandler
      );
    } else {
      Keyboard.removeListener("keyboardDidHide", this._keyboardDidHideHandler);
      Keyboard.removeListener("keyboardDidShow", this._keyboardDidShowHandler);
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
                opacity: 0.2
              }}
            ></View>
          </TouchableWithoutFeedback>

          {this.state.toggle_delete ? (
            <View
              style={{
                position: "absolute",
                width: normalize(331, "width"),
                borderRadius: normalize(10, "width"),
                backgroundColor: "white",
                paddingHorizontal: normalize(32, "width"),
                paddingVertical: normalize(32, "height")
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
                  marginTop: normalize(32, "height")
                }}
              >
                <TouchableOpacity
                  style={styles.cancel_container}
                  onPress={this._toggleDelete}
                >
                  {close_icon(normalize(19, "width"), "white")}
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    ...styles.save_container,
                    ...{ backgroundColor: "#EB5757" }
                  }}
                  onPress={this._delete}
                >
                  {check_icon(normalize(19, "width"), "white")}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Animated.View
              style={{
                position: "absolute",
                width: normalize(331, "width"),
                borderRadius: normalize(10, "width"),
                backgroundColor: "white",
                paddingHorizontal: normalize(32, "width"),
                paddingVertical: normalize(32, "height"),
                opacity: this.opacity_value
              }}
            >
              <Animated.View
                style={{
                  transform: [{ translateY: this.translate_y_value }]
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
                      marginTop: normalize(32, "height")
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
                      marginTop: normalize(22, "height")
                    }}
                  >
                    <Text style={styles.reward_title_informer}>Value</Text>
                    <TextInput
                      style={styles.reward_input}
                      onChange={this.onChangeRewardValue}
                      value={this.state.reward_value}
                      keyboardType={"number-pad"}
                      maxLength={9}
                      placeholder={
                        this.props.edit_reward_data
                          ? `${this.props.edit_reward_data.value}`
                          : "Example: 99.999"
                      }
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: normalize(22, "height")
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
                      marginTop: normalize(40, "height")
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
                        {close_icon(normalize(19, "width"), "white")}
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.save_container}
                        onPress={this._save}
                      >
                        {check_icon(normalize(19, "width"), "white")}
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </Animated.View>
            </Animated.View>
          )}
        </View>

        {this.state.should_display_premium_ad ? (
          <PremiumAd
            dismissAction={this._toggleShouldDisplayPremiumAd}
            motivation_text="You've reached Free plan's limits"
            _goToLogin={this._goToLogin}
          />
        ) : null}
      </Modal>
    );
  }
}
