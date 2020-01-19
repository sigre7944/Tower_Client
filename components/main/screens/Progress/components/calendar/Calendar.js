import React from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";

import { Map, fromJS, List } from "immutable";

import { styles } from "./styles/styles";

import PremiumAd from "../../../../../shared/components/premium-ad/PremiumAd.Container";
import { normalize } from "../../../../../shared/helpers";
import {
  left_chevron_icon,
  right_chevron_icon
} from "../../../../../shared/icons";
const panel_width = Dimensions.get("window").width;
const margin_top_for_calendar_row = normalize(20, "height");
const margin_top_for_month_year_text = normalize(30, "height");

export default class Calendar extends React.PureComponent {
  year_in_between = 4;

  current_year = new Date().getFullYear();
  current_month = new Date().getMonth();

  left_end_year = this.current_year - this.year_in_between;
  right_end_year = this.current_year + this.year_in_between;

  present_month_index = -1;

  month_data = [];

  start_index = 0;

  state = {
    should_flatlist_update: 0,
    chart_change_calendar_available: false,
    should_display_premium_ad: false
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

  _keyExtractor = (item, index) => `progress-calendar-month-${index}`;

  _renderItem = ({ item, index }) => {
    return (
      <MonthHolder
        data={item}
        month_index={index}
        scrollToMonth={this.scrollToMonth}
        present_month_index={this.present_month_index}
        day_chart_stats={this.props.day_chart_stats}
        week_chart_stats={this.props.week_chart_stats}
        month_chart_stats={this.props.month_chart_stats}
        chart_change_calendar_available={
          this.state.chart_change_calendar_available
        }
        _toggleDisplayPremiumAd={this._toggleDisplayPremiumAd}
      />
    );
  };

  getMonday = date => {
    let dayInWeek = new Date(date).getDay();
    let diff = dayInWeek === 0 ? 6 : dayInWeek - 1;
    return new Date(new Date(date).getTime() - diff * 86400 * 1000);
  };

  initMonthData = () => {
    let counter = 0;

    for (let year = this.left_end_year; year <= this.right_end_year; year++) {
      for (let month = 0; month < 12; month++) {
        if (month === this.current_month && year === this.current_year) {
          this.present_month_index = counter;
          this.start_index = counter;
        }

        this.month_data.push({
          month,
          year
        });

        counter += 1;
      }
    }

    this.setState(prevState => ({
      should_flatlist_update: prevState.should_flatlist_update + 1
    }));
  };

  _getItemLayout = (data, index) => ({
    length: panel_width,
    offset: panel_width * index,
    index
  });

  _onMomentumScrollEnd = ({ nativeEvent }) => {
    let number_of_months = Math.floor(
      nativeEvent.contentOffset.x / panel_width
    );

    let month = number_of_months % 12,
      year = Math.floor(number_of_months / 12) + this.left_end_year;

    this.props._setChosenMonthFromCalendar(month);
    this.props._setChosenYearFromCalendar(year);
  };

  _toggleDisplayPremiumAd = () => {
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
    this.initMonthData();

    this._updateChartChangeCalendarAvailable();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.day_chart_stats !== prevProps.day_chart_stats ||
      this.props.week_chart_stats !== prevProps.week_chart_stats ||
      this.props.month_chart_stats !== prevProps.month_chart_stats
    ) {
      this.setState(prevState => ({
        should_flatlist_update: prevState.should_flatlist_update + 1
      }));
    }

    if (
      Map(this.props.generalSettings).getIn(["account", "package", "plan"]) !==
      Map(prevProps.generalSettings).getIn(["account", "package", "plan"])
    ) {
      this._updateChartChangeCalendarAvailable();
    }
  }

  render() {
    return (
      <View
        style={{
          position: "relative",
          flex: 1,
          alignItems: "center"
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
            snapToInterval={panel_width}
            snapToAlignment="start"
            getItemLayout={this._getItemLayout}
            initialScrollIndex={this.start_index}
            ref={this._setRef}
            initialNumToRender={3}
            windowSize={3}
            maxToRenderPerBatch={3}
            day_stats={this.props.day_stats}
            week_stats={this.props.week_stats}
            week_stats={this.props.week_stats}
            onMomentumScrollEnd={this._onMomentumScrollEnd}
            scrollEnabled={this.state.chart_change_calendar_available}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top:
              margin_top_for_month_year_text +
              normalize(21, "height") +
              margin_top_for_calendar_row +
              (normalize(19, "height") + normalize(20, "height")),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            left: 0,
            right: 0
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

  weeks_in_month_data = [];

  state = {
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

  _keyExtractor = (item, index) =>
    `progress-calendar-${item[0].week}-${item[0].month}-${item[0].year}-${index}`;

  _renderItem = ({ item, index }) => {
    return (
      <WeekRowHolder
        week_data={item}
        week_index={index}
        day_chart_stats={this.props.day_chart_stats}
        week_chart_stats={this.props.week_chart_stats}
      />
    );
  };

  _returnToCurrentMonth = () => {
    if (this.props.chart_change_calendar_available) {
      this.props.scrollToMonth(this.props.present_month_index);
    } else {
      this.props._toggleDisplayPremiumAd();
    }
  };

  _calculateTotalPointsInMonth = () => {
    let month_timestamp_toString = new Date(
      this.props.data.year,
      this.props.data.month
    )
      .getTime()
      .toString();
    let month_chart_stats_map = Map(this.props.month_chart_stats);

    return parseInt(
      month_chart_stats_map.getIn([month_timestamp_toString, "totalPoints"])
    );
  };

  _goToPreviousMonth = () => {
    if (this.props.chart_change_calendar_available) {
      this.props.scrollToMonth(this.props.month_index - 1);
    } else {
      this.props._toggleDisplayPremiumAd();
    }
  };

  _goToNextMonth = () => {
    if (this.props.chart_change_calendar_available) {
      this.props.scrollToMonth(this.props.month_index + 1);
    } else {
      this.props._toggleDisplayPremiumAd();
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    let month_timestamp_toString = new Date(
      this.props.data.year,
      this.props.data.month
    )
      .getTime()
      .toString();
    return (
      Map(this.props.month_chart_stats).get(month_timestamp_toString) !==
        Map(nextProps.month_chart_stats).get(month_timestamp_toString) ||
      this.props.chart_change_calendar_available !==
        nextProps.chart_change_calendar_available ||
      this.props.week_chart_stats !== nextProps.week_chart_stats
    );
  }

  componentDidMount() {
    let { month, year } = this.props.data,
      first_day_of_month = new Date(year, month, 1),
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

      let data = [];

      data.push({
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
          data.push({
            unchosen: true,
            day: date.getDate(),
            week,
            month: date.getMonth(),
            year: date.getFullYear(),
            noWeekInMonth: this.getNoWeekInMonth(date)
          });
        } else {
          data.push({
            day: date.getDate(),
            week,
            month: date.getMonth(),
            year: date.getFullYear(),
            noWeekInMonth: this.getNoWeekInMonth(date)
          });
        }
      }

      this.weeks_in_month_data.push(data);

      let tracking_date = new Date(tracking_timestamp),
        new_tracking_date = tracking_date;

      new_tracking_date.setDate(tracking_date.getDate() + 7);

      tracking_timestamp = new_tracking_date.getTime();
    }

    this.setState(prevState => ({
      should_flatlist_update: prevState.should_flatlist_update + 1
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.month_chart_stats !== prevProps.month_chart_stats ||
      this.props.week_chart_stats !== prevProps.week_chart_stats ||
      this.props.day_chart_stats !== prevProps.day_chart_stats
    ) {
      this.setState(prevState => ({
        should_flatlist_update: prevState.should_flatlist_update + 1
      }));
    }
  }

  render() {
    let total_points = this._calculateTotalPointsInMonth();
    if (!total_points) {
      total_points = 0;
    }

    return (
      <View
        style={{
          width: panel_width,
          alignItems: "center"
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
              onPress={this._returnToCurrentMonth}
            >
              <Text style={styles.month_text}>
                {this.month_names[this.props.data.month]}
              </Text>
              <Text style={styles.year_text}>{this.props.data.year}</Text>
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
            marginTop: margin_top_for_calendar_row + normalize(32, "height")
          }}
        >
          <FlatList
            data={this.weeks_in_month_data}
            extraData={this.state.should_flatlist_update}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  }
}

class WeekRowHolder extends React.PureComponent {
  state = {
    should_flatlist_update: 0
  };

  _keyExtractor = (item, index) => {
    return `progress-calendar-week-row-${item.week}-${item.day}-${item.month}-${item.year}`;
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

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.week_chart_stats !== prevProps.week_chart_stats ||
      this.props.day_chart_stats !== prevProps.day_chart_stats
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
          width: panel_width,
          marginTop: margin_top_for_calendar_row
        }}
      >
        <FlatList
          data={this.props.week_data}
          extraData={this.state.should_flatlist_update}
          numColumns={8}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
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
          flex: 1,
          alignItems: "center"
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
          flex: 1,
          alignItems: "center"
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
          flex: 1,
          alignItems: "center"
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
