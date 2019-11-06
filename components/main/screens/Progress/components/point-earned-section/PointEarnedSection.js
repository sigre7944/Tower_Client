import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated,
} from 'react-native';
import { PanGestureHandler, State, TouchableOpacity as KGMTouchableOpacity } from 'react-native-gesture-handler'
import { Map, List } from 'immutable'

export default class PointEarnedSection extends React.PureComponent {
  year_array = [new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() - 1]

  state = {
    choose_month_bool: false,
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  }

  chooseMonth = (month, year) => {
    this.year_array = [year, year + 1, year - 1]
    this.setState({
      month,
      year,
    })
  }

  toggleChooseMonth = () => {
    this.setState({
      choose_month_bool: true
    })
  }

  dismissChooseMonth = () => {
    this.setState({
      choose_month_bool: false
    })
  }

  render() {
    return (
      <>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              width: 102,
              height: 20,
              marginTop: 16,
              marginLeft: 16,
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: 16,
              lineHeight: 20,
            }}
          >
            Point earned:
        </Text>

          <Calendar
            month={this.state.month}
            year={this.state.year}
            toggleChooseMonth={this.toggleChooseMonth}
            {...this.props}
          />

          {this.state.choose_month_bool ?
            <Modal
              transparent={true}
            >
              <View
                style={{
                  flex: 1,
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    width: Dimensions.get("window").width,
                    backgroundColor: "black",
                    opacity: 0.5
                  }}

                  onPress={this.dismissChooseMonth}
                >

                </TouchableOpacity>

                <MonthCalendar
                  chooseMonth={this.chooseMonth}
                  dismissChooseMonth={this.dismissChooseMonth}
                  year_array={this.year_array}
                />
              </View>
            </Modal>
            :
            null
          }
        </View>
      </>
    )
  }
}

class Calendar extends React.PureComponent {
  state = {
    month_data_array: []
  }

  getWeek = (date) => {
    let target = new Date(date);
    let dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    let firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
  }

  getMonday = (date) => {
    let dayInWeek = new Date(date).getDay()
    let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
    return new Date(new Date(date).getTime() - (diff * 86400 * 1000))
  }

  initDaysInMonth = (month, year) => {
    let month_data_array = []

    let first_monday = this.getMonday(new Date(year, month, 1)),
      last_monday = this.getMonday(new Date(year, month + 1, 0)),

      first_week = this.getWeek(first_monday),
      last_week = this.getWeek(last_monday),
      monday_of_week = first_monday

    if (first_week > last_week) {
      let first_week_of_next_year = this.getWeek(this.getMonday(new Date(year, 0, 1))),
        last_week_of_current_year
      if (first_week_of_next_year >= 1 && first_week_of_next_year < 10) {
        last_week_of_current_year = this.getWeek(this.getMonday(new Date(new Date(year, 0, 1)).getTime() - 86400 * 1000 * 7))
        last_week += last_week_of_current_year
      }
      else {
        last_week_of_current_year = first_week_of_next_year
        last_week += last_week_of_current_year
      }

      for (let i = first_week; i <= last_week; i++) {
        let week = i % last_week_of_current_year === 0 ? last_week_of_current_year : i % last_week_of_current_year
        month_data_array.push({
          week_row: true,
          week,
          start_day: monday_of_week.getDate(),
          start_month: monday_of_week.getMonth(),
          start_year: monday_of_week.getFullYear(),
        })

        for (let j = 0; j < 7; j++) {
          let date = new Date(monday_of_week.getTime() + 86400 * 1000 * j)
          month_data_array.push({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            day_in_week: date.getDay(),
            week
          })
        }

        monday_of_week = new Date(monday_of_week.getTime() + 86400 * 1000 * 7)
      }
    }

    else {
      for (let i = first_week; i <= last_week; i++) {
        month_data_array.push({
          week_row: true,
          week: i,
          start_day: monday_of_week.getDate(),
          start_month: monday_of_week.getMonth(),
          start_year: monday_of_week.getFullYear(),
        })

        for (let j = 0; j < 7; j++) {
          let date = new Date(monday_of_week.getTime() + 86400 * 1000 * j)
          month_data_array.push({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            day_in_week: date.getDay(),
            week: i,
          })
        }

        monday_of_week = new Date(monday_of_week.getTime() + 86400 * 1000 * 7)

      }
    }

    this.setState({
      month_data_array: [...month_data_array]
    })
  }

  componentDidMount() {
    this.initDaysInMonth(this.props.month, this.props.year)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.month !== prevProps.month || this.props.year !== prevProps.year) {
      this.initDaysInMonth(this.props.month, this.props.year)
    }
  }

  render() {
    return (
      <View
        style={{
          width: 400,
        }}
      >
        <MonthHolder
          month_data_array={this.state.month_data_array}
          {...this.props}
        />
      </View>
    )
  }
}

class MonthHolder extends React.Component {

  day_texts = ["M", "T", "W", "T", "F", "S", "S"]
  month_texts = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  state = {
    day_text_array: null,
    month_points: 0,
  }

  _toggleChooseMonth = () => {
    this.props.toggleChooseMonth()
  }

  updateMonthPoints = () => {
    let date = new Date(this.props.year, this.props.month).getTime(),
      month_stats = Map(this.props.month_stats)
    if (month_stats.has(date)) {
      let stat = Map(month_stats.get(date)),
        total_points = List(stat.get("current")).reduce(((total, amount) => total + amount), 0)

      this.setState({
        month_points: total_points
      })
    }

    else {
      this.setState({
        month_points: 0
      })
    }
  }

  componentDidMount() {
    this.updateMonthPoints()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.month_data_array !== prevProps.month_data_array) {
      let day_text_array = []

      day_text_array.push(
        <View
          key={`week-text`}
          style={{
            height: 40,
            width: 400 / 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>
            Week
          </Text>
        </View>
      )

      for (let i = 0; i < 7; i++) {
        day_text_array.push(
          <View
            key={`day-text-${i}`}
            style={{
              height: 40,
              width: 400 / 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>
              {this.day_texts[i]}
            </Text>
          </View>
        )
      }

      this.setState({
        day_text_array: [...day_text_array],
      })
    }

    if (this.props.month_stats !== prevProps.month_stats || (this.props.month !== prevProps.month) || (this.props.year !== prevProps.year)) {
      this.updateMonthPoints()
    }

  }


  render() {
    return (
      <View
        style={{
          flex: 1,
          width: 400,
        }}
      >
        <View
          style={{
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
            }}
            onPress={this._toggleChooseMonth}
          >
            <Text>
              {`${this.month_texts[this.props.month]} - ${this.props.year}`}
            </Text>

            {this.state.month_points > 0 ?
              <Text
                style={{
                  marginLeft: 5,
                }}
              >
                {`${this.state.month_points}pt`}
              </Text>
              :
              null
            }

          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {this.state.day_text_array}
          {this.props.month_data_array.map((data, index) => {
            if (data.week_row) {
              return (
                <Week
                  key={`week-${index}`}
                  data={data}
                  {... this.props}
                />
              )
            }
            return (
              <Day
                key={`day-${index}`}
                data={data}
                {... this.props}
              />
            )
          })
          }
        </View>
      </View>
    )
  }
}

class Day extends React.PureComponent {

  state = {
    day_points: 0,
  }

  updateDayPoints = () => {
    let { data } = this.props,
      date = new Date(data.year, data.month, data.day).getTime(),
      day_stats = Map(this.props.day_stats)

    if (day_stats.has(date)) {
      let stat = Map(day_stats.get(date)),
        total_points = List(stat.get("current")).reduce(((total, amount) => total + amount), 0)

      this.setState({
        day_points: total_points
      })
    }

    else {
      this.setState({
        day_points: 0
      })
    }
  }

  componentDidMount() {
    this.updateDayPoints()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.day_stats !== prevProps.day_stats || this.props.data !== prevProps.data) {
      this.updateDayPoints()
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          width: 400 / 8,
          alignItems: "center"
        }}
      // onPress={this._onPress}
      >
        <View
          style={{
            width: 32,
            height: 77,
            borderRadius: 17,
            backgroundColor: this.state.day_points > 0 ? "#C4C4C4" : "white",
            paddingHorizontal: 3,
            paddingVertical: 3,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white"
            }}
          >
            <Text>
              {this.props.data.day}
            </Text>
          </View>

          {this.state.day_points > 0 ?
            <Text
              style={{
                marginTop: 20,
              }}
            >
              {`${this.state.day_points}pt`}
            </Text>
            :

            null
          }

        </View>
      </TouchableOpacity>
    )
  }
}

class Week extends React.PureComponent {
  state = {
    week_points: 0,
  }

  updateWeekPoints = () => {
    let { data } = this.props,
      date = new Date(data.start_year, data.start_month, data.start_day).getTime(),
      week_stats = Map(this.props.week_stats)
    if (week_stats.has(date)) {
      let stat = Map(week_stats.get(date)),
        total_points = List(stat.get("current")).reduce(((total, amount) => total + amount), 0)

      this.setState({
        week_points: total_points
      })
    }

    else {
      this.setState({
        week_points: 0
      })
    }
  }

  componentDidMount() {
    this.updateWeekPoints()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.week_stats !== prevProps.week_stats || this.props.data !== prevProps.data) {
      this.updateWeekPoints()
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          width: 400 / 8,
          alignItems: "center"
        }}
      // onPress={this._onPress}
      >
        <View
          style={{
            width: 32,
            height: 77,
            borderRadius: 17,
            backgroundColor: this.state.week_points > 0 ? "#54BAAC" : "white",
            paddingHorizontal: 3,
            paddingVertical: 3,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white"
            }}
          >
            <Text>
              {this.props.data.week}
            </Text>
          </View>

          {this.state.week_points > 0 ?
            <Text
              style={{
                marginTop: 20,
              }}
            >
              {`${this.state.week_points}pt`}
            </Text>
            :
            null
          }

        </View>
      </TouchableOpacity>
    )
  }
}


class MonthCalendar extends React.PureComponent {
  dimension_width = 350

  old_translateX = 0

  main_index = 0

  translateX_array = [new Animated.Value(0), new Animated.Value(this.dimension_width), new Animated.Value(-this.dimension_width)]

  record_translateX_array = [0, this.dimension_width, -this.dimension_width]

  opacity_array = [new Animated.Value(1), new Animated.Value(1), new Animated.Value(1)]

  state = {
    year_array: [0, 0, 0]
  }

  handleMonthYearWhenSwipe = (swipe_direction, main_index) => {
    let year_array = [... this.state.year_array]

    if (swipe_direction === 1) {
      if (main_index === 0) {
        year_array[2] = year_array[main_index] - 1
      }

      else {
        year_array[(main_index - 1) % 3] = year_array[main_index] - 1
      }
    }

    else {
      year_array[(main_index + 1) % 3] = year_array[main_index] + 1
    }

    this.setState({
      year_array: [...year_array]
    })

  }


  _onGestureEvent = Animated.event(
    [
      {},
    ],
    {
      listener: ({ nativeEvent }) => {
        this.record_translateX_array.forEach((translate, index, arr) => {
          arr[index] += nativeEvent.translationX - this.old_translateX
        })

        this.translateX_array.forEach((translate, index, arr) => {
          arr[index].setValue(this.record_translateX_array[index])
        })

        this.old_translateX = nativeEvent.translationX

        if (this.record_translateX_array[this.main_index] >= -120 && this.record_translateX_array[this.main_index] <= 120) {
          this.opacity_array[(this.main_index + 1) % 3].setValue(1)

          if (this.main_index === 0) {
            this.opacity_array[2].setValue(1)
          }
          else {
            this.opacity_array[(this.main_index - 1) % 3].setValue(1)
          }
        }

        this.opacity_array[this.main_index].setValue((this.dimension_width - Math.abs(this.record_translateX_array[this.main_index])) / (this.dimension_width * 1.3))
      }
    }
  )

  handleAnimation = (main_index) => {
    if (this.record_translateX_array[main_index] >= -120 && this.record_translateX_array[main_index] <= 120) {
      this.opacity_array[main_index].setValue(1)

      this.record_translateX_array[main_index] = 0
      this.record_translateX_array[(main_index + 1) % 3] = this.dimension_width

      if (main_index - 1 < 0) {
        main_index = 6
      }

      this.record_translateX_array[(main_index - 1) % 3] = - this.dimension_width

      let animation_array = this.translateX_array.map((translate, index) =>
        Animated.spring(this.translateX_array[index], {
          toValue: this.record_translateX_array[index]
        })
      )

      Animated.parallel(
        animation_array,
        {
          stopTogether: true
        }
      ).start()
    }

    else if (this.record_translateX_array[main_index] < -120) {

      this.record_translateX_array[main_index] = - this.dimension_width
      this.record_translateX_array[(main_index + 1) % 3] = 0

      if (main_index - 1 < 0) {
        main_index = 6
      }

      this.record_translateX_array[(main_index - 1) % 3] = this.dimension_width

      this.translateX_array[(main_index - 1) % 3].setValue(this.dimension_width)

      let animation_array = this.translateX_array.map((translate, index) => {
        if (index !== (main_index - 1) % 3)
          return (
            Animated.spring(this.translateX_array[index], {
              toValue: this.record_translateX_array[index]
            })
          )
      })

      Animated.parallel(
        animation_array,
        {
          stopTogether: true
        }
      ).start()

      this.handleMonthYearWhenSwipe(-1, this.main_index)

      this.main_index = (main_index + 1) % 3
    }

    else if (this.record_translateX_array[main_index] > 120) {

      this.record_translateX_array[main_index] = this.dimension_width

      this.record_translateX_array[(main_index + 1) % 3] = - this.dimension_width

      this.translateX_array[(main_index + 1) % 3].setValue(-this.dimension_width)

      if (main_index - 1 < 0) {
        main_index = 6
      }
      this.record_translateX_array[(main_index - 1) % 3] = 0


      let animation_array = this.translateX_array.map((translate, index) => {
        if (index !== (main_index + 1) % 3)
          return (
            Animated.spring(this.translateX_array[index], {
              toValue: this.record_translateX_array[index]
            })
          )
      })

      Animated.parallel(
        animation_array,
        {
          stopTogether: true
        }
      ).start()

      this.handleMonthYearWhenSwipe(1, this.main_index)

      this.main_index = (main_index - 1) % 3
    }
  }

  _onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      this.old_translateX = 0

      this.handleAnimation(this.main_index)
    }
  }

  componentDidMount() {
    this.setState({
      year_array: [...this.props.year_array]
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.year_array !== prevProps.year_array) {
      this.setState({
        year_array: [...this.props.year_array]
      })
    }
  }

  render() {
    return (
      <View
        style={{
          width: 350,
          height: 400,
          borderRadius: 20,
          backgroundColor: "white",
          position: "absolute",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <PanGestureHandler
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}
        >
          <Animated.View
            style={{
              flex: 1,
              width: 350,
              justifyContent: "center",
              alignItems: "center",
              transform: [{ translateX: this.translateX_array[0] }],
              opacity: this.opacity_array[0],
            }}
          >
            <MonthsInYear
              year={this.state.year_array[0]}
              {...this.props}
            />
          </Animated.View>
        </PanGestureHandler>

        <PanGestureHandler
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}
        >
          <Animated.View
            style={{
              height: 400,
              width: 350,
              justifyContent: "center",
              alignItems: "center",
              transform: [{ translateX: this.translateX_array[1] }],
              position: "absolute",
              opacity: this.opacity_array[1],
            }}
          >
            <MonthsInYear
              year={this.state.year_array[1]}
              {...this.props}
            />
          </Animated.View>
        </PanGestureHandler>

        <PanGestureHandler
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}
        >
          <Animated.View
            style={{
              height: 400,
              width: 350,
              justifyContent: "center",
              alignItems: "center",
              transform: [{ translateX: this.translateX_array[2] }],
              position: "absolute",
              opacity: this.opacity_array[2],
            }}
          >
            <MonthsInYear
              year={this.state.year_array[2]}
              {...this.props}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    )
  }
}

class MonthsInYear extends React.PureComponent {

  state = {
    year_data_array: []
  }

  getWeek = (date) => {
    let target = new Date(date);
    let dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    let firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
  }

  getMonday = (date) => {
    let dayInWeek = new Date(date).getDay()
    let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
    return new Date(new Date(date).getTime() - (diff * 86400 * 1000))
  }

  initMonthsInYear = (year) => {
    let year_data_array = []
    for (let i = 0; i < 12; i++) {
      let start_day = new Date(year, i, 1),
        last_day = new Date(year, i + 1, 0)

      year_data_array.push({
        month: i,
        year,
        start_week: this.getWeek(start_day),
        end_week: this.getWeek(last_day)
      })
    }

    this.setState({
      year_data_array: [...year_data_array]
    })
  }

  componentDidMount() {
    this.initMonthsInYear(this.props.year)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.year !== prevProps.year) {
      this.initMonthsInYear(this.props.year)
    }
  }

  render() {
    return (
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginTop: 20,
          }}
        >
          {this.props.year}
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          {this.state.year_data_array.map((data, index) => (
            <Month
              data={data}
              key={`month-in-year-${index}`}
              {...this.props}
            />
          ))}
        </View>
      </View>
    )
  }
}

class Month extends React.PureComponent {
  short_month_texts = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  opacity_value = new Animated.Value(1)

  _onPress = () => {
    this.props.chooseMonth(this.props.data.month, this.props.data.year)
    this.props.dismissChooseMonth()
  }

  _onSingleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      Animated.sequence([
        Animated.timing(
          this.opacity_value,
          {
            toValue: 0.2,
            duration: 100,
          }
        ),
        Animated.timing(
          this.opacity_value,
          {
            toValue: 0.7,
            duration: 100,
          }
        )
      ]).start((result) => {
        if (result.finished)
          this._onPress()
      })
    }
  }

  render() {
    return (
      <KGMTouchableOpacity
        style={{
          height: 80,
          width: 350 / 3,
          alignItems: "center",
        }}

        onPress={this._onPress}
      >
        <Text>
          {this.short_month_texts[this.props.data.month]}
        </Text>

        <Text>
          {`Week ${this.props.data.start_week} - ${this.props.data.end_week}`}
        </Text>
      </KGMTouchableOpacity>
    )
  }
}
