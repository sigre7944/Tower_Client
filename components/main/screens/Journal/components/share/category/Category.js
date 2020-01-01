import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Keyboard,
  Platform
} from "react-native";

import { FlatList } from "react-native-gesture-handler";

import { styles } from "./styles/styles";
import { OrderedMap, Map, fromJS } from "immutable";

import AddCategoryPanel from "./add-category-panel/AddCategoryPanel.Container";
import PremiumAd from "../../../../../../shared/components/premium-ad/PremiumAd.Container";
import {
  category_icon,
  check_icon,
  close_icon,
  plus_icon
} from "../../../../../../shared/icons";
import { normalize } from "../../../../../../shared/helpers";

const icon_size = normalize(14, "width");
const icon_color = "#2C2C2C";

const panel_width = normalize(338, "width");
const animation_duration = 250;
const easing = Easing.in();
const category_height = normalize(45, "height"); // row's height = 25 + margin top = 20

const list_max_height = 8 * category_height;

export default class Category extends React.PureComponent {
  repeat_opacity_value = new Animated.Value(0);

  start_index = 0;

  chosen_category_id = "";
  state = {
    should_flatlist_update: 0,
    current_category_index: 0,
    last_category_index: -1,
    should_display_add_category_panel: false,

    can_close_add_category_panel: false
  };

  _displayAddCategoryPanel = () => {
    this.setState({
      should_display_add_category_panel: true
    });
  };

  _closeAddCategoryPanel = should_go_to_login => {
    this.setState(
      {
        should_display_add_category_panel: false,
        can_close_add_category_panel: false
      },
      () => {
        if (should_go_to_login) {
          this.props.hideAction(should_go_to_login);
        }
      }
    );
  };

  _chooseCategoryRow = (category_index, category_id) => {
    this.chosen_category_id = category_id;

    if (this.state.current_category_index !== category_index) {
      this.setState(
        prevState => ({
          current_category_index: category_index,
          last_category_index: prevState.current_category_index,
          should_flatlist_update: prevState.should_flatlist_update + 1
        }),
        () => {
          this._scrollToRow(category_index);
        }
      );
    }
  };

  _scrollToRow = category_index => {
    if (this._flatlist_ref) {
      this._flatlist_ref.scrollToOffset({
        animated: true,
        offset: category_index * category_height
      });
    }
  };

  _scrollToEnd = () => {
    if (this._flatlist_ref) {
      this._flatlist_ref.scrollToEnd({ animated: true });
    }
  };

  _getItemLayout = (data, index) => ({
    length: category_height,
    offset: category_height * index,
    index
  });

  _setRef = r => (this._flatlist_ref = r);

  _findStartIndex = task_data => {
    if (task_data) {
      let category_id = Map(task_data).get("category");

      OrderedMap(this.props.categories)
        .keySeq()
        .every((key, index) => {
          if (key === category_id) {
            this.start_index = index;
            return false;
          }
          return true;
        });

      this._chooseCategoryRow(this.start_index, category_id);
    } else {
      let category_id = OrderedMap(this.props.categories)
        .keySeq()
        .get(0);
      this.start_index = 0;

      this._chooseCategoryRow(this.start_index, category_id);
    }
  };

  _findStartIndexEditMultiple = category_id => {
    if (category_id) {
      OrderedMap(this.props.categories)
        .keySeq()
        .every((key, index) => {
          if (key === category_id) {
            this.start_index = index;
            return false;
          }
          return true;
        });

      this._chooseCategoryRow(this.start_index, category_id);
    } else {
      let category_id = OrderedMap(this.props.categories)
        .keySeq()
        .get(0);
      this.start_index = 0;

      this.chosen_category_id = category_id;

      this.setState(prevState => ({
        current_category_index: this.start_index,
        last_category_index: prevState.current_category_index,
        should_flatlist_update: prevState.should_flatlist_update + 1
      }));
    }
  };

  _keyExtractor = (item, index) => {
    return `category-row-${item[0]}`;
  };

  _renderItem = ({ item, index }) => {
    return (
      <CategoryRow
        data={item[1]}
        category_index={index}
        _chooseCategoryRow={this._chooseCategoryRow}
        current_category_index={this.state.current_category_index}
        last_category_index={this.state.last_category_index}
        generalSettings={this.props.generalSettings}
        toggleAddTask={this.props.toggleAddTask}
        navigation={this.props.navigation}
      />
    );
  };

  _cancel = () => {
    this._animateEnd(this.props.hideAction, this.props.edit);
  };

  _save = () => {
    if (this.props.edit) {
      let keyPath = ["category"],
        notSetValue = this.chosen_category_id,
        updater = value => this.chosen_category_id;

      this.props._editFieldData(keyPath, notSetValue, updater);
    } else if (this.props.edit_multiple) {
      this.props._editMultipleFieldData(this.chosen_category_id);
    } else {
      let sending_obj = {
        keyPath: ["category"],
        notSetValue: this.chosen_category_id,
        updater: value => this.chosen_category_id
      };

      this.props.updateTaskCategory(sending_obj);
    }

    this._cancel();
  };

  _animate = edit => {
    Animated.timing(this.repeat_opacity_value, {
      toValue: 1,
      duration: animation_duration,
      easing,
      // useNativeDriver: edit ? false : true
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start();
  };

  _animateEnd = (callback, edit) => {
    Animated.timing(this.repeat_opacity_value, {
      toValue: 0,
      duration: animation_duration,
      easing,
      // useNativeDriver: edit ? false : true
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start(() => {
      callback();
    });
  };

  _chooseNewCreatedCategory = () => {
    let latest_index = OrderedMap(this.props.categories).size - 1;

    this.chosen_category_id = Map(
      OrderedMap(this.props.categories).toArray()[latest_index][1]
    ).get("id");

    this.setState(
      prevState => ({
        current_category_index: latest_index,
        last_category_index: prevState.current_category_index,
        should_flatlist_update: prevState.should_flatlist_update + 1
      }),
      () => {
        this.setState(
          {
            can_close_add_category_panel: true
          },
          () => {
            setTimeout(() => {
              this._scrollToEnd();
            }, 50);
          }
        );
      }
    );
  };

  componentDidMount() {
    this._animate(this.props.edit);

    if (this.props.edit) {
      this._findStartIndex(this.props.edit_task_data);
    } else if (this.props.edit_multiple) {
      this._findStartIndexEditMultiple(
        this.props.edit_multiple_chosen_category_id
      );
    } else {
      this._findStartIndex(this.props.task_data);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.categories !== prevProps.categories) {
      this._chooseNewCreatedCategory();
    }

    if (
      this.props.should_call_end_animation_from_parent !==
      prevProps.should_call_end_animation_from_parent
    ) {
      this._cancel();
    }
  }

  render() {
    return (
      <Animated.View
        style={{
          position: "absolute",
          width: panel_width,
          backgroundColor: "white",
          borderRadius: 10,
          overflow: "hidden",
          opacity: this.repeat_opacity_value
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: normalize(30, "width"),
            marginTop: normalize(30, "height")
          }}
        >
          <View
            style={{
              width: icon_size,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {category_icon(icon_size, icon_color)}
          </View>

          <Text style={styles.category_title}>Category</Text>
        </View>

        <View
          style={{
            marginTop: normalize(10, "height"),
            marginHorizontal: normalize(30, "width"),
            height: list_max_height
          }}
        >
          <FlatList
            data={OrderedMap(this.props.categories).toArray()}
            extraData={this.state.should_flatlist_update}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            showsVerticalScrollIndicator={false}
            ref={this._setRef}
            getItemLayout={this._getItemLayout}
            initialScrollIndex={this.start_index}
            initialNumToRender={3}
            windowSize={3}
            maxToRenderPerBatch={3}
            removeClippedSubviews={true}
          />
        </View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: normalize(20, "height"),
            height: normalize(25, "height"),
            marginHorizontal: normalize(30, "width"),
            alignItems: "center"
          }}
          onPress={this._displayAddCategoryPanel}
        >
          <View
            style={{
              width: normalize(14, "width"),
              height: normalize(14, "width"),
              borderRadius: normalize(14, "width"),
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.3)"
            }}
          >
            {plus_icon(normalize(9, "width"), "rgba(0, 0, 0, 0.3)")}
          </View>

          <Text style={styles.category_text}>Add a new list</Text>
        </TouchableOpacity>

        {this.state.should_display_add_category_panel ? (
          <AddCategoryPanel
            _closeAddCategoryPanel={this._closeAddCategoryPanel}
            can_close_add_category_panel={
              this.state.can_close_add_category_panel
            }
          />
        ) : null}

        <View
          style={{
            marginTop: normalize(28, "height"),
            marginHorizontal: normalize(30, "width"),
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: normalize(35, "height")
          }}
        >
          <TouchableOpacity
            style={styles.close_icon_holder}
            onPress={this._cancel}
          >
            {close_icon(normalize(19, "width"), "white")}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.save_icon_holder}
            onPress={this._save}
          >
            {check_icon(normalize(19, "width"), "white")}
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

class CategoryRow extends React.Component {
  state = {
    can_choose: false,
    should_display_premium_ad: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.category_index === nextProps.current_category_index ||
      this.props.category_index === nextProps.last_category_index ||
      Map(this.props.generalSettings).getIn(["account", "package", "plan"]) !==
        Map(nextProps.generalSettings).getIn(["account", "package", "plan"]) ||
      this.state !== nextState
    );
  }

  _goToLogin = () => {
    this.setState(
      {
        should_display_premium_ad: false
      },
      () => {
        Keyboard.dismiss();
        this.props.toggleAddTask();
        this.props.navigation.navigate("SignInScreen");
      }
    );
  };

  _toggleShouldDisplayPremiumAd = () => {
    this.setState(prevState => ({
      should_display_premium_ad: !prevState.should_display_premium_ad
    }));
  };

  _chooseCategoryRow = () => {
    if (this.state.can_choose) {
      this.props._chooseCategoryRow(
        this.props.category_index,
        Map(this.props.data).get("id")
      );
    } else {
      this._toggleShouldDisplayPremiumAd();
    }
  };

  _checkIfCanChoose = () => {
    let account_plan = Map(this.props.generalSettings).getIn([
        "account",
        "package",
        "plan"
      ]),
      category_plan = Map(this.props.data).get("plan"),
      can_choose = false;

    if (category_plan === "free") {
      can_choose = true;
    } else {
      can_choose = account_plan === category_plan;
    }

    this.setState({
      can_choose
    });
  };

  componentDidMount() {
    this._checkIfCanChoose();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      Map(this.props.generalSettings).getIn(["account", "package", "plan"]) !==
      Map(prevProps.generalSettings).getIn(["account", "package", "plan"])
    ) {
      this._checkIfCanChoose();
    }
  }

  render() {
    let chosen =
        this.props.category_index === this.props.current_category_index,
      chosen_button_container_style = styles.unchosen_button_container;

    if (chosen) {
      chosen_button_container_style = styles.chosen_button_container;
    }

    let can_choose = this.state.can_choose;

    return (
      <View
        style={{
          opacity: can_choose ? 1 : 0.3
        }}
      >
        <TouchableOpacity
          style={styles.category_row_container}
          onPress={this._chooseCategoryRow}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: normalize(20, "height")
            }}
          >
            {Map(this.props.data).get("color") === "no color" ||
            Map(this.props.data).get("color") === "white" ? (
              <View
                style={{
                  width: normalize(14, "width"),
                  height: normalize(14, "width"),
                  borderRadius: normalize(14, "width"),
                  borderWidth: 1,
                  borderColor: "#2C2C2C",
                  justifyContent: "center",
                  alignItems: "center"
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
                  width: normalize(14, "width"),
                  height: normalize(14, "width"),
                  borderRadius: normalize(14, "width"),
                  backgroundColor: Map(this.props.data).get("color")
                }}
              ></View>
            )}

            <Text style={styles.category_text}>
              {Map(this.props.data).get("name")}
            </Text>
          </View>

          <View style={chosen_button_container_style}>
            {chosen ? (
              <View style={styles.inner_button_container}></View>
            ) : null}
          </View>

          {this.state.should_display_premium_ad ? (
            <PremiumAd
              dismissAction={this._toggleShouldDisplayPremiumAd}
              motivation_text="The category was disabled due to Free plan."
              _goToLogin={this._goToLogin}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}
