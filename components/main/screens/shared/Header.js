import React from 'react';
import {
    View,
    Image,
    Button,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 36,
    height: 36,
  },
});

export default class Header extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
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
            onPress={() => this.props.openDrawer()}
            title="Go to Options"
        />
        <Image
            onPress={() => this.props.openDrawer()}
            source={require('./icon.png')}
            style={[styles.icon, {tintColor: 'black'}]}
        />
        <Button
            onPress={() => this.props.openDrawer()}
            title="Open Drawer"
        />
        </View>
      );
    }
}