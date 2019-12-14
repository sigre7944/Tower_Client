import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Picker,
  Dimensions
} from "react-native";

import { styles } from "./styles/styles";

const window_width = Dimensions.get("window").width;

export default class ChooseWeekNthInMonth extends React.PureComponent {
  week_nth_text_array = ["First", "Second", "Third", "Last"];

  render() {
    // let weekth_container_style = styles.unchosen_weekth_container,
    //     weekth_text_style = styles.unchosen_weekth_text,
    //     week_every_month_text_style = styles.unchosen_week_every_month_text

    // if (this.props.is_week_nth_option_selected) {
    //     weekth_container_style = styles.chosen_weekth_container
    //     weekth_text_style = styles.chosen_weekth_text
    //     week_every_month_text_style = styles.chosen_week_every_month_text
    // }

    let weekth_container_style = styles.chosen_weekth_container,
      weekth_text_style = styles.chosen_weekth_text,
      week_every_month_text_style = styles.chosen_week_every_month_text;

    return (
      <View
        style={{
          flexDirection: "row",
          marginLeft: 59,
          alignItems: "center",
          marginTop: 20
        }}
      >
        <Text style={week_every_month_text_style}>
          {this.week_nth_text_array[this.props.no_week_in_month - 1]} week every
          month
        </Text>
      </View>
    );
  }
}
