import React from "react";

import {
  View,
  Dimensions,
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

import { Map, OrderedMap, List, getIn, hasIn, fromJS } from "immutable";

import { styles } from "./styles/styles";

import * as Haptics from "expo-haptics";
import FeatherIcon from "react-native-vector-icons/Feather";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import Calendar from "../main/screens/Journal/components/share/calendar/Calendar";
import Category from "../main/screens/Journal/components/share/category/Category.Container";
import Collapsible from "react-native-collapsible";
import TaskCardUI from "./components/task-card-ui/TaskCardUI.Container";
import DeleteMultiple from "./components/delete-multiple/DeleteMultiple.Container";
import { normalize } from "../shared/helpers";
const window_width = Dimensions.get("window").width;

export default class EditMultipleTasks extends React.PureComponent {
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

  set_calendar_data = null;
  checked_task_data = Map().asMutable();
  edit_multiple_chosen_category_id = null;

  state = {
    should_display_calendar_panel: false,
    should_display_category_panel: false,
    should_display_delete_panel: false,
    should_reschedule_text_collapse: true,
    should_category_text_collapse: true
  };

  _goBackToJournal = () => {
    this.props.navigation.navigate("Journal");
  };

  _toggleDisplayCalendarPanel = () => {
    this.setState(prevState => ({
      should_display_calendar_panel: !prevState.should_display_calendar_panel,
      should_display_category_panel: false,
      should_display_delete_panel: false
    }));
  };

  _toggleDisplayCategoryPanel = () => {
    this.setState(prevState => ({
      should_display_category_panel: !prevState.should_display_category_panel,
      should_display_calendar_panel: false,
      should_display_delete_panel: false
    }));
  };

  _toggleDisplayDeletePanel = () => {
    this.setState(prevState => ({
      should_display_delete_panel: !prevState.should_display_delete_panel,
      should_display_calendar_panel: false,
      should_display_category_panel: false
    }));
  };

  _editMultipleFieldData = data => {
    this.set_calendar_data = data;

    if (this.state.should_reschedule_text_collapse) {
      this._toggleRescheduleTextCollapse();
    }
  };

  _editMultipleCategoryFieldData = category_id => {
    this.edit_multiple_chosen_category_id = category_id;

    if (this.state.should_category_text_collapse) {
      this._toggleCategoryTextCollapse();
    }
  };

  _checkTaskToEdit = task_id => {
    if (this.checked_task_data.hasIn([task_id, "checked"])) {
      this.checked_task_data.updateIn([task_id, "checked"], value => true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      this.checked_task_data.update(task_id, value =>
        fromJS({
          task_id,
          checked: true
        })
      );
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  _unCheckTaskToEdit = task_id => {
    this.checked_task_data.updateIn([task_id, "checked"], value => false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  _toggleRescheduleTextCollapse = () => {
    this.setState(prevState => ({
      should_reschedule_text_collapse: false
    }));
  };

  _toggleCategoryTextCollapse = () => {
    this.setState(prevState => ({
      should_category_text_collapse: false
    }));
  };

  _save = () => {
    let checked_task_data = this.checked_task_data,
      set_calendar_data = this.set_calendar_data,
      chosen_category_id = this.edit_multiple_chosen_category_id,
      type = this.props.currentChosenJournalType,
      tasks_map = Map(this.props.tasks),
      sending_data = {
        edit_task_data: {
          action_type: "",
          task_update_list: []
        },

        edit_category_data: {
          chosen_category_id
        }
      };

    if (type === "day") {
      sending_data.edit_task_data.action_type = "UPDATE_DAY_TASK";
    } else if (type === "week") {
      sending_data.edit_task_data.action_type = "UPDATE_WEEK_TASK";
    } else {
      sending_data.edit_task_data.action_type = "UPDATE_MONTH_TASK";
    }

    checked_task_data.valueSeq().forEach((data, index) => {
      if (data.get("checked")) {
        let task_id = Map(data).get("task_id"),
          category = tasks_map.getIn([task_id, "category"]),
          updating_task_data = Map(tasks_map.get(task_id)).asMutable();

        if (set_calendar_data) {
          updating_task_data.updateIn(["schedule"], value =>
            fromJS(set_calendar_data)
          );
        }

        if (chosen_category_id) {
          updating_task_data.updateIn(
            ["category"],
            value => chosen_category_id
          );
        }

        sending_data.edit_task_data.task_update_list.push({
          keyPath: [task_id],
          notSetValue: {},
          updater: value => updating_task_data.toMap(),
          category
        });
      }
    });

    if (set_calendar_data !== null || chosen_category_id !== null) {
      this.props.saveEditThunk(sending_data);
    }
    this._goBackToJournal();
  };

  componentDidMount() {}

  render() {
    let date_text = "",
      chosen_date_data = Map(this.props.chosenDateData),
      rescheduled_text = "",
      edit_multiple_chosen_category_id = this.edit_multiple_chosen_category_id,
      categories = OrderedMap(this.props.categories),
      moved_to_category_text = categories.getIn([
        edit_multiple_chosen_category_id,
        "name"
      ]),
      category_color = categories.getIn([
        edit_multiple_chosen_category_id,
        "color"
      ]);

    if (category_color === "no color") {
      category_color = "#2C2C2C";
    }

    if (this.props.currentChosenJournalType === "day") {
      date_text = `${
        this.month_names[chosen_date_data.get("month")]
      } ${chosen_date_data.get("day")}, ${chosen_date_data.get("year")}`;

      if (this.set_calendar_data) {
        let {
          day: rescheduled_day,
          month: rescheduled_month,
          year: rescheduled_year
        } = this.set_calendar_data;

        rescheduled_text = `${this.month_names[rescheduled_month]} ${rescheduled_day}, ${rescheduled_year}`;
      }
    } else if (this.props.currentChosenJournalType === "week") {
      date_text = `Week ${chosen_date_data.get("week")}: ${
        this.short_month_names[chosen_date_data.get("start_month")]
      } ${chosen_date_data.get("monday")} ${chosen_date_data.get(
        "start_year"
      )} - ${
        this.short_month_names[chosen_date_data.get("end_month")]
      } ${chosen_date_data.get("sunday")} ${chosen_date_data.get("end_year")}`;

      if (this.set_calendar_data) {
        let {
          week: rescheduled_week,
          monday: rescheduled_monday,
          start_month: rescheduled_start_month,
          start_year: rescheduled_start_year,

          sunday: rescheduled_sunday,
          end_month: rescheduled_end_month,
          end_year: rescheduled_end_year
        } = this.set_calendar_data;

        rescheduled_text = `Week ${rescheduled_week}: ${this.short_month_names[rescheduled_start_month]} ${rescheduled_monday} ${rescheduled_start_year} - ${this.short_month_names[rescheduled_end_month]} ${rescheduled_sunday} ${rescheduled_end_year}`;
      }
    } else {
      date_text = `${
        this.month_names[chosen_date_data.get("month")]
      } ${chosen_date_data.get("year")}`;

      if (this.set_calendar_data) {
        let {
          month: rescheduled_month,
          year: rescheduled_year
        } = this.set_calendar_data;

        rescheduled_text = `${this.month_names[rescheduled_month]} ${rescheduled_year}`;
      }
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          position: "relative"
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
              onPress={this._goBackToJournal}
            >
              <IoniconsIcon
                name="ios-arrow-back"
                size={normalize(30, "width")}
                color={"#BDBDBD"}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={this._toggleReturn}>
              <Text style={styles.middle_text_style}>Edit multiple tasks</Text>
            </TouchableOpacity>

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

        <Collapsible collapsed={this.state.should_reschedule_text_collapse}>
          <View
            style={{
              marginBottom: normalize(10, "height"),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{ ...styles.chosen_option_text, ...{ color: "#6E6E6E" } }}
            >
              Rescheduled to
            </Text>

            <Text
              style={{
                ...styles.chosen_option_text,
                ...{ marginLeft: normalize(5, "width") }
              }}
            >
              {rescheduled_text}
            </Text>
          </View>
        </Collapsible>

        <Collapsible collapsed={this.state.should_category_text_collapse}>
          <View
            style={{
              marginBottom: normalize(15, "height"),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{ ...styles.chosen_option_text, ...{ color: "#6E6E6E" } }}
            >
              Moved to
            </Text>

            <Text
              style={{
                ...styles.chosen_option_text,
                ...{ marginLeft: normalize(5, "width"), color: category_color }
              }}
            >
              {moved_to_category_text}
            </Text>
          </View>
        </Collapsible>

        <View
          style={{
            marginTop: normalize(5, "height"),
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={styles.date_text}>{date_text}</Text>
        </View>

        <View
          style={{
            flex: 1,
            width: window_width,
            marginTop: normalize(22, "height"),
            paddingBottom: normalize(60, "height")
          }}
        >
          <TaskCardsFlatlist
            tasks={this.props.tasks}
            deleted_tasks={this.props.deleted_tasks}
            completed_tasks={this.props.completed_tasks}
            priorities={this.props.priorities}
            chosen_date_data={Map(this.props.chosenDateData).toJS()}
            type={this.props.currentChosenJournalType}
            current_chosen_category={this.props.current_chosen_category}
            categories={this.props.categories}
            _checkTaskToEdit={this._checkTaskToEdit}
            _unCheckTaskToEdit={this._unCheckTaskToEdit}
            sortSettings={this.props.sortSettings}
            navigation={this.props.navigation}
          />
        </View>

        {this.state.should_display_calendar_panel ||
        this.state.should_display_category_panel ||
        this.state.should_display_delete_panel ? (
          <Modal transparent={true}>
            <View
              style={{
                flex: 1,
                position: "relative",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {this.state.should_display_calendar_panel ? (
                <>
                  <TouchableWithoutFeedback
                    onPress={this._toggleDisplayCalendarPanel}
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

                  <Calendar
                    hideAction={this._toggleDisplayCalendarPanel}
                    edit_multiple={true}
                    currentAnnotation={this.props.currentChosenJournalType}
                    _editMultipleFieldData={this._editMultipleFieldData}
                    edit_multiple_set_calendar_data={this.set_calendar_data}
                  />
                </>
              ) : (
                <>
                  {this.state.should_display_category_panel ? (
                    <>
                      <TouchableWithoutFeedback
                        onPress={this._toggleDisplayCategoryPanel}
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

                      <Category
                        hideAction={this._toggleDisplayCategoryPanel}
                        edit_multiple={true}
                        _editMultipleFieldData={
                          this._editMultipleCategoryFieldData
                        }
                        edit_multiple_chosen_category_id={
                          this.edit_multiple_chosen_category_id
                        }
                      />
                    </>
                  ) : (
                    <>
                      {this.state.should_display_delete_panel ? (
                        <>
                          <TouchableWithoutFeedback
                            onPress={this._toggleDisplayDeletePanel}
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

                          <DeleteMultiple
                            hideAction={this._toggleDisplayDeletePanel}
                            checked_task_data={this.checked_task_data}
                            type={this.props.currentChosenJournalType}
                            chosen_date_data={Map(
                              this.props.chosenDateData
                            ).toJS()}
                          />
                        </>
                      ) : null}
                    </>
                  )}
                </>
              )}
            </View>
          </Modal>
        ) : null}

        {/* Bottom Navigator */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            height: normalize(60, "height"),
            right: 0,
            left: 0,
            backgroundColor: "white",
            shadowOffset: {
              width: 0,
              height: -1
            },
            shadowRadius: 10,
            shadowColor: "rgb(0, 0, 0)",
            shadowOpacity: 0.04,
            flexDirection: "row",
            alignItems: "center",
            elevation: 8
          }}
        >
          <TouchableOpacity
            style={styles.bottom_nav_icon_button_container}
            onPress={this._toggleDisplayCalendarPanel}
          >
            <AntDesignIcon
              name="calendar"
              size={normalize(24, "width")}
              color="#05838B"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottom_nav_icon_button_container}
            onPress={this._toggleDisplayCategoryPanel}
          >
            <MaterialCommunityIcon
              name="folder-move"
              size={normalize(24, "width")}
              color="#05838B"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottom_nav_icon_button_container}
            onPress={this._toggleDisplayDeletePanel}
          >
            <MaterialCommunityIcon
              name="delete-outline"
              size={normalize(24, "width")}
              color="#05838B"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class TaskCardsFlatlist extends React.PureComponent {
  state = {
    should_flatlist_update: 0,
    data: []
  };

  _keyExtractor = (item, index) =>
    `journal-edit-multiple-${this.props.type}-task-${item[0]}`;

  _renderItem = ({ item, index }) => {
    return (
      <TaskCard
        index={index}
        task_id={item[0]}
        task_data={item[1]}
        current_chosen_category={this.props.current_chosen_category}
        completed_task={Map(this.props.completed_tasks).get(item[0])}
        type={this.props.type}
        deleted_task_data={Map(this.props.deleted_tasks).get(item[0])}
        chosen_date_data={this.props.chosen_date_data}
        categories={this.props.categories}
        priorities={this.props.priorities}
        _checkTaskToEdit={this.props._checkTaskToEdit}
        _unCheckTaskToEdit={this.props._unCheckTaskToEdit}
        navigation={this.props.navigation}
      />
    );
  };

  _sortedByPriorityTasks = () => {
    let tasks_map = Map(this.props.tasks),
      priorities_map = Map(this.props.priorities),
      data = [];

    priorities_map.valueSeq().forEach((priority_data, index) => {
      List(priority_data.get("tasks")).forEach((task_data, i) => {
        let task_id = Map(task_data).get("id");
        data.push([task_id, tasks_map.get(task_id)]);
      });
    });

    this.setState(prevState => ({
      data,
      should_flatlist_update: prevState.should_flatlist_update + 1
    }));
  };

  _sortedByNameTasks = () => {
    let tasks_map = Map(this.props.tasks),
      data = [];

    let tasks_for_sorting_array = tasks_map.valueSeq().map((value, index) => {
      let title = Map(value).get("title"),
        id = Map(value).get("id");

      return [title, id];
    });

    let sorted_tasks = tasks_for_sorting_array.sort();

    sorted_tasks.forEach(tuple => {
      let id = tuple[1];
      data.push([id, tasks_map.get(id)]);
    });

    this.setState(prevState => ({
      data,
      should_flatlist_update: prevState.should_flatlist_update + 1
    }));
  };

  _sortByRewardTasks = () => {
    let tasks_map = Map(this.props.tasks),
      data = [];

    let tasks_for_sorting_array = tasks_map.valueSeq().map((value, index) => {
      let reward_value = parseInt(Map(value).getIn(["reward", "value"])),
        id = Map(value).get("id");

      return [reward_value, id];
    });

    let sorted_tasks = tasks_for_sorting_array.sort((a, b) => b[0] - a[0]);

    sorted_tasks.forEach(tuple => {
      let id = tuple[1];
      data.push([id, tasks_map.get(id)]);
    });

    this.setState(prevState => ({
      data,
      should_flatlist_update: prevState.should_flatlist_update + 1
    }));
  };

  componentDidMount() {
    let sort_settings = List(this.props.sortSettings);

    if (sort_settings.get(0)) {
      this._sortedByPriorityTasks();
    } else if (sort_settings.get(1)) {
      this._sortedByNameTasks();
    } else if (sort_settings.get(2)) {
      this._sortByRewardTasks();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.priorities !== prevProps.priorities ||
      this.props.deleted_tasks !== prevProps.deleted_tasks
    ) {
      let sort_settings = List(this.props.sortSettings);

      if (sort_settings.get(0)) {
        this._sortedByPriorityTasks();
      } else if (sort_settings.get(1)) {
        this._sortedByNameTasks();
      } else if (sort_settings.get(2)) {
        this._sortByRewardTasks();
      }
    }
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        extraData={this.state.should_flatlist_update}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        windowSize={5}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        removeClippedSubviews={true}
      />
    );
  }
}

class TaskCard extends React.PureComponent {
  update_obj = {
    should_render: false
  };

  state = {
    checked_complete: false
  };

  _checkComplete = () => {
    this.setState(
      prevState => ({
        checked_complete: !prevState.checked_complete
      }),
      () => {
        if (this.state.checked_complete) {
          this.props._checkTaskToEdit(this.props.task_id);
        } else {
          this.props._unCheckTaskToEdit(this.props.task_id);
        }
      }
    );
  };

  getMonday = date => {
    let dayInWeek = new Date(date).getDay();
    let diff = dayInWeek === 0 ? 6 : dayInWeek - 1;
    return new Date(new Date(date).getTime() - diff * 86400 * 1000);
  };

  getWeek = date => {
    let target = new Date(date);
    let dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    let firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
  };

  getNoWeekInMonth = date => {
    let nearest_monday_timestamp = this.getMonday(date).getTime();
    let first_monday_of_month_timestamp = this.getMonday(
      new Date(date.getFullYear(), date.getMonth(), 1)
    ).getTime();

    return (
      Math.floor(
        (nearest_monday_timestamp - first_monday_of_month_timestamp) /
          (7 * 86400 * 1000)
      ) + 1
    );
  };

  compareDayTypeDaily = (repeat, end, schedule, day, month, year) => {
    let repeat_value = parseInt(Map(repeat).getIn(["interval", "value"])),
      repeat_type = Map(repeat).get("type"),
      task_day = parseInt(Map(schedule).get("day")),
      task_month = parseInt(Map(schedule).get("month")),
      task_year = parseInt(Map(schedule).get("year")),
      task_start_timestamp = new Date(
        task_year,
        task_month,
        task_day
      ).getTime(),
      current_date_start_timestamp = new Date(year, month, day).getTime();

    if (
      repeat_type === "daily" &&
      current_date_start_timestamp >= task_start_timestamp
    ) {
      let start_date_time = new Date(task_year, task_month, task_day).getTime(),
        current_date_time = new Date(year, month, day).getTime(),
        diff_day = Math.floor(
          (current_date_time - start_date_time) / (86400 * 1000)
        );

      if (diff_day > 0 && diff_day % repeat_value === 0) {
        let end_type = Map(end).get("type");

        if (end_type === "never") {
          return true;
        } else if (end_type === "on") {
          let end_at = parseInt(Map(end).get("endAt")),
            end_at_day = new Date(end_at).getDate(),
            end_at_month = new Date(end_at).getMonth(),
            end_at_year = new Date(end_at).getFullYear(),
            end_timestamp = new Date(
              end_at_year,
              end_at_month,
              end_at_day
            ).getTime();

          if (current_date_start_timestamp <= end_timestamp) {
            return true;
          }

          if (year < end_at_year) {
            return true;
          } else if (year === end_at_year) {
            if (month < end_at_month) {
              return true;
            } else if (month === end_at_month) {
              return day <= end_at_day;
            }
          }
        } else {
          let end_after_value = parseInt(Map(end).get("occurrence"));
          return diff_day / repeat_value <= end_after_value - 1;
        }
      }
    }

    return false;
  };

  compareDayTypeWeekly = (repeat, end, schedule, day, month, year) => {
    let repeat_value = parseInt(Map(repeat).getIn(["interval", "value"])),
      task_day = parseInt(Map(schedule).get("day")),
      task_month = parseInt(Map(schedule).get("month")),
      task_year = parseInt(Map(schedule).get("year")),
      repeat_type = Map(repeat).get("type"),
      repeat_days_in_week = Map(repeat).getIn(["interval", "daysInWeek"]),
      task_start_timestamp = new Date(
        task_year,
        task_month,
        task_day
      ).getTime(),
      current_date_start_timestamp = new Date(year, month, day).getTime();

    if (
      repeat_type === "weekly" &&
      current_date_start_timestamp >= task_start_timestamp
    ) {
      let is_days_in_week_chosen = false;

      repeat_days_in_week.every(value => {
        if (value) {
          is_days_in_week_chosen = true;

          return false;
        }

        return true;
      });

      if (is_days_in_week_chosen) {
        let start_date_week = this.getWeek(
            new Date(new Date(task_year, task_month, task_day))
          ),
          current_date_week = this.getWeek(
            new Date(new Date(year, month, day))
          ),
          current_date_day_in_week =
            new Date(year, month, day).getDay() === 0
              ? 6
              : new Date(year, month, day).getDay() - 1;

        let diff = Math.abs(current_date_week - start_date_week);

        if (diff >= 0 && diff % repeat_value === 0) {
          if (List(repeat_days_in_week).get(current_date_day_in_week)) {
            let end_type = Map(end).get("type");

            if (end_type === "never") {
              return true;
            } else if (end_type === "on") {
              let end_at = parseInt(Map(end).get("endAt")),
                end_at_day = new Date(end_at).getDate(),
                end_at_month = new Date(end_at).getMonth(),
                end_at_year = new Date(end_at).getFullYear(),
                end_timestamp = new Date(
                  end_at_year,
                  end_at_month,
                  end_at_day
                ).getTime();

              if (current_date_start_timestamp <= end_timestamp) {
                return true;
              }

              if (year < end_at_year) {
                return true;
              } else if (year === end_at_year) {
                if (month < end_at_month) {
                  return true;
                } else if (month === end_at_month) {
                  return day <= end_at_day;
                }
              }
            } else {
              let end_after_value = parseInt(Map(end).get("occurrence"));
              return diff / repeat_value <= end_after_value - 1;
            }
          }
        }
      } else {
        let start_date_time = new Date(
            new Date(task_year, task_month, task_day)
          ).getTime(),
          current_date_time = new Date(new Date(year, month, day)).getTime(),
          diff = (current_date_time - start_date_time) / (86400 * 1000 * 7);

        if (diff > 0 && diff % repeat_value === 0) {
          let end_type = Map(end).get("type");

          if (end_type === "never") {
            return true;
          } else if (end_type === "on") {
            let end_at = parseInt(Map(end).get("endAt")),
              end_at_day = new Date(end_at).getDate(),
              end_at_month = new Date(end_at).getMonth(),
              end_at_year = new Date(end_at).getFullYear(),
              end_timestamp = new Date(
                end_at_year,
                end_at_month,
                end_at_day
              ).getTime();

            if (current_date_start_timestamp <= end_timestamp) {
              return true;
            }

            if (year < end_at_year) {
              return true;
            } else if (year === end_at_year) {
              if (month < end_at_month) {
                return true;
              } else if (month === end_at_month) {
                return day <= end_at_day;
              }
            }
          } else {
            let end_after_value = parseInt(Map(end).get("occurrence"));
            return diff / repeat_value <= end_after_value - 1;
          }
        }
      }
    }

    return false;
  };

  compareDayTypeMonthly = (repeat, end, schedule, day, month, year) => {
    let repeat_value = parseInt(Map(repeat).getIn(["interval", "value"])),
      task_day = parseInt(Map(schedule).get("day")),
      task_month = parseInt(Map(schedule).get("month")),
      task_year = parseInt(Map(schedule).get("year")),
      repeat_type = Map(repeat).get("type"),
      task_start_timestamp = new Date(
        task_year,
        task_month,
        task_day
      ).getTime(),
      current_date_start_timestamp = new Date(year, month, day).getTime();

    if (
      repeat_type === "monthly" &&
      current_date_start_timestamp >= task_start_timestamp
    ) {
      let start_date = new Date(task_year, task_month, task_day),
        current_date = new Date(year, month, day),
        diff_year = current_date.getFullYear() - start_date.getFullYear(),
        diff_month =
          current_date.getMonth() + diff_year * 12 - start_date.getMonth();

      if (diff_month > 0 && diff_month % repeat_value === 0) {
        // If chosen date equals the start date, meaning schedule's date is between 1 - 28/29/30
        if (current_date.getDate() === start_date.getDate()) {
          let end_type = Map(end).get("type");

          if (end_type === "never") {
            return true;
          } else if (end_type === "on") {
            let end_at = parseInt(Map(end).get("endAt")),
              end_at_day = new Date(end_at).getDate(),
              end_at_month = new Date(end_at).getMonth(),
              end_at_year = new Date(end_at).getFullYear(),
              end_timestamp = new Date(
                end_at_year,
                end_at_month,
                end_at_day
              ).getTime();

            if (current_date_start_timestamp <= end_timestamp) {
              return true;
            }

            if (year < end_at_year) {
              return true;
            } else if (year === end_at_year) {
              if (month < end_at_month) {
                return true;
              } else if (month === end_at_month) {
                return day <= end_at_day;
              }
            }
          } else {
            let end_after_value = parseInt(Map(end).get("occurrence"));
            return diff_month / repeat_value <= end_after_value - 1;
          }
        }

        // If there is no common date between 1 - 28/29/30, meaning schedule's date is the last day of month
        else {
          if (
            current_date.getDate() === new Date(year, month + 1, 0).getDate()
          ) {
            let end_type = Map(end).get("type");

            if (end_type === "never") {
              return true;
            } else if (end_type === "on") {
              let end_at = parseInt(Map(end).get("endAt")),
                end_at_day = new Date(end_at).getDate(),
                end_at_month = new Date(end_at).getMonth(),
                end_at_year = new Date(end_at).getFullYear(),
                end_timestamp = new Date(
                  end_at_year,
                  end_at_month,
                  end_at_day
                ).getTime();

              if (current_date_start_timestamp <= end_timestamp) {
                return true;
              }

              if (year < end_at_year) {
                return true;
              } else if (year === end_at_year) {
                if (month < end_at_month) {
                  return true;
                } else if (month === end_at_month) {
                  return day <= end_at_day;
                }
              }
            } else {
              let end_after_value = parseInt(Map(end).get("occurrence"));
              return diff_month / repeat_value <= end_after_value - 1;
            }

            return true;
          }
        }
      }
    }

    return false;
  };

  compareWeekTypeWeekly = (
    repeat,
    end,
    schedule,
    monday,
    sunday,
    week,
    start_month,
    end_month,
    start_year,
    end_year,
    start_noWeekInMonth,
    end_noWeekInMonth
  ) => {
    let task_monday = parseInt(Map(schedule).get("monday")),
      task_sunday = parseInt(Map(schedule).get("sunday")),
      task_start_month = parseInt(Map(schedule).get("start_month")),
      task_end_month = parseInt(Map(schedule).get("end_month")),
      task_chosen_month = parseInt(Map(schedule).get("chosen_month")),
      task_start_year = parseInt(Map(schedule).get("start_year")),
      task_end_year = parseInt(Map(schedule).get("end_year")),
      task_chosen_year = parseInt(Map(schedule).get("chosen_year")),
      task_week = parseInt(Map(schedule).get("week")),
      repeat_type = Map(repeat).get("type"),
      repeat_value = parseInt(Map(repeat).getIn(["interval", "value"])),
      current_date_start_start_week_timestamp = new Date(
        start_year,
        start_month,
        monday
      ).getTime(),
      current_date_start_end_week_timestamp = new Date(
        end_year,
        end_month,
        sunday
      ).getTime(),
      task_start_timestamp = new Date(
        task_start_year,
        task_start_month,
        task_monday
      ).getTime();

    if (
      repeat_type === "weekly-w" &&
      current_date_start_start_week_timestamp >= task_start_timestamp
    ) {
      let diff = Math.abs(week - task_week);
      if (diff >= 0 && diff % repeat_value === 0) {
        let end_type = Map(end).get("type");

        if (end_type === "never") {
          return true;
        } else if (end_type === "on") {
          let end_at = parseInt(Map(end).get("endAt")),
            end_at_day = new Date(end_at).getDate(),
            end_at_month = new Date(end_at).getMonth(),
            end_at_year = new Date(end_at).getFullYear(),
            end_timestamp = new Date(
              end_at_year,
              end_at_month,
              end_at_day
            ).getTime();

          if (current_date_start_end_week_timestamp >= end_timestamp) {
            return true;
          }

          if (end_at_year === start_year) {
            if (end_at_month > start_month) {
              return true;
            } else if (end_at_month === start_month) {
              if (end_at_day >= monday) {
                return true;
              }
            }
          } else if (end_at_year > start_year) {
            return true;
          }
        } else {
          let end_after_value = parseInt(Map(end).get("occurrence"));
          return diff / repeat_value <= end_after_value - 1;
        }
      }
    }

    return false;
  };

  compareWeekTypeMonthly = (
    repeat,
    end,
    schedule,
    monday,
    sunday,
    week,
    start_month,
    end_month,
    start_year,
    end_year,
    start_noWeekInMonth,
    end_noWeekInMonth
  ) => {
    let repeat_value = parseInt(Map(repeat).getIn(["interval", "value"])),
      task_monday = parseInt(Map(schedule).get("monday")),
      task_chosen_month = parseInt(Map(schedule).get("chosen_month")),
      task_start_month = parseInt(Map(schedule).get("start_month")),
      task_end_month = parseInt(Map(schedule).get("end_month")),
      task_start_year = parseInt(Map(schedule).get("start_year")),
      task_chosen_year = parseInt(Map(schedule).get("chosen_year")),
      task_week = parseInt(Map(schedule).get("week")),
      task_chosen_noWeekInMonth = parseInt(
        Map(schedule).get("start_noWeekInMonth")
      ),
      repeat_type = Map(repeat).get("type"),
      current_date_start_start_week_timestamp = new Date(
        start_year,
        start_month,
        monday
      ).getTime(),
      current_date_start_end_week_timestamp = new Date(
        end_year,
        end_month,
        sunday
      ).getTime(),
      task_start_timestamp = new Date(
        task_start_year,
        task_start_month,
        task_monday
      ).getTime();

    if (
      repeat_type === "weekly-m" &&
      current_date_start_start_week_timestamp >= task_start_timestamp
    ) {
      if (task_chosen_month === task_start_month) {
        let diff_year = start_year - task_chosen_year,
          diff_month = start_month + diff_year * 12 - task_chosen_month;

        task_chosen_noWeekInMonth = parseInt(
          Map(schedule).get("start_noWeekInMonth")
        );

        if (task_chosen_noWeekInMonth > 4) {
          task_chosen_noWeekInMonth = 4;
        }

        if (start_noWeekInMonth > 4) {
          start_noWeekInMonth = 4;
        }

        if (diff_month > 0 && diff_month % repeat_value === 0) {
          if (start_noWeekInMonth === task_chosen_noWeekInMonth) {
            let end_type = Map(end).get("type");

            if (end_type === "never") {
              return true;
            } else if (end_type === "on") {
              let end_at = parseInt(Map(end).get("endAt")),
                end_at_day = new Date(end_at).getDate(),
                end_at_month = new Date(end_at).getMonth(),
                end_at_year = new Date(end_at).getFullYear(),
                end_timestamp = new Date(
                  end_at_year,
                  end_at_month,
                  end_at_day
                ).getTime();

              if (current_date_start_end_week_timestamp >= end_timestamp) {
                return true;
              }

              if (end_at_year === start_year) {
                if (end_at_month > start_month) {
                  return true;
                } else if (end_at_month === start_month) {
                  if (end_at_day >= monday) {
                    return true;
                  }
                }
              } else if (end_at_year > start_year) {
                return true;
              }
            } else {
              let end_after_value = parseInt(Map(end).get("occurrence"));
              return diff_month / repeat_value <= end_after_value - 1;
            }
          }
        }
      } else if (task_chosen_month === task_end_month) {
        let diff_year = end_year - task_chosen_year,
          diff_month = end_month + diff_year * 12 - task_chosen_month;

        task_chosen_noWeekInMonth = parseInt(
          Map(schedule).get("end_noWeekInMonth")
        );

        if (task_chosen_noWeekInMonth > 4) {
          task_chosen_noWeekInMonth = 4;
        }

        if (end_noWeekInMonth > 4) {
          end_noWeekInMonth = 4;
        }

        if (diff_month > 0 && diff_month % repeat_value === 0) {
          if (end_noWeekInMonth === task_chosen_noWeekInMonth) {
            let end_type = Map(end).get("type");

            if (end_type === "never") {
              return true;
            } else if (end_type === "on") {
              let end_at = parseInt(Map(end).get("endAt")),
                end_at_day = new Date(end_at).getDate(),
                end_at_month = new Date(end_at).getMonth(),
                end_at_year = new Date(end_at).getFullYear(),
                end_timestamp = new Date(
                  end_at_year,
                  end_at_month,
                  end_at_day
                ).getTime();

              if (current_date_start_end_week_timestamp >= end_timestamp) {
                return true;
              }

              if (end_at_year === start_year) {
                if (end_at_month > start_month) {
                  return true;
                } else if (end_at_month === start_month) {
                  if (end_at_day >= monday) {
                    return true;
                  }
                }
              } else if (end_at_year > start_year) {
                return true;
              }
            } else {
              let end_after_value = parseInt(Map(end).get("occurrence"));
              return diff_month / repeat_value <= end_after_value - 1;
            }
          }
        }
      }
    }

    return false;
  };

  compareMonthTypeMonthly = (repeat, end, schedule, month, year) => {
    let repeat_value = parseInt(Map(repeat).getIn(["interval", "value"])),
      task_month = Map(schedule).get("month"),
      task_year = Map(schedule).get("year");

    let diff_year = year - task_year,
      diff_month = month + diff_year * 12 - task_month;

    if (diff_month > 0 && diff_month % repeat_value === 0) {
      let end_type = Map(end).get("type");

      if (end_type === "never") {
        return true;
      } else if (end_type === "on") {
        let end_at = parseInt(Map(end).get("endAt")),
          end_at_day = new Date(end_at).getDate(),
          end_at_month = new Date(end_at).getMonth(),
          end_at_year = new Date(end_at).getFullYear();

        if (end_at_year === year) {
          if (end_at_month >= month) {
            return true;
          }
        } else if (end_at_year > year) {
          return true;
        }
      } else {
        let end_after_value = parseInt(Map(end).get("occurrence"));
        return diff_month / repeat_value <= end_after_value - 1;
      }
    }

    return false;
  };

  handleUpdate = (
    deleted_task_data,
    completed_task,
    task,
    type,
    current_chosen_category,
    chosen_date_data
  ) => {
    let task_map = Map(task),
      schedule = task_map.get("schedule"),
      repeat = task_map.get("repeat"),
      end = task_map.get("end"),
      title = task_map.get("title"),
      goal = task_map.get("goal"),
      category = task_map.get("category"), //category id
      current_goal_value = 0;

    if (current_chosen_category === category) {
      if (type === "day") {
        let { day, month, year } = chosen_date_data,
          chosen_day_timestamp = new Date(year, month, day).getTime(),
          chosen_day_timestamp_to_string = chosen_day_timestamp.toString(),
          task_day = parseInt(Map(schedule).get("day")),
          task_month = parseInt(Map(schedule).get("month")),
          task_year = parseInt(Map(schedule).get("year")),
          goal_value = parseInt(Map(goal).get("max"));

        if (
          (task_day === day && task_month === month && task_year === year) ||
          this.compareDayTypeDaily(repeat, end, schedule, day, month, year) ||
          this.compareDayTypeWeekly(repeat, end, schedule, day, month, year) ||
          this.compareDayTypeMonthly(repeat, end, schedule, day, month, year)
        ) {
          current_goal_value = parseInt(
            getIn(
              completed_task,
              [chosen_day_timestamp_to_string, "current"],
              0
            )
          );

          if (!Map(deleted_task_data).has(chosen_day_timestamp_to_string)) {
            this.update_obj = {
              should_render: true,
              current_goal_value,
              title,
              goal_value
            };
          } else {
            this.update_obj.should_render = false;
          }
        } else {
          this.update_obj.should_render = false;
        }
      } else if (type === "week") {
        let {
            monday,
            sunday,
            week,
            start_month,
            end_month,
            start_year,
            end_year,
            start_noWeekInMonth,
            end_noWeekInMonth
          } = chosen_date_data,
          chosen_week_timestamp = new Date(
            start_year,
            start_month,
            monday
          ).getTime(),
          chosen_week_timestamp_to_string = chosen_week_timestamp.toString(),
          task_week = parseInt(Map(schedule).get("week")),
          task_year = parseInt(Map(schedule).get("chosen_year")),
          goal_value = parseInt(Map(goal).get("max"));

        if (
          (task_week === week && task_year === start_year) ||
          this.compareWeekTypeWeekly(
            repeat,
            end,
            schedule,
            monday,
            sunday,
            week,
            start_month,
            end_month,
            start_year,
            end_year,
            start_noWeekInMonth,
            end_noWeekInMonth
          ) ||
          this.compareWeekTypeMonthly(
            repeat,
            end,
            schedule,
            monday,
            sunday,
            week,
            start_month,
            end_month,
            start_year,
            end_year,
            start_noWeekInMonth,
            end_noWeekInMonth
          )
        ) {
          current_goal_value = getIn(
            completed_task,
            [chosen_week_timestamp_to_string, "current"],
            0
          );

          if (!Map(deleted_task_data).has(chosen_week_timestamp_to_string)) {
            this.update_obj = {
              should_render: true,
              current_goal_value,
              title,
              goal_value
            };
          } else {
            this.update_obj.should_render = false;
          }
        } else {
          this.update_obj.should_render = false;
        }
      } else {
        let { month, year } = chosen_date_data,
          chosen_month_timestamp = new Date(year, month).getTime(),
          chosen_month_timestamp_to_string = chosen_month_timestamp.toString(),
          task_month = parseInt(Map(schedule).get("month")),
          task_year = parseInt(Map(schedule).get("year")),
          goal_value = parseInt(Map(goal).get("max"));

        if (
          (task_month === month && task_year === year) ||
          this.compareMonthTypeMonthly(repeat, end, schedule, month, year)
        ) {
          current_goal_value = getIn(
            completed_task,
            [chosen_month_timestamp_to_string, "current"],
            0
          );

          if (!Map(deleted_task_data).has(chosen_month_timestamp_to_string)) {
            this.update_obj = {
              should_render: true,
              current_goal_value,
              title,
              goal_value
            };
          } else {
            this.update_obj.should_render = false;
          }
        } else {
          this.update_obj.should_render = false;
        }
      }
    } else {
      this.update_obj.should_render = false;
    }
  };

  render() {
    this.handleUpdate(
      this.props.deleted_task_data,
      this.props.completed_task,
      this.props.task_data,
      this.props.type,
      this.props.current_chosen_category,
      this.props.chosen_date_data
    );

    let priorities_map = Map(this.props.priorities),
      categories_map = Map(this.props.categories),
      task_data_map = Map(this.props.task_data),
      task_priority_value = task_data_map.getIn(["priority", "value"]),
      task_priority_color = priorities_map.getIn([
        task_priority_value,
        "color"
      ]),
      task_category = task_data_map.get("category"),
      task_category_color = categories_map.getIn([task_category, "color"]);

    return (
      <View>
        {this.update_obj.should_render ? (
          <TaskCardUI
            checked_complete={this.state.checked_complete}
            task_category_color={task_category_color}
            task_priority_color={task_priority_color}
            update_obj={this.update_obj}
            _checkComplete={this._checkComplete}
            task_data={this.props.task_data}
            navigation={this.props.navigation}
          />
        ) : null}
      </View>
    );
  }
}
