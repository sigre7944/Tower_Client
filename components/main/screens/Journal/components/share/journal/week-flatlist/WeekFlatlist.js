import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { styles } from "./styles/styles";
import { normalize } from "../../../../../../../shared/helpers";
const week_holder_width = normalize(102, "width");
export default class WeekFlatlist extends React.Component {
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

  week_data = [];

  start_index = 0;

  state = {
    should_update: 0,

    current_week_index: 0,
    last_week_index: 0
  };

  chooseWeek = week_index => {
    this.setState(
      prevState => ({
        last_week_index: prevState.current_week_index,
        current_week_index: week_index,

        should_update: prevState.should_update + 1
      }),
      () => {
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
        } = this.week_data[week_index];

        this.props.setChosenDateData({
          monday,
          sunday,
          week,
          start_month,
          end_month,
          start_year,
          end_year,
          start_noWeekInMonth,
          end_noWeekInMonth
        });

        this.scrollToIndex(week_index);
      }
    );
  };

  scrollToIndex = index => {
    if (this._flatlistRef) {
      this._flatlistRef.scrollToOffset({
        animated: true,
        offset: index * week_holder_width - week_holder_width
      });
    }
  };

  _keyExtractor = (item, index) => `week-${index}`;

  _renderItem = ({ item, index }) => {
    return (
      <WeekHolder
        data={item}
        week_index={index}
        current_week_index={this.state.current_week_index}
        last_week_index={this.state.last_week_index}
        chooseWeek={this.chooseWeek}
      />
    );
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

  initializeWeekData = () => {
    let current_year = new Date().getFullYear(),
      number_of_years_in_between = 4,
      left_end_year = current_year - number_of_years_in_between,
      right_end_year = current_year + number_of_years_in_between,
      first_day_of_left_end_year = new Date(left_end_year, 0, 1),
      last_day_of_right_end_year = new Date(right_end_year, 12, 0),
      tracked_timestamp = first_day_of_left_end_year.getTime();

    while (tracked_timestamp <= last_day_of_right_end_year.getTime()) {
      let monday = this.getMonday(tracked_timestamp),
        sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      this.week_data.push({
        week: this.getWeek(monday),
        start_month: monday.getMonth(),
        end_month: sunday.getMonth(),
        start_year: monday.getFullYear(),
        end_year: sunday.getFullYear(),
        start_noWeekInMonth: this.getNoWeekInMonth(monday),
        end_noWeekInMonth: this.getNoWeekInMonth(sunday),
        monday: monday.getDate(),
        sunday: sunday.getDate()
      });

      tracked_timestamp = sunday.getTime() + 86400 * 1000;
    }
  };

  _getItemLayout = (data, index) => ({
    length: week_holder_width,
    offset: index * week_holder_width,
    index
  });

  setRef = r => {
    this._flatlistRef = r;
  };

  _onScroll = e => {
    let index = Math.floor(
      e.nativeEvent.contentOffset.x / week_holder_width + 1
    );
    if (index < 0) {
      index = 0;
    }

    let string = `${this.month_text_arr[this.week_data[index].start_month]} - ${
      this.week_data[index].start_year
    }`;

    this.props.updateHeaderText(string);
  };

  _onLayout = () => {
    this.scrollToIndex(this.start_index);
  };

  componentDidMount() {
    this.initializeWeekData();

    let current_week = this.getWeek(new Date()),
      current_year = new Date().getFullYear();

    this.week_data.every((data, index) => {
      if (data.week === current_week && data.start_year === current_year) {
        this.start_index = index;

        this.chooseWeek(this.start_index);

        return false;
      }

      return true;
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.headerPressed !== prevProps.headerPressed) {
      if (this.props.currentRoute === "Week") {
        this.chooseWeek(this.start_index);
      }
    }

    if (this.props.currentRoute !== prevProps.currentRoute) {
      if (this.props.currentRoute === "Week") {
        let string = `${
          this.month_text_arr[
            this.week_data[this.state.current_week_index].start_month
          ]
        } - ${this.week_data[this.state.current_week_index].start_year}`;

        this.props.updateHeaderText(string);
      }
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
          data={this.week_data}
          extraData={this.state.should_update}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          horizontal={true}
          initialScrollIndex={this.start_index}
          getItemLayout={this._getItemLayout}
          ref={this.setRef}
          onScroll={this._onScroll}
          scrollEventThrottle={5}
          // removeClippedSubviews={true}
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

class WeekHolder extends React.Component {
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

  state = {
    week_style: styles.not_chosen_week,
    text_style: styles.not_chosen_week_text,
    inform_text_style: styles.not_chosen_inform_text,
    inform_text_container_style: styles.not_chosen_inform_text_container
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.week_index === nextProps.current_week_index ||
      this.props.week_index === nextProps.last_week_index
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.week_index === nextProps.current_week_index) {
      return {
        week_style: styles.chosen_week,
        text_style: styles.chosen_week_text,
        inform_text_style: styles.chosen_inform_text,
        inform_text_container_style: styles.chosen_inform_text_container
      };
    } else if (nextProps.week_index === nextProps.last_week_index) {
      return {
        week_style: styles.not_chosen_week,
        text_style: styles.not_chosen_week_text,
        inform_text_style: styles.not_chosen_inform_text,
        inform_text_container_style: styles.not_chosen_inform_text_container
      };
    }

    return null;
  }

  _onPress = () => {
    this.props.chooseWeek(this.props.week_index);
  };

  render() {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: normalize(7, "width"),
          justifyContent: "center",
          alignItems: "center",
          width: normalize(88, "width"),
          backgroundColor: "white"
        }}
        onPress={this._onPress}
      >
        <View style={this.state.week_style}>
          <Text style={this.state.text_style}>
            {`Week ${this.props.data.week}`}
          </Text>
        </View>

        <View style={this.state.inform_text_container_style}>
          <Text style={this.state.inform_text_style}>
            {`${this.props.data.monday} ${
              this.month_text_arr[this.props.data.start_month]
            } - ${this.props.data.sunday} ${
              this.month_text_arr[this.props.data.end_month]
            }`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
