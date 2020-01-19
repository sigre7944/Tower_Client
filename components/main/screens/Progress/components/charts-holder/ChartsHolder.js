import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { styles } from "./styles/styles";

import WeekChartHolder from "./week-chart-holder/WeekChartHolder.Container";
import MonthChartHolder from "./month-chart-holder/MonthChartHolder.Container";
import YearChartHolder from "./year-chart-holder/YearChartHolder.Container";
import { normalize } from "../../../../../shared/helpers";
const window_width = Dimensions.get("window").width;
const mark_total_width = normalize(278, "width");
const mark_container_width = normalize(106, "width");

export default class ChartsHolder extends React.PureComponent {
  state = {
    current_annotation_index: 0,
    last_annotation_index: -1
  };

  _chooseAnnotation = index => {
    if (this.props.current_annotation_index !== index) {
      this.setState(prevState => ({
        current_annotation_index: index,
        last_annotation_index: prevState.current_annotation_index
      }));
    }
  };

  render() {
    return (
      <View
        style={{
          alignItems: "center",
          flex: 1,
          marginVertical: normalize(36, "height")
        }}
      >
        <Text style={styles.big_title_text}>Number of completed tasks</Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: normalize(26, "height"),
            justifyContent: "center"
          }}
        >
          <View
            style={{
              width: normalize(255, "width"),
              height: normalize(26, "height"),
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#B4DADC",
              borderRadius: normalize(30, "width")
            }}
          >
            <AnnotationHolder
              index={0}
              current_annotation_index={this.state.current_annotation_index}
              last_annotation_index={this.state.last_annotation_index}
              annotation="Week"
              _chooseAnnotation={this._chooseAnnotation}
            />

            <AnnotationHolder
              index={1}
              current_annotation_index={this.state.current_annotation_index}
              last_annotation_index={this.state.last_annotation_index}
              annotation="Month"
              _chooseAnnotation={this._chooseAnnotation}
            />

            <AnnotationHolder
              index={2}
              current_annotation_index={this.state.current_annotation_index}
              last_annotation_index={this.state.last_annotation_index}
              annotation="Year"
              _chooseAnnotation={this._chooseAnnotation}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: normalize(26, "height")
          }}
        >
          {this.state.current_annotation_index === 0 ? (
            <WeekChartHolder navigation={this.props.navigation} />
          ) : (
            <>
              {this.state.current_annotation_index === 1 ? (
                <MonthChartHolder navigation={this.props.navigation} />
              ) : (
                <YearChartHolder navigation={this.props.navigation} />
              )}
            </>
          )}
        </View>

        <View
          style={{
            marginTop: normalize(43, "height"),
            width: window_width
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginLeft: normalize(40, "width")
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: mark_container_width
              }}
            >
              <View style={styles.do_first_mark_container}></View>

              <Text style={styles.mark_text}>Do first</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: mark_container_width,
                marginLeft: normalize(80, "width")
              }}
            >
              <View style={styles.delay_mark_container}></View>

              <Text style={styles.mark_text}>Delay</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: normalize(20, "height"),
              marginLeft: normalize(40, "width")
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: mark_container_width
              }}
            >
              <View style={styles.plan_mark_container}></View>

              <Text style={styles.mark_text}>Plan</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: mark_container_width,
                marginLeft: normalize(80, "width")
              }}
            >
              <View style={styles.delegate_mark_container}></View>

              <Text style={styles.mark_text}>Delegate</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class AnnotationHolder extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.index === nextProps.current_annotation_index ||
      this.props.index === nextProps.last_annotation_index
    );
  }

  _chooseAnnotation = () => {
    this.props._chooseAnnotation(this.props.index);
  };

  render() {
    let container_style = styles.unchosen_annotation_container,
      text_style = styles.unchosen_annotation_text;

    if (this.props.index === this.props.current_annotation_index) {
      container_style = styles.chosen_annotation_container;
      text_style = styles.chosen_annotation_text;
    }

    return (
      <TouchableOpacity
        style={container_style}
        onPress={this._chooseAnnotation}
      >
        <Text style={text_style}>{this.props.annotation}</Text>
      </TouchableOpacity>
    );
  }
}
