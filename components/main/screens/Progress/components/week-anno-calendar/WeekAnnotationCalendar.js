import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler'

class WeekAnnotationCalendar extends React.PureComponent{
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
        // year_array: [...this.props.year_array]
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
            </Animated.View>
          </PanGestureHandler>
        </View>
      )
    }
  }

  class WeeksInMonth extends React.PureComponent{
      
  }