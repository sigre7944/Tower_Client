import React from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default class Something extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Notifications',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
  
    render() {
      return (
        <View>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="Open Drawer"
        />
        </View>
      );
    }
  }