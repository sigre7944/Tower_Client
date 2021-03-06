import React from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  View,
  Dimensions,
  TextInput,
  Modal,
  ScrollView
} from "react-native";

import {
  calendar_icon,
  priority_icon,
  repeat_icon,
  goal_icon,
  end_icon,
  reward_icon,
  close_icon
} from "../../../../../../../../shared/icons";
import { normalize } from "../../../../../../../../shared/helpers";
const icon_size = normalize(14, "width");
const icon_color = "#2C2C2C";

import { Map, List } from "immutable";
import { styles } from "./styles/styles";

import SaveButton from "./save-button/SaveButton.Container";

import Calendar from "../../../calendar/Calendar";
import Category from "../../../category/Category.Container";
import Repeat from "../../../repeat/Repeat";
import Priority from "../../../priority/Priority.Container";

const window_width = Dimensions.get("window").width;

export default class TaskDetailEditModal extends React.PureComponent {
  daysInWeekText = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  monthNames = [
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

  month_names_in_short = [
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

  short_daysInWeekText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  state = {
    task_data_map: Map(this.props.task_data).toMap(),
    old_task_data_map: Map(this.props.task_data).toMap(),
    task_title: "",
    task_description: "",
    should_display_editting_panel: false,
    editting_field: "none",

    should_animate_end_animation: true,
    should_call_end_animation_from_parent: true
  };

  _toggleShouldCallEndAnimationFromParent = () => {
    this.setState(prevState => ({
      should_call_end_animation_from_parent: !prevState.should_call_end_animation_from_parent
    }));
  };

  _toggleShouldAnimateEndAnimation = () => {
    this.setState(prevState => ({
      should_animate_end_animation: !prevState.should_animate_end_animation
    }));
  };

  _chooseEdittingField = field => {
    this.setState({
      should_display_editting_panel: true,
      editting_field: field
    });
  };

  _closeEdittingField = () => {
    this.setState({
      should_display_editting_panel: false,
      editting_field: "none"
    });
  };

  _editFieldData = (keyPath, notSetValue, updater) => {
    this.setState(prevState => ({
      task_data_map: Map(prevState.task_data_map).updateIn(
        keyPath,
        notSetValue,
        updater
      )
    }));
  };

  _onEditTitleChange = e => {
    this.setState({
      task_title: e.nativeEvent.text
    });
  };

  _onEditDescriptionChange = e => {
    this.setState({
      task_description: e.nativeEvent.text
    });
  };

  componentDidMount() {
    let task_title = Map(this.props.task_data).get("title"),
      task_description = Map(this.props.task_data).get("description");

    this.setState({
      task_title,
      task_description
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.should_animate_end_animation !==
      prevState.should_animate_end_animation
    ) {
      this._closeEdittingField();
    }
  }

  render() {
    let { task_data_map, task_title, task_description } = this.state,
      type = this.props.type,
      task_schedule = task_data_map.get("schedule"),
      task_schedule_text = "",
      categories_map = Map(this.props.categories),
      task_category = task_data_map.get("category"),
      task_category_name = categories_map.getIn([task_category, "name"]),
      task_category_color = categories_map.getIn([task_category, "color"]),
      priorities_map = Map(this.props.priorities),
      task_priority_value = task_data_map.getIn(["priority", "value"]),
      task_priority_color = priorities_map.getIn([
        task_priority_value,
        "color"
      ]),
      task_priority_name = priorities_map.getIn([task_priority_value, "name"]),
      task_repeat = task_data_map.get("repeat"),
      task_repeat_type = task_data_map.getIn(["repeat", "type"]),
      task_repeat_value = task_data_map.getIn(["repeat", "interval", "value"]),
      task_repeat_text = "",
      task_end = task_data_map.get("end"),
      task_end_type = task_data_map.getIn(["end", "type"]),
      task_end_text = "",
      task_reward_text = Map(task_data_map).getIn(["reward", "value"]),
      task_goal_text = `${Map(task_data_map).getIn([
        "goal",
        "max"
      ])} times per ${type}`;

    if (type === "day") {
      let day = parseInt(Map(task_schedule).get("day")),
        month = parseInt(Map(task_schedule).get("month")),
        year = parseInt(Map(task_schedule).get("year")),
        date = new Date(year, month, day);

      task_schedule_text = `${
        this.daysInWeekText[date.getDay()]
      } ${date.getDate()} ${this.monthNames[date.getMonth()]} ${year}`;

      if (task_repeat_type === "weekly") {
        let days_in_week = List(
            Map(task_repeat).getIn(["interval", "daysInWeek"])
          ).toArray(),
          string = "";

        days_in_week.forEach((value, index) => {
          if (value) {
            let day_index = index + 1 === 7 ? 0 : index + 1;

            string += this.short_daysInWeekText[day_index] + ", ";
          }
        });

        if (string !== "" || string.length > 0) {
          string = "(" + string.substring(0, string.length - 2) + ")";
        }

        task_repeat_text = `every ${task_repeat_value} week ${string}`;
      } else {
        task_repeat_text =
          task_repeat_type === "daily"
            ? `every ${task_repeat_value} day`
            : `every ${task_repeat_value} month`;
      }
    } else if (type === "week") {
      let week = Map(task_schedule).get("week"),
        monday = Map(task_schedule).get("monday"),
        start_month = parseInt(Map(task_schedule).get("start_month")),
        sunday = Map(task_schedule).get("sunday"),
        end_month = parseInt(Map(task_schedule).get("end_month")),
        start_year = Map(task_schedule).get("start_year"),
        end_year = Map(task_schedule).get("end_year");

      task_schedule_text = `Week ${week} (${monday} ${this.month_names_in_short[start_month]} ${start_year} - ${sunday} ${this.month_names_in_short[end_month]} ${end_year})`;

      if (task_repeat_type === "weekly-m") {
        let no_week_in_month = parseInt(
            Map(task_repeat).getIn(["interval", "noWeekInMonth"])
          ),
          nth_week_array = ["1st", "2nd", "3rd", "4th"];

        if (no_week_in_month > 4) {
          no_week_in_month = 4;
        }

        task_repeat_text = `${
          nth_week_array[no_week_in_month - 1]
        } week every ${task_repeat_value} month`;
      } else {
        task_repeat_text = `every ${task_repeat_value} week`;
      }
    } else {
      let month = Map(task_schedule).get("month"),
        year = Map(task_schedule).get("year");

      task_schedule_text = `${this.monthNames[month]} ${year}`;

      task_repeat_text = `every ${task_repeat_value} month`;
    }

    if (task_end_type === "never") {
      task_end_text = "Never";
    } else if (task_end_type === "on") {
      let end_date = new Date(parseInt(Map(task_end).get("endAt")));

      task_end_text = `on ${
        this.daysInWeekText[end_date.getDay()]
      } ${end_date.getDate()} ${
        this.monthNames[end_date.getMonth()]
      } ${end_date.getFullYear()}`;
    } else {
      let occurrences = Map(task_end).get("occurrence");

      task_end_text = `after ${occurrences} occurrences`;
    }

    return (
      <>
        {/* minus sign - close modal */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 5
          }}
          onPress={this.props._dismissModal}
        >
          <View style={styles.minus}></View>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TitleField
            task_title={task_title}
            _onEditTitleChange={this._onEditTitleChange}
            old_task_data_map={this.state.old_task_data_map}
            _editFieldData={this._editFieldData}
          />

          <DescriptionField
            task_description={task_description}
            _onEditDescriptionChange={this._onEditDescriptionChange}
            old_task_data_map={this.state.old_task_data_map}
            _editFieldData={this._editFieldData}
          />

          <ScheduleRow
            task_schedule_text={task_schedule_text}
            _chooseEdittingField={this._chooseEdittingField}
            old_task_data_map={this.state.old_task_data_map}
            _editFieldData={this._editFieldData}
          />

          <CategoryRow
            task_category_color={task_category_color}
            task_category_name={task_category_name}
            _chooseEdittingField={this._chooseEdittingField}
            old_task_data_map={this.state.old_task_data_map}
            _editFieldData={this._editFieldData}
          />

          <PriorityRow
            task_priority_name={task_priority_name}
            task_priority_color={task_priority_color}
            _chooseEdittingField={this._chooseEdittingField}
            old_task_data_map={this.state.old_task_data_map}
            _editFieldData={this._editFieldData}
          />

          <RewardRow
            task_reward_text={task_reward_text}
            _chooseEdittingField={this._chooseEdittingField}
            old_task_data_map={this.state.old_task_data_map}
            _editFieldData={this._editFieldData}
          />

          <RepeatRow
            task_repeat_text={task_repeat_text}
            _chooseEdittingField={this._chooseEdittingField}
            old_task_data_map={this.state.old_task_data_map}
            _editFieldData={this._editFieldData}
          />

          <EndRow
            task_end_text={task_end_text}
            _chooseEdittingField={this._chooseEdittingField}
            old_task_data_map={this.state.old_task_data_map}
            _editFieldData={this._editFieldData}
          />

          <GoalRow
            task_goal_text={task_goal_text}
            _chooseEdittingField={this._chooseEdittingField}
            old_task_data_map={this.state.old_task_data_map}
            _editFieldData={this._editFieldData}
          />

          <SaveButton
            old_task_data_map={this.state.old_task_data_map}
            task_data_map={this.state.task_data_map}
            _closeEdit={this.props._closeEdit}
            type={this.props.type}
            task_title={this.state.task_title}
            task_description={this.state.task_description}
          />

          <CancelButton _closeEdit={this.props._closeEdit} />
        </ScrollView>

        <EdittingModal
          should_display_editting_panel={
            this.state.should_display_editting_panel
          }
          _closeEdittingField={this._closeEdittingField}
          _toggleShouldCallEndAnimationFromParent={
            this._toggleShouldCallEndAnimationFromParent
          }
          _toggleShouldAnimateEndAnimation={
            this._toggleShouldAnimateEndAnimation
          }
          should_call_end_animation_from_parent={
            this.state.should_call_end_animation_from_parent
          }
          editting_field={this.state.editting_field}
          task_data_map={this.state.task_data_map}
          type={this.props.type}
          _editFieldData={this._editFieldData}
        />
      </>
    );
  }
}

class EdittingModal extends React.PureComponent {
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.should_display_editting_panel}
      >
        <View
          style={{
            flex: 1,
            position: "relative",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableWithoutFeedback
            onPress={this.props._toggleShouldCallEndAnimationFromParent}
          >
            <View
              style={{
                flex: 1,
                width: window_width,
                backgroundColor: "black",
                opacity: 0.2
              }}
            ></View>
          </TouchableWithoutFeedback>

          {this.props.editting_field === "schedule" ? (
            <Calendar
              hideAction={this.props._toggleShouldAnimateEndAnimation}
              should_call_end_animation_from_parent={
                this.props.should_call_end_animation_from_parent
              }
              currentAnnotation={this.props.type}
              edit={true}
              edit_task_data={this.props.task_data_map}
              _editFieldData={this.props._editFieldData}
            />
          ) : (
            <>
              {this.props.editting_field === "category" ? (
                <Category
                  // hideAction={this.props._closeEdittingField}
                  hideAction={this.props._toggleShouldAnimateEndAnimation}
                  should_call_end_animation_from_parent={
                    this.props.should_call_end_animation_from_parent
                  }
                  currentAnnotation={this.props.type}
                  edit={true}
                  edit_task_data={this.props.task_data_map}
                  _editFieldData={this.props._editFieldData}
                />
              ) : (
                <>
                  {this.props.editting_field === "repeat" ||
                  this.props.editting_field === "end" ||
                  this.props.editting_field === "goal" ? (
                    <Repeat
                      // hideAction={this.props._closeEdittingField}
                      hideAction={this.props._toggleShouldAnimateEndAnimation}
                      should_call_end_animation_from_parent={
                        this.props.should_call_end_animation_from_parent
                      }
                      currentAnnotation={this.props.type}
                      edit={true}
                      edit_task_data={this.props.task_data_map}
                      _editFieldData={this.props._editFieldData}
                    />
                  ) : (
                    <>
                      {this.props.editting_field === "priority" ||
                      this.props.editting_field === "reward" ? (
                        <Priority
                          // hideAction={this.props._closeEdittingField}
                          hideAction={
                            this.props._toggleShouldAnimateEndAnimation
                          }
                          should_call_end_animation_from_parent={
                            this.props.should_call_end_animation_from_parent
                          }
                          currentAnnotation={this.props.type}
                          edit={true}
                          edit_task_data={this.props.task_data_map}
                          _editFieldData={this.props._editFieldData}
                        />
                      ) : null}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </View>
      </Modal>
    );
  }
}

class TitleField extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          marginTop: normalize(40, "height"),
          marginHorizontal: normalize(30, "width")
        }}
      >
        <Text style={styles.title_small_text}>Task Title</Text>

        <TextInput
          style={styles.text_input}
          // multiline={true}
          placeholder={Map(this.props.old_task_data_map).get("title")}
          value={this.props.task_title}
          onChange={this.props._onEditTitleChange}
        />
      </View>
    );
  }
}

class DescriptionField extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          marginTop: normalize(25, "height"),
          marginHorizontal: normalize(30, "width")
        }}
      >
        <Text style={styles.title_small_text}>Task Description</Text>

        <TextInput
          style={styles.text_input}
          multiline={true}
          placeholder={Map(this.props.old_task_data_map).get("description")}
          value={this.props.task_description}
          onChange={this.props._onEditDescriptionChange}
        />
      </View>
    );
  }
}

class ScheduleRow extends React.PureComponent {
  _chooseEdittingField = () => {
    this.props._chooseEdittingField("schedule");
  };

  _resetEditData = () => {
    let keyPath = ["schedule"],
      notSetValue = {},
      updater = value =>
        Map(this.props.old_task_data_map)
          .get("schedule")
          .toMap();

    this.props._editFieldData(keyPath, notSetValue, updater);
  };

  render() {
    return (
      <View
        style={{
          height: normalize(64, "height"),
          justifyContent: "center",
          borderColor: "rgba(0, 0, 0, 0.15)",
          borderBottomWidth: 1,
          marginHorizontal: normalize(30, "width")
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              height: normalize(64, "height")
            }}
            onPress={this._chooseEdittingField}
          >
            <View
              style={{
                width: icon_size,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {calendar_icon(icon_size, icon_color)}
            </View>

            <Text style={styles.normal_text}>
              {this.props.task_schedule_text}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: normalize(25, "width"),
              height: normalize(64, "height"),
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
            onPress={this._resetEditData}
          >
            {close_icon(icon_size, icon_color)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class CategoryRow extends React.PureComponent {
  _chooseEdittingField = () => {
    this.props._chooseEdittingField("category");
  };

  _resetEditData = () => {
    let keyPath = ["category"],
      notSetValue = {},
      updater = value => Map(this.props.old_task_data_map).get("category");

    this.props._editFieldData(keyPath, notSetValue, updater);
  };

  render() {
    let category_text =
      this.props.task_category_color === "white" ||
      this.props.task_category_color === "no color"
        ? styles.normal_text
        : {
            ...styles.normal_text,
            ...{ color: this.props.task_category_color }
          };
    return (
      <View
        style={{
          height: normalize(64, "height"),
          justifyContent: "center",
          borderColor: "rgba(0, 0, 0, 0.15)",
          borderBottomWidth: 1,
          marginHorizontal: normalize(30, "width")
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              height: normalize(64, "height")
            }}
            onPress={this._chooseEdittingField}
          >
            {this.props.task_category_color === "white" ||
            this.props.task_category_color === "no color" ? (
              <View
                style={{
                  width: normalize(14, "width"),
                  height: normalize(14, "width"),
                  borderRadius: normalize(14, "width"),
                  borderWidth: 1,
                  borderColor: "#2C2C2C",
                  justifyContent: "center",
                  alignItems: "center"
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
                  width: normalize(14, "width"),
                  height: normalize(14, "width"),
                  borderRadius: normalize(14, "width"),
                  backgroundColor: this.props.task_category_color
                }}
              ></View>
            )}
            <Text style={category_text}>{this.props.task_category_name}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: normalize(25, "width"),
              height: normalize(64, "height"),
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
            onPress={this._resetEditData}
          >
            {close_icon(icon_size, icon_color)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class PriorityRow extends React.PureComponent {
  _chooseEdittingField = () => {
    this.props._chooseEdittingField("priority");
  };

  _resetEditData = () => {
    let keyPath = ["priority"],
      notSetValue = {},
      updater = value =>
        Map(this.props.old_task_data_map)
          .get("priority")
          .toMap();

    this.props._editFieldData(keyPath, notSetValue, updater);
  };

  render() {
    return (
      <View
        style={{
          height: normalize(64, "height"),
          justifyContent: "center",
          borderColor: "rgba(0, 0, 0, 0.15)",
          borderBottomWidth: 1,
          marginHorizontal: normalize(30, "width")
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              height: normalize(64, "height")
            }}
            onPress={this._chooseEdittingField}
          >
            <View
              style={{
                width: icon_size,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {priority_icon(icon_size, icon_color)}
            </View>

            <Text
              style={{
                ...styles.normal_text,
                ...{ color: this.props.task_priority_color }
              }}
            >
              {this.props.task_priority_name}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: normalize(25, "width"),
              height: normalize(64, "height"),
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
            onPress={this._resetEditData}
          >
            {close_icon(icon_size, icon_color)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class RepeatRow extends React.PureComponent {
  _chooseEdittingField = () => {
    this.props._chooseEdittingField("repeat");
  };

  _resetEditData = () => {
    let keyPath = ["repeat"],
      notSetValue = {},
      updater = value =>
        Map(this.props.old_task_data_map)
          .get("repeat")
          .toMap();

    this.props._editFieldData(keyPath, notSetValue, updater);
  };

  render() {
    return (
      <View
        style={{
          height: normalize(64, "height"),
          justifyContent: "center",
          borderColor: "rgba(0, 0, 0, 0.15)",
          borderBottomWidth: 1,
          marginHorizontal: normalize(30, "width")
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              height: normalize(64, "height")
            }}
            onPress={this._chooseEdittingField}
          >
            <View
              style={{
                width: icon_size,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {repeat_icon(icon_size, icon_color)}
            </View>

            <Text style={styles.normal_text}>
              {this.props.task_repeat_text}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: normalize(25, "width"),
              height: normalize(64, "height"),
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
            onPress={this._resetEditData}
          >
            {close_icon(icon_size, icon_color)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class EndRow extends React.PureComponent {
  _chooseEdittingField = () => {
    this.props._chooseEdittingField("end");
  };

  _resetEditData = () => {
    let keyPath = ["end"],
      notSetValue = {},
      updater = value =>
        Map(this.props.old_task_data_map)
          .get("end")
          .toMap();

    this.props._editFieldData(keyPath, notSetValue, updater);
  };

  render() {
    return (
      <View
        style={{
          height: normalize(64, "height"),
          justifyContent: "center",
          borderColor: "rgba(0, 0, 0, 0.15)",
          borderBottomWidth: 1,
          marginHorizontal: normalize(30, "width")
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              height: normalize(64, "height")
            }}
            onPress={this._chooseEdittingField}
          >
            <View
              style={{
                width: icon_size,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {end_icon(icon_size, icon_color)}
            </View>

            <Text style={styles.normal_text}>{this.props.task_end_text}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: normalize(25, "width"),
              height: normalize(64, "height"),
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
            onPress={this._resetEditData}
          >
            {close_icon(icon_size, icon_color)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class RewardRow extends React.PureComponent {
  _chooseEdittingField = () => {
    this.props._chooseEdittingField("reward");
  };

  _resetEditData = () => {
    let keyPath = ["reward"],
      notSetValue = {},
      updater = value =>
        Map(this.props.old_task_data_map)
          .get("reward")
          .toMap();

    this.props._editFieldData(keyPath, notSetValue, updater);
  };

  render() {
    return (
      <View
        style={{
          height: normalize(64, "height"),
          justifyContent: "center",
          borderColor: "rgba(0, 0, 0, 0.15)",
          borderBottomWidth: 1,
          marginHorizontal: normalize(30, "width")
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              height: normalize(64, "height")
            }}
            onPress={this._chooseEdittingField}
          >
            <View
              style={{
                width: icon_size,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {reward_icon(icon_size, icon_color)}
            </View>

            <Text style={styles.normal_text}>
              {this.props.task_reward_text} pts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: normalize(25, "width"),
              height: normalize(64, "height"),
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
            onPress={this._resetEditData}
          >
            {close_icon(icon_size, icon_color)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class GoalRow extends React.PureComponent {
  _chooseEdittingField = () => {
    this.props._chooseEdittingField("goal");
  };

  _resetEditData = () => {
    let keyPath = ["goal"],
      notSetValue = {},
      updater = value =>
        Map(this.props.old_task_data_map)
          .get("goal")
          .toMap();

    this.props._editFieldData(keyPath, notSetValue, updater);
  };

  render() {
    return (
      <View
        style={{
          height: normalize(64, "height"),
          justifyContent: "center",
          borderColor: "rgba(0, 0, 0, 0.15)",
          borderBottomWidth: 1,
          marginHorizontal: normalize(30, "width")
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              height: normalize(64, "height")
            }}
            onPress={this._chooseEdittingField}
          >
            <View
              style={{
                width: icon_size,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {goal_icon(icon_size, icon_color)}
            </View>

            <Text style={styles.normal_text}>{this.props.task_goal_text}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: normalize(25, "width"),
              height: normalize(64, "height"),
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
            onPress={this._resetEditData}
          >
            {close_icon(icon_size, icon_color)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class CancelButton extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: normalize(30, "width"),
          height: normalize(48, "height"),
          justifyContent: "center",
          alignItems: "center",
          marginBottom: normalize(30, "height")
        }}
        onPress={this.props._closeEdit}
      >
        <Text style={styles.cancel_text}>CANCEL</Text>
      </TouchableOpacity>
    );
  }
}
