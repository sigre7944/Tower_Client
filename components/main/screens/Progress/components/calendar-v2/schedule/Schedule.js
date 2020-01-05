import React from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Platform
} from "react-native";

import { Map, fromJS, List } from "immutable";

import { styles } from "./styles/styles";
import { normalize } from "../../../../../../shared/helpers";
import {
  close_icon,
  check_icon,
  left_chevron_icon,
  right_chevron_icon
} from "../../../../../../shared/icons";
const icon_size = normalize(19, "width");
const icon_color = "white";

const window_width = Dimensions.get("window").width;
const panel_width = normalize(338, "width");
const animation_duration = 250;
const easing = Easing.inOut(Easing.linear);
const outer_panel_padding = normalize(7, "width");

const margin_top_for_calendar_row = normalize(20, "height");
const margin_top_for_month_year_text = normalize(30, "height");
const calendar_total_height =
  margin_top_for_calendar_row * 3 +
  normalize(45, "height") * 3 +
  normalize(24, "height") * 3;

export default class Schedule extends React.PureComponent {
  calendar_opacity_value = new Animated.Value(0);

  current_year = new Date().getFullYear();
  current_month = new Date().getMonth();

  year_in_between = 4;
  left_end_year = this.current_year - this.year_in_between;
  right_end_year = this.current_year + this.year_in_between;

  present_year_index = -1;

  year_data = [];

  start_index = 0;

  chosen_month = 0;
  chosen_year = 0;

  state = {
    should_flatlist_update: 0,

    current_year_index: -1,
    last_year_index: -1,

    current_month_index: -1,
    last_month_index: -1
  };

  _animateStart = () => {
    Animated.timing(this.calendar_opacity_value, {
      toValue: 1,
      duration: animation_duration,
      easing,
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start();
  };

  _animateEnd = callback => {
    Animated.timing(this.calendar_opacity_value, {
      toValue: 0,
      duration: animation_duration,
      easing,
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start(() => {
      callback();
    });
  };

  _cancelSchedule = () => {
    this._animateEnd(this.props._toggleSchedule);
  };

  _saveSchedule = () => {
    if (this.chosen_month >= 0 && this.chosen_year >= 0) {
      this.props._setDateData(this.chosen_month, this.chosen_year);
    }

    this._cancelSchedule();
  };

  scrollToYear = year_index => {
    if (this._flatlist) {
      this._flatlist.scrollToOffset({
        animated: true,
        offset: year_index * panel_width
      });
    }
  };

  _setRef = r => (this._flatlist = r);

  chooseMonth = (year_index, month_index, month, year) => {
    this.setState(
      prevState => ({
        current_year_index: year_index,
        last_year_index: prevState.current_year_index,

        current_month_index: month_index,
        last_month_index: prevState.current_month_index,

        should_flatlist_update: prevState.should_flatlist_update + 1
      }),
      () => {
        this.chosen_month = month;
        this.chosen_year = year;
      }
    );
  };

  _keyExtractor = (item, index) => `progress-calendar-schedule-year-${index}`;

  _renderItem = ({ item, index }) => (
    <YearHolder
      data={item}
      year_index={index}
      current_year_index={this.state.current_year_index}
      last_year_index={this.state.last_year_index}
      current_month_index={this.state.current_month_index}
      last_month_index={this.state.last_month_index}
      chooseMonth={this.chooseMonth}
      scrollToYear={this.scrollToYear}
      present_year_index={this.present_year_index}
      task_data={this.props.task_data}
    />
  );

  initYearData = () => {
    let counter = 0;

    for (let year = this.left_end_year; year <= this.right_end_year; year++) {
      this.year_data.push({
        year
      });

      if (year === this.current_year) {
        this.present_year_index = counter;
      }

      counter += 1;
    }

    this.start_index = this.findStartIndex(this.props.month, this.props.year);
  };

  _getItemLayout = (data, index) => ({
    length: panel_width,
    offset: panel_width * index,
    index
  });

  findStartIndex = (month, year) => {
    let month_index = month,
      year_index = this.findYearIndex(year);

    this.chooseMonth(year_index, month_index);

    return year_index;
  };

  findYearIndex = year => {
    return year - this.left_end_year;
  };

  componentDidMount() {
    this._animateStart();
    this.initYearData();
  }

  render() {
    return (
      <Modal transparent={true}>
        <View
          style={{
            flex: 1,
            position: "relative",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableWithoutFeedback onPress={this._cancelSchedule}>
            <View
              style={{
                flex: 1,
                width: window_width,
                backgroundColor: "black",
                opacity: 0.2
              }}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={{
              position: "absolute",
              borderRadius: normalize(10, "width"),
              width: panel_width,
              backgroundColor: "white",
              overflow: "hidden",
              opacity: this.calendar_opacity_value
            }}
          >
            <View
              style={{
                marginHorizontal: outer_panel_padding
              }}
            >
              <FlatList
                data={this.year_data}
                extraData={this.state.should_flatlist_update}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                snapToInterval={panel_width}
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

            <View style={styles.separating_line}></View>

            <View
              style={{
                marginTop: normalize(28, "height"),
                marginHorizontal: normalize(30, "width"),
                flexDirection: "row",
                justifyContent: "flex-end",
                marginBottom: normalize(35, "height")
              }}
            >
              <TouchableOpacity
                style={styles.close_icon_holder}
                onPress={this._cancelSchedule}
              >
                {close_icon(icon_size, icon_color)}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.save_icon_holder}
                onPress={this._saveSchedule}
              >
                {check_icon(icon_size, icon_color)}
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

class YearHolder extends React.Component {
  months_in_year_data = [];

  state = {
    should_flatlist_update: 0
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.year_index === nextProps.current_year_index ||
      this.props.year_index === nextProps.last_year_index
    );
  }

  _keyExtractor = (item, index) =>
    `progress-calendar-schedule-month-${item.month}-${item.year}-${index}`;

  _renderItem = ({ item, index }) => {
    return (
      <MonthHolder
        month_data={item}
        month_index={index}
        year_index={this.props.year_index}
        current_year_index={this.props.current_year_index}
        last_year_index={this.props.last_year_index}
        current_month_index={this.props.current_month_index}
        last_month_index={this.props.last_month_index}
        chooseMonth={this.props.chooseMonth}
      />
    );
  };

  _returnToCurrentYear = () => {
    this.props.scrollToYear(this.props.present_year_index);
  };

  _goToPreviousYear = () => {
    this.props.scrollToYear(this.props.year_index - 1);
  };

  _goToNextYear = () => {
    this.props.scrollToYear(this.props.year_index + 1);
  };

  componentDidMount() {
    let { year } = this.props.data;

    for (let i = 0; i < 12; i++) {
      this.months_in_year_data.push({
        month: i,
        year
      });
    }

    this.setState(prevState => ({
      should_flatlist_update: prevState.should_flatlist_update + 1
    }));
  }

  render() {
    return (
      <View>
        <View
          style={{
            marginTop: margin_top_for_month_year_text,
            width: panel_width - 2 * outer_panel_padding,
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: normalize(250, "width")
            }}
          >
            <TouchableOpacity
              style={{
                width: normalize(24, "width"),
                height: normalize(24, "width"),
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={this._goToPreviousYear}
            >
              {left_chevron_icon(normalize(18, "width"), "rgba(0, 0, 0, 0.54)")}
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: normalize(25, "width"),
                flex: 1
              }}
              onPress={this._returnToCurrentYear}
            >
              <Text style={styles.year_text}>{this.props.data.year}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: normalize(24, "width"),
                height: normalize(24, "width"),
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={this._goToNextYear}
            >
              {right_chevron_icon(
                normalize(18, "width"),
                "rgba(0, 0, 0, 0.54)"
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: margin_top_for_calendar_row,
            height: calendar_total_height,
            width: panel_width
          }}
        >
          <FlatList
            data={this.months_in_year_data}
            extraData={this.state.should_flatlist_update}
            numColumns={4}
            columnWrapperStyle={{
              width: panel_width - 2 * outer_panel_padding,
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

class MonthHolder extends React.Component {
  month_names = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];

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

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.props.month_index === nextProps.current_month_index &&
        this.props.year_index === nextProps.current_year_index) ||
      (this.props.month_index === nextProps.last_month_index &&
        this.props.year_index === nextProps.current_year_index) ||
      (this.props.month_index === nextProps.last_month_index &&
        this.props.year_index === nextProps.last_year_index)
    );
  }

  _chooseMonthFromCurrentYear = () => {
    this.props.chooseMonth(
      this.props.year_index,
      this.props.month_index,
      this.props.month_data.month,
      this.props.month_data.year
    );
  };

  _getWeekString = (month, year) => {
    let first_day_of_month = new Date(year, month, 1),
      first_week = this.getWeek(first_day_of_month);

    let last_day_of_month = new Date(year, month + 1, 0),
      last_week = this.getWeek(last_day_of_month);

    return `W${first_week} - W${last_week}`;
  };

  render() {
    let container_style = styles.unchosen_month_holder_container,
      text_style = styles.unchosen_month_text,
      current_month = new Date().getMonth(),
      current_year = new Date().getFullYear();

    if (
      this.props.month_index === this.props.current_month_index &&
      this.props.year_index === this.props.current_year_index
    ) {
      container_style = styles.chosen_month_holder_container;
      text_style = styles.chosen_month_text;
    } else if (
      this.props.month_index === this.props.last_month_index &&
      this.props.year_index === this.props.current_year_index
    ) {
      container_style = styles.unchosen_month_holder_container;
      text_style = styles.unchosen_month_text;
    } else if (
      this.props.month_index === this.props.last_month_index &&
      this.props.year_index === this.props.last_year_index
    ) {
      container_style = styles.unchosen_month_holder_container;
      text_style = styles.unchosen_month_text;
    }

    if (
      this.props.month_data.month === current_month &&
      this.props.month_data.year === current_year
    ) {
      text_style = styles.chosen_month_text;
    }

    let week_string = this._getWeekString(
      this.props.month_data.month,
      this.props.month_data.year
    );

    return (
      <TouchableOpacity
        style={{
          flex: 1
        }}
        onPress={this._chooseMonthFromCurrentYear}
      >
        <View style={container_style}>
          <Text style={text_style}>
            {this.month_names[this.props.month_data.month]}
          </Text>
        </View>

        <View
          style={{
            marginTop: normalize(5, "height"),
            alignItems: "center"
          }}
        >
          <Text style={styles.week_text}>{week_string}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
