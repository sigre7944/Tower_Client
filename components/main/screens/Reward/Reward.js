import React from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  Keyboard,
  Animated,
  KeyboardAvoidingView
} from 'react-native';

import TrackingSection from './components/tracking-section/TrackingSection.Container'
import StoreSection from './components/store-section/StoreSection'

export default class Reward extends React.Component {

  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: "#F2F2F2",
        }}
      >
        {/* Tracking section */}
        <TrackingSection
        />

        {/* Store Section */}
        <StoreSection
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

})