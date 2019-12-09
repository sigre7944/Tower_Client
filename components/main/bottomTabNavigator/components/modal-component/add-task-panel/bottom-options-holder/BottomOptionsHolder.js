import React, { Component } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
  ScrollView
} from "react-native";

import { primary_colors } from "../../../../../../shared/styles/style";

import {
  calendar_icon,
  repeat_icon,
  category_icon,
  priority_icon,
  check_icon
} from "../../../../../../shared/icons";

const icon_color = primary_colors.prim_1;
const icon_size = 21;

import { styles } from "./styles/styles";

import PremiumAd from "../../../../../../shared/components/premium-ad/PremiumAd";

import { Map, List, fromJS, OrderedMap } from "immutable";

const uuidv1 = require("uuid");

export default class BottomOptionsHolder extends React.PureComponent {
  state = {
    should_display_premium_ad: false
  };

  _toggleShouldDisplayPremiumAd = () => {
    this.setState(prevState => ({
      should_display_premium_ad: !prevState.should_display_premium_ad
    }));
  };

  render() {
    return (
      <View
        style={{
          height: 57,
          width: Dimensions.get("window").width,
          backgroundColor: "white",
          flexDirection: "row",
          shadowOffset: {
            width: 0,
            height: -4
          },
          shadowRadius: 7,
          shadowColor: "black",
          shadowOpacity: 0.03
        }}
      >
        <BottomOptionElement
          chooseOption={this.props.chooseCalenderOption}
          icon={calendar_icon(icon_size, icon_color)}
        />

        <BottomOptionElement
          chooseOption={this.props.chooseRepeatOption}
          icon={repeat_icon(icon_size, icon_color)}
        />

        <BottomOptionElement
          chooseOption={this.props.chosenCategoryOption}
          icon={category_icon(icon_size, icon_color)}
        />

        <BottomOptionElement
          chooseOption={this.props.choosePriorityOption}
          icon={priority_icon(icon_size, icon_color)}
        />

        <BottomConfirmElement
          chooseOption={this.props._closeAddTaskPanel}
          {...this.props}
          title_value={this.props.addTaskTitle}
          description_value={this.props.addTaskDescription}
          icon={check_icon(28, "white")}
          _toggleShouldDisplayPremiumAd={this._toggleShouldDisplayPremiumAd}
        />

        {this.state.should_display_premium_ad ? (
          <PremiumAd
            dismissAction={this._toggleShouldDisplayPremiumAd}
            motivation_text=""
          />
        ) : null}
      </View>
    );
  }
}

class BottomOptionElement extends React.PureComponent {
  _onPress = () => {
    this.props.chooseOption();
  };

  render() {
    return (
      <TouchableOpacity style={styles.option_container} onPress={this._onPress}>
        {this.props.icon}
      </TouchableOpacity>
    );
  }
}

class BottomConfirmElement extends React.PureComponent {
  _createTask = () => {
    if (this.props.title_value.length > 0) {
      let task_id = `day-task-${uuidv1()}`,
        reset_new_task_type = "RESET_NEW_DAY_TASK",
        add_task_type = "UPDATE_DAY_TASK";

      if (this.props.currentAnnotation === "week") {
        task_id = `week-task-${uuidv1()}`;
        reset_new_task_type = "RESET_NEW_WEEK_TASK";
        add_task_type = "UPDATE_WEEK_TASK";
      } else if (this.props.currentAnnotation === "month") {
        task_id = `month-task-${uuidv1()}`;
        reset_new_task_type = "RESET_NEW_MONTH_TASK";
        add_task_type = "UPDATE_MONTH_TASK";
      }

      let new_task = Map(this.props.task_data);
      let category_id = new_task.get("category");

      // Check if plan is free or premium
      let plan = Map(this.props.generalSettings).getIn([
          "account",
          "package",
          "plan"
        ]),
        number_of_tasks_per_category = Map(this.props.generalSettings).getIn([
          "package_limitations",
          plan,
          "number_of_tasks_per_category"
        ]);

      let category_quantity = OrderedMap(this.props.categories).getIn([
        category_id,
        "quantity"
      ]);

      if (category_quantity < number_of_tasks_per_category) {
        let new_task_with_id = Map(this.props.task_data).asMutable();
        new_task_with_id.update("id", value => task_id);
        new_task_with_id.update("title", value =>
          this.props.title_value.trim()
        );
        new_task_with_id.update("description", value =>
          this.props.description_value.trim()
        );
        new_task_with_id.update("type", value => this.props.currentAnnotation);

        new_task_with_id.update("created_at", value => Date.now());

        new_task_with_id.update("plan", value => plan);

        let priority_value = Map(this.props.task_data).getIn([
            "priority",
            "value"
          ]),
          priority_data = fromJS({
            id: task_id,
            category: category_id
          });

        let sending_obj = {
          add_task_data: {
            type: add_task_type,
            keyPath: [task_id],
            notSetValue: {},
            updater: value => new_task_with_id.toMap()
          },

          category_data: {
            keyPath: [category_id, "quantity"],
            notSetValue: {},
            updater: value => value + 1
          },

          reset_new_task_type,

          priority_data: {
            keyPath: [priority_value, "tasks"],
            notSetValue: [],
            updater: tasks => List(tasks).push(priority_data)
          }
        };

        this.props.addTaskThunk(sending_obj);
        Keyboard.dismiss();
        this.props._closeAddTaskPanel();
      } else {
        this.props._toggleShouldDisplayPremiumAd();
      }
    } else {
      Keyboard.dismiss();
      this.props._closeAddTaskPanel();
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.confirm_container}
        onPress={this._createTask}
      >
        {this.props.icon}
      </TouchableOpacity>
    );
  }
}
