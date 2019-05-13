import React from 'react'

import {
    Text,
    TouchableHighlight,
} from 'react-native';

export default AddTaskButton = (props) => (
    <TouchableHighlight
        onPress = {() => {
            props.addTaskButtonActionProp()
        }}
        style= {{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: -35,
            zIndex: 10
        }}
    >
        <>
        <Text style={{
            color: 'white'
        }}>add</Text>
        </>
    </TouchableHighlight>
)
