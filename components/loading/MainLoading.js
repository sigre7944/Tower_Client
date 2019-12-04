import React from 'react';
import {
    View,
    Image
} from 'react-native';

export default class MainLoading extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <View
                    style={{
                        width: 150,
                        height: 150,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Image
                        source={this.props.logo}
                        style={{
                            flex: 1
                        }}
                        resizeMode="contain"
                    />
                </View>
            </View>
        )
    }
}