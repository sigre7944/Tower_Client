import React from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    Button
} from 'react-native';

import Header from './shared/Header';

export default class Progress extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <StatusBar barStyle="default" />
            <SafeAreaView
            style={{ flex: 1 }}
            forceInset={{ horizontal: 'always', top: 'always' }}
            >
            <Header
                openDrawer={this.props.navigation.openDrawer}
            />
            <Button 
                    onPress={() => { this.props.navigation.openDrawer();}}
                    title="Go to OverView"></Button>
            </SafeAreaView>
        </View>
      );
    }
}
