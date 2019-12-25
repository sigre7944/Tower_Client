import React from "react";

import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Modal,
  Picker,
  Dimensions,
  Platform
} from "react-native";

import { styles } from "./styles/styles";

import { repeat_icon } from "../../../../../../../../shared/icons";
import { normalize } from "../../../../../../../../shared/helpers";
const icon_color = "#2C2C2C";
const icon_size = normalize(14, "width");

const window_width = Dimensions.get("window").width;

export default class RepeatValueHolder extends React.PureComponent {
  state = {
    current_chosen_repeat_type: "days",

    is_picker_opened: false
  };

  _changePickerValue = (itemValue, itemIndex) => {
    this.setState({
      current_chosen_repeat_type: itemValue
    });
  };

  _setRef = r => {
    this._text_input_ref = r;
  };

  _chooseInput = () => {
    if (this._text_input_ref) {
      this._text_input_ref.focus();
    }
  };

  _openPicker = () => {
    this.setState({
      is_picker_opened: true
    });
  };

  _closePicker = () => {
    this.setState({
      is_picker_opened: false,
      current_chosen_repeat_type: this.props.selected_repeat_type
    });
  };

  _chooseDonePicker = repeat_type => {
    this.props._setRepeatType(repeat_type);
    this._closePicker();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selected_repeat_type !== prevProps.selected_repeat_type) {
      this.setState({
        current_chosen_repeat_type: this.props.selected_repeat_type
      });
    }
  }

  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: normalize(30, "width"),
            marginTop: normalize(35, "height"),
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: icon_size,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {repeat_icon(icon_size, icon_color)}
          </View>
          <Text style={styles.title_text}>Repeat</Text>
        </View>

        <View
          style={{
            marginTop: normalize(25, "height"),
            flexDirection: "row",
            alignItems: "center",
            marginLeft: normalize(59, "width")
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
            onPress={this._chooseInput}
          >
            <Text style={styles.every_option_text}>Every</Text>

            <TextInput
              style={styles.every_option_input}
              maxLength={2}
              keyboardType="number-pad"
              value={this.props.repeat_input_value}
              onChange={this.props._onChangeRepeatInput}
              ref={this._setRef}
              autoCorrect={false}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.picker_button_container}
            onPress={this._openPicker}
          >
            <Text style={styles.every_option_text}>
              {this.props.selected_repeat_type}
            </Text>
          </TouchableOpacity>

          <RepeatTypePicker
            _closePicker={this._closePicker}
            _chooseDonePicker={this._chooseDonePicker}
            is_picker_opened={this.state.is_picker_opened}
            current_chosen_repeat_type={this.state.current_chosen_repeat_type}
            _changePickerValue={this._changePickerValue}
          />
        </View>
      </View>
    );
  }
}

class RepeatTypePicker extends React.PureComponent {
  _chooseDonePicker = () => {
    this.props._chooseDonePicker(this.props.current_chosen_repeat_type);
  };

  render() {
    return (
      <Modal transparent={true} visible={this.props.is_picker_opened}>
        <View
          style={{
            flex: 1,
            position: "relative"
          }}
        >
          <TouchableWithoutFeedback onPress={this.props._closePicker}>
            <View
              style={{
                flex: 1,
                width: window_width,
                backgroundColor: "#000000",
                opacity: 0.2
              }}
            />
          </TouchableWithoutFeedback>

          <View
            style={{
              position: "absolute",
              height: normalize(200, "height"),
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              borderTopLeftRadius: normalize(20, "width"),
              borderTopRightRadius: normalize(20, "width")
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                top: normalize(20, "height"),
                left: 0,
                right: 0,
                position: "absolute",
                zIndex: 15,
                height: normalize(30, "height"),
                paddingHorizontal: normalize(30, "width")
              }}
            >
              <TouchableOpacity
                style={{
                  height: normalize(30, "height"),
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={this.props._closePicker}
              >
                <Text style={styles.picker_cancel_option_text}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: normalize(30, "height"),
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={this._chooseDonePicker}
              >
                <Text style={styles.picker_done_option_text}>Done</Text>
              </TouchableOpacity>
            </View>

            {Platform.OS === "android" ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: normalize(50, "height")
                }}
              >
                <Picker
                  selectedValue={this.props.current_chosen_repeat_type}
                  onValueChange={this.props._changePickerValue}
                  itemStyle={styles.picker_value_text}
                  style={{
                    // flex: 1,
                    width: normalize(130, "width"),
                    zIndex: 10
                  }}
                >
                  <Picker.Item label="day" value="day" />
                  <Picker.Item label="week" value="week" />
                  <Picker.Item label="month" value="month" />
                </Picker>
              </View>
            ) : (
              <Picker
                selectedValue={this.props.current_chosen_repeat_type}
                onValueChange={this.props._changePickerValue}
                itemStyle={styles.picker_value_text}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  zIndex: 10,
                  marginTop: normalize(50, "height")
                }}
              >
                <Picker.Item label="day" value="day" />
                <Picker.Item label="week" value="week" />
                <Picker.Item label="month" value="month" />
              </Picker>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}
