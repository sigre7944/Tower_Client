import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
    Alert,
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    ImageBackground,
    Modal,
    TouchableHighlight,
    Image,
    TextInput,
    ScrollView,
    FlatList,
    Platform,
} from 'react-native'

export default class Drawer extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    paddingHorizontal: 16,
                    paddingBottom: 24,
                    paddingTop: 34,
                    flex: 1
                }}
            >
                <View
                    style={{
                        height: 28,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text>
                        Sign in or Sign up
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 18,
                        height: 30,
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(196, 196, 196, 0.7)",
                            borderRadius: 5,
                        }}
                    />
                </View>

                <CategoryList
                    {... this.props}
                />
            </View>
        )
    }
}

class CategoryList extends React.PureComponent {


    state = {
        category_arr: [],
        should_flatlist_update: 0
    }

    _keyExtractor = (item, index) => `category-${index}`

    _renderItem = ({ item, index }) => {
        if (index < this.state.category_arr.length - 1) {
            return (
                <CategoryRow
                    data={item}
                    category_index={index}
                />
            )
        }

        return (
            <AddCategoryRow />
        )
    }

    loadCategories = (categories) => {
        let category_arr = []

        for (var key in categories) {
            if (categories.hasOwnProperty(key)) {
                category_arr.push({
                    id: key,
                    ...categories[key]
                })
            }
        }

        category_arr.push({
            name: "Add category"
        })

        this.setState(prevState => ({
            category_arr: [...category_arr],
            should_flatlist_update: prevState.should_flatlist_update + 1
        }))
    }

    componentDidMount(){
        this.loadCategories(this.props.categories)
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.categories !== prevProps.categories){
            this.loadCategories(this.props.categories)
        }
    }

    render() {
        return (
            <FlatList
                data={this.state.category_arr}
                extraData={this.state.should_flatlist_update}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        )
    }
}

class CategoryRow extends React.Component {

    render() {
        return (
            <TouchableOpacity
                style={{
                    height: 50,
                    marginTop: 10,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <View>
                        <Text>
                            {this.props.data.name}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            {this.props.data.quantity}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

class AddCategoryRow extends React.PureComponent {

    render() {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 50,
                    marginTop: 10,
                    justifyContent: "center"
                }}
            >
                <Text>
                    Add Category
                </Text>
            </TouchableOpacity>
        )
    }
}