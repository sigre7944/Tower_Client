import React, { Component } from "react";

import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
  ScrollView
} from "react-native";

import PremiumAd from "../../../../../../shared/components/premium-ad/PremiumAd";

import { styles } from "./styles/styles";

import { Map, List, fromJS, OrderedMap } from "immutable";
const uuidv1 = require("uuid");

export default class TitleAndDescriptionHolder extends React.PureComponent {
  title_text_input_ref = React.createRef();
  description_text_input_ref = React.createRef();

  state = {
    should_display_premium_ad: false,
    is_title_input_focused: true
  };

  _setTaskTextInputRef = ref => {
    this.title_text_input_ref = ref;
  };

  _setDescriptionTextInputRef = ref => {
    this.description_text_input_ref = ref;
  };

  _toggleShouldDisplayPremiumAdTitle = () => {
    this.setState(prevState => ({
      should_display_premium_ad: !prevState.should_display_premium_ad,
      is_title_input_focused: true
    }));

    this.title_text_input_ref.focus();
    this.description_text_input_ref.blur();
  };

  _toggleShouldDisplayPremiumAdDescription = () => {
    this.setState(prevState => ({
      should_display_premium_ad: !prevState.should_display_premium_ad,
      is_title_input_focused: false
    }));

    this.title_text_input_ref.blur();
    this.description_text_input_ref.focus();
  };

  render() {
    return (
      <View>
        <TaskTitleElement
          title_value={this.props.addTaskTitle}
          description_value={this.props.addTaskDescription}
          _toggleShouldDisplayPremiumAdTitle={
            this._toggleShouldDisplayPremiumAdTitle
          }
          _setTaskTextInputRef={this._setTaskTextInputRef}
          {...this.props}
        />

        <TaskDescriptionElement
          title_value={this.props.addTaskTitle}
          description_value={this.props.addTaskDescription}
          _toggleShouldDisplayPremiumAdDescription={
            this._toggleShouldDisplayPremiumAdDescription
          }
          _setDescriptionTextInputRef={this._setDescriptionTextInputRef}
          {...this.props}
        />

        {this.state.should_display_premium_ad ? (
          <PremiumAd
            dismissAction={
              this.state.is_title_input_focused
                ? this._toggleShouldDisplayPremiumAdTitle
                : this._toggleShouldDisplayPremiumAdDescription
            }
            motivation_text=""
          />
        ) : null}
      </View>
    );
  }
}

class TaskTitleElement extends React.PureComponent {
  textInputRef = React.createRef();

  _onChange = e => {
    this.props.updateTitle(e.nativeEvent.text);
  };

  setTaskTextInputRef = ref => {
    this.props._setTaskTextInputRef(ref);
    this.textInputRef = ref;
  };

  _onLayout = () => {
    setTimeout(() => {
      this.textInputRef.focus();
    }, 50);
  };

  _onSubmitEditing = () => {
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

        this.props._closeAddTaskPanel();
      } else {
        this.props._toggleShouldDisplayPremiumAdTitle();
      }
    } else {
      this.props._closeAddTaskPanel();
    }
  };

  render() {
    return (
      <View
        style={{
          height: 52,
          marginHorizontal: 20,
          marginTop: 13
        }}
      >
        <Text style={styles.title_description_text}>Task Title</Text>
        <TextInput
          ref={this.setTaskTextInputRef}
          style={styles.title_description_text_input}
          placeholder="Add a task here"
          autoCorrect={false}
          value={this.props.title_value}
          onChange={this._onChange}
          onLayout={this._onLayout}
          returnKeyType="done"
          onSubmitEditing={this._onSubmitEditing}
        />
      </View>
    );
  }
}

class TaskDescriptionElement extends React.PureComponent {
  _onChange = e => {
    this.props.updateDescription(e.nativeEvent.text);
  };

  setDescriptionTextInputRef = ref => {
    this.props._setDescriptionTextInputRef(ref);
  };

  _onSubmitEditing = () => {
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

        this.props._closeAddTaskPanel();
      } else {
        this.props._toggleShouldDisplayPremiumAdDescription();
      }
    } else {
      this.props._closeAddTaskPanel();
    }
  };

  render() {
    return (
      <View
        style={{
          height: 52,
          marginHorizontal: 20,
          marginTop: 15
        }}
      >
        <Text style={styles.title_description_text}>Task Description</Text>
        <TextInput
          style={styles.title_description_text_input}
          placeholder="Add task description"
          autoCorrect={false}
          value={this.props.description_value}
          onChange={this._onChange}
          returnKeyType="done"
          onSubmitEditing={this._onSubmitEditing}
          ref={this.setDescriptionTextInputRef}
        />
      </View>
    );
  }
}
