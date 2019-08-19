import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements'

export default class TaskCard extends Component {
    state={
        checked: false
    }

    _onPress = () => {
        this.props.onPress(this.props.task_data)
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this._onPress}>
                
                    <View style={styles.checkBox}>
                        <CheckBox 
                            center
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.checked}
                            onPress={() => this.setState({checked: !this.state.checked})}
                        />
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.descriptionText}>{this.props.title ? this.props.title  : 'Example task'}</Text>
                        <Text style={styles.descriptionAmount}>{this.props.goal ? `${this.props.goal.current}/${this.props.goal.max}` : "0/3"}</Text>
                    </View>
                    <View style={styles.share}>
                        <FontAwesome name={'link'} style={styles.icon}/>
                    </View>
                    <View style={styles.colorBox}>
                        <FontAwesome name={'circle'} style={styles.icon}/>
                    </View>
                
            </TouchableOpacity> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        borderWidth: 1,
        borderColor: 'grey',
        borderLeftWidth: 3,
        marginBottom: 4,
        marginTop: 4,
        backgroundColor: 'white',
        zIndex:30
    },
    checkBox: {
        width: 50,
        height: 60
    },
    description: {
        flex: 1
    },
    descriptionText:{
        lineHeight: 25,
        fontSize: 16
    },
    descriptionAmount: {
        lineHeight: 25,
        opacity: 0.5
    },
    share: {
        width: 50,
        height: 60,
    },
    colorBox: {
        width: 50,
        height: 60
    },
    icon: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        lineHeight: 60
    }
});