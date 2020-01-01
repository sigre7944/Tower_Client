import React from "react";

import {
  View,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Platform
} from "react-native";

import AddTaskPanel from "./add-task-panel/AddTaskPanel";
import Calendar from "../../../screens/Journal/components/share/calendar/Calendar";

import Category from "../../../screens/Journal/components/share/category/Category.Container";
import Priority from "../../../screens/Journal/components/share/priority/Priority.Container";

import Repeat from "../../../screens/Journal/components/share/repeat/Repeat";

import { Map, fromJS } from "immutable";

class DismissElement extends React.PureComponent {
  _onPress = () => {
    if (this.props.addTaskMenuChosen) {
      this.props._toggleShouldCallEndAnimationFromParent();
    } else {
      this.props._toggleShouldCallEndAnimationFromParent();
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View
          style={{
            flex: 1,
            width: Dimensions.get("window").width,
            backgroundColor: "black",
            opacity: 0.2
          }}
        ></View>
      </TouchableWithoutFeedback>
    );
  }
}

export default class OverlayModal extends React.PureComponent {
  should_go_to_login_screen = false;

  state = {
    currentAnnotation: "",
    calendarChosen: false,
    repeatChosen: false,
    categoryChosen: false,
    priorityChosen: false,
    addTaskMenuChosen: true,

    should_animate_end_animation: true,
    should_call_end_animation_from_parent: true
  };

  setCurrentAnnotation = annotation => {
    this.setState({ currentAnnotation: annotation });
  };

  _toggleShouldCallEndAnimationFromParent = () => {
    this.setState(prevState => ({
      should_call_end_animation_from_parent: !prevState.should_call_end_animation_from_parent
    }));
  };

  _toggleShouldAnimateEndAnimation = should_go_to_login_screen => {
    this.should_go_to_login_screen = should_go_to_login_screen;
    this.setState(prevState => ({
      should_animate_end_animation: !prevState.should_animate_end_animation
    }));
  };

  disableAllTabs = () => {
    this.setState(
      {
        calendarChosen: false,
        repeatChosen: false,
        categoryChosen: false,
        priorityChosen: false,
        addTaskMenuChosen: true
      },
      () => {
        if (this.should_go_to_login_screen) {
          setTimeout(() => {
            this.props.toggleAddTask(this.should_go_to_login_screen);
          }, 50);
        }
      }
    );
  };

  chooseCalenderOption = () => {
    this.setState(prevState => ({
      calendarChosen: !prevState.calendarChosen,
      repeatChosen: false,
      categoryChosen: false,
      priorityChosen: false,

      addTaskMenuChosen: false,
      is_task_menu_chosen_ready: true
    }));
  };

  chooseRepeatOption = () => {
    this.setState(prevState => ({
      calendarChosen: false,
      repeatChosen: !prevState.repeatChosen,
      categoryChosen: false,
      priorityChosen: false,
      addTaskMenuChosen: false
    }));
  };

  chosenCategoryOption = () => {
    this.setState(prevState => ({
      calendarChosen: false,
      repeatChosen: false,
      priorityChosen: false,
      categoryChosen: !prevState.categoryChosen,
      addTaskMenuChosen: false
    }));
  };

  choosePriorityOption = () => {
    this.setState(prevState => ({
      calendarChosen: false,
      repeatChosen: false,
      categoryChosen: false,
      priorityChosen: !prevState.priorityChosen,
      addTaskMenuChosen: false
    }));
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

  getMonday = date => {
    let dayInWeek = new Date(date).getDay();
    let diff = dayInWeek === 0 ? 6 : dayInWeek - 1;
    return new Date(new Date(date).getTime() - diff * 86400 * 1000);
  };

  getSunday = date => {
    let monday = this.getMonday(new Date(date));
    let sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return sunday;
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

  _updateDefaultScheduleData = () => {
    let date = new Date();

    let day_schedule_data = fromJS({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    });

    let week_schedule_data = fromJS({
      monday: this.getMonday(date).getDate(),
      sunday: this.getSunday(date).getDate(),
      week: this.getWeek(date),
      start_month: this.getMonday(date).getMonth(),
      end_month: this.getSunday(date).getMonth(),
      chosen_month: date.getMonth(),
      start_year: this.getMonday(date).getFullYear(),
      end_year: this.getSunday(date).getFullYear(),
      chosen_year: date.getFullYear(),
      start_noWeekInMonth: this.getNoWeekInMonth(this.getMonday(date)),
      end_noWeekInMonth: this.getNoWeekInMonth(this.getSunday(date))
    });

    let month_schedule_data = fromJS({
      month: date.getMonth(),
      year: date.getFullYear()
    });

    this.props.updateScheduleThunk({
      day_schedule_data,
      week_schedule_data,
      month_schedule_data
    });
  };

  componentDidMount() {
    this._updateDefaultScheduleData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.should_animate_end_animation !==
      prevState.should_animate_end_animation
    ) {
      this.disableAllTabs();
    }
  }

  render() {
    return (
      <Modal transparent={true} visible={this.props.addTaskClicked}>
        <View
          style={{
            flex: 1,
            position: "relative",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <DismissElement
            toggleAddTask={this.props.toggleAddTask}
            addTaskMenuChosen={this.state.addTaskMenuChosen}
            _toggleShouldCallEndAnimationFromParent={
              this._toggleShouldCallEndAnimationFromParent
            }
          />

          {this.state.addTaskMenuChosen ? (
            <AddTaskPanel
              chooseCalenderOption={this.chooseCalenderOption}
              chosenCategoryOption={this.chosenCategoryOption}
              chooseRepeatOption={this.chooseRepeatOption}
              choosePriorityOption={this.choosePriorityOption}
              setCurrentAnnotation={this.setCurrentAnnotation}
              currentAnnotation={this.state.currentAnnotation}
              toggleAddTask={this.props.toggleAddTask}
              should_call_end_animation_from_parent={
                this.state.should_call_end_animation_from_parent
              }
              navigation={this.props.navigation}
            />
          ) : (
            <>
              {/* Calendar Panel */}
              {this.state.calendarChosen ? (
                <Calendar
                  currentAnnotation={this.state.currentAnnotation}
                  hideAction={this._toggleShouldAnimateEndAnimation}
                  should_call_end_animation_from_parent={
                    this.state.should_call_end_animation_from_parent
                  }
                  edit={false}
                />
              ) : (
                <>
                  {/* Category Panel */}
                  {this.state.categoryChosen ? (
                    <Category
                      currentAnnotation={this.state.currentAnnotation}
                      edit={false}
                      hideAction={this._toggleShouldAnimateEndAnimation}
                      should_call_end_animation_from_parent={
                        this.state.should_call_end_animation_from_parent
                      }
                      toggleAddTask={this.props.toggleAddTask}
                      navigation={this.props.navigation}
                    />
                  ) : (
                    <>
                      {/* Repeat Panel */}
                      {this.state.repeatChosen ? (
                        <Repeat
                          currentAnnotation={this.state.currentAnnotation}
                          edit={false}
                          hideAction={this._toggleShouldAnimateEndAnimation}
                          should_call_end_animation_from_parent={
                            this.state.should_call_end_animation_from_parent
                          }
                        />
                      ) : (
                        <>
                          {/* Priority Panel */}
                          {this.state.priorityChosen ? (
                            <Priority
                              currentAnnotation={this.state.currentAnnotation}
                              edit={false}
                              hideAction={this._toggleShouldAnimateEndAnimation}
                              should_call_end_animation_from_parent={
                                this.state.should_call_end_animation_from_parent
                              }
                            />
                          ) : (
                            <></>
                          )}
                        </>
                      )}
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
