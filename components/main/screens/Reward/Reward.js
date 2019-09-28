import React from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  Keyboard,
  Animated,
  KeyboardAvoidingView
} from 'react-native';

import TrackingSection from './components/tracking-section/TrackingSection'
import StoreSection from './components/store-section/StoreSection'

export default class Reward extends React.Component {
  keyboardHeight = 0

  state = {
    is_add_new: false,
    keyboardHeight: 0,
  }

  addNewReward = () => {
    this.setState(prevState => ({
      is_add_new: !prevState.is_add_new
    }), () => { this._scrollViewRef.scrollToEnd() })
  }

  _setScrollViewRef = (ref) => {
    this._scrollViewRef = ref
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
      >
        <ScrollView
          // endFillColor={"#F2F2F2"}
          style={{
            backgroundColor: "#F2F2F2",
          }}
          ref={this._setScrollViewRef}
          keyboardShouldPersistTaps="always"
        >
          <View
            style={{
              // marginBottom: this.state.is_add_new ? this.keyboardHeight : 0,
            }}
          >
            {/* Tracking section */}
            <TrackingSection

            />

            {/* Store Section */}
            <StoreSection
              addNewReward={this.addNewReward}
              is_add_new={this.state.is_add_new}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({

})