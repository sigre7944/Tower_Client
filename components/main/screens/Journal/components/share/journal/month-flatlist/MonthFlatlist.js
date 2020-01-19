import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { styles } from "./styles/styles";
import { normalize } from "../../../../../../../shared/helpers";
import { Map } from "immutable";
const month_holder_width = normalize(97, "width");

export default class MonthFlatlist extends React.PureComponent {
  month_text_arr = [
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

  month_data = [];

  _flatlistRef = React.createRef();

  start_index = -1;
  start_year = 0;
  start_month = 0;

  state = {
    should_update: 0,
    current_month_index: -1,
    last_month_index: -1
  };

  chooseMonth = month_index => {
    if (this.state.current_month_index !== month_index) {
      let month = this.month_data[month_index].month,
        year = this.month_data[month_index].year;

      this.props.setChosenDateData({ month, year });
    }

    this.setState(
      prevState => ({
        last_month_index: prevState.current_month_index,
        current_month_index: month_index,
        should_update: prevState.should_update + 1
      }),
      () => {
        this.scrollToIndex(month_index);
      }
    );
  };

  scrollToIndex = index => {
    if (this._flatlistRef) {
      this._flatlistRef.scrollToOffset({
        animated: true,
        offset: index * month_holder_width - month_holder_width
      });
    }
  };

  _keyExtractor = (item, index) => `journal-month-panel-month-${index}`;

  _renderItem = ({ item, index }) => {
    return (
      <MonthHolder
        data={item}
        month_index={index}
        current_month_index={this.state.current_month_index}
        last_month_index={this.state.last_month_index}
        chooseMonth={this.chooseMonth}
      />
    );
  };

  initializeMonthData = () => {
    let current_year = new Date().getFullYear(),
      number_of_years_in_between = 4,
      left_end_year = current_year - number_of_years_in_between,
      right_end_year = current_year + number_of_years_in_between;

    for (let year = left_end_year; year <= right_end_year; year++) {
      for (let month = 0; month < 12; month++) {
        let first_day_of_month = new Date(year, month, 1),
          end_day_of_month = new Date(year, month + 1, 0);

        this.month_data.push({
          start_week: this.getWeek(first_day_of_month),
          end_week: this.getWeek(end_day_of_month),
          month,
          year
        });
      }
    }
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

  _getItemLayout = (data, index) => ({
    length: month_holder_width,
    offset: index * month_holder_width,
    index
  });

  setRef = r => {
    this._flatlistRef = r;
  };

  _onScroll = e => {
    let index = Math.floor(
      e.nativeEvent.contentOffset.x / month_holder_width + 1
    );
    if (index < 0) {
      index = 0;
    }
    let string;

    if (this.month_data[index].month >= 0)
      string = `${this.month_data[index].year}`;

    this.props.updateHeaderText(string);
  };

  _onLayout = () => {
    this.scrollToIndex(this.start_index);
  };

  _initialUpdateWithStartIndex = () => {
    let current = new Date();

    let month = current.getMonth();
    let year = current.getFullYear();

    let chosen_month_date_data = Map(this.props.chosenDateData);

    if (
      chosen_month_date_data.has("month") &&
      chosen_month_date_data.has("year")
    ) {
      month = chosen_month_date_data.get("month");
      year = chosen_month_date_data.get("year");
    }

    this.month_data.every((data, index) => {
      if (data.month === month && data.year === year) {
        this.start_index = index;

        this.start_month = data.month;
        this.start_year = data.year;

        this.chooseMonth(this.start_index);

        return false;
      }

      return true;
    });
  };

  _findMonthIndex = (month, year) => {
    let result = 0;
    let current_year = new Date().getFullYear(),
      number_of_years_in_between = 4,
      left_end_year = current_year - number_of_years_in_between;

    for (let y = left_end_year; y <= year; y++) {
      for (let m = 0; m < 12; m++) {
        if (m === month && y === year) {
          return result;
        }

        result += 1;
      }
    }
  };

  _goToMonthAccordingToCreatedTask = () => {
    let correspond_to_create_month_task = Map(
      this.props.correspondToCreatedMonthTask
    );

    let month = correspond_to_create_month_task.get("month"),
      year = correspond_to_create_month_task.get("year");

    this.chooseMonth(this._findMonthIndex(month, year));
    this.props.returnCorrespondCreatedTask(null);
  };

  componentDidMount() {
    this.initializeMonthData();
    this._initialUpdateWithStartIndex();

    if (this.props.correspondToCreatedMonthTask) {
      this._goToMonthAccordingToCreatedTask();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.headerPressed !== prevProps.headerPressed) {
      if (this.props.currentJournalTab === "Month") {
        let date = new Date();
        let year_diff = date.getFullYear() - this.start_year;

        let month_diff = date.getMonth() + year_diff - this.start_month;

        this.start_month = date.getMonth();
        this.start_year = date.getFullYear();

        this.start_index += month_diff;

        this.chooseMonth(this.start_index);
      }
    }

    if (
      this.props.correspondToCreatedMonthTask !==
        prevProps.correspondToCreatedMonthTask &&
      this.props.correspondToCreatedMonthTask !== null
    ) {
      this._goToMonthAccordingToCreatedTask();
    }
  }

  render() {
    return (
      <View
        style={{
          height: normalize(70, "height")
        }}
      >
        <FlatList
          data={this.month_data}
          extraData={this.state.should_update}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          horizontal={true}
          initialScrollIndex={this.start_index}
          getItemLayout={this._getItemLayout}
          ref={this.setRef}
          onScroll={this._onScroll}
          scrollEventThrottle={6}
          showsHorizontalScrollIndicator={false}
          onLayout={this._onLayout}
          windowSize={5}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
        />
      </View>
    );
  }
}

class MonthHolder extends React.Component {
  month_text_arr = [
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

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.month_index === nextProps.current_month_index ||
      this.props.month_index === nextProps.last_month_index
    );
  }

  _onPress = () => {
    this.props.chooseMonth(this.props.month_index);
  };

  render() {
    let month_style = styles.not_chosen_month,
      text_style = styles.not_chosen_month_text,
      inform_text_container_style = styles.not_chosen_inform_text_container,
      inform_text_style = styles.not_chosen_inform_text;

    if (this.props.month_index === this.props.current_month_index) {
      month_style = styles.chosen_month;
      text_style = styles.chosen_month_text;
      inform_text_container_style = styles.chosen_inform_text_container;
      inform_text_style = styles.chosen_inform_text;
    }

    return (
      <TouchableOpacity
        style={{
          marginHorizontal: normalize(7, "width"),
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={this._onPress}
      >
        <View style={month_style}>
          <Text style={text_style}>
            {this.month_text_arr[this.props.data.month]}
          </Text>
        </View>

        <View style={inform_text_container_style}>
          <Text style={inform_text_style}>
            {`week ${this.props.data.start_week} - ${this.props.data.end_week}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
