import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { styles } from "./styles/styles";

import { normalize } from "../../../../../../../shared/helpers";
import { Map } from "immutable";

const day_holder_width = normalize(64, "width"); // each dayholder has a width of 64 (width = 50, marginHorizontal = 7)

export default class DayFlatlist extends React.PureComponent {
  day_data = [];

  month = new Date().getMonth();
  year = new Date().getFullYear();

  day_text_arr = ["S", "M", "T", "W", "T", "F", "S"];
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

  _flatlistRef = React.createRef();

  start_index = -1;
  start_timestamp = 0;

  state = {
    should_update: 0,

    current_day_index: -1,
    last_day_index: -1
  };

  chooseDay = day_index => {
    if (this.state.current_day_index !== day_index) {
      let day = this.day_data[day_index].day,
        month = this.day_data[day_index].month,
        year = this.day_data[day_index].year;

      this.props.setChosenDateData({ day, month, year });
    }

    this.setState(
      prevState => ({
        last_day_index: prevState.current_day_index,
        current_day_index: day_index,

        should_update: prevState.should_update + 1
      }),
      () => {
        this.scrollToIndex(day_index);
      }
    );
  };

  scrollToIndex = index => {
    if (this._flatlistRef) {
      this._flatlistRef.scrollToOffset({
        animated: true,
        offset: index * day_holder_width - day_holder_width
      });
    }
  };

  _keyExtractor = (item, index) => `journal-day-panel-day-${index}`;

  _renderItem = ({ item, index }) => {
    return (
      <DayHolder
        data={item}
        current_day_index={this.state.current_day_index}
        last_day_index={this.state.last_day_index}
        day_index={index}
        chooseDay={this.chooseDay}
      />
    );
  };

  _getItemLayout = (data, index) => ({
    length: day_holder_width,
    offset: index * day_holder_width,
    index
  });

  setRef = r => {
    this._flatlistRef = r;
  };

  _onScroll = e => {
    let index = Math.floor(
      e.nativeEvent.contentOffset.x / day_holder_width + 1
    );
    if (index < 0) {
      index = 0;
    }

    let string = `${this.month_text_arr[this.day_data[index].month]} - ${
      this.day_data[index].year
    }`;

    this.props.updateHeaderText(string);
  };

  initializeDayData = () => {
    let current_year = new Date().getFullYear(),
      number_of_years_in_between = 4,
      left_end_year = current_year - number_of_years_in_between,
      right_end_year = current_year + number_of_years_in_between;

    for (let year = left_end_year; year <= right_end_year; year++) {
      for (let month = 0; month < 12; month++) {
        let first_day_of_month = 1,
          last_day_of_month = new Date(year, month + 1, 0).getDate();

        for (let day = first_day_of_month; day <= last_day_of_month; day++) {
          this.day_data.push({
            day,
            month,
            year,
            day_text: this.day_text_arr[new Date(year, month, day).getDay()]
          });
        }
      }
    }
  };

  _findDayIndex = (day, month, year) => {
    let result = 0;
    let number_of_years_in_between = 4;
    let left_end_year = new Date().getFullYear() - number_of_years_in_between;

    for (let y = left_end_year; y <= year; y++) {
      for (let m = 0; m < 12; m++) {
        let last_day_in_month = new Date(y, m + 1, 0).getDate();

        for (let d = 1; d <= last_day_in_month; d++) {
          if (m === month && d === day && y === year) {
            return result;
          }
          result += 1;
        }
      }
    }
  };

  _onLayout = () => {
    this.scrollToIndex(this.start_index);
  };

  _initialUpdateWithStartIndex = () => {
    let day = new Date().getDate(),
      month = new Date().getMonth(),
      year = new Date().getFullYear();

    this.day_data.every((data, index) => {
      if (data.day === day && data.month === month && data.year === year) {
        this.start_index = index;

        this.start_timestamp = new Date(year, month, day).getTime();

        this.chooseDay(this.start_index);

        return false;
      }

      return true;
    });
  };

  componentDidMount() {
    this.initializeDayData();

    this._initialUpdateWithStartIndex();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.headerPressed !== prevProps.headerPressed) {
      if (this.props.currentRoute === "Day") {
        let current_date = new Date();
        let current_timestamp = Date.now();

        let day_diff = Math.floor(
          (current_timestamp - this.start_timestamp) / (86400 * 1000)
        );

        this.start_timestamp = new Date(
          current_date.getFullYear(),
          current_date.getMonth(),
          current_date.getDate()
        ).getTime();

        this.start_index += day_diff;

        this.chooseDay(this.start_index);
      }
    }

    if (this.props.currentRoute !== prevProps.currentRoute) {
      if (this.props.currentRoute === "Day") {
        let string;

        if (this.day_data[this.state.current_day_index].month >= 0) {
          string = `${
            this.month_text_arr[
              this.day_data[this.state.current_day_index].month
            ]
          } - ${this.day_data[this.state.current_day_index].year}`;

          this.props.updateHeaderText(string);
        }
      }
    }

    if (
      this.props.correspondToCreatedDayTask !==
      prevProps.correspondToCreatedDayTask
    ) {
      let correspond_to_create_day_task = Map(
        this.props.correspondToCreatedDayTask
      );
      let day = correspond_to_create_day_task.get("day");
      let month = correspond_to_create_day_task.get("month");
      let year = correspond_to_create_day_task.get("year");
      let day_index = this._findDayIndex(day, month, year);

      this.chooseDay(day_index);
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
          data={this.day_data}
          extraData={this.state.should_update}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          horizontal={true}
          initialScrollIndex={this.start_index}
          getItemLayout={this._getItemLayout}
          ref={this.setRef}
          onScroll={this._onScroll}
          scrollEventThrottle={5}
          showsHorizontalScrollIndicator={false}
          onLayout={this._onLayout}
          windowSize={7}
          maxToRenderPerBatch={7}
          initialNumToRender={7}
        />
      </View>
    );
  }
}

class DayHolder extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.day_index === nextProps.current_day_index ||
      this.props.day_index === nextProps.last_day_index
    );
  }

  _onPress = () => {
    this.props.chooseDay(this.props.day_index);
  };

  render() {
    let day_style = styles.not_chosen_day,
      text_style = styles.not_chosen_text,
      day_text_style = styles.not_chosen_day_text;

    if (this.props.day_index === this.props.current_day_index) {
      day_style = styles.chosen_day;
      text_style = styles.chosen_text;
      day_text_style = styles.chosen_day_text;
    }

    return (
      <TouchableOpacity
        style={{
          marginHorizontal: normalize(7, "width"),
          justifyContent: "center",
          alignItems: "center",
          width: normalize(50, "width")
        }}
        onPress={this._onPress}
      >
        <Text style={day_text_style}>{this.props.data.day_text}</Text>

        <View style={day_style}>
          <Text style={text_style}>{this.props.data.day}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
