import React from "react";
import {
  View,
  Dimensions,
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput
} from "react-native";

import { styles } from "./styles/styles";
import FeatherIcon from "react-native-vector-icons/Feather";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { normalize } from "../shared/helpers";

import { Map, OrderedMap, List, getIn, hasIn, fromJS } from "immutable";

import TagDataHolder from "./components/tag-data-holder/TagDataHolder";

import Calendar from "../main/screens/Journal/components/share/calendar/Calendar";
import Category from "../main/screens/Journal/components/share/category/Category.Container";
import Priority from "../main/screens/Journal/components/share/priority/Priority.Container";
import Repeat from "../main/screens/Journal/components/share/repeat/Repeat";

const window_width = Dimensions.get("window").width;

export default class EditTaskScreen extends React.PureComponent {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: null
    };
  };

  month_names = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  short_month_names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  state = {
    edit_task: Map(),
    edit_task_type: "day",

    edit_title: "",
    edit_description: "",

    should_display_calendar: false,
    should_display_category: false,
    should_display_repeat: false,
    should_display_priority: false,
    should_call_end_animation_from_parent: false
  };

  _onEditTitleChange = e => {
    this.setState({
      edit_title: e.nativeEvent.text
    });
  };

  _onEditDescriptionChange = e => {
    this.setState({
      edit_description: e.nativeEvent.text
    });
  };

  _chooseCalendarOption = () => {
    this.setState({
      should_display_calendar: true,
      should_display_category: false,
      should_display_repeat: false,
      should_display_priority: false
    });
  };

  _chosenCategoryOption = () => {
    this.setState({
      should_display_calendar: false,
      should_display_category: true,
      should_display_repeat: false,
      should_display_priority: false
    });
  };

  _choosePriorityOption = () => {
    this.setState({
      should_display_calendar: false,
      should_display_category: false,
      should_display_repeat: false,
      should_display_priority: true
    });
  };

  _chooseRepeatOption = () => {
    this.setState({
      should_display_calendar: false,
      should_display_category: false,
      should_display_repeat: true,
      should_display_priority: false
    });
  };

  _hideAction = () => {
    this.setState({
      should_display_calendar: false,
      should_display_category: false,
      should_display_repeat: false,
      should_display_priority: false
    });
  };

  _toggleShouldCallEndAnimationFromParent = () => {
    this.setState(prevState => ({
      should_call_end_animation_from_parent: !prevState.should_call_end_animation_from_parent
    }));
  };

  _editScheduleFieldData = (keyPath, notSetValue, updater) => {
    let { edit_task_type } = this.state;

    if (edit_task_type === "day") {
      this.props.updateTask("UPDATE_DAY_TASK", keyPath, notSetValue, updater);
    } else if (edit_task_type === "week") {
      this.props.updateTask("UPDATE_WEEK_TASK", keyPath, notSetValue, updater);
    } else {
      this.props.updateTask("UPDATE_MONTH_TASK", keyPath, notSetValue, updater);
    }
  };

  _editCategoryFieldData = new_category_id => {
    let old_category_id = Map(this.state.edit_task).get("category");

    // Decrease old category
    this.props.updateCategory([old_category_id, "quantity"], 0, v =>
      v - 1 < 0 ? 0 : v - 1
    );

    // Increase new category
    this.props.updateCategory([new_category_id, "quantity"], 0, v => v + 1);

    let update_completed_tasks_action_type = "";
    let update_tasks_action_type = "";
    let { edit_task_type } = this.state;

    if (edit_task_type === "day") {
      update_completed_tasks_action_type = "UPDATE_COMPLETED_DAY_TASK";
      update_tasks_action_type = "UPDATE_DAY_TASK";
    } else if (edit_task_type === "week") {
      update_completed_tasks_action_type = "UPDATE_COMPLETED_WEEK_TASK";
      update_tasks_action_type = "UPDATE_WEEK_TASK";
    } else {
      update_completed_tasks_action_type = "UPDATE_COMPLETED_MONTH_TASK";
      update_tasks_action_type = "UPDATE_MONTH_TASK";
    }

    // Update task
    this.props.updateTask(
      update_tasks_action_type,
      [Map(this.state.edit_task).get("id"), "category"],
      new_category_id,
      v => new_category_id
    );

    // Update completed task for deleting category
    this.props.updateTask(
      update_completed_tasks_action_type,
      [Map(this.state.edit_task).get("id"), "category"],
      new_category_id,
      v => new_category_id
    );
  };

  _editPriorityFieldData = new_priority_id => {
    let old_priority_id = Map(this.state.edit_task).getIn([
      "priority",
      "value"
    ]);

    let category_id = Map(this.state.edit_task).get("category");

    // Pop out from old array
    this.props.updatePriority([old_priority_id, "tasks"], [], tasks => {
      return List(tasks).delete(
        List(tasks).findIndex(
          (task_data, index, list) =>
            Map(this.state.edit_task).get("id") === Map(task_data).get("id")
        )
      );
    });

    // Push into new array
    this.props.updatePriority([new_priority_id, "tasks"], [], tasks => {
      return List(tasks).push(
        fromJS({
          id: Map(this.state.edit_task).get("id"),
          category: category_id
        })
      );
    });

    let update_tasks_action_type = "";
    let { edit_task_type } = this.state;

    if (edit_task_type === "day") {
      update_tasks_action_type = "UPDATE_DAY_TASK";
    } else if (edit_task_type === "week") {
      update_tasks_action_type = "UPDATE_WEEK_TASK";
    } else {
      update_tasks_action_type = "UPDATE_MONTH_TASK";
    }

    // Update priority
    this.props.updateTask(
      update_tasks_action_type,
      [Map(this.state.edit_task).get("id"), "priority", "value"],
      new_priority_id,
      v => new_priority_id
    );
  };

  _editRewardFieldData = reward_value => {
    let update_tasks_action_type = "";
    let { edit_task_type } = this.state;

    if (edit_task_type === "day") {
      update_tasks_action_type = "UPDATE_DAY_TASK";
    } else if (edit_task_type === "week") {
      update_tasks_action_type = "UPDATE_WEEK_TASK";
    } else {
      update_tasks_action_type = "UPDATE_MONTH_TASK";
    }

    // Update reward
    this.props.updateTask(
      update_tasks_action_type,
      [Map(this.state.edit_task).get("id"), "reward", "value"],
      reward_value,
      v => reward_value
    );
  };

  _editRepeatFieldData = (keyPath, notSetValue, updater) => {
    let { edit_task_type } = this.state;

    if (edit_task_type === "day") {
      this.props.updateTask("UPDATE_DAY_TASK", keyPath, notSetValue, updater);
    } else if (edit_task_type === "week") {
      this.props.updateTask("UPDATE_WEEK_TASK", keyPath, notSetValue, updater);
    } else {
      this.props.updateTask("UPDATE_MONTH_TASK", keyPath, notSetValue, updater);
    }
  };

  _updateEdittingTask = () => {
    let edit_task_type = Map(this.props.editTaskId).get("type"),
      edit_task_id = Map(this.props.editTaskId).get("id"),
      edit_task,
      edit_title = "",
      edit_description = "";

    if (edit_task_type === "day") {
      edit_task = Map(this.props.day_tasks).get(edit_task_id);
      edit_title = Map(this.props.day_tasks).getIn([edit_task_id, "title"]);
      edit_description = Map(this.props.day_tasks).getIn([
        edit_task_id,
        "description"
      ]);
    } else if (edit_task_type === "week") {
      edit_task = Map(this.props.week_tasks).get(edit_task_id);
      edit_title = Map(this.props.week_tasks).getIn([edit_task_id, "title"]);
      edit_description = Map(this.props.week_tasks).getIn([
        edit_task_id,
        "description"
      ]);
    } else {
      edit_task = Map(this.props.month_tasks).get(edit_task_id);
      edit_title = Map(this.props.month_tasks).getIn([edit_task_id, "title"]);
      edit_description = Map(this.props.month_tasks).getIn([
        edit_task_id,
        "description"
      ]);
    }

    this.setState({
      edit_task,
      edit_task_type,
      edit_title,
      edit_description
    });
  };

  componentDidMount() {
    this._updateEdittingTask();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.day_tasks !== prevProps.day_tasks ||
      this.props.week_tasks !== prevProps.week_tasks ||
      this.props.month_tasks !== prevProps.month_tasks
    ) {
      console.log(true);
      this._updateEdittingTask();
    }
  }

  _goBack = () => {
    this.props.navigation.navigate("Journal");
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        {/* Header */}
        <View style={styles.header_container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              style={styles.end_icon_container}
              onPress={this._goBack}
            >
              <IoniconsIcon
                name="ios-arrow-back"
                size={normalize(30, "width")}
                color={"#BDBDBD"}
              />
            </TouchableOpacity>

            <View>
              <Text style={styles.middle_text_style}>Edit task</Text>
            </View>

            <TouchableOpacity
              style={styles.end_icon_container}
              onPress={this._save}
            >
              <FeatherIcon
                name="check"
                size={normalize(30, "width")}
                color="#05838B"
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={{
            // paddingHorizontal: normalize(22, "width")
            flex: 1,
            overflow: "scroll"
          }}
        >
          <View
            style={{
              marginTop: normalize(10, "height")
            }}
          >
            <TagDataHolder
              edit_task={this.state.edit_task}
              edit_task_type={this.state.edit_task_type}
              categories={this.props.categories}
              priorities={this.props.priorities}
              _chooseCalendarOption={this._chooseCalendarOption}
              _chosenCategoryOption={this._chosenCategoryOption}
              _chooseRepeatOption={this._chooseRepeatOption}
              _choosePriorityOption={this._choosePriorityOption}
            />
          </View>

          {/* Title */}
          <View
            style={{
              paddingHorizontal: normalize(22, "width"),
              marginTop: normalize(24, "height")
            }}
          >
            <Text style={styles.title_text}>Title</Text>

            <TextInput
              style={styles.input}
              value={this.state.edit_title}
              onChange={this._onEditTitleChange}
              placeholder={Map(this.state.edit_task).get("title")}
            />
          </View>

          {/* <View style={styles.separating_line} /> */}

          {/* Description */}
          <View
            style={{
              paddingHorizontal: normalize(22, "width"),
              marginTop: normalize(24, "height"),
              marginBottom: normalize(400, "height")
            }}
          >
            <Text style={styles.title_text}>Description</Text>

            <TextInput
              style={styles.input}
              multiline={true}
              scrollEnabled={false}
              onChange={this._onEditDescriptionChange}
              value={this.state.edit_description}
              placeholder={Map(this.state.edit_task).get("description")}
            />
          </View>
        </ScrollView>

        {this.state.should_display_calendar ? (
          <Modal transparent={true}>
            <View
              style={{
                flex: 1,
                position: "relative",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableWithoutFeedback
                onPress={this._toggleShouldCallEndAnimationFromParent}
              >
                <View
                  style={{
                    flex: 1,
                    width: window_width,
                    backgroundColor: "black",
                    opacity: 0.2
                  }}
                />
              </TouchableWithoutFeedback>
              <Calendar
                edit={true}
                edit_task_data={this.state.edit_task}
                _editFieldData={this._editScheduleFieldData}
                hideAction={this._hideAction}
                currentAnnotation={this.state.edit_task_type}
                should_call_end_animation_from_parent={
                  this.state.should_call_end_animation_from_parent
                }
              />
            </View>
          </Modal>
        ) : null}
        {this.state.should_display_category ? (
          <Modal transparent={true}>
            <View
              style={{
                flex: 1,
                position: "relative",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableWithoutFeedback
                onPress={this._toggleShouldCallEndAnimationFromParent}
              >
                <View
                  style={{
                    flex: 1,
                    width: window_width,
                    backgroundColor: "black",
                    opacity: 0.2
                  }}
                />
              </TouchableWithoutFeedback>
              <Category
                edit={true}
                edit_task_data={this.state.edit_task}
                _editCategoryFieldData={this._editCategoryFieldData}
                hideAction={this._hideAction}
                currentAnnotation={this.state.edit_task_type}
                should_call_end_animation_from_parent={
                  this.state.should_call_end_animation_from_parent
                }
              />
            </View>
          </Modal>
        ) : null}
        {this.state.should_display_priority ? (
          <Modal transparent={true}>
            <View
              style={{
                flex: 1,
                position: "relative",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableWithoutFeedback
                onPress={this._toggleShouldCallEndAnimationFromParent}
              >
                <View
                  style={{
                    flex: 1,
                    width: window_width,
                    backgroundColor: "black",
                    opacity: 0.2
                  }}
                />
              </TouchableWithoutFeedback>
              <Priority
                edit={true}
                edit_task_data={this.state.edit_task}
                _editPriorityFieldData={this._editPriorityFieldData}
                _editRewardFieldData={this._editRewardFieldData}
                hideAction={this._hideAction}
                currentAnnotation={this.state.edit_task_type}
                should_call_end_animation_from_parent={
                  this.state.should_call_end_animation_from_parent
                }
              />
            </View>
          </Modal>
        ) : null}
        {this.state.should_display_repeat ? (
          <Modal transparent={true}>
            <View
              style={{
                flex: 1,
                position: "relative",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableWithoutFeedback
                onPress={this._toggleShouldCallEndAnimationFromParent}
              >
                <View
                  style={{
                    flex: 1,
                    width: window_width,
                    backgroundColor: "black",
                    opacity: 0.2
                  }}
                />
              </TouchableWithoutFeedback>
              <Repeat
                edit={true}
                edit_task_data={this.state.edit_task}
                _editFieldData={this._editRepeatFieldData}
                hideAction={this._hideAction}
                currentAnnotation={this.state.edit_task_type}
                should_call_end_animation_from_parent={
                  this.state.should_call_end_animation_from_parent
                }
              />
            </View>
          </Modal>
        ) : null}
      </View>
    );
  }
}
