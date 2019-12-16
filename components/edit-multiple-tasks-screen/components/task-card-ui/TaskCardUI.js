import React from "react";

import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles/styles";
import PremiumAd from "../../../shared/components/premium-ad/PremiumAd.Container";
import { normalize } from "../../../shared/helpers";
import { Map, List, fromJS } from "immutable";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default class TaskCardUI extends React.PureComponent {
  state = {
    is_task_card_able_to_edit: false,

    should_display_premium_ad: false
  };

  _checkComplete = () => {
    if (this.state.is_task_card_able_to_edit) {
      this.props._checkComplete();
    } else {
      this._toggleShouldDisplayPremiumAd();
    }
  };

  _toggleShouldDisplayPremiumAd = () => {
    this.setState(prevState => ({
      should_display_premium_ad: !prevState.should_display_premium_ad
    }));
  };

  _checkIfTaskIsAbleToEdit = () => {
    let task_plan = Map(this.props.task_data).get("plan"),
      account_plan = Map(this.props.generalSettings).getIn([
        "account",
        "package",
        "plan"
      ]),
      is_task_card_able_to_edit = false;

    if (task_plan === "free") {
      is_task_card_able_to_edit = false;
    } else {
      is_task_card_able_to_edit = account_plan === task_plan;
    }

    this.setState({
      is_task_card_able_to_edit
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
    this._checkIfTaskIsAbleToEdit();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      Map(this.props.generalSettings).getIn(["account", "package", "plan"]) ||
      Map(prevProps.generalSettings).getIn(["account", "package", "plan"])
    ) {
      this._checkIfTaskIsAbleToEdit();
    }
  }

  render() {
    let is_task_card_able_to_edit = this.state.is_task_card_able_to_edit,
      container_style = styles.task_card_container;

    if (!is_task_card_able_to_edit) {
      container_style = styles.unable_to_edit_task_card_container;
    }

    let title = this.props.update_obj.title;

    if (title.length > 24) {
      title = String(title).substring(0, 24) + "...";
    }

    return (
      <View style={container_style}>
        <View
          style={{
            flexDirection: "row",
            flex: 1
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <PriorityColorBar priority_color={this.props.task_priority_color} />

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: normalize(62, "height"),
                paddingHorizontal: normalize(15, "width")
              }}
              onPress={this._checkComplete}
            >
              <CheckBox checked_complete={this.props.checked_complete} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginLeft: normalize(15, "width"),
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Text style={styles.task_title}>{title}</Text>

            <Text style={styles.goal_tracking}>
              {this.props.update_obj.current_goal_value} /
              {this.props.update_obj.goal_value}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <CategoryColorCircle
            category_color={this.props.task_category_color}
          />
        </View>

        {this.state.should_display_premium_ad ? (
          <PremiumAd
            dismissAction={this._toggleShouldDisplayPremiumAd}
            motivation_text="The task was disabled due to Free plan."
            _goToLogin={this._goToLogin}
          />
        ) : null}
      </View>
    );
  }
}

class PriorityColorBar extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          width: normalize(9, "width"),
          backgroundColor: this.props.priority_color,
          borderRadius: normalize(30, "width"),
          height: normalize(62, "height"),
          marginLeft: 1
        }}
      ></View>
    );
  }
}

class CheckBox extends React.PureComponent {
  render() {
    let complete_box_container_style = styles.complete_box_container_unchosen;

    if (this.props.checked_complete) {
      complete_box_container_style = styles.complete_box_container_chosen;
    }

    return (
      <View style={complete_box_container_style}>
        {this.props.checked_complete ? (
          <FontAwesomeIcon icon={faCheck} color="white" />
        ) : null}

        <View></View>
      </View>
    );
  }
}

class CategoryColorCircle extends React.PureComponent {
  render() {
    return (
      <>
        {this.props.category_color === "white" ||
        this.props.category_color === "no color" ? (
          <View
            style={{
              width: normalize(12, "width"),
              height: normalize(12, "width"),
              borderRadius: normalize(12, "width"),
              borderWidth: 1,
              borderColor: "#2C2C2C",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: normalize(15, "width")
            }}
          >
            <View
              style={{
                flex: 1,
                width: 1,
                backgroundColor: "#2C2C2C",
                transform: [{ rotate: "45deg" }]
              }}
            ></View>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: this.props.category_color,
              marginHorizontal: normalize(15, "width"),
              width: normalize(12, "width"),
              height: normalize(12, "width"),
              borderRadius: normalize(12, "width")
            }}
          ></View>
        )}
      </>
    );
  }
}
