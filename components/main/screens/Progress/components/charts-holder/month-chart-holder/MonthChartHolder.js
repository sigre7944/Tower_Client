import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  ScrollView
} from "react-native";
import { StackedBarChart, YAxis, Grid } from "react-native-svg-charts";
import { Map, List } from "immutable";
import { styles } from "./styles/styles";

import MonthCalendar from "./month-calendar/MonthCalendar";

import PremiumAd from "../../../../../../shared/components/premium-ad/PremiumAd.Container";
import { normalize } from "../../../../../../shared/helpers";
const window_width = Dimensions.get("window").width;

export default class MonthChartHolder extends React.Component {
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
  y_data = [];
  number_of_ticks = 0;
  y_max = 0;

  colors = ["#CBC8C8", "#6F73D9", "#EFDA6E", "#F78096"];
  keys = ["pri_04", "pri_03", "pri_02", "pri_01"];

  state = {
    chart_data: [],
    should_active_calendar: false,
    chart_change_calendar_available: false,
    month: 0,
    year: 0,
    should_display_premium_ad: false
  };

  _setCalendarData = (month, year) => {
    this.setState(
      {
        month,
        year,
        chart_data: []
      },
      () => {
        let last_day_in_month = new Date(
            this.state.year,
            this.state.month + 1,
            0
          ).getDate(),
          chart_data = this._initChartData(last_day_in_month);
        this.setState(
          {
            chart_data
          },
          () => {
            setTimeout(this._updateMonthChartData, 50);
          }
        );
      }
    );
  };

  _toggleCalendar = () => {
    this.setState(prevState => ({
      should_active_calendar: !prevState.should_active_calendar
    }));
  };

  _initChartData = length => {
    let chart_data = [];
    for (let i = 0; i < length; i++) {
      chart_data.push({
        pri_04: 0,
        pri_03: 0,
        pri_02: 0,
        pri_01: 0
      });
    }

    return chart_data;
  };

  _updateYDataAndChartData = () => {
    if (this.y_max <= 5) {
      this.number_of_ticks = this.y_max;
    } else {
      this.number_of_ticks = 4;
    }

    this.y_data = [0, this.y_max];
  };

  _findYMax = () => {
    let { month, year } = this.state,
      month_timestamp_toString = new Date(year, month).getTime().toString();

    let month_chart_stats = Map(this.props.month_chart_stats),
      completed_priority_array = List(
        month_chart_stats.getIn([
          month_timestamp_toString,
          "completed_priority_array"
        ])
      ).toArray();

    let sum_value_by_day_completed_priority_array = completed_priority_array.map(
      (day_in_month_array, index) =>
        day_in_month_array.reduce((total, value) => total + value)
    );

    return Math.max.apply(null, sum_value_by_day_completed_priority_array);
  };

  _updateMonthChartData = () => {
    let { month, year } = this.state,
      month_timestamp_toString = new Date(year, month).getTime().toString(),
      last_day_in_month = new Date(year, month + 1, 0).getDate(),
      chart_data = this._initChartData(last_day_in_month),
      month_chart_stats_map = Map(this.props.month_chart_stats);

    this.y_max = this._findYMax();

    if (
      month_chart_stats_map.hasIn([
        month_timestamp_toString,
        "completed_priority_array"
      ])
    ) {
      let completed_priority_array = List(
        month_chart_stats_map.getIn([
          month_timestamp_toString,
          "completed_priority_array"
        ])
      );

      completed_priority_array.forEach(
        (day_completed_array, day_in_month_index) => {
          chart_data[day_in_month_index] = {
            pri_04: List(day_completed_array).get(3),
            pri_03: List(day_completed_array).get(2),
            pri_02: List(day_completed_array).get(1),
            pri_01: List(day_completed_array).get(0)
          };
        }
      );
    }

    this._updateYDataAndChartData();

    this.setState({
      chart_data
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    let { month, year } = this.state,
      month_timestamp_toString = new Date(year, month).getTime().toString();

    return (
      this.state !== nextState ||
      Map(this.props.month_chart_stats).get(month_timestamp_toString) !==
        Map(nextProps.month_chart_stats).get(month_timestamp_toString)
    );
  }

  _toggleShouldDisplayPremiumAd = () => {
    this.setState(prevState => ({
      should_display_premium_ad: !prevState.should_display_premium_ad
    }));
  };

  _goToLogin = () => {
    this.setState(
      {
        should_display_premium_ad: false
      },
      () => {
        this.props.navigation.navigate("SignInScreen");
      }
    );
  };

  componentDidMount() {
    let current_date = new Date(),
      last_day_in_month = new Date(
        current_date.getFullYear(),
        current_date.getMonth() + 1,
        0
      ).getDate(),
      chart_data = this._initChartData(last_day_in_month);

    let plan = Map(this.props.generalSettings).getIn([
        "account",
        "package",
        "plan"
      ]),
      chart_change_calendar_available = Map(this.props.generalSettings).getIn([
        "package_limitations",
        plan,
        "chart_change_calendar_available"
      ]);

    this.setState(
      {
        month: current_date.getMonth(),
        year: current_date.getFullYear(),
        chart_data,
        chart_change_calendar_available
      },
      () => {
        setTimeout(this._updateMonthChartData, 50);
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.month_chart_stats !== prevProps.month_chart_stats) {
      this._updateMonthChartData();
    }

    if (
      Map(this.props.generalSettings).getIn(["account", "package", "plan"]) !==
      Map(prevProps.generalSettings).getIn(["account", "package", "plan"])
    ) {
      let plan = Map(this.props.generalSettings).getIn([
          "account",
          "package",
          "plan"
        ]),
        chart_change_calendar_available = Map(
          this.props.generalSettings
        ).getIn([
          "package_limitations",
          plan,
          "chart_change_calendar_available"
        ]);

      this.setState({
        chart_change_calendar_available
      });
    }
  }

  render() {
    return (
      <View
        style={{
          alignItems: "center",
          width: window_width
        }}
      >
        <TouchableOpacity
          onPress={
            this.state.chart_change_calendar_available
              ? this._toggleCalendar
              : this._toggleShouldDisplayPremiumAd
          }
        >
          <Text style={styles.chosen_month_text}>
            {`${this.month_names[this.state.month]} ${this.state.year}`}
          </Text>
        </TouchableOpacity>

        {this.state.chart_change_calendar_available ? (
          <>
            {this.state.should_active_calendar ? (
              <MonthCalendar
                hideAction={this._toggleCalendar}
                _setCalendarData={this._setCalendarData}
                month={this.state.month}
                year={this.state.year}
              />
            ) : null}
          </>
        ) : (
          <>
            {this.state.should_display_premium_ad ? (
              <PremiumAd
                dismissAction={this._toggleShouldDisplayPremiumAd}
                _goToLogin={this._goToLogin}
              />
            ) : null}
          </>
        )}

        <View
          style={{
            marginTop: normalize(30, "height"),
            width: window_width
          }}
          horizontal={true}
        >
          <View
            style={{
              flexDirection: "row",
              height: normalize(320, "height"),
              flex: 1,
              marginHorizontal: normalize(10, "width")
            }}
          >
            <YAxis
              style={{
                width: normalize(30, "width")
              }}
              data={this.y_data}
              numberOfTicks={this.number_of_ticks}
              contentInset={{
                top: normalize(7, "height"),
                bottom: normalize(5, "height")
              }}
              svg={styles.y_axis_text}
            />
            <StackedBarChart
              style={{
                flex: 1,
                height: normalize(320, "height")
              }}
              keys={this.keys}
              colors={this.colors}
              data={this.state.chart_data}
              animate={true}
              animationDuration={400}
              contentInset={{
                top: normalize(7, "height"),
                bottom: 0
              }}
              spacingInner={0.05}
            >
              <Grid />
            </StackedBarChart>
          </View>
          <XAxis year={this.state.year} month={this.state.month} />
        </View>
      </View>
    );
  }
}

class XAxis extends React.PureComponent {
  render() {
    let number_of_days_in_month = new Date(
        this.props.year,
        this.props.month + 1,
        0
      ).getDate(),
      day_array = [];

    for (let i = 1; i <= number_of_days_in_month; i++) {
      // if (i === 1 || i === 15 || i === 30 || i === number_of_days_in_month) {
      //     day_array.push(
      //         <XAxisDayTextHolder
      //             key={`x-axis-day-text-${i}`}
      //             day_text={i}
      //         />
      //     )
      // }

      // else {
      //     day_array.push(
      //         <XAxisDayTextHolder
      //             key={`x-axis-day-text-${i}`}
      //         />
      //     )
      // }

      if (i % 2 === 0) {
        day_array.push(
          <XAxisDayTextHolder
            key={`x-axis-day-text-${i}`}
            day_text={i}
            below={true}
          />
        );
      } else {
        day_array.push(
          <XAxisDayTextHolder key={`x-axis-day-text-${i}`} day_text={i} />
        );
      }
    }
    return (
      <View
        style={{
          flexDirection: "row",
          marginLeft: normalize(40, "width"),
          marginRight: normalize(10, "width"),
          borderTopWidth: 1,
          borderColor: "#05838B"
        }}
      >
        {day_array}
      </View>
    );
  }
}

class XAxisDayTextHolder extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: this.props.below
            ? normalize(30, "height")
            : normalize(10, "height")
        }}
      >
        <Text style={styles.day_in_month_text}>{this.props.day_text}</Text>
      </View>
    );
  }
}
