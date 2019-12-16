import React, { Component } from "react";

import {
  Dimensions,
  Animated,
  Easing,
  Keyboard,
  ScrollView,
  Platform
} from "react-native";

import TaskAnnotationTypeHolder from "./task-annotation-type-holder/TaskAnnotationTypeHolder.Container";
import TitleAndDescriptionHolder from "./title-and-description-holder/TitleAndDescriptionHolder.Container";

import TagDataHolder from "./tag-data-holder/TagDataHolder.Container";

import BottomOptionsHolder from "./bottom-options-holder/BottomOptionsHolder.Container";

import { normalize } from "../../../../../shared/helpers";

export default class AddTaskPanel extends Component {
  taskTextInputRef = React.createRef();

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

  translateY_value = new Animated.Value(0);
  opacity_value = this.translateY_value.interpolate({
    inputRange: [-80, 0],
    outputRange: Platform.OS === "android" ? [1, 1] : [1, 0],
    extrapolate: "clamp"
  });

  state = {
    tag_data: []
  };

  setTaskTextInputRef = ref => {
    this.taskTextInputRef = ref;
  };

  toDoWhenWillShowKeyboard = e => {
    Animated.timing(this.translateY_value, {
      toValue: -e.endCoordinates.height,
      duration: e.duration,
      easing: Easing.in()
    }).start();
  };

  _animateEnd = callback => {
    if (Platform.OS === "android") {
      callback();
    } else {
      Animated.timing(this.translateY_value, {
        toValue: 0,
        duration: 250,
        easing: Easing.in()
      }).start(() => {
        callback();
      });
    }
  };

  _close = () => {
    this._animateEnd(this.props.toggleAddTask);
  };

  _toDoWhenKeyboardDidShow = e => {
    // Animated.timing(this.translateY_value, {
    //   toValue: 0,
    //   duration: e.duration,
    //   easing: Easing.in(),
    //   useNativeDriver: true
    // }).start();
  };

  componentDidMount() {
    if (Platform.OS === "ios") {
      this.keyboardWillShowListener = Keyboard.addListener(
        "keyboardWillShow",
        this.toDoWhenWillShowKeyboard
      );
    } else {
      this.keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        this._toDoWhenKeyboardDidShow
      );
    }
  }

  componentWillUnmount() {
    Keyboard.removeListener("keyboardWillShow", this.toDoWhenWillShowKeyboard);
    Keyboard.removeListener("keyboardDidShow", this._toDoWhenKeyboardDidShow);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.should_call_end_animation_from_parent !==
      prevProps.should_call_end_animation_from_parent
    ) {
      this._close();
    }
  }

  render() {
    return (
      <Animated.View
        style={{
          position: "absolute",
          width: Dimensions.get("window").width,
          bottom: 0,
          transform: [{ translateY: this.translateY_value }],
          // 25 for status bar, 48 for soft menu bar (largest size)
          height:
            Platform.OS === "android"
              ? normalize(409, "height") - 25 - 48
              : normalize(409, "height"),
          backgroundColor: "white",
          borderTopRightRadius: normalize(20, "width"),
          borderTopLeftRadius: normalize(20, "width"),
          opacity: this.opacity_value,
          backgroundColor: "#FFFFFF",
          shadowOffset: {
            width: 0,
            height: -2
          },
          shadowRadius: 15,
          shadowColor: "rgba(0, 0, 0, 0.06)"
        }}
      >
        <TaskAnnotationTypeHolder
          setCurrentAnnotation={this.props.setCurrentAnnotation}
          currentAnnotation={this.props.currentAnnotation}
        />

        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{
            flex: 1
          }}
          showsVerticalScrollIndicator={false}
        >
          <TitleAndDescriptionHolder
            currentAnnotation={this.props.currentAnnotation}
            setTaskTextInputRef={this.setTaskTextInputRef}
            _closeAddTaskPanel={this._close}
            currentAnnotation={this.props.currentAnnotation}
            navigation={this.props.navigation}
          />

          <TagDataHolder currentAnnotation={this.props.currentAnnotation} />
        </ScrollView>

        <BottomOptionsHolder
          chooseCalenderOption={this.props.chooseCalenderOption}
          chosenCategoryOption={this.props.chosenCategoryOption}
          choosePriorityOption={this.props.choosePriorityOption}
          chooseRepeatOption={this.props.chooseRepeatOption}
          _closeAddTaskPanel={this._close}
          currentAnnotation={this.props.currentAnnotation}
          navigation={this.props.navigation}
        />
      </Animated.View>
    );
  }
}
