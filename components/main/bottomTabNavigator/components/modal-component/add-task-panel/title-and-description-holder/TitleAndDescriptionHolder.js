import React from "react";

import { View, Text, TextInput, Keyboard } from "react-native";

import PremiumAd from "../../../../../../shared/components/premium-ad/PremiumAd.Container";

import { styles } from "./styles/styles";

import { Map, List, fromJS, OrderedMap } from "immutable";
import { normalize } from "../../../../../../shared/helpers";
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

  _goToLogin = () => {
    this.setState(
      {
        should_display_premium_ad: false
      },
      () => {
        Keyboard.dismiss();
        this.props._closeAddTaskPanel();
        this.props.navigation.navigate("SignInScreen");
      }
    );
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
            motivation_text="You've reached Free plan's limits"
            _goToLogin={this._goToLogin}
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
      if (this.textInputRef) this.textInputRef.focus();
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

      let category_quantity = OrderedMap(this.props.categories).getIn([
        category_id,
        "quantity"
      ]);

      // Check if the category belongs to default ones (based on the free plan's limitations).
      // For example, Free plan allows 5 categories to be used, then the first 4 created categories
      // will be the default ones (including Inbox). Thus, the default tasks, which will be valid when they are
      // created in side those categories.

      // default number of free categories.
      let free_number_of_categories = Map(this.props.generalSettings).getIn([
        "package_limitations",
        "free",
        "number_of_categories"
      ]);

      let category_index = 0;

      OrderedMap(this.props.categories)
        .keySeq()
        .every((key, index) => {
          if (key === category_id) {
            category_index = index;
            return false;
          }
          return true;
        });

      let assigned_plan = "free";

      // If the category belongs to one of the defaults
      if (category_index + 1 <= free_number_of_categories) {
        // Check if the current number of tasks in the category exceeds the limit.
        let free_number_of_tasks_per_category = Map(
          this.props.generalSettings
        ).getIn([
          "package_limitations",
          "free",
          "number_of_tasks_per_category"
        ]);

        // If the current number of tasks in the category doesnt exceed
        if (category_quantity < free_number_of_tasks_per_category) {
          assigned_plan = "free";
        } else {
          assigned_plan = Map(this.props.generalSettings).getIn([
            "account",
            "package",
            "plan"
          ]);
        }
      } else {
        assigned_plan = Map(this.props.generalSettings).getIn([
          "account",
          "package",
          "plan"
        ]);
      }

      // Check if plan is free or premium
      let number_of_tasks_per_category = Map(this.props.generalSettings).getIn([
        "package_limitations",
        assigned_plan,
        "number_of_tasks_per_category"
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
        new_task_with_id.update("plan", value => assigned_plan);

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
          marginHorizontal: normalize(20, "width"),
          marginTop: normalize(13, "height")
        }}
      >
        <Text style={styles.title_description_text}>Task Title</Text>
        <TextInput
          ref={this.setTaskTextInputRef}
          style={styles.title_description_text_input}
          // multiline={true}
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

      let category_quantity = OrderedMap(this.props.categories).getIn([
        category_id,
        "quantity"
      ]);

      // Check if the category belongs to default ones (based on the free plan's limitations).
      // For example, Free plan allows 5 categories to be used, then the first 4 created categories
      // will be the default ones (including Inbox). Thus, the default tasks, which will be valid when they are
      // created in side those categories.

      // default number of free categories.
      let free_number_of_categories = Map(this.props.generalSettings).getIn([
        "package_limitations",
        "free",
        "number_of_categories"
      ]);

      let category_index = 0;

      OrderedMap(this.props.categories)
        .keySeq()
        .every((key, index) => {
          if (key === category_id) {
            category_index = index;
            return false;
          }
          return true;
        });

      let assigned_plan = "free";

      // If the category belongs to one of the defaults
      if (category_index + 1 <= free_number_of_categories) {
        // Check if the current number of tasks in the category exceeds the limit.
        let free_number_of_tasks_per_category = Map(
          this.props.generalSettings
        ).getIn([
          "package_limitations",
          "free",
          "number_of_tasks_per_category"
        ]);

        // If the current number of tasks in the category doesnt exceed
        if (category_quantity < free_number_of_tasks_per_category) {
          assigned_plan = "free";
        } else {
          assigned_plan = Map(this.props.generalSettings).getIn([
            "account",
            "package",
            "plan"
          ]);
        }
      } else {
        assigned_plan = Map(this.props.generalSettings).getIn([
          "account",
          "package",
          "plan"
        ]);
      }

      // Check if plan is free or premium
      let number_of_tasks_per_category = Map(this.props.generalSettings).getIn([
        "package_limitations",
        assigned_plan,
        "number_of_tasks_per_category"
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
        new_task_with_id.update("plan", value => assigned_plan);

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
          marginHorizontal: normalize(20, "width"),
          marginTop: normalize(15, "height")
        }}
      >
        <Text style={styles.title_description_text}>Task Description</Text>
        <TextInput
          style={styles.title_description_text_input}
          placeholder="Add task description"
          multiline={true}
          autoCorrect={false}
          value={this.props.description_value}
          onChange={this._onChange}
          returnKeyType="default"
          // onSubmitEditing={this._onSubmitEditing}
          ref={this.setDescriptionTextInputRef}
        />
      </View>
    );
  }
}
