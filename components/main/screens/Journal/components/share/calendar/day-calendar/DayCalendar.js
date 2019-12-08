import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native";

import { Map, fromJS } from "immutable";

import { styles } from "./styles/styles";

import { check_icon, close_icon } from "../../../../../../../shared/icons";

const panel_width = 338;
const margin_top_for_calendar_row = 20;
const margin_top_for_month_year_text = 30;
const calendar_total_height = margin_top_for_calendar_row * 6 + 32 * 6;
const animation_duration = 250;
const easing = Easing.in();

const icon_color = "white";
const icon_size = 19;

export default class DayCalendar extends React.Component {
  chosen_day = -1;
  chosen_month = -1;
  chosen_year = -1;

  calendar_scale_value = new Animated.Value(0);
  calendar_opacity_value = this.calendar_scale_value.interpolate({
    inputRange: [0, 0.3, 0.5, 0.7, 1],
    outputRange: [0, 0.3, 0.5, 0.7, 1],
    extrapolate: "clamp"
  });

  save = () => {
    if (this.chosen_day > 0 && this.chosen_month >= 0 && this.chosen_year > 0) {
      if (this.props.edit) {
        let keyPath = ["schedule"],
          notSetValue = {},
          updater = value =>
            fromJS({
              day: this.chosen_day,
              month: this.chosen_month,
              year: this.chosen_year
            });

        this.props._editFieldData(keyPath, notSetValue, updater);
      } else if (this.props.edit_multiple) {
        this.props._editMultipleFieldData({
          day: this.chosen_day,
          month: this.chosen_month,
          year: this.chosen_year
        });
      } else {
        this._updateTask(this.chosen_day, this.chosen_month, this.chosen_year);
      }
    }

    this.cancel();
  };

  cancel = () => {
    this._animateEndCalendar(this.props.hideAction, this.props.edit, this.props.edit_multiple);
  };

  setData = (day, month, year) => {
    this.chosen_day = day;
    this.chosen_month = month;
    this.chosen_year = year;
  };

  _updateTask = (day, month, year) => {
    this.props.updateTaskSchedule({
      day,
      month,
      year
    });
  };

  animateCalendar = (edit, edit_multiple) => {
    Animated.timing(this.calendar_scale_value, {
      toValue: 1,
      duration: animation_duration,
      easing,
      useNativeDriver: edit || edit_multiple ? false : true
    }).start();
  };

  _animateEndCalendar = (callback, edit, edit_multiple) => {
    Animated.timing(this.calendar_scale_value, {
      toValue: 0,
      duration: animation_duration,
      easing,
      useNativeDriver: edit || edit_multiple ? false : true
    }).start(() => {
      callback();
    });
  };

  componentDidMount() {
    this.animateCalendar(this.props.edit, this.props.edit_multiple);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.should_call_end_animation_from_parent !==
      prevProps.should_call_end_animation_from_parent
    ) {
      this.cancel();
    }
  }

  render() {
    return (
      <Animated.View
        style={{
          position: "absolute",
          width: panel_width,
          backgroundColor: "white",
          borderRadius: 10,
          flexDirection: "row",
          overflow: "hidden",
          transform: [{ scale: this.calendar_scale_value }],
          opacity: this.calendar_opacity_value
        }}
      >
        <View>
          {/* Main content of day calendar */}
          <Calendar
            edit={this.props.edit}
            edit_multiple={this.props.edit_multiple}
            edit_multiple_set_calendar_data={
              this.props.edit_multiple_set_calendar_data
            }
            setData={this.setData}
            task_data={this.props.task_data}
            edit_task_data={this.props.edit_task_data}
          />

          <View style={styles.separating_line}></View>

          <View
            style={{
              marginTop: 28,
              marginHorizontal: 30,
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 35
            }}
          >
            <TouchableOpacity
              style={styles.close_icon_holder}
              onPress={this.cancel}
            >
              {close_icon(icon_size, icon_color)}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.save_icon_holder}
              onPress={this.save}
            >
              {check_icon(icon_size, icon_color)}
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }
}

class Calendar extends React.Component {
  year_in_between = 4;
  current_day = new Date().getDate();
  current_year = new Date().getFullYear();
  current_month = new Date().getMonth();
  left_end_year = this.current_year - this.year_in_between;
  right_end_year = this.current_year + this.year_in_between;

  present_month_index = -1;

  month_data = [];

  start_index = 0;

  state = {
    should_flatlist_update: 0,

    current_month_index: -1,
    last_month_index: -1,

    current_day_index: -1,
    last_day_index: -1
  };

  scrollToMonth = month_index => {
    if (this._flatlist) {
      this._flatlist.scrollToOffset({
        animated: true,
        offset: month_index * panel_width
      });
    }
  };

  _setRef = r => (this._flatlist = r);

  chooseDay = (month_index, day_index) => {
    this.setState(prevState => ({
      current_month_index: month_index,
      last_month_index: prevState.current_month_index,

      current_day_index: day_index,
      last_day_index: prevState.current_day_index,

      should_flatlist_update: prevState.should_flatlist_update + 1
    }));
  };

  _keyExtractor = (item, index) => `day-type-calendar-month-${index}`;

  _renderItem = ({ item, index }) => (
    <MonthHolder
      data={item}
      month_index={index}
      current_month_index={this.state.current_month_index}
      last_month_index={this.state.last_month_index}
      current_day_index={this.state.current_day_index}
      last_day_index={this.state.last_day_index}
      chooseDay={this.chooseDay}
      scrollToMonth={this.scrollToMonth}
      present_month_index={this.present_month_index}
      setData={this.props.setData}
      task_data={this.props.task_data}
      findMonthIndex={this.findMonthIndex}
      findDayIndex={this.findDayIndex}
      current_day={this.current_day}
      current_month={this.current_month}
      current_year={this.current_year}
    />
  );

  initMonthData = () => {
    let counter = 0;

    for (let year = this.left_end_year; year <= this.right_end_year; year++) {
      for (let month = 0; month < 12; month++) {
        if (month === this.current_month && year === this.current_year) {
          this.present_month_index = counter;
        }

        this.month_data.push({
          month,
          year
        });

        counter += 1;
      }
    }

    if (this.props.edit) {
      this.start_index = this.findStartIndex(this.props.edit_task_data);
    } else if (this.props.edit_multiple) {
      this.start_index = this.findStartIndexEditMultiple(
        this.props.edit_multiple_set_calendar_data
      );
    } else {
      this.start_index = this.findStartIndex(this.props.task_data);
    }
  };

  _getItemLayout = (data, index) => ({
    length: panel_width,
    offset: panel_width * index,
    index
  });

  findStartIndex = task_data => {
    if (task_data) {
      let task_data_map = Map(task_data),
        day = task_data_map.getIn(["schedule", "day"]),
        month = task_data_map.getIn(["schedule", "month"]),
        year = task_data_map.getIn(["schedule", "year"]),
        month_index = this.findMonthIndex(month, year);

      this.chooseDay(month_index, this.findDayIndex(day, month, year));

      return month_index;
    } else {
      let current_day = new Date().getDate(),
        month_index = this.findMonthIndex(
          this.current_month,
          this.current_year
        );

      this.chooseDay(
        month_index,
        this.findDayIndex(current_day, this.current_month, this.current_year)
      );

      return month_index;
    }
  };

  findStartIndexEditMultiple = edit_multiple_set_calendar_data => {
    if (edit_multiple_set_calendar_data) {
      let { day, month, year } = edit_multiple_set_calendar_data,
        month_index = this.findMonthIndex(month, year);

      this.chooseDay(month_index, this.findDayIndex(day, month, year));

      return month_index;
    } else {
      let current_day = new Date().getDate(),
        month_index = this.findMonthIndex(
          this.current_month,
          this.current_year
        );

      this.setState(prevState => ({
        current_month_index: month_index,
        last_month_index: prevState.current_month_index,
        should_flatlist_update: prevState.should_flatlist_update + 1
      }));
      return month_index;
    }
  };

  findMonthIndex = (month, year) => {
    return (year - this.left_end_year) * 12 + month;
  };

  findDayIndex = (day, month, year) => {
    let first_day_of_month = new Date(year, month, 1),
      first_day_index_from_last_month =
        first_day_of_month.getDay() === 0 ? 7 : first_day_of_month.getDay();

    return (
      day - first_day_of_month.getDate() + first_day_index_from_last_month - 1
    );
  };

  componentDidMount() {
    this.initMonthData();
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          position: "relative"
        }}
      >
        <View>
          <FlatList
            data={this.month_data}
            extraData={this.state.should_flatlist_update}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToInterval={338}
            snapToAlignment="start"
            getItemLayout={this._getItemLayout}
            initialScrollIndex={this.start_index}
            ref={this._setRef}
            removeClippedSubviews={true}
            initialNumToRender={3}
            windowSize={3}
            maxToRenderPerBatch={3}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top:
              margin_top_for_month_year_text + 21 + margin_top_for_calendar_row,
            flexDirection: "row",
            alignItems: "center",
            left: 5,
            right: 5
          }}
        >
          <DayText text="M" />
          <DayText text="T" />
          <DayText text="W" />
          <DayText text="T" />
          <DayText text="F" />
          <DayText text="S" />
          <DayText text="S" />
        </View>
      </View>
    );
  }
}

class MonthHolder extends React.Component {
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

  days_in_month_data = [];

  state = {
    should_flatlist_update: 0
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.month_index === nextProps.current_month_index ||
      this.props.month_index === nextProps.last_month_index
    );
  }

  _keyExtractor = (item, index) =>
    `day-type-calendar-${item.day}-${item.month}-${item.year}-${index}`;

  _renderItem = ({ item, index }) => {
    if (item.unchosen) {
      return (
        <UnchosenDayHolder
          day_data={item}
          chooseDay={this.props.chooseDay}
          day_index={index}
          month_index={this.props.month_index}
          findMonthIndex={this.props.findMonthIndex}
          findDayIndex={this.props.findDayIndex}
          scrollToMonth={this.props.scrollToMonth}
          setData={this.props.setData}
        />
      );
    }

    return <DayHolder day_data={item} day_index={index} {...this.props} />;
  };

  _returnToCurrentMonth = () => {
    this.props.scrollToMonth(this.props.present_month_index);
  };

  componentDidMount() {
    let { month, year } = this.props.data,
      first_day_of_month = new Date(year, month, 1),
      number_of_days_from_last_month =
        first_day_of_month.getDay() === 0 ? 6 : first_day_of_month.getDay() - 1,
      last_day_of_month = new Date(year, month + 1, 0),
      number_of_days_from_next_month =
        last_day_of_month.getDay() === 0 ? 0 : 7 - last_day_of_month.getDay();

    for (let i = number_of_days_from_last_month; i >= 1; i--) {
      let date = new Date(first_day_of_month);
      date.setDate(first_day_of_month.getDate() - i);

      this.days_in_month_data.push({
        unchosen: true,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      });
    }

    for (
      let i = first_day_of_month.getDate();
      i <= last_day_of_month.getDate();
      i++
    ) {
      let date = new Date(year, month, i);

      this.days_in_month_data.push({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      });
    }

    for (let i = 1; i <= number_of_days_from_next_month; i++) {
      let date = new Date(last_day_of_month);
      date.setDate(last_day_of_month.getDate() + i);

      this.days_in_month_data.push({
        unchosen: true,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      });
    }

    this.setState(prevState => ({
      should_flatlist_update: prevState.should_flatlist_update + 1
    }));
  }

  render() {
    return (
      <View
        style={{
          width: panel_width,
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: margin_top_for_month_year_text,
            flexDirection: "row",
            alignItems: "center"
          }}
          onPress={this._returnToCurrentMonth}
        >
          <Text style={styles.month_text}>
            {this.month_names[this.props.data.month]}
          </Text>

          <Text style={styles.year_text}>{this.props.data.year}</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: margin_top_for_calendar_row + 32,
            height: calendar_total_height
          }}
        >
          <FlatList
            data={this.days_in_month_data}
            extraData={this.state.should_flatlist_update}
            numColumns={7}
            columnWrapperStyle={{
              width: panel_width - 10,
              marginTop: margin_top_for_calendar_row
            }}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  }
}

class DayHolder extends React.Component {
  state = {
    round_day_container_style: styles.not_chosen_round_day_container,
    day_text_style: styles.not_chosen_day_text
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (nextProps.current_day_index === this.props.day_index &&
        nextProps.current_month_index === this.props.month_index) ||
      (nextProps.last_day_index === this.props.day_index &&
        nextProps.last_month_index === this.props.month_index) ||
      (nextProps.last_day_index === this.props.day_index &&
        nextProps.current_month_index === this.props.month_index)
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.current_day_index === nextProps.day_index &&
      nextProps.current_month_index === nextProps.month_index
    ) {
      if (
        nextProps.day_data.day === nextProps.current_day &&
        nextProps.day_data.month === nextProps.current_month &&
        nextProps.day_data.year === nextProps.current_year
      ) {
        return {
          round_day_container_style: styles.chosen_round_day_container,
          day_text_style: styles.chosen_day_text
        };
      }
      return {
        round_day_container_style: styles.chosen_round_day_container,
        day_text_style: styles.chosen_day_text
      };
    } else if (
      nextProps.last_day_index === nextProps.day_index &&
      nextProps.last_month_index === nextProps.month_index
    ) {
      if (
        nextProps.day_data.day === nextProps.current_day &&
        nextProps.day_data.month === nextProps.current_month &&
        nextProps.day_data.year === nextProps.current_year
      ) {
        return {
          round_day_container_style: styles.not_chosen_round_day_container,
          day_text_style: styles.chosen_day_text
        };
      }
      return {
        round_day_container_style: styles.not_chosen_round_day_container,
        day_text_style: styles.not_chosen_day_text
      };
    } else if (
      nextProps.last_day_index === nextProps.day_index &&
      nextProps.current_month_index === nextProps.month_index
    ) {
      if (
        nextProps.day_data.day === nextProps.current_day &&
        nextProps.day_data.month === nextProps.current_month &&
        nextProps.day_data.year === nextProps.current_year
      ) {
        return {
          round_day_container_style: styles.not_chosen_round_day_container,
          day_text_style: styles.chosen_day_text
        };
      }
      return {
        round_day_container_style: styles.not_chosen_round_day_container,
        day_text_style: styles.not_chosen_day_text
      };
    } else {
      if (
        nextProps.day_data.day === nextProps.current_day &&
        nextProps.day_data.month === nextProps.current_month &&
        nextProps.day_data.year === nextProps.current_year
      ) {
        return {
          round_day_container_style: styles.not_chosen_round_day_container,
          day_text_style: styles.chosen_day_text
        };
      }
    }

    return null;
  }

  _chooseDayFromCurrentMonth = () => {
    let { day, month, year } = this.props.day_data;
    this.props.setData(day, month, year);
    this.props.chooseDay(this.props.month_index, this.props.day_index);
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.day_holder_container}
        onPress={this._chooseDayFromCurrentMonth}
      >
        <View style={this.state.round_day_container_style}>
          <Text style={this.state.day_text_style}>
            {this.props.day_data.day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class UnchosenDayHolder extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  _chooseDayNotFromCurrentMonth = () => {
    let { day, month, year } = this.props.day_data,
      month_index = this.props.findMonthIndex(month, year),
      day_index = this.props.findDayIndex(day, month, year);

    this.props.setData(day, month, year);
    this.props.chooseDay(month_index, day_index);
    this.props.scrollToMonth(month_index);
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.day_holder_container}
        onPress={this._chooseDayNotFromCurrentMonth}
      >
        <Text style={styles.cannot_choose_day_text}>
          {this.props.day_data.day}
        </Text>
      </TouchableOpacity>
    );
  }
}

class DayText extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          height: 32,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={styles.day_text_absolute}>{this.props.text}</Text>
      </View>
    );
  }
}
