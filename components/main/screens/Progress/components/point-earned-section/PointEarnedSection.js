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

import { styles } from './styles/styles'

import Calendar from './calendar/Calendar.Container'

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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white"
        }}
      >
        
        <Calendar />
      </View>
    )
  }
}


