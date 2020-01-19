import React from "react";

import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { styles } from "./styles/styles";
import { Map, List } from "immutable";

import {
  calendar_icon,
  repeat_icon,
  category_icon,
  priority_icon,
  goal_icon,
  end_icon,
  reward_icon
} from "../../../shared/icons";

import { normalize } from "../../../shared/helpers";

const icon_color = "#6E6E6E";
const icon_size = normalize(19, "width");

export default class TagDataHolder extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        {this.props.edit_task_type === "day" ? (
          <DayTagDataList
            edit_task={this.props.edit_task}
            categories={this.props.categories}
            priorities={this.props.priorities}
            edit_task_type={this.props.edit_task_type}
            _chooseCalendarOption={this.props._chooseCalendarOption}
            _chosenCategoryOption={this.props._chosenCategoryOption}
            _choosePriorityOption={this.props._choosePriorityOption}
            _chooseRepeatOption={this.props._chooseRepeatOption}
          />
        ) : (
          <>
            {this.props.edit_task_type === "week" ? (
              <WeekTagDataList
                edit_task={this.props.edit_task}
                categories={this.props.categories}
                priorities={this.props.priorities}
                edit_task_type={this.props.edit_task_type}
                _chooseCalendarOption={this.props._chooseCalendarOption}
                _chosenCategoryOption={this.props._chosenCategoryOption}
                _choosePriorityOption={this.props._choosePriorityOption}
                _chooseRepeatOption={this.props._chooseRepeatOption}
              />
            ) : (
              <MonthTagDataList
                edit_task={this.props.edit_task}
                categories={this.props.categories}
                priorities={this.props.priorities}
                edit_task_type={this.props.edit_task_type}
                _chooseCalendarOption={this.props._chooseCalendarOption}
                _chosenCategoryOption={this.props._chosenCategoryOption}
                _choosePriorityOption={this.props._choosePriorityOption}
                _chooseRepeatOption={this.props._chooseRepeatOption}
              />
            )}
          </>
        )}
      </View>
    );
  }
}

class DayTagDataList extends React.PureComponent {
  render() {
    return (
      <>
        {Map(this.props.edit_task)
          .toArray()
          .map((data, index) => (
            <DayTagDataElement
              key={`day-tag-data-element-prop-${data[0]}`}
              property={data[0]}
              data={data[1]}
              categories={this.props.categories}
              priorities={this.props.priorities}
              edit_task_type={this.props.edit_task_type}
              edit_task={this.props.edit_task}
              _chooseCalendarOption={this.props._chooseCalendarOption}
              _chosenCategoryOption={this.props._chosenCategoryOption}
              _choosePriorityOption={this.props._choosePriorityOption}
              _chooseRepeatOption={this.props._chooseRepeatOption}
            />
          ))}
      </>
    );
  }
}

class DayTagDataElement extends React.PureComponent {
  daysInWeekText = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  short_daysInWeekText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  monthNames = [
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

  month_names_in_short = [
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
    render_component: null
  };

  _updateTagData = () => {
    let { property } = this.props;

    if (property === "schedule") {
      let day = parseInt(Map(this.props.data).get("day")),
        month = parseInt(Map(this.props.data).get("month")),
        year = parseInt(Map(this.props.data).get("year")),
        date = new Date(year, month, day);

      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._chooseCalendarOption}
          >
            {calendar_icon(icon_size, icon_color)}
            <Text style={styles.day_tag_uncolorful_text}>
              {`${this.daysInWeekText[date.getDay()]} ${date.getDate()} ${
                this.monthNames[date.getMonth()]
              } ${year}`}
            </Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "repeat") {
      let value = Map(this.props.data).getIn(["interval", "value"]),
        type = Map(this.props.data).get("type");

      if (type === "weekly") {
        let days_in_week = List(
            Map(this.props.data).getIn(["interval", "daysInWeek"])
          ).toArray(),
          string = "";

        days_in_week.forEach((value, index) => {
          if (value) {
            let day_index = index + 1 === 7 ? 0 : index + 1;

            string += this.short_daysInWeekText[day_index] + ", ";
          }
        });

        if (string !== "" || string.length > 0) {
          string = "(" + string.substring(0, string.length - 2) + ")";
        }

        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {repeat_icon(icon_size, icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>
                {`every ${value} week ${string}`}
              </Text>
            </TouchableOpacity>
          )
        });
      } else {
        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {repeat_icon(icon_size, icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>
                {type === "daily"
                  ? `every ${value} day`
                  : `every ${value} month`}
              </Text>
            </TouchableOpacity>
          )
        });
      }
    } else if (property === "end") {
      let type = Map(this.props.data).getIn(["type"]);

      if (type === "never") {
        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {end_icon(normalize(14, "width"), icon_color)}
              <Text style={styles.day_tag_uncolorful_text}>never</Text>
            </TouchableOpacity>
          )
        });
      } else if (type === "on") {
        let end_date = new Date(parseInt(Map(this.props.data).get("endAt")));

        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {end_icon(normalize(14, "width"), icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>
                {`on ${
                  this.daysInWeekText[end_date.getDay()]
                } ${end_date.getDate()} ${
                  this.monthNames[end_date.getMonth()]
                } ${end_date.getFullYear()}`}
              </Text>
            </TouchableOpacity>
          )
        });
      } else {
        let occurrences = Map(this.props.data).get("occurrence");

        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {end_icon(normalize(14, "width"), icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>
                {`after ${occurrences} occurrences`}
              </Text>
            </TouchableOpacity>
          )
        });
      }
    } else if (property === "category") {
      let category_name = Map(this.props.categories).getIn([
        this.props.data,
        "name"
      ]);

      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._chosenCategoryOption}
          >
            {category_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`${category_name}`}
            </Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "priority") {
      let prio = Map(this.props.priorities).getIn([
        Map(this.props.data).get("value"),
        "name"
      ]);

      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._choosePriorityOption}
          >
            {priority_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>{`${prio}`}</Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "reward") {
      let value = Map(this.props.data).get("value");
      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._choosePriorityOption}
          >
            {reward_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>{`${value} pts`}</Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "goal") {
      let value = Map(this.props.data).get("max");
      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._chooseRepeatOption}
          >
            {goal_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`${value} times per ${this.props.edit_task_type}`}
            </Text>
          </TouchableOpacity>
        )
      });
    }
  };

  componentDidMount() {
    this._updateTagData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.edit_task !== prevProps.edit_task) {
      this._updateTagData();
    }
  }

  render() {
    return <>{this.state.render_component}</>;
  }
}

class WeekTagDataList extends React.PureComponent {
  render() {
    return (
      <>
        {Map(this.props.edit_task)
          .toArray()
          .map((data, index) => (
            <WeekTagDataElement
              key={`week-tag-data-element-prop-${data[0]}`}
              property={data[0]}
              data={data[1]}
              categories={this.props.categories}
              priorities={this.props.priorities}
              edit_task_type={this.props.edit_task_type}
              edit_task={this.props.edit_task}
              _chooseCalendarOption={this.props._chooseCalendarOption}
              _chosenCategoryOption={this.props._chosenCategoryOption}
              _choosePriorityOption={this.props._choosePriorityOption}
              _chooseRepeatOption={this.props._chooseRepeatOption}
            />
          ))}
      </>
    );
  }
}

class WeekTagDataElement extends React.PureComponent {
  daysInWeekText = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  monthNames = [
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

  month_names_in_short = [
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
    render_component: null
  };

  getMonday = date => {
    let dayInWeek = new Date(date).getDay();
    let diff = dayInWeek === 0 ? 6 : dayInWeek - 1;
    return new Date(new Date(date).getTime() - diff * 86400 * 1000).getDate();
  };

  getNoWeekInMonth = date => {
    let nearest_monday = this.getMonday(date);
    let first_moday_of_month = this.getMonday(
      new Date(date.getFullYear(), date.getMonth(), 7)
    );

    return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1;
  };

  _updateTagData = () => {
    let { property } = this.props;

    if (property === "schedule") {
      let week = Map(this.props.data).get("week"),
        monday = Map(this.props.data).get("monday"),
        start_month = parseInt(Map(this.props.data).get("start_month")),
        sunday = Map(this.props.data).get("sunday"),
        end_month = parseInt(Map(this.props.data).get("end_month")),
        start_year = Map(this.props.data).get("start_year"),
        end_year = Map(this.props.data).get("end_year"),
        string = `(${monday} ${this.month_names_in_short[start_month]} ${start_year} - ${sunday} ${this.month_names_in_short[end_month]} ${end_year})`;

      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._chooseCalendarOption}
          >
            {calendar_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`Week ${week} ${string}`}
            </Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "repeat") {
      let value = parseInt(Map(this.props.data).getIn(["interval", "value"])),
        type = Map(this.props.data).get("type");

      if (type === "weekly-m") {
        let no_week_in_month = parseInt(
            Map(this.props.data).getIn(["interval", "noWeekInMonth"])
          ),
          nth_week_array = ["1st", "2nd", "3rd", "4th"],
          string = "";

        if (no_week_in_month > 4) {
          no_week_in_month = 4;
        }

        string = `${
          nth_week_array[no_week_in_month - 1]
        } week every ${value} month`;

        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {repeat_icon(icon_size, icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>{string}</Text>
            </TouchableOpacity>
          )
        });
      } else {
        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {repeat_icon(icon_size, icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>
                {`every ${value} week`}
              </Text>
            </TouchableOpacity>
          )
        });
      }
    } else if (property === "end") {
      let type = Map(this.props.data).getIn(["type"]);

      if (type === "never") {
        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {end_icon(normalize(14, "width"), icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>never</Text>
            </TouchableOpacity>
          )
        });
      } else if (type === "on") {
        let end_date = new Date(parseInt(Map(this.props.data).get("endAt")));

        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {end_icon(normalize(14, "width"), icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>
                {`on ${
                  this.daysInWeekText[end_date.getDay()]
                } ${end_date.getDate()} ${
                  this.monthNames[end_date.getMonth()]
                } ${end_date.getFullYear()}`}
              </Text>
            </TouchableOpacity>
          )
        });
      } else {
        let occurrences = Map(this.props.data).get("occurrence");

        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {end_icon(normalize(14, "width"), icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>
                {`after ${occurrences} occurrences`}
              </Text>
            </TouchableOpacity>
          )
        });
      }
    } else if (property === "category") {
      let category_name = Map(this.props.categories).getIn([
        this.props.data,
        "name"
      ]);

      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._chosenCategoryOption}
          >
            {category_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`${category_name}`}
            </Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "priority") {
      let prio = Map(this.props.priorities).getIn([
        Map(this.props.data).get("value"),
        "name"
      ]);

      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._choosePriorityOption}
          >
            {priority_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>{`${prio}`}</Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "reward") {
      let value = Map(this.props.data).get("value");
      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._choosePriorityOption}
          >
            {reward_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>{`${value} pts`}</Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "goal") {
      let value = Map(this.props.data).get("max");
      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._chooseRepeatOption}
          >
            {goal_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`${value} times per ${this.props.edit_task_type}`}
            </Text>
          </TouchableOpacity>
        )
      });
    }
  };

  componentDidMount() {
    this._updateTagData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.edit_task !== prevProps.edit_task) {
      this._updateTagData();
    }
  }

  render() {
    return <>{this.state.render_component}</>;
  }
}

class MonthTagDataList extends React.PureComponent {
  render() {
    return (
      <>
        {Map(this.props.edit_task)
          .toArray()
          .map((data, index) => (
            <MonthTagDataElement
              key={`month-tag-data-element-prop-${data[0]}`}
              property={data[0]}
              data={data[1]}
              categories={this.props.categories}
              priorities={this.props.priorities}
              edit_task_type={this.props.edit_task_type}
              edit_task={this.props.edit_task}
              _chooseCalendarOption={this.props._chooseCalendarOption}
              _chosenCategoryOption={this.props._chosenCategoryOption}
              _choosePriorityOption={this.props._choosePriorityOption}
              _chooseRepeatOption={this.props._chooseRepeatOption}
            />
          ))}
      </>
    );
  }
}

class MonthTagDataElement extends React.PureComponent {
  daysInWeekText = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  monthNames = [
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

  month_names_in_short = [
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
    render_component: null
  };

  _updateTagData = () => {
    let { property } = this.props;

    if (property === "schedule") {
      let month = Map(this.props.data).get("month"),
        year = Map(this.props.data).get("year");

      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._chooseCalendarOption}
          >
            {calendar_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`${this.monthNames[month]} ${year}`}
            </Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "repeat") {
      let value = Map(this.props.data).getIn(["interval", "value"]);

      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._chooseRepeatOption}
          >
            {repeat_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              every {value} month
            </Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "end") {
      let type = Map(this.props.data).getIn(["type"]);

      if (type === "never") {
        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {end_icon(normalize(14, "width"), icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>never</Text>
            </TouchableOpacity>
          )
        });
      } else if (type === "on") {
        let end_date = new Date(parseInt(Map(this.props.data).get("endAt")));

        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {end_icon(normalize(14, "width"), icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>
                {`on ${
                  this.daysInWeekText[end_date.getDay()]
                } ${end_date.getDate()} ${
                  this.monthNames[end_date.getMonth()]
                } ${end_date.getFullYear()}`}
              </Text>
            </TouchableOpacity>
          )
        });
      } else {
        let occurrences = Map(this.props.data).get("occurrence");

        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props._chooseRepeatOption}
            >
              {end_icon(normalize(14, "width"), icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>
                {`after ${occurrences} occurrences`}
              </Text>
            </TouchableOpacity>
          )
        });
      }
    } else if (property === "category") {
      let category_name = Map(this.props.categories).getIn([
        this.props.data,
        "name"
      ]);

      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._chosenCategoryOption}
          >
            {category_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`${category_name}`}
            </Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "priority") {
      let prio = Map(this.props.priorities).getIn([
        Map(this.props.data).get("value"),
        "name"
      ]);

      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._choosePriorityOption}
          >
            {priority_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>{`${prio}`}</Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "reward") {
      let value = Map(this.props.data).get("value");
      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._choosePriorityOption}
          >
            {reward_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>{`${value} pts`}</Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "goal") {
      let value = Map(this.props.data).get("max");
      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props._chooseRepeatOption}
          >
            {goal_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`${value} times per ${this.props.edit_task_type}`}
            </Text>
          </TouchableOpacity>
        )
      });
    }
  };

  componentDidMount() {
    this._updateTagData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.edit_task !== prevProps.edit_task) {
      this._updateTagData();
    }
  }

  render() {
    return <>{this.state.render_component}</>;
  }
}
