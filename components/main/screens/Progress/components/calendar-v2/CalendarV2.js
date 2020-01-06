import React from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal
} from "react-native";

import { Map, fromJS, List } from "immutable";

import { styles } from "./styles/styles";

import PremiumAd from "../../../../../shared/components/premium-ad/PremiumAd.Container";

import Schedule from "./schedule/Schedule";

import { normalize } from "../../../../../shared/helpers";
import {
  left_chevron_icon,
  right_chevron_icon
} from "../../../../../shared/icons";
const window_width = Dimensions.get("window").width;
const margin_top_for_calendar_row = normalize(20, "height");
const margin_top_for_month_year_text = normalize(30, "height");

const padding_horizontal_value = normalize(5, "width");

export default class Calendar extends React.PureComponent {
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

  state = {
    should_display_schedule: false,

    month: new Date().getMonth(),
    year: new Date().getFullYear(),

    chart_change_calendar_available: false,

    should_display_premium_ad: false
  };

  _goToPreviousMonth = () => {
    if (this.state.chart_change_calendar_available) {
      let { month, year } = this.state;
      let target_date = new Date(year, month - 1, 1);

      this.setState({
        month: target_date.getMonth(),
        year: target_date.getFullYear()
      });
    } else {
      this._toggleDisplayPremiumAd();
    }
  };

  _goToNextMonth = () => {
    if (this.state.chart_change_calendar_available) {
      let { month, year } = this.state;
      let target_date = new Date(year, month + 1, 1);

      this.setState({
        month: target_date.getMonth(),
        year: target_date.getFullYear()
      });
    } else {
      this._toggleDisplayPremiumAd();
    }
  };

  _setDateData = (month, year) => {
    this.setState(
      {
        month,
        year
      },
      () => {
        this.props._setChosenMonthFromCalendar(month);
        this.props._setChosenYearFromCalendar(year);
      }
    );
  };

  _toggleSchedule = () => {
    if (this.state.chart_change_calendar_available) {
      this.setState(prevState => ({
        should_display_schedule: !prevState.should_display_schedule
      }));
    } else {
      this._toggleDisplayPremiumAd();
    }
  };

  _calculateTotalPointsInMonth = () => {
    let month_timestamp_toString = new Date(this.state.year, this.state.month)
      .getTime()
      .toString();
    let month_chart_stats_map = Map(this.props.month_chart_stats);

    return parseInt(
      month_chart_stats_map.getIn([month_timestamp_toString, "totalPoints"], 0)
    );
  };

  _toggleDisplayPremiumAd = () => {
    this.setState(prevState => ({
      should_display_premium_ad: !prevState.should_display_premium_ad
    }));
  };

  _updateChartChangeCalendarAvailable = () => {
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

    this.setState({
      chart_change_calendar_available
    });
  };

  componentDidMount() {
    this._updateChartChangeCalendarAvailable();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      Map(this.props.generalSettings).getIn(["account", "package", "plan"]) !==
      Map(prevProps.generalSettings).getIn(["account", "package", "plan"])
    ) {
      this._updateChartChangeCalendarAvailable();
    }
  }

  render() {
    let total_points = this._calculateTotalPointsInMonth();
    return (
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: padding_horizontal_value
        }}
      >
        <View
          style={{
            marginTop: normalize(10, "height"),
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text style={styles.point_earned_text}>Points earned:</Text>

          <Text style={styles.points_text}>{total_points}</Text>
        </View>

        <View
          style={{
            marginTop: margin_top_for_month_year_text
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
              onPress={this._goToPreviousMonth}
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
              onPress={this._toggleSchedule}
            >
              <Text style={styles.month_text}>
                {this.month_names[this.state.month]}
              </Text>
              <Text style={styles.year_text}>{this.state.year}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: normalize(24, "width"),
                height: normalize(24, "width"),
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={this._goToNextMonth}
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
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: margin_top_for_calendar_row
          }}
        >
          <WeekText text="Week" />
          <DayText text="M" />
          <DayText text="T" />
          <DayText text="W" />
          <DayText text="T" />
          <DayText text="F" />
          <DayText text="S" />
          <DayText text="S" />
        </View>

        <MonthCalendar
          month={this.state.month}
          year={this.state.year}
          month_chart_stats={this.props.month_chart_stats}
          week_chart_stats={this.props.week_chart_stats}
          day_chart_stats={this.props.day_chart_stats}
        />

        {this.state.should_display_schedule ? (
          <Schedule
            _toggleSchedule={this._toggleSchedule}
            _setDateData={this._setDateData}
            month={this.state.month}
            year={this.state.year}
          />
        ) : null}

        {this.state.should_display_premium_ad ? (
          <PremiumAd
            dismissAction={this._toggleDisplayPremiumAd}
            _goToLogin={this._goToLogin}
          />
        ) : null}
      </View>
    );
  }
}

class MonthCalendar extends React.Component {
  month_timestamp_toString = new Date(this.props.year, this.props.month)
    .getTime()
    .toString();

  state = {
    month_data: [],
    should_flatlist_update: 0
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

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.month !== nextProps.month ||
      this.props.year !== nextProps.year ||
      this.state !== nextState ||
      Map(this.props.month_chart_stats).get(this.month_timestamp_toString) !==
        Map(nextProps.month_chart_stats).get(this.month_timestamp_toString)
    );
  }

  _keyExtractor = (item, index) => {
    if (item.is_week_holder) {
      return `progress-calendar-week-holder-${item.day}-${item.week}-${item.month}-${item.year}`;
    } else {
      if (item.unchosen) {
        return `progress-calendar-unchosen-day-holder-${item.day}-${item.week}-${item.month}-${item.year}`;
      } else {
        return `progress-calendar-day-holder-${item.day}-${item.week}-${item.month}-${item.year}`;
      }
    }
  };

  _renderItem = ({ item, index }) => {
    if (item.is_week_holder) {
      return (
        <WeekHolder
          week_row_data={item}
          week_chart_stats={this.props.week_chart_stats}
        />
      );
    } else {
      if (item.unchosen) {
        return (
          <UnchosenDayHolder
            week_row_data={item}
            day_chart_stats={this.props.day_chart_stats}
          />
        );
      } else {
        return (
          <DayHolder
            week_row_data={item}
            day_chart_stats={this.props.day_chart_stats}
          />
        );
      }
    }
  };

  _updateRenderComponents = (month, year) => {
    let month_data = [],
      render_components = [];

    let first_day_of_month = new Date(year, month, 1),
      number_of_days_from_last_month =
        first_day_of_month.getDay() === 0 ? 6 : first_day_of_month.getDay() - 1,
      first_day_from_last_month = new Date(first_day_of_month),
      last_day_of_month = new Date(year, month + 1, 0),
      number_of_days_from_next_month =
        last_day_of_month.getDay() === 0 ? 0 : 7 - last_day_of_month.getDay(),
      last_day_from_next_month = new Date(last_day_of_month);

    first_day_from_last_month.setDate(
      first_day_of_month.getDate() - number_of_days_from_last_month
    );
    last_day_from_next_month.setDate(
      last_day_of_month.getDate() + number_of_days_from_next_month
    );

    let start_timestamp = first_day_from_last_month.getTime(),
      end_timestamp = this.getMonday(last_day_from_next_month).getTime(),
      tracking_timestamp = start_timestamp,
      number_of_weeks =
        Math.round((end_timestamp - start_timestamp) / (7 * 86400 * 1000)) + 1;

    for (
      let noWeekInMonth = 1;
      noWeekInMonth <= number_of_weeks;
      noWeekInMonth++
    ) {
      let monday = this.getMonday(tracking_timestamp).getTime();

      month_data.push({
        is_week_holder: true,
        week: this.getWeek(new Date(monday)),
        day: new Date(monday).getDate(),
        month,
        year,
        start_year: new Date(monday).getFullYear(),
        start_month: new Date(monday).getMonth(),
        monday: new Date(monday).getDate(),
        noWeekInMonth
      });

      for (let i = 0; i < 7; i++) {
        let date = new Date(i * 86400 * 1000 + monday),
          week = this.getWeek(date);

        if (date.getMonth() !== month) {
          month_data.push({
            unchosen: true,
            day: date.getDate(),
            week,
            month: date.getMonth(),
            year: date.getFullYear(),
            noWeekInMonth: this.getNoWeekInMonth(date)
          });
        } else {
          month_data.push({
            day: date.getDate(),
            week,
            month: date.getMonth(),
            year: date.getFullYear(),
            noWeekInMonth: this.getNoWeekInMonth(date)
          });
        }
      }

      let tracking_date = new Date(tracking_timestamp),
        new_tracking_date = tracking_date;

      new_tracking_date.setDate(tracking_date.getDate() + 7);

      tracking_timestamp = new_tracking_date.getTime();
    }

    this.setState({
      month_data
    });
  };

  componentDidMount() {
    this._updateRenderComponents(this.props.month, this.props.year);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.month !== prevProps.month ||
      this.props.year !== prevProps.year
    ) {
      this._updateRenderComponents(this.props.month, this.props.year);
      this.month_timestamp_toString = new Date(
        this.props.year,
        this.props.month
      )
        .getTime()
        .toString();
    }

    if (
      Map(this.props.month_chart_stats).get(this.month_timestamp_toString) !==
      Map(prevProps.month_chart_stats).get(this.month_timestamp_toString)
    ) {
      this.setState(prevState => ({
        should_flatlist_update: prevState.should_flatlist_update + 1
      }));
    }
  }

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        <FlatList
          data={this.state.month_data}
          extraData={this.state.should_flatlist_update}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          numColumns={8}
          scrollEnabled={false}
        />
      </View>
    );
  }
}

class WeekHolder extends React.Component {
  year = this.props.week_row_data.start_year;
  month = this.props.week_row_data.start_month;
  day = this.props.week_row_data.monday;
  week_timestamp_toString = new Date(this.year, this.month, this.day)
    .getTime()
    .toString();

  shouldComponentUpdate(nextProps, nextState) {
    return (
      Map(this.props.week_chart_stats).get(this.week_timestamp_toString) !==
      Map(nextProps.week_chart_stats).get(this.week_timestamp_toString)
    );
  }

  _calculateTotalPointsWeek = () => {
    let week_chart_stats_map = Map(this.props.week_chart_stats);

    return parseInt(
      week_chart_stats_map.getIn([this.week_timestamp_toString, "totalPoints"])
    );
  };

  render() {
    let total_points = this._calculateTotalPointsWeek(),
      should_render_point_banner = false;

    if (!total_points) {
      total_points = 0;
      should_render_point_banner = false;
    } else {
      should_render_point_banner = true;
    }

    return (
      <View
        style={{
          width: (window_width - 2 * padding_horizontal_value) / 8,
          alignItems: "center",
          marginTop: margin_top_for_calendar_row
        }}
      >
        {should_render_point_banner ? (
          <View style={styles.point_banner}>
            <View style={styles.time_informer_container}>
              <Text style={styles.week_text}>
                {this.props.week_row_data.week}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginHorizontal: normalize(3, "width"),
                justifyContent: "center",
                marginBottom: normalize(5, "height")
              }}
            >
              <Text style={styles.point_text_white}>{total_points}</Text>

              <Text style={styles.point_text_white}>pt</Text>
            </View>
          </View>
        ) : (
          <View style={styles.time_informer_container}>
            <Text style={styles.week_text}>
              {this.props.week_row_data.week}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

class DayHolder extends React.Component {
  year = this.props.week_row_data.year;
  month = this.props.week_row_data.month;
  day = this.props.week_row_data.day;
  day_timestamp_toString = new Date(this.year, this.month, this.day)
    .getTime()
    .toString();

  state = {
    round_day_container_style: styles.not_chosen_round_day_container
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      Map(this.props.day_chart_stats).get(this.day_timestamp_toString) !==
      Map(nextProps.day_chart_stats).get(this.day_timestamp_toString)
    );
  }

  _calculateTotalPointsDay = () => {
    let day_chart_stats_map = Map(this.props.day_chart_stats);

    return parseInt(
      day_chart_stats_map.getIn([this.day_timestamp_toString, "totalPoints"])
    );
  };

  render() {
    let current_date = new Date(),
      current_day = current_date.getDate(),
      current_month = current_date.getMonth(),
      current_year = current_date.getFullYear();

    let day_text_style = styles.not_chosen_day_text;

    if (
      current_day === this.props.week_row_data.day &&
      current_month === this.props.week_row_data.month &&
      current_year === this.props.week_row_data.year
    ) {
      day_text_style = styles.chosen_day_text;
    }

    let total_points = this._calculateTotalPointsDay(),
      should_render_point_banner = false;

    if (!total_points) {
      total_points = 0;
      should_render_point_banner = false;
    } else {
      should_render_point_banner = true;
    }

    return (
      <View
        style={{
          width: (window_width - 2 * padding_horizontal_value) / 8,
          alignItems: "center",
          marginTop: margin_top_for_calendar_row
        }}
      >
        {should_render_point_banner ? (
          <View style={styles.point_banner}>
            <View style={styles.time_informer_container}>
              <Text style={day_text_style}>{this.props.week_row_data.day}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginHorizontal: normalize(3, "width"),
                justifyContent: "center",
                marginBottom: normalize(5, "height")
              }}
            >
              <Text style={styles.point_text_white}>{total_points}</Text>

              <Text style={styles.point_text_white}>pt</Text>
            </View>
          </View>
        ) : (
          <View style={styles.time_informer_container}>
            <Text style={day_text_style}>{this.props.week_row_data.day}</Text>
          </View>
        )}
      </View>
    );
  }
}

class UnchosenDayHolder extends React.Component {
  year = this.props.week_row_data.year;
  month = this.props.week_row_data.month;
  day = this.props.week_row_data.day;
  day_timestamp_toString = new Date(this.year, this.month, this.day)
    .getTime()
    .toString();

  shouldComponentUpdate(nextProps, nextState) {
    return (
      Map(this.props.day_chart_stats).get(this.day_timestamp_toString) !==
      Map(nextProps.day_chart_stats).get(this.day_timestamp_toString)
    );
  }

  _calculateTotalPointsDay = () => {
    let day_chart_stats_map = Map(this.props.day_chart_stats);

    return parseInt(
      day_chart_stats_map.getIn([this.day_timestamp_toString, "totalPoints"])
    );
  };

  render() {
    let total_points = this._calculateTotalPointsDay(),
      should_render_point_banner = false;

    if (!total_points) {
      total_points = 0;
      should_render_point_banner = false;
    } else {
      should_render_point_banner = true;
    }

    return (
      <View
        style={{
          width: (window_width - 2 * padding_horizontal_value) / 8,
          alignItems: "center",
          marginTop: margin_top_for_calendar_row
        }}
      >
        {should_render_point_banner ? (
          <View style={styles.point_banner}>
            <View style={styles.time_informer_container}>
              <Text style={styles.cannot_choose_day_text}>
                {this.props.week_row_data.day}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginHorizontal: normalize(3, "width"),
                justifyContent: "center",
                marginBottom: normalize(5, "height")
              }}
            >
              <Text style={styles.point_text_white}>{total_points}</Text>

              <Text style={styles.point_text_white}>pt</Text>
            </View>
          </View>
        ) : (
          <View style={styles.time_informer_container}>
            <Text style={styles.cannot_choose_day_text}>
              {this.props.week_row_data.day}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

class DayText extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          height: normalize(32, "height"),
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={styles.day_text_absolute}>{this.props.text}</Text>
      </View>
    );
  }
}

class WeekText extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          height: normalize(32, "height"),
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={styles.week_text_absolute}>{this.props.text}</Text>
      </View>
    );
  }
}
