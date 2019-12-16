import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Dimensions
} from "react-native";
import { StackedBarChart, YAxis, Grid } from "react-native-svg-charts";
import { Map, List } from "immutable";
import { styles } from "./styles/styles";

import WeekCalendar from "./week-calendar/WeekCalendar";
import PremiumAd from "../../../../../../shared/components/premium-ad/PremiumAd.Container";
import { normalize } from "../../../../../../shared/helpers";
const window_width = Dimensions.get("window").width;

export default class WeekChartHolder extends React.PureComponent {
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
    monday: 0,
    sunday: 0,
    week: 0,
    start_month: 0,
    end_month: 0,
    month: 0,
    start_year: 0,
    end_year: 0,
    year: 0,
    start_noWeekInMonth: 0,
    end_noWeekInMonth: 0,
    should_display_premium_ad: false,
    chart_change_calendar_available: false
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

  _toggleCalendar = () => {
    this.setState(prevState => ({
      should_active_calendar: !prevState.should_active_calendar
    }));
  };

  _setCalendarData = (
    monday,
    sunday,
    week,
    start_month,
    end_month,
    month,
    start_year,
    end_year,
    year,
    start_noWeekInMonth,
    end_noWeekInMonth
  ) => {
    this.setState(
      {
        monday,
        sunday,
        week,
        start_month,
        end_month,
        month,
        start_year,
        end_year,
        year,
        start_noWeekInMonth,
        end_noWeekInMonth
      },
      () => {
        setTimeout(this._updateWeekChartData, 50);
      }
    );
  };

  _initChartData = () => {
    let chart_data = [];

    for (let i = 0; i < 7; i++) {
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
    // let closet_max = 0,
    //     diff_with_ten = this.y_max % 10

    // closet_max = this.y_max + (10 - diff_with_ten)

    if (this.y_max <= 5) {
      this.number_of_ticks = this.y_max;
    } else {
      this.number_of_ticks = 4;
    }

    this.y_data = [0, this.y_max];
  };

  _updateWeekChartData = () => {
    let { monday, start_month, start_year } = this.state,
      week_timestamp_toString = new Date(start_year, start_month, monday)
        .getTime()
        .toString(),
      chart_data = this._initChartData(),
      week_chart_stats_map = Map(this.props.week_chart_stats);

    this.y_max = 0;

    if (week_chart_stats_map.hasIn([week_timestamp_toString, "current"])) {
      let current = List(
        week_chart_stats_map.getIn([week_timestamp_toString, "current"])
      );

      this.y_max = current.reduce((total, value) => total + value);
    }

    if (
      week_chart_stats_map.hasIn([
        week_timestamp_toString,
        "completed_priority_array"
      ])
    ) {
      let completed_priority_array = List(
        week_chart_stats_map.getIn([
          week_timestamp_toString,
          "completed_priority_array"
        ])
      );

      completed_priority_array.forEach((day_completed_array, day_index) => {
        let index = day_index - 1;
        if (day_index === 0) {
          index = 6;
        }

        chart_data[index] = {
          pri_04: List(day_completed_array).get(3),
          pri_03: List(day_completed_array).get(2),
          pri_02: List(day_completed_array).get(1),
          pri_01: List(day_completed_array).get(0)
        };
      });
    }

    this._updateYDataAndChartData();

    this.setState({
      chart_data
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    let { monday, start_month, start_year } = this.state,
      week_timestamp_toString = new Date(start_year, start_month, monday)
        .getTime()
        .toString();

    return (
      this.state !== nextState ||
      Map(this.props.week_chart_stats).get(week_timestamp_toString) !==
        Map(nextProps.week_chart_stats).get(week_timestamp_toString)
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
      monday = this.getMonday(current_date),
      sunday = new Date(monday),
      chart_data = this._initChartData();

    sunday.setDate(monday.getDate() + 6);

    let week = this.getWeek(current_date),
      start_month = monday.getMonth(),
      end_month = sunday.getMonth(),
      month = current_date.getMonth(),
      start_year = monday.getFullYear(),
      end_year = sunday.getFullYear(),
      year = current_date.getFullYear(),
      start_noWeekInMonth = this.getNoWeekInMonth(monday),
      end_noWeekInMonth = this.getNoWeekInMonth(sunday);

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
        monday: monday.getDate(),
        sunday: sunday.getDate(),
        week,
        start_month,
        end_month,
        month,
        start_year,
        end_year,
        year,
        start_noWeekInMonth,
        end_noWeekInMonth,
        chart_data,
        chart_change_calendar_available
      },
      () => {
        setTimeout(this._updateWeekChartData, 50);
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.week_chart_stats !== prevProps.week_chart_stats) {
      this._updateWeekChartData();
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
          <Text style={styles.chosen_week_text}>
            {`${this.month_names[this.state.start_month]} ${
              this.state.monday
            } ${this.state.start_year} - ${
              this.month_names[this.state.end_month]
            } ${this.state.sunday} ${this.state.end_year}`}
          </Text>
        </TouchableOpacity>

        {this.state.chart_change_calendar_available ? (
          <>
            {this.state.should_active_calendar ? (
              <Modal transparent={true}>
                <View
                  style={{
                    flex: 1,
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableWithoutFeedback onPress={this._toggleCalendar}>
                    <View
                      style={{
                        flex: 1,
                        width: window_width,
                        backgroundColor: "black",
                        opacity: 0.2
                      }}
                    ></View>
                  </TouchableWithoutFeedback>

                  <WeekCalendar
                    hideAction={this._toggleCalendar}
                    _setCalendarData={this._setCalendarData}
                    chosen_month={this.state.month}
                    start_month={this.state.start_month}
                    end_month={this.state.end_month}
                    year={this.state.year}
                    start_noWeekInMonth={this.state.start_noWeekInMonth}
                    end_noWeekInMonth={this.state.end_noWeekInMonth}
                  />
                </View>
              </Modal>
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
                flex: 1
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
          <XAxis />
        </View>
      </View>
    );
  }
}

class XAxis extends React.PureComponent {
  render() {
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
        <XAxisDayTextHolder day_text="Mon" />
        <XAxisDayTextHolder day_text="Tue" />
        <XAxisDayTextHolder day_text="Wed" />
        <XAxisDayTextHolder day_text="Thu" />
        <XAxisDayTextHolder day_text="Fri" />
        <XAxisDayTextHolder day_text="Sat" />
        <XAxisDayTextHolder day_text="Sun" />
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
          justifyContent: "center",
          alignItems: "center",
          marginTop: normalize(10, "height")
        }}
      >
        <Text style={styles.day_text}>{this.props.day_text}</Text>
      </View>
    );
  }
}
