import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Easing,
  Animated,
  Platform
} from "react-native";

const window_width = Dimensions.get("window").width;
const anim_duration = 150;
import { styles } from "./styles";
import { normalize } from "../../../../shared/helpers";

export default class CustomTabBarComponent extends React.PureComponent {
  translate_x = new Animated.Value(0);

  state = {
    current_index: 0
  };

  goToDayScreen = () => {
    Animated.timing(this.translate_x, {
      toValue: 0,
      duration: anim_duration,
      easing: Easing.in(),
      // useNativeDriver: Platform.OS === "android" ? true : false
      useNativeDriver: true
    }).start(() => {
      this.setState(
        {
          current_index: 0
        },
        () => {
          // this.props.navigation.navigate("Day");
          this.props.changeRouteAction("Day");
          this.props.updateCurrentChosenJournalType("day");
        }
      );
    });

    // this.setState(
    //   {
    //     current_index: 0
    //   },
    //   () => {
    //     this.props.navigation.navigate("Day");
    //     this.props.updateCurrentChosenJournalType("day");
    //   }
    // );
  };

  _chooseDayTab = () => {
    Animated.timing(this.translate_x, {
      toValue: 0,
      duration: anim_duration,
      easing: Easing.in(),
      useNativeDriver: true
    }).start();

    this.setState(
      {
        current_index: 0
      },
      () => {
        this.props.updateCurrentJournalTab("Day");
        this.props.updateCurrentChosenJournalType("day");
        this.props._chooseTab(0);
      }
    );
  };

  goToWeekScreen = () => {
    Animated.timing(this.translate_x, {
      toValue: (window_width * 1) / 3,
      duration: anim_duration,
      easing: Easing.in(),
      // useNativeDriver: Platform.OS === "android" ? true : false
      useNativeDriver: true
    }).start(() => {
      this.setState(
        {
          current_index: 1
        },
        () => {
          // this.props.navigation.navigate("Week");
          this.props.changeRouteAction("Week");
          this.props.updateCurrentChosenJournalType("week");
        }
      );
    });

    // this.setState(
    //   {
    //     current_index: 1
    //   },
    //   () => {
    //     this.props.navigation.navigate("Week");
    //     this.props.updateCurrentChosenJournalType("week");
    //   }
    // );
  };

  _chooseWeekTab = () => {
    Animated.timing(this.translate_x, {
      toValue: (window_width * 1) / 3,
      duration: anim_duration,
      easing: Easing.in(),
      useNativeDriver: true
    }).start();

    this.setState(
      {
        current_index: 1
      },
      () => {
        this.props.updateCurrentJournalTab("Week");
        this.props.updateCurrentChosenJournalType("week");
        this.props._chooseTab(1);
      }
    );
  };

  goToMonthScreen = () => {
    Animated.timing(this.translate_x, {
      toValue: (window_width * 2) / 3,
      duration: anim_duration,
      easing: Easing.in(),
      // useNativeDriver: Platform.OS === "android" ? true : false
      useNativeDriver: true
    }).start(() => {
      this.setState(
        {
          current_index: 2
        },
        () => {
          // this.props.navigation.navigate("Month");
          this.props.changeRouteAction("Month");
          this.props.updateCurrentChosenJournalType("month");
        }
      );
    });

    // this.setState(
    //   {
    //     current_index: 2
    //   },
    //   () => {
    //     this.props.navigation.navigate("Month");
    //     this.props.updateCurrentChosenJournalType("month");
    //   }
    // );
  };

  _chooseMonthTab = () => {
    Animated.timing(this.translate_x, {
      toValue: (window_width * 2) / 3,
      duration: anim_duration,
      easing: Easing.in(),
      useNativeDriver: true
    }).start();

    this.setState(
      {
        current_index: 2
      },
      () => {
        this.props.updateCurrentJournalTab("Month");
        this.props.updateCurrentChosenJournalType("month");
        this.props._chooseTab(2);
      }
    );
  };

  componentDidMount() {
    this._chooseDayTab();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.taskTypeCreated !== prevProps.taskTypeCreated) {
      if (this.props.taskTypeCreated === "day") {
        this._chooseDayTab();
      } else if (this.props.taskTypeCreated === "week") {
        this._chooseWeekTab();
      } else {
        this._chooseMonthTab();
      }
    }
  }

  render() {
    return (
      <View
        style={{
          // marginTop: normalize(13, "height"),
          height: normalize(41, "height"),
          justifyContent: "center"
        }}
      >
        <View
          style={{
            width: Dimensions.get("window").width / 3,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Animated.View
            style={{
              height: normalize(3, "height"),
              width: normalize(52, "width"),
              backgroundColor: "#05838B",
              borderRadius: normalize(30, "width"),
              transform: [{ translateX: this.translate_x }]
            }}
          ></Animated.View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1
          }}
        >
          <TouchableOpacity
            style={styles.annotation_container}
            onPress={this._chooseDayTab}
          >
            <Text
              style={
                this.state.current_index === 0
                  ? styles.chosen_annotation_text
                  : styles.annotation_text
              }
            >
              Day
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.annotation_container}
            onPress={this._chooseWeekTab}
          >
            <Text
              style={
                this.state.current_index === 1
                  ? styles.chosen_annotation_text
                  : styles.annotation_text
              }
            >
              Week
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.annotation_container}
            onPress={this._chooseMonthTab}
          >
            <Text
              style={
                this.state.current_index === 2
                  ? styles.chosen_annotation_text
                  : styles.annotation_text
              }
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
