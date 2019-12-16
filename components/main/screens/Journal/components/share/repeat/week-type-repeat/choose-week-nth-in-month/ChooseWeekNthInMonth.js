import React from "react";

import { View, Text } from "react-native";

import { styles } from "./styles/styles";
import { normalize } from "../../../../../../../../shared/helpers";
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
          marginLeft: normalize(59, "width"),
          alignItems: "center",
          marginTop: normalize(20, "height")
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
