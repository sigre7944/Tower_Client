import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Map, List } from 'immutable'
import WeekChart from './components/week-chart/WeekChart.Container'
import MonthChart from './components/month-chart/MonthChart.Container'
import YearChart from './components/year-chart/YearChart.Container'

import Calendar from './components/calendar/Calendar.Container'
import SummaryHolder from './components/summary-holder/SummaryHolder.Container'
import { styles } from './styles/styles'

export default class Progress extends React.PureComponent {
  current_date = new Date()

  state = {
    choose_month_bool: false,
    month: this.current_date.getMonth(),
    year: this.current_date.getFullYear(),

    chosen_month: this.current_date.getMonth(),
    chosen_year: this.current_date.getFullYear(),
  }

  _setChosenMonthFromCalendar = (month) => {
    this.setState({
      chosen_month: month
    })
  }

  _setChosenYearFromCalendar = (year) => {
    this.setState({
      chosen_year: year
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
    // if(this.props.day_stats !== prevProps.day_stats){
    //   console.log("\n day_stats",this.props.day_stats)
    // }

    // if(this.props.week_stats !== prevProps.week_stats){
    //   console.log("\n week_stats",this.props.week_stats)
    // }

    // if(this.props.month_stats !== prevProps.month_stats){
    //   console.log("\n month_stats",this.props.month_stats)
    // }
  }

  render() {
    return (
      <>
        <ScrollView>
          <Calendar
            _setChosenMonthFromCalendar={this._setChosenMonthFromCalendar}
            _setChosenYearFromCalendar={this._setChosenYearFromCalendar}
          />

          <SummaryHolder
            chosen_month={this.state.chosen_month}
            chosen_year={this.state.chosen_year}
          />

          <ChartSection />
        </ScrollView >
      </>
    );
  }
}




class ChartSection extends React.PureComponent {

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

  getSunday = (date) => {
    let dayInWeek = new Date(date).getDay()
    let diff = (7 - dayInWeek) === 7 ? 0 : 7 - dayInWeek
    return new Date(new Date(date).getTime() + (diff * 86400 * 1000))
  }

  initWeekAnnoText = () => {
    let current = new Date(),
      monday = this.getMonday(current),
      sunday = this.getSunday(current)
    return `${this.short_month_texts[monday.getMonth()]} ${monday.getDate()} ${monday.getFullYear()} - ${this.short_month_texts[sunday.getMonth()]} ${sunday.getDate()} ${sunday.getFullYear()}`
  }

  short_month_texts = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  month_texts = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  current = new Date()

  state = {
    current_annotation_index: 0,
    last_annotation_index: -1,

    week_month_array: [this.current.getMonth(), this.current.getMonth() + 1, this.current.getMonth() - 1],
    week_year_array: [this.current.getFullYear(), this.current.getFullYear(), this.current.getFullYear()],
    week_anno_current_time_text: this.initWeekAnnoText(),
    current_chosen_week_data: {},


    month_year_array: [this.current.getFullYear(), this.current.getFullYear() + 1, this.current.getFullYear() - 1],
    month_anno_current_time_text: `${this.month_texts[this.current.getMonth()]} ${this.current.getFullYear()}`,
    current_chosen_month_data: {},


  }

  setWeekAnnoMonthYearData = (day, month, year) => {
    let week_month_array = [0, 0, 0],
      week_year_array = [0, 0, 0]
    if (month === 11) {
      week_month_array = [month, 0, month - 1]
      week_year_array = [year, year + 1, year]
    }
    else if (month === 0) {
      week_month_array = [month, month + 1, 11]
      week_year_array = [year, year, year - 1]
    }
    else {
      week_month_array = [month, month + 1, month - 1]
      week_year_array = [year, year, year]
    }

    let current_chosen_week_data = {
      day,
      month,
      year
    }

    this.setState({
      week_month_array: [...week_month_array],
      week_year_array: [...week_year_array],
      current_chosen_week_data: { ...current_chosen_week_data }
    })
  }

  setMonthAnnoYearData = (month, year) => {
    let month_year_array = [0, 0, 0]
    month_year_array = [year, year + 1, year - 1]

    let current_chosen_month_data = { month, year }

    this.setState({
      month_year_array: [...month_year_array],
      current_chosen_month_data: { ...current_chosen_month_data }
    })
  }

  setWeekAnnoText = (f_day, f_month, f_year, l_day, l_month, l_year) => {
    this.setState({
      week_anno_current_time_text: `${this.short_month_texts[f_month]} ${f_day} ${f_year} - ${this.short_month_texts[l_month]} ${l_day} ${l_year}`
    })
  }

  setMonthAnnoText = (month, year) => {
    this.setState({
      month_anno_current_time_text: `${this.month_texts[month]} ${year}`
    })
  }

  chooseAnnotation = (index) => {
    if (this.state.current_annotation_index !== index) {
      this.setState(prevState => ({
        last_annotation_index: prevState.current_annotation_index,
        current_annotation_index: index
      }))
    }
  }

  componentDidMount() {
    let current = new Date(),
      monday = this.getMonday(current),
      current_chosen_week_data = {
        day: monday.getDate(),
        month: monday.getMonth(),
        year: monday.getFullYear()
      },
      current_chosen_month_data = {
        month: current.getMonth(),
        year: current.getFullYear()
      }

    this.setState({
      current_chosen_week_data: { ...current_chosen_week_data },
      current_chosen_month_data: { ...current_chosen_month_data }
    })
  }

  render() {
    return (
      <View>
        <Text
          style={{
            marginLeft: 16,
            marginTop: 24
          }}
        >
          Number of completed tasks
        </Text>

        <View
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: 255,
              height: 26,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: "#CCCCCC"
            }}
          >
            <ChartTypeAnnotation
              index={0}
              annotation={"Week"}
              current_annotation_index={this.state.current_annotation_index}
              last_annotation_index={this.state.last_annotation_index}
              chooseAnnotation={this.chooseAnnotation}
            />

            <ChartTypeAnnotation
              index={1}
              annotation={"Month"}
              current_annotation_index={this.state.current_annotation_index}
              last_annotation_index={this.state.last_annotation_index}
              chooseAnnotation={this.chooseAnnotation}
            />

            <ChartTypeAnnotation
              index={2}
              annotation={"Year"}
              current_annotation_index={this.state.current_annotation_index}
              last_annotation_index={this.state.last_annotation_index}
              chooseAnnotation={this.chooseAnnotation}
            />
          </View>
        </View>

        {this.state.current_annotation_index === 0 ?
          <WeekChart
            setWeekAnnoMonthYearData={this.setWeekAnnoMonthYearData}
            setWeekAnnoText={this.setWeekAnnoText}
            week_anno_current_time_text={this.state.week_anno_current_time_text}
            month_array={this.state.week_month_array}
            year_array={this.state.week_year_array}
            current_chosen_week_data={this.state.current_chosen_week_data}
          />
          :

          <>
            {this.state.current_annotation_index === 1 ?
              <MonthChart
                setMonthAnnoYearData={this.setMonthAnnoYearData}
                setMonthAnnoText={this.setMonthAnnoText}
                year_array={this.state.month_year_array}
                month_anno_current_time_text={this.state.month_anno_current_time_text}
                current_chosen_month_data={this.state.current_chosen_month_data}
              />

              :

              <YearChart
                current_chosen_year={this.current.getFullYear()}
              />
            }
          </>
        }


      </View>
    )
  }
}

class ChartTypeAnnotation extends React.Component {

  state = {
    container_style: styles.unchosen_container,
    text_style: styles.unchosen_text
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.index === nextProps.current_annotation_index || this.props.index === nextProps.last_annotation_index
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.index === nextProps.current_annotation_index) {
      return ({
        container_style: styles.chosen_container,
        text_style: styles.chosen_text
      })
    }

    else if (nextProps.index === nextProps.last_annotation_index) {
      return ({
        container_style: styles.unchosen_container,
        text_style: styles.unchosen_text
      })
    }
    return null
  }



  _onPress = () => {
    this.props.chooseAnnotation(this.props.index)
  }

  render() {
    return (
      <TouchableOpacity
        style={this.state.container_style}
        onPress={this._onPress}
      >
        <Text
          style={this.state.text_style}
        >
          {this.props.annotation}
        </Text>
      </TouchableOpacity>
    )
  }
}


// const styles = StyleSheet.create({
//   unchosen_container: {
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//     borderRadius: 30,
//     backgroundColor: "white"
//   },

//   chosen_container: {
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//     borderRadius: 30,
//     backgroundColor: "black"
//   },

//   unchosen_text: {
//     color: "gainsboro"
//   },

//   chosen_text: {
//     color: "white"
//   }
// })