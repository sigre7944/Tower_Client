import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { Map } from 'immutable'

export default class Progress extends React.PureComponent {
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

  componentDidMount() {
    const didFocusScreen = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.changeRouteAction(payload.state.routeName)
      }
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentRoute !== prevProps.currentRoute) {
    }
  }

  render() {
    return (
      <>
        <ScrollView>
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

          <SummaryHolder
            day_stats={this.props.day_stats}
            week_stats={this.props.week_stats}
            month_stats={this.props.month_stats}
            month={this.state.month}
            year={this.state.year}
          />
        </ScrollView >

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

      </>
    );
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

  getNoWeekInMonth = (date) => {
    let nearest_monday = this.getMonday(date)
    let first_moday_of_month = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 7))

    return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1
  }

  initDaysInMonth = (month, year) => {
    let month_data_array = []

    let first_monday = this.getMonday(new Date(year, month, 1)),
      last_monday = this.getMonday(new Date(year, month + 1, 0)),

      first_week = this.getWeek(first_monday),
      last_week = this.getWeek(last_monday),
      monday_of_week = first_monday

    if (first_week > last_week) {
      last_week += first_week

      for (let i = first_week; i <= last_week; i++) {
        let week = i % first_week === 0 ? first_week : i % first_week
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
      let stat = month_stats.get(date),
        total_points = stat.current.reduce(((total, amount) => total + amount), 0)

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
      let stat = day_stats.get(date),
        total_points = stat.current.reduce(((total, amount) => total + amount), 0)

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

      let stat = week_stats.get(date),
        total_points = stat.current.reduce(((total, amount) => total + amount), 0)

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

  getNoWeekInMonth = (date) => {
    let nearest_monday = this.getMonday(date)
    let first_moday_of_month = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 7))

    return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1
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

    if(this.props.year_array !== prevProps.year_array){
      console.log(this.props.year_array)
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

  _onPress = () => {
    this.props.chooseMonth(this.props.data.month, this.props.data.year)
    this.props.dismissChooseMonth()
  }

  render() {
    return (
      <TouchableOpacity
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
      </TouchableOpacity>
    )
  }
}

class SummaryHolder extends React.PureComponent {

  state = {
    day_total_completions: 0,
    week_total_completions: 0,
    month_total_completions: 0
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

  getNoWeekInMonth = (date) => {
    let nearest_monday = this.getMonday(date)
    let first_moday_of_month = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 7))

    return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1
  }

  updateDayTaskCompletions = (month, year, day_stats_map) => {
    let day_total_completions = 0,
      first_day_of_month = new Date(year, month, 1),
      last_day_of_month = new Date(year, month + 1, 0),
      total_sum = 0

    for (let i = first_day_of_month.getDate(); i <= last_day_of_month.getDate(); i++) {
      let day_timestamp = new Date(year, month, i).getTime()

      if (day_stats_map.has(day_timestamp)) {
        let data = day_stats_map.get(day_timestamp),
          total_sum = data.current.reduce(((total, amount) => total + amount), 0)

        day_total_completions += total_sum
      }
    }

    this.setState({
      day_total_completions
    })
  }

  updateWeekTaskCompletions = (month, year, week_stats_map) => {
    let first_day_of_month = new Date(year, month, 1),
      last_day_of_month = new Date(year, month + 1, 0),
      first_monday = this.getMonday(first_day_of_month),
      last_monday = this.getMonday(last_day_of_month),
      first_week_of_month = this.getWeek(first_monday),
      last_week_of_month = this.getWeek(last_monday),
      week_total_completions = 0,
      total_sum = 0

    for (let i = 0; i <= (last_week_of_month - first_week_of_month); i++) {
      let week_timestamp = first_monday.getTime() + 86400 * 1000 * 7 * i
      if (week_stats_map.has(week_timestamp)) {
        let data = week_stats_map.get(week_timestamp),
          total_sum = data.current.reduce(((total, amount) => total + amount), 0)

        week_total_completions += total_sum
      }
    }

    this.setState({
      week_total_completions
    })
  }

  updateMonthTaskCompletions = (month, year, month_stats_map) => {
    let month_timestamp = new Date(year, month),
      month_total_completions = 0,
      total_sum = 0

    if (month_stats_map.has(month_timestamp)) {
      let data = month_stats_map.get(month_timestamp),
        total_sum = data.current.reduce(((total, amount) => total + amount), 0)

      month_total_completions += total_sum
    }

    this.setState({
      month_total_completions
    })
  }

  componentDidMount() {
    this.updateDayTaskCompletions(this.props.month, this.props.year, Map(this.props.day_stats))
    this.updateWeekTaskCompletions(this.props.month, this.props.year, Map(this.props.week_stats))
    this.updateMonthTaskCompletions(this.props.month, this.props.year, Map(this.props.month_stats))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.day_stats !== prevProps.day_stats) {
      this.updateDayTaskCompletions(this.props.month, this.props.year, Map(this.props.day_stats))
    }

    if (this.props.week_stats !== prevProps.week_stats) {
      this.updateWeekTaskCompletions(this.props.month, this.props.year, Map(this.props.week_stats))
    }

    if (this.props.month_stats !== prevProps.month_stats) {
      this.updateMonthTaskCompletions(this.props.month, this.props.year, Map(this.props.month_stats))
    }

    if (this.props.month !== prevProps.month || this.props.year !== prevProps.year) {
      this.updateDayTaskCompletions(this.props.month, this.props.year, Map(this.props.day_stats))
      this.updateWeekTaskCompletions(this.props.month, this.props.year, Map(this.props.week_stats))
      this.updateMonthTaskCompletions(this.props.month, this.props.year, Map(this.props.month_stats))
    }
  }

  render() {
    return (
      <View
        style={{
          height: 165,
          flex: 1,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          marginTop: 66,
          borderColor: "black",
        }}
      >
        <View
          style={{
            width: 79,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 24,
            marginLeft: 16,
          }}
        >
          <Text
            style={{
            }}
          >
            Summary:
            </Text>
        </View>


        <View
          style={{
            height: 81,
            marginTop: 16,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{this.state.day_total_completions}</Text>
            <Text>Daily completed</Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: "black"
            }}
          >
            <Text>{this.state.week_total_completions}</Text>
            <Text>Weekly completed</Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{this.state.month_total_completions}</Text>
            <Text>Monthly completed</Text>
          </View>
        </View>
      </View>
    )
  }
}