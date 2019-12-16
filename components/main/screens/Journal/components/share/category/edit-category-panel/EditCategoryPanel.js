import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  Modal,
  Dimensions,
  SafeAreaView
} from "react-native";

import { check_icon, close_icon } from "../../../../../../../shared/icons";
import { normalize } from "../../../../../../../shared/helpers";
const icon_size = normalize(29, "width");

import { styles } from "./styles/styles";

import { Map, OrderedMap } from "immutable";

const window_height = Dimensions.get("window").height;
const window_width = Dimensions.get("window").width;
const easing = Easing.in();
const animation_duration = 250;

export default class AddCategoryPanel extends React.PureComponent {
  anim_translate_y = new Animated.Value(window_height);
  anim_opacity_value = this.anim_translate_y.interpolate({
    inputRange: [0, window_height],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  state = {
    category_title: "",

    color: "no color",

    should_color_panel_display: false,

    category_title_exists: false
  };

  _closeTitleWarning = () => {
    this.setState({
      category_title_exists: false
    });
  };

  _setColor = color => {
    this.setState({
      color
    });
  };

  _appearAnim = () => {
    Animated.timing(this.anim_translate_y, {
      toValue: 0,
      duration: animation_duration,
      easing
      // useNativeDriver: true
    }).start();
  };

  _disappearAnim = callback => {
    Animated.timing(this.anim_translate_y, {
      toValue: window_height,
      duration: animation_duration,
      easing
      // useNativeDriver: true
    }).start(() => {
      callback();
    });
  };

  _close = () => {
    this._disappearAnim(this.props._closeAddCategoryPanel);

    // this.props._closeAddCategoryPanel()
  };

  _save = () => {
    if (
      this.state.category_title.length > 0 &&
      !this._checkIfCategoryNameExists(
        Map(this.props.category_data)
          .get("name")
          .trim(),
        this.state.category_title.trim()
      )
    ) {
      let id = Map(this.props.category_data).get("id"),
        new_category_obj = Map(this.props.category_data).asMutable();

      new_category_obj.update("name", v => this.state.category_title.trim());
      new_category_obj.update("color", v => this.state.color);

      sending_data = {
        keyPath: [id],
        notSetValue: {},
        updater: value => new_category_obj.toMap()
      };

      this.props.updateCategory(sending_data);
      this._close();
    }
  };

  _checkIfCategoryNameExists = (old_name, new_name) => {
    let found = false;

    if (new_name === old_name) {
      return false;
    }

    OrderedMap(this.props.categories)
      .valueSeq()
      .every(value => {
        if (Map(value).get("name") === new_name) {
          found = true;
          return false;
        }

        return true;
      });

    this.setState({
      category_title_exists: found
    });

    return found;
  };

  _onCategoryTitleChange = e => {
    this.setState({
      category_title: e.nativeEvent.text
    });
  };

  _openColorPanel = () => {
    this.setState({
      should_color_panel_display: true
    });
  };

  _closeColorPanel = () => {
    this.setState({
      should_color_panel_display: false
    });
  };

  _initializeCategoryData = () => {
    let category_data_map = Map(this.props.category_data);

    this.setState({
      category_title: category_data_map.get("name"),
      color: category_data_map.get("color")
    });
  };

  componentDidMount() {
    this._appearAnim();

    this._initializeCategoryData();
  }

  render() {
    return (
      <Modal transparent={true}>
        <View
          style={{
            flex: 1,
            position: "relative"
          }}
        >
          <Animated.ScrollView
            style={{
              width: window_width,
              height: window_height,
              backgroundColor: "white",
              transform: [{ translateY: this.anim_translate_y }],
              position: "absolute",
              opacity: this.anim_opacity_value
            }}
            scrollEnabled={false}
            keyboardDismissMode="on-drag"
          >
            <SafeAreaView>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: normalize(20, "width"),
                  marginTop: normalize(15, "height")
                }}
              >
                <TouchableOpacity
                  style={{
                    width: normalize(40, "width"),
                    height: normalize(40, "width"),
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={this._close}
                >
                  {close_icon(icon_size, "#2C2C2C")}
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: normalize(40, "width"),
                    height: normalize(40, "width"),
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={this._save}
                >
                  {check_icon(
                    icon_size,
                    this.state.category_title.length > 0 ? "#05838B" : "#BDBDBD"
                  )}
                </TouchableOpacity>
              </View>

              <Text style={styles.title_text}>Edit category</Text>

              <View
                style={{
                  marginTop: normalize(30, "height")
                }}
              >
                <Text style={styles.small_text}>Category Title</Text>

                <View style={styles.button_container}>
                  <TextInput
                    style={styles.text_input}
                    placeholder={Map(this.props.category_data).get("name")}
                    value={this.state.category_title}
                    onChange={this._onCategoryTitleChange}
                  />
                </View>
              </View>

              <View
                style={{
                  marginTop: normalize(30, "height")
                }}
              >
                <Text style={styles.small_text}>Colour</Text>

                <TouchableOpacity
                  style={styles.button_container}
                  onPress={this._openColorPanel}
                >
                  {this.state.color === "no color" ||
                  this.state.color === "white" ? (
                    <View
                      style={{
                        width: normalize(24, "width"),
                        height: normalize(24, "width"),
                        borderRadius: normalize(24, "width"),
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#2C2C2C",
                        marginBottom: normalize(10, "height")
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          width: 1,
                          backgroundColor: "#2C2C2C",
                          transform: [{ rotate: "45deg" }]
                        }}
                      ></View>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: normalize(24, "width"),
                        height: normalize(24, "width"),
                        borderRadius: normalize(24, "width"),
                        backgroundColor: this.state.color,
                        marginBottom: normalize(10, "height")
                      }}
                    ></View>
                  )}
                </TouchableOpacity>
              </View>

              {this.state.should_color_panel_display ? (
                <ColorPanel
                  _closeColorPanel={this._closeColorPanel}
                  _setColor={this._setColor}
                />
              ) : null}

              {this.state.category_title_exists ? (
                <NameExistsWarning
                  _closeTitleWarning={this._closeTitleWarning}
                />
              ) : null}

              {/* <View
                                    style={{
                                        marginTop: 30,
                                    }}
                                >
                                    <Text
                                        style={styles.small_text}
                                    >
                                        Shared with
                                </Text>

                                    <TouchableOpacity
                                    >
                                        <Text
                                            style={styles.invite_friends_text}
                                        >
                                            Invite friends
                                    </Text>
                                    </TouchableOpacity>
                                </View> */}
            </SafeAreaView>
          </Animated.ScrollView>
        </View>
      </Modal>
    );
  }
}

class NameExistsWarning extends React.PureComponent {
  render() {
    return (
      <Modal transparent={true}>
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
              width: window_width,
              backgroundColor: "black",
              opacity: 0.2
            }}
            onPress={this.props._closeTitleWarning}
          ></TouchableOpacity>

          <View
            style={{
              position: "absolute",
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              paddingHorizontal: normalize(30, "width"),
              paddingVertical: normalize(30, "height")
            }}
          >
            <Text style={styles.title_warning_text}>
              Category's title exists
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}

class ColorPanel extends React.PureComponent {
  scale_value = new Animated.Value(0.3);
  opacity_value = this.scale_value.interpolate({
    inputRange: [0, 0.3, 0.5, 0.7, 1],
    outputRange: [0, 0.3, 0.5, 0.7, 1],
    extrapolate: "clamp"
  });

  _animateStart = () => {
    Animated.timing(this.scale_value, {
      toValue: 1,
      easing,
      duration: animation_duration
      // useNativeDriver: true
    }).start();
  };

  _animateEnd = callback => {
    Animated.timing(this.scale_value, {
      toValue: 0,
      easing,
      duration: animation_duration
      // useNativeDriver: true
    }).start(() => {
      callback();
    });
  };

  _closeColorPanel = () => {
    this._animateEnd(this.props._closeColorPanel);
  };

  componentDidMount() {
    this._animateStart();
  }

  render() {
    return (
      <Modal transparent={true}>
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
              width: window_width,
              backgroundColor: "black",
              opacity: 0.2
            }}
            onPress={this._closeColorPanel}
          ></TouchableOpacity>

          <Animated.View
            style={{
              position: "absolute",
              width: normalize(200, "width"),
              height: normalize(200, "height"),
              backgroundColor: "white",
              borderRadius: 10,
              paddingHorizontal: normalize(32, "width"),
              paddingVertical: normalize(32, "height"),
              justifyContent: "space-between",
              transform: [{ scale: this.scale_value }],
              opacity: this.opacity_value
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <NoColorButton {...this.props} />
              <ColorButton color="#F78096" {...this.props} />
              <ColorButton color="#6F73D9" {...this.props} />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <ColorButton color="#E89005" {...this.props} />
              <ColorButton color="#CCF3F3" {...this.props} />
              <ColorButton color="#DDC8C4" {...this.props} />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <ColorButton color="#995852" {...this.props} />
              <ColorButton color="#EFDA6E" {...this.props} />
              <ColorButton color="#3B5998" {...this.props} />
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

class NoColorButton extends React.PureComponent {
  _choose = () => {
    this.props._setColor("no color");
    this.props._closeColorPanel();
  };

  render() {
    return (
      <TouchableOpacity
        style={{
          width: normalize(23, "width"),
          height: normalize(23, "width"),
          borderRadius: normalize(23, "width"),
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#2C2C2C"
        }}
        onPress={this._choose}
      >
        <View
          style={{
            flex: 1,
            width: 1,
            backgroundColor: "#2C2C2C",
            transform: [{ rotate: "45deg" }]
          }}
        ></View>
      </TouchableOpacity>
    );
  }
}

class ColorButton extends React.PureComponent {
  _chooseColor = () => {
    this.props._setColor(this.props.color);
    this.props._closeColorPanel();
  };

  render() {
    return (
      <TouchableOpacity
        style={{
          width: normalize(23, "width"),
          height: normalize(23, "width"),
          borderRadius: normalize(23, "width"),
          backgroundColor: this.props.color
        }}
        onPress={this._chooseColor}
      ></TouchableOpacity>
    );
  }
}
