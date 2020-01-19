import React from "react";

import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Dimensions,
  TouchableOpacity
} from "react-native";
import AddTaskButton from "./components/AddTaskButton";
import OverlayModal from "./components/modal-component/OverlayModal.Container";

import { styles } from "./styles/styles";

import {
  journal_icon,
  reward_screen_icon,
  progress_icon,
  settings_icon
} from "../../shared/icons";
import { primary_colors, text_icon_colors } from "../../shared/styles/style";
import { normalize } from "../../shared/helpers";

const icon_color = primary_colors.prim_1;
const window_width = Dimensions.get("window").width;
export default class BottomTabNavigator extends React.PureComponent {
  state = {
    addTaskClicked: false,
    renderAddTaskUI: null,
    keyboardHeight: 0,
    should_AddTaskButton_be_displayed: false
  };

  toggleAddTask = should_go_to_login_screen => {
    this.setState(
      prevState => ({
        addTaskClicked: !prevState.addTaskClicked
      }),
      () => {
        if (should_go_to_login_screen) {
          Keyboard.dismiss();
          this.props.navigation.navigate("SignInScreen");
        }
      }
    );
  };

  chooseNewScreen = routeName => {
    this.props.navigation.navigate({ routeName });
  };

  componentDidMount() {
    if (this.props.routeName === "Journal") {
      this.setState({
        should_AddTaskButton_be_displayed: true
      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.routeName !== prevProps.routeName) {
      if (this.props.routeName === "Journal") {
        this.setState({
          should_AddTaskButton_be_displayed: true
        });
      } else {
        this.setState({
          should_AddTaskButton_be_displayed: false
        });
      }
    }
  };

  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            height: normalize(60, "height"),
            display: "flex",
            alignItems: "center",
            shadowOffset: {
              width: 0,
              height: -4
            },
            shadowRadius: 10,
            shadowColor: "black",
            shadowOpacity: 0.04,
            elevation: 8,
            backgroundColor: "white"
          }}
        >
          {this.state.addTaskClicked ? (
            <OverlayModal
              toggleAddTask={this.toggleAddTask}
              navigation={this.props.navigation}
              addTaskClicked={this.state.addTaskClicked}
            />
          ) : null}

          {this.state.should_AddTaskButton_be_displayed ? (
            <AddTaskButton toggleAddTask={this.toggleAddTask} />
          ) : null}

          <View
            style={{
              display: "flex",
              backgroundColor: "#FFFFFF",
              flexDirection: "row",
              height: normalize(60, "height")
            }}
          >
            <ScreenComponent
              chooseNewScreen={this.chooseNewScreen}
              screen_route_name={"Journal"}
              routeName={this.props.routeName}
            />

            <ScreenComponent
              chooseNewScreen={this.chooseNewScreen}
              screen_route_name={"Progress"}
              routeName={this.props.routeName}
            />

            <ScreenComponent
              chooseNewScreen={this.chooseNewScreen}
              screen_route_name={"Reward"}
              routeName={this.props.routeName}
            />

            <ScreenComponent
              chooseNewScreen={this.chooseNewScreen}
              screen_route_name={"Settings"}
              routeName={this.props.routeName}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

class ScreenComponent extends React.Component {
  _onPress = () => {
    this.props.chooseNewScreen(this.props.screen_route_name);
  };

  render() {
    let route_name = this.props.routeName,
      screen_route_name = this.props.screen_route_name;

    let icon_text_style = styles.not_chosen_screen_component_text,
      icon_color = text_icon_colors.ti_3;

    if (route_name === screen_route_name) {
      icon_text_style = styles.chosen_screen_component_text;
      icon_color = primary_colors.prim_1;
    }

    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={{
          flex: 1,
          height: normalize(60, "height"),
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {this.props.screen_route_name === "Journal" ? (
              <>
                <View
                  style={{
                    height: normalize(30, "height"),
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {journal_icon(normalize(20, "width"), icon_color)}
                </View>
                <Text style={icon_text_style}>
                  {this.props.screen_route_name}
                </Text>
              </>
            ) : (
              <>
                {this.props.screen_route_name === "Progress" ? (
                  <>
                    <View
                      style={{
                        height: normalize(30, "height"),
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {progress_icon(normalize(20, "width"), icon_color)}
                    </View>
                    <Text style={icon_text_style}>
                      {this.props.screen_route_name}
                    </Text>
                  </>
                ) : (
                  <>
                    {this.props.screen_route_name === "Reward" ? (
                      <>
                        <View
                          style={{
                            height: normalize(30, "height"),
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          {reward_screen_icon(
                            normalize(24, "width"),
                            icon_color
                          )}
                        </View>
                        <Text style={icon_text_style}>
                          {this.props.screen_route_name}
                        </Text>
                      </>
                    ) : (
                      <>
                        <View
                          style={{
                            height: normalize(30, "height"),
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          {settings_icon(normalize(20, "width"), icon_color)}
                        </View>
                        <Text style={icon_text_style}>
                          {this.props.screen_route_name}
                        </Text>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
