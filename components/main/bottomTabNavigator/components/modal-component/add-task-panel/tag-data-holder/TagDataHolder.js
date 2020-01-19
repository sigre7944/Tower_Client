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
} from "../../../../../../shared/icons";

import { normalize } from "../../../../../../shared/helpers";

const icon_color = "#6E6E6E";
const icon_size = normalize(19, "width");

export default class TagDataHolder extends React.PureComponent {
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          marginLeft: normalize(3, "width"),
          marginRight: normalize(20, "width"),
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: normalize(30, "height")
        }}
        scrollEnabled={false}
        keyboardShouldPersistTaps="always"
      >
        {this.props.currentAnnotation === "day" ? (
          <DayTagDataList
            currentTask={this.props.currentTask}
            categories={this.props.categories}
            priorities={this.props.priorities}
            currentAnnotation={this.props.currentAnnotation}
            chooseCalenderOption={this.props.chooseCalenderOption}
            chosenCategoryOption={this.props.chosenCategoryOption}
            choosePriorityOption={this.props.choosePriorityOption}
            chooseRepeatOption={this.props.chooseRepeatOption}
          />
        ) : (
          <>
            {this.props.currentAnnotation === "week" ? (
              <WeekTagDataList
                currentTask={this.props.currentTask}
                categories={this.props.categories}
                priorities={this.props.priorities}
                currentAnnotation={this.props.currentAnnotation}
                chooseCalenderOption={this.props.chooseCalenderOption}
                chosenCategoryOption={this.props.chosenCategoryOption}
                choosePriorityOption={this.props.choosePriorityOption}
                chooseRepeatOption={this.props.chooseRepeatOption}
              />
            ) : (
              <MonthTagDataList
                currentTask={this.props.currentTask}
                categories={this.props.categories}
                priorities={this.props.priorities}
                currentAnnotation={this.props.currentAnnotation}
                chooseCalenderOption={this.props.chooseCalenderOption}
                chosenCategoryOption={this.props.chosenCategoryOption}
                choosePriorityOption={this.props.choosePriorityOption}
                chooseRepeatOption={this.props.chooseRepeatOption}
              />
            )}
          </>
        )}
      </ScrollView>
    );
  }
}

class DayTagDataList extends React.PureComponent {
  render() {
    return (
      <>
        {Map(this.props.currentTask)
          .toArray()
          .map((data, index) => (
            <DayTagDataElement
              key={`day-tag-data-element-prop-${data[0]}`}
              property={data[0]}
              data={data[1]}
              categories={this.props.categories}
              priorities={this.props.priorities}
              currentAnnotation={this.props.currentAnnotation}
              currentTask={this.props.currentTask}
              chooseCalenderOption={this.props.chooseCalenderOption}
              chosenCategoryOption={this.props.chosenCategoryOption}
              choosePriorityOption={this.props.choosePriorityOption}
              chooseRepeatOption={this.props.chooseRepeatOption}
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

  componentDidMount() {
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
            onPress={this.props.chooseCalenderOption}
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
      let end_type = Map(this.props.currentTask).getIn(["end", "type"]);
      let occurrence_value = Map(this.props.currentTask).getIn([
        "end",
        "occurrence"
      ]);
      // let end_at_timestamp = new Date(
      //   parseInt(Map(this.props.currentTask).getIn(["end", "endAt"]))
      // ).getTime();
      // let current_date = new Date(),
      //   current_date_timestamp = new Date(
      //     current_date.getFullYear(),
      //     current_date.getMonth(),
      //     current_date.getDate()
      //   ).getTime();

      if (
        end_type === "after" &&
        occurrence_value <= 1
        // (end_type === "on" && current_date_timestamp === end_at_timestamp)
      ) {
        this.setState({
          render_component: null
        });
      } else {
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
                onPress={this.props.chooseRepeatOption}
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
                onPress={this.props.chooseRepeatOption}
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
      }
    } else if (property === "end") {
      let type = Map(this.props.data).getIn(["type"]);

      if (type === "never") {
        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props.chooseRepeatOption}
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
              onPress={this.props.chooseRepeatOption}
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

        if (occurrences === 1) {
          this.setState({
            render_component: null
          });
        } else {
          this.setState({
            render_component: (
              <TouchableOpacity
                style={styles.day_tag_container}
                onPress={this.props.chooseRepeatOption}
              >
                {end_icon(normalize(14, "width"), icon_color)}

                <Text style={styles.day_tag_uncolorful_text}>
                  {`after ${occurrences} occurrences`}
                </Text>
              </TouchableOpacity>
            )
          });
        }
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
            onPress={this.props.chosenCategoryOption}
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
            onPress={this.props.choosePriorityOption}
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
            onPress={this.props.choosePriorityOption}
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
            onPress={this.props.chooseRepeatOption}
          >
            {goal_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`${value} times per ${this.props.currentAnnotation}`}
            </Text>
          </TouchableOpacity>
        )
      });
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
        {Map(this.props.currentTask)
          .toArray()
          .map((data, index) => (
            <WeekTagDataElement
              key={`week-tag-data-element-prop-${data[0]}`}
              property={data[0]}
              data={data[1]}
              categories={this.props.categories}
              priorities={this.props.priorities}
              currentAnnotation={this.props.currentAnnotation}
              currentTask={this.props.currentTask}
              chooseCalenderOption={this.props.chooseCalenderOption}
              chosenCategoryOption={this.props.chosenCategoryOption}
              choosePriorityOption={this.props.choosePriorityOption}
              chooseRepeatOption={this.props.chooseRepeatOption}
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

  componentDidMount() {
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
            onPress={this.props.chooseCalenderOption}
          >
            {calendar_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`Week ${week} ${string}`}
            </Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "repeat") {
      let end_type = Map(this.props.currentTask).getIn(["end", "type"]),
        end_value = Map(this.props.currentTask).getIn(["end", "occurrence"]);

      if (end_type === "after" && end_value === 1) {
        this.setState({
          render_component: null
        });
      } else {
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
                onPress={this.props.chooseRepeatOption}
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
                onPress={this.props.chooseRepeatOption}
              >
                {repeat_icon(icon_size, icon_color)}

                <Text style={styles.day_tag_uncolorful_text}>
                  {`every ${value} week`}
                </Text>
              </TouchableOpacity>
            )
          });
        }
      }
    } else if (property === "end") {
      let type = Map(this.props.data).getIn(["type"]);

      if (type === "never") {
        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props.chooseRepeatOption}
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
              onPress={this.props.chooseRepeatOption}
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

        if (occurrences === 1) {
          this.setState({
            render_component: null
          });
        } else {
          this.setState({
            render_component: (
              <TouchableOpacity
                style={styles.day_tag_container}
                onPress={this.props.chooseRepeatOption}
              >
                {end_icon(normalize(14, "width"), icon_color)}

                <Text style={styles.day_tag_uncolorful_text}>
                  {`after ${occurrences} occurrences`}
                </Text>
              </TouchableOpacity>
            )
          });
        }
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
            onPress={this.props.chosenCategoryOption}
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
            onPress={this.props.choosePriorityOption}
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
            onPress={this.props.choosePriorityOption}
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
            onPress={this.props.chooseRepeatOption}
          >
            {goal_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`${value} times per ${this.props.currentAnnotation}`}
            </Text>
          </TouchableOpacity>
        )
      });
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
        {Map(this.props.currentTask)
          .toArray()
          .map((data, index) => (
            <MonthTagDataElement
              key={`month-tag-data-element-prop-${data[0]}`}
              property={data[0]}
              data={data[1]}
              categories={this.props.categories}
              priorities={this.props.priorities}
              currentAnnotation={this.props.currentAnnotation}
              currentTask={this.props.currentTask}
              chooseCalenderOption={this.props.chooseCalenderOption}
              chosenCategoryOption={this.props.chosenCategoryOption}
              choosePriorityOption={this.props.choosePriorityOption}
              chooseRepeatOption={this.props.chooseRepeatOption}
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

  componentDidMount() {
    let { property } = this.props;

    if (property === "schedule") {
      let month = Map(this.props.data).get("month"),
        year = Map(this.props.data).get("year");

      this.setState({
        render_component: (
          <TouchableOpacity
            style={styles.day_tag_container}
            onPress={this.props.chooseCalenderOption}
          >
            {calendar_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`${this.monthNames[month]} ${year}`}
            </Text>
          </TouchableOpacity>
        )
      });
    } else if (property === "repeat") {
      let end_type = Map(this.props.currentTask).getIn(["end", "type"]),
        end_value = Map(this.props.currentTask).getIn(["end", "occurrence"]);

      if (end_type === "after" && end_value === 1) {
        this.setState({
          render_component: null
        });
      } else {
        let value = Map(this.props.data).getIn(["interval", "value"]);

        this.setState({
          render_component: (
            <TouchableOpacity
              style={styles.day_tag_container}
              onPress={this.props.chooseRepeatOption}
            >
              {repeat_icon(icon_size, icon_color)}

              <Text style={styles.day_tag_uncolorful_text}>
                every {value} month
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
              onPress={this.props.chooseRepeatOption}
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
              onPress={this.props.chooseRepeatOption}
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

        if (occurrences === 1) {
          this.setState({
            render_component: null
          });
        } else {
          this.setState({
            render_component: (
              <TouchableOpacity
                style={styles.day_tag_container}
                onPress={this.props.chooseRepeatOption}
              >
                {end_icon(normalize(14, "width"), icon_color)}

                <Text style={styles.day_tag_uncolorful_text}>
                  {`after ${occurrences} occurrences`}
                </Text>
              </TouchableOpacity>
            )
          });
        }
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
            onPress={this.props.chosenCategoryOption}
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
            onPress={this.props.choosePriorityOption}
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
            onPress={this.props.choosePriorityOption}
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
            onPress={this.props.chooseRepeatOption}
          >
            {goal_icon(icon_size, icon_color)}

            <Text style={styles.day_tag_uncolorful_text}>
              {`${value} times per ${this.props.currentAnnotation}`}
            </Text>
          </TouchableOpacity>
        )
      });
    }
  }

  render() {
    return <>{this.state.render_component}</>;
  }
}
