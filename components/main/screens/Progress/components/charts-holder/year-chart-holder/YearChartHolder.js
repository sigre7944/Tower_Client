import React from "react";
import { View, Text, Dimensions } from "react-native";
import { StackedBarChart, YAxis, Grid } from "react-native-svg-charts";
import { Map, List } from "immutable";
import { styles } from "./styles/styles";
import { normalize } from "../../../../../../shared/helpers";
const window_width = Dimensions.get("window").width;

export default class YearChartHolder extends React.PureComponent {
  y_data = [];
  number_of_ticks = 0;
  y_max = 0;

  colors = ["#CBC8C8", "#6F73D9", "#EFDA6E", "#F78096"];
  keys = ["pri_04", "pri_03", "pri_02", "pri_01"];

  state = {
    chart_data: [],
    should_active_calendar: false,
    year: 0
  };

  _setCalendarData = year => {
    this.setState(
      {
        year
      },
      () => {
        setTimeout(this._updateYearChartData, 50);
      }
    );
  };

  _initChartData = () => {
    let chart_data = [];
    for (let i = 0; i < 12; i++) {
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

  _updateYearChartData = () => {
    let { year } = this.state,
      year_toString = year.toString(),
      chart_data = this._initChartData(),
      year_chart_stats_map = Map(this.props.year_chart_stats);

    this.y_max = 0;

    if (year_chart_stats_map.hasIn([year_toString, "current"])) {
      let current = List(
        year_chart_stats_map.getIn([year_toString, "current"])
      );

      this.y_max = current.reduce((total, value) => total + value);
    }

    if (
      year_chart_stats_map.hasIn([year_toString, "completed_priority_array"])
    ) {
      let completed_priority_array = List(
        year_chart_stats_map.getIn([year_toString, "completed_priority_array"])
      );

      completed_priority_array.forEach((day_completed_array, month_index) => {
        chart_data[month_index] = {
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
    let { year } = this.state,
      year_toString = year.toString();

    return (
      this.state !== nextState ||
      Map(this.props.year_chart_stats).get(year_toString) !==
        Map(nextProps.year_chart_stats).get(year_toString)
    );
  }

  componentDidMount() {
    let current_date = new Date(),
      chart_data = this._initChartData();

    this.setState(
      {
        year: current_date.getFullYear(),
        chart_data
      },
      () => {
        setTimeout(this._updateYearChartData, 50);
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.year_chart_stats !== prevProps.year_chart_stats) {
      this._updateYearChartData();
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
        <View>
          <Text style={styles.chosen_month_text}>{this.state.year}</Text>
        </View>

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
          <XAxis year={this.state.year} month={this.state.month} />
        </View>
      </View>
    );
  }
}

class XAxis extends React.PureComponent {
  short_month_texts = [
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

  render() {
    let month_array = [];

    for (let i = 0; i < 12; i++) {
      month_array.push(
        <XAxisMonthTextHolder
          key={`x-axis-month-text-${i}`}
          text={`${this.short_month_texts[i]}`}
        />
      );
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
        {month_array}
      </View>
    );
  }
}

class XAxisMonthTextHolder extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: normalize(10, "height")
        }}
      >
        <Text style={styles.month_text}>{this.props.text}</Text>
      </View>
    );
  }
}
