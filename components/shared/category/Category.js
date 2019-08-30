import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    FlatList,
    Dimensions,
    Animated
} from 'react-native';

export default class Category extends React.Component {

    constructor(props) {
        super(props)

        this.addNewCateRef = React.createRef()
    }

    state = {
        //mock data for category, the unmock one will be saved in Redux store
        category_arr: [],

        //Current and previous chosen index of category in category_arr
        currentIndex: -1,
        lastIndex: -1,

        //translateY style value properties to make the panel move down and up when keyboard is called
        translateYValue: new Animated.Value(0),

        add_new_cate_input_focused: false,

        // boolean to determine whether users click "color" button when creating new category
        add_new_cate_choose_color: false,

        // mock data for a new category (it can be added or not, just an object to hold existing data)
        new_cate_data: {
            color: "white",
            name: "",
            quantity: 0
        },

        // count to update flat list (every update, plus 1)
        should_flat_list_rerender: 0,

    }

    _keyExtractor = (item, index) => `flatlist-category-${index}`

    _renderItem = ({ item, index }) => {
        if (index !== this.state.category_arr.length - 1)
            return (
                <CategoryRow
                    data={item}
                    index={index}
                    currentIndex={this.state.currentIndex}
                    lastIndex={this.state.lastIndex}
                    selectCategory={this.selectCategory}

                    task_data={this.props.task_data}
                />
            )

        else {
            return (
                <AddNewCategory
                    data={item}
                    index={index}
                    clickAddTask={this.clickAddTask}
                    unclickAddTask={this.unclickAddTask}
                    setInputRef={this.setInputRef}
                    focusBackToInput={this.focusBackToInput}
                    setNewCateData={this.setNewCateData}
                    new_cate_data={this.state.new_cate_data}
                />
            )
        }
    }

    // handle selections of categories from user
    // to minimize the number of updates
    selectCategory = (index) => {
        this.setState((state, props) => ({
            lastIndex: state.currentIndex,
            currentIndex: index,
            should_flat_list_rerender: state.should_flat_list_rerender + 1,
        }))
    }

    // move up category panel when users click on the input 'add new category'
    clickAddTask = () => {
        Animated.timing(
            this.state.translateYValue,
            {
                toValue: - 100,
                duration: 200,
            }
        ).start()

        this.setState({
            add_new_cate_input_focused: true
        })
    }


    // move down category panel when keyboard is dismissed
    unclickAddTask = () => {
        this.setState({
            add_new_cate_input_focused: false
        })

        Animated.timing(
            this.state.translateYValue,
            {
                toValue: 0,
                duration: 200,
            }
        ).start()
    }

    // assign the 'add new category' input's reference to make it available to other child components
    setInputRef = (ref) => {
        this.addNewCateRef = ref
    }

    // when users click on 'color' button of creating new category
    // we dismiss the keyboard and the row of new category buttons (cancel, color, create)
    // and turn on the color panel.
    chooseColorAddNewCate = () => {
        this.setState(prevState => ({
            add_new_cate_choose_color: !prevState.add_new_cate_choose_color
        }))

        Keyboard.dismiss()
    }

    // does what it says
    focusBackToInput = () => {
        this.addNewCateRef.focus()
    }

    // update the new_cate_data object with new data (name and backgroundColor)
    setNewCateData = (data) => {
        this.setState(prevState => ({
            new_cate_data: { ...prevState.new_cate_data, ...data }
        }))
    }

    // action when users click 'Create' button when creating new category
    addNewCateData = () => {
        if (this.state.new_cate_data.name.length > 0) {
            let category_arr = [... this.state.category_arr]

            category_arr.push(category_arr[category_arr.length - 1])
            category_arr[category_arr.length - 2] = this.state.new_cate_data


            this.setState(prevState => ({
                //reset new_cate_data
                new_cate_data: { ...prevState.new_cate_data, ...{ name: "", color: "white" } },

                // update the lastIndex and currentIndex to rerender the Flatlist, make it update the color of current
                // chosen category (freshly created category).
                lastIndex: prevState.currentIndex,
                currentIndex: category_arr.length - 2
            }))

            let key = "cate_" + (this.state.category_arr.length - 1),
                data = {}

            data[key] = {... this.state.new_cate_data}

            this.props.createCategory(data)
        }
    }

    initializeCategoryArr = () => {
        let categories = this.props.categories,
            category_arr = []
        for (var key in categories) {
            if (categories.hasOwnProperty(key)) {
                category_arr.push({
                    id: key,
                    ...categories[key]
                })
            }
        }

        category_arr.push({
            name: "Add new category"
        })

        this.setState({
            category_arr: [...category_arr]
        })
    }

    save = () => {
        let category_key = Object.keys(this.props.categories)[this.state.currentIndex]
        this.props.updateTask({ category: category_key })

        this.props.hideAction()
    }

    clear = () => {

        this.selectCategory(0)
    }

    cancel = () => {
        this.props.hideAction()
    }

    componentDidMount() {
        this.initializeCategoryArr()
    }

    componentDidUpdate(prevProps, prevState) {
        // flat list will rerender only when its data is changed or extra data is changed.
        // In this case will update its extra data to rerender the flat list to update the color of
        // the row containing 'Add new category' input
        if (this.state.new_cate_data.color !== prevState.new_cate_data.color) {
            this.setState(state => ({
                should_flat_list_rerender: state.should_flat_list_rerender + 1,
            }))
        }

        if (this.props.categories !== prevProps.categories) {
            this.initializeCategoryArr()
        }

    }

    render() {
        return (
            <>
                <Animated.View
                    style={{
                        position: 'absolute',
                        width: 338,
                        height: 390,
                        transform: [{ translateY: this.state.translateYValue }],
                        backgroundColor: 'white',
                        borderRadius: 10,
                        paddingHorizontal: 30,
                        paddingVertical: 30,
                    }}
                >
                    <View
                        style={{
                            height: 20,
                            justifyContent: "center",
                        }}
                    >
                        <Text>Category</Text>
                    </View>

                    <View
                        style={{
                            height: 200,
                            marginTop: 20,
                        }}
                    >
                        <FlatList
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            data={this.state.category_arr}
                            extraData={this.state.should_flat_list_rerender}
                            removeClippedSubviews={true}
                        />
                    </View>

                    {/* Renders the row of buttons when creating new category only when the Keyboard is called */}
                    {/* (The Keyboard is called meaning the category panel will go up) */}
                    {this.state.add_new_cate_input_focused ?
                        <AddNewCateButtons
                            chooseColorAddNewCate={this.chooseColorAddNewCate}
                            addNewCateData={this.addNewCateData}
                        />


                        :

                        <></>

                    }

                    <View
                        style={{
                            height: 60,
                            marginBottom: 10,
                            backgroundColor: 'white',
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: 'center'
                        }}
                    >
                        <TouchableHighlight
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                height: 50,
                                width: 50,
                                borderRadius: 25,
                                backgroundColor: 'gray',
                                marginRight: 20
                            }}

                            onPress={this.clear}
                        >
                            <Text
                                style={{
                                    color: "white"
                                }}
                            >
                                Clear
                            </Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                height: 50,
                                width: 50,
                                borderRadius: 25,
                                backgroundColor: 'gray',
                                marginRight: 20
                            }}

                            onPress={this.cancel}
                        >
                            <Text
                                style={{
                                    color: "white"
                                }}
                            >
                                X
                            </Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                height: 50,
                                width: 50,
                                borderRadius: 25,
                                backgroundColor: 'gray',
                                marginRight: 10
                            }}

                            onPress={this.save}
                        >
                            <Text
                                style={{
                                    color: "white"
                                }}
                            >
                                OK
                            </Text>
                        </TouchableHighlight>
                    </View>

                    {/* Renders the color panel when users click on 'Color' button in creating new category process */}
                    {/* (The Keyboard will be dismissed when the color panel is called) */}
                    {this.state.add_new_cate_choose_color ?
                        <AddNewCateColorPanel
                            chooseColorAddNewCate={this.chooseColorAddNewCate}
                            focusBackToInput={this.focusBackToInput}
                            setNewCateData={this.setNewCateData}
                        />

                        :

                        <></>
                    }



                </Animated.View>
            </>
        )
    }
}

// row for rendering purpose in Flatlist
class CategoryRow extends React.PureComponent {
    static styles = StyleSheet.create({
        unChosenRadio: {
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: "gainsboro",
            borderRadius: 20,
        },
        chosenRadio: {
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: "gainsboro",
            borderRadius: 20,
            backgroundColor: "black"
        }
    })

    state = {
        radioStyle: CategoryRow.styles.unChosenRadio
    }


    _onPress = () => {
        this.props.selectCategory(this.props.index)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.index === nextProps.currentIndex) {
            return ({
                radioStyle: CategoryRow.styles.chosenRadio
            })
        }

        else if (nextProps.index === nextProps.lastIndex) {
            return ({
                radioStyle: CategoryRow.styles.unChosenRadio
            })
        }

        return null
    }

    componentDidMount() {
        let { category } = this.props.task_data

        if (category && category.length > 0) {
            if (this.props.data.id === category) {
                this._onPress()
            }
        }
    }

    render() {
        return (
            <TouchableHighlight
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 20,
                    height: 30,
                }}

                onPress={this._onPress}
            >
                <>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                width: 15,
                                height: 15,
                                borderRadius: 15,
                                backgroundColor: this.props.data.color,
                                borderWidth: 1,
                                borderColor: "gainsboro"
                            }}
                        >

                        </View>

                        <Text
                            style={{
                                color: "gainsboro",
                                marginLeft: 22,
                            }}
                        >
                            {this.props.data.name}
                        </Text>
                    </View>

                    <View
                        style={this.state.radioStyle}
                    >

                    </View>
                </>
            </TouchableHighlight>
        )
    }
}

// also in the Flatlist' rendering function but its purpose 
// is to create new category
class AddNewCategory extends React.PureComponent {

    state = {
        value: ""
    }

    // set reference of 'Add new category' input to its parent
    _setRef = (ref) => {
        this.props.setInputRef(ref)
    }

    // focus on 'Add new category' input through its parent's relevant reference
    focusOnInput = () => {
        this.props.focusBackToInput()
    }

    _onChange = (e) => {
        this.setState({
            value: e.nativeEvent.text
        })
    }

    toDoWhenKeyboardWillShow = (e) => {
        this.props.clickAddTask(e.endCoordinates.height)
    }

    toDoWhenKeyboardWillHide = () => {
        this.props.unclickAddTask()
    }

    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener(
            "keyboardWillShow",
            this.toDoWhenKeyboardWillShow
        )

        this.keyboardWillHideListener = Keyboard.addListener(
            "keyboardWillHide",
            this.toDoWhenKeyboardWillHide
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.value !== prevState.value) {
            this.props.setNewCateData({ name: this.state.value })
        }
    }

    componentWillUnmount() {
        Keyboard.removeListener("keyboardWillShow", this.toDoWhenKeyboardWillShow)
        Keyboard.removeListener("keyboardWillHide", this.toDoWhenKeyboardWillHide)
    }

    render() {
        return (
            <TouchableHighlight
                style={{
                    flexDirection: "row",
                    marginTop: 20,
                }}

                onPress={this.focusOnInput}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        height: 30,
                    }}
                >
                    <View
                        style={{
                            width: 15,
                            height: 15,
                            borderRadius: 15,
                            backgroundColor: this.props.new_cate_data.color,
                            borderWidth: 1,
                            borderColor: "gainsboro"
                        }}
                    >

                    </View>

                    {/* <Text>{this.props.data.name}</Text> */}
                    <TextInput
                        style={{
                            width: 100,
                            height: 30,
                            marginLeft: 22,
                        }}

                        placeholder={this.props.data.name}
                        returnKeyLabel={"Return"}
                        ref={this._setRef}

                        onChange={this._onChange}
                        value={this.state.value}
                    />
                </View>
            </TouchableHighlight>
        )
    }
}

// row of buttons that appears when users click on 'Add new category' input
// containing 'Cancel', 'Color', 'Create'
class AddNewCateButtons extends React.PureComponent {

    cancelAddNew = () => {
        Keyboard.dismiss()
    }

    chooseColor = () => {
        this.props.chooseColorAddNewCate()
    }

    createNewCate = () => {
        this.props.addNewCateData()
    }

    render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginTop: 15,
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <TouchableHighlight
                    style={{
                        width: 70,
                        height: 30,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "gainsboro",
                        alignItems: "center",
                        justifyContent: "center"
                    }}

                    onPress={this.cancelAddNew}
                >
                    <Text>Cancel</Text>
                </TouchableHighlight>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <TouchableHighlight
                        style={{
                            width: 70,
                            height: 30,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "gainsboro",
                            alignItems: "center",
                            justifyContent: "center"
                        }}

                        onPress={this.chooseColor}
                    >
                        <Text>Color</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{
                            width: 70,
                            height: 30,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "gainsboro",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 10,
                        }}

                        onPress={this.createNewCate}
                    >
                        <Text>Create</Text>
                    </TouchableHighlight>
                </View>

            </View>
        )
    }
}


// Panel of colors when users click on the button 'Color' when creating new category
class AddNewCateColorPanel extends React.PureComponent {

    state = {
        colors: ["gainsboro", "red", "yellow", "green", "blue", "pink", "brown", "purple", "grey", "orange", "#C9FFE5", "#EFDECD"]
    }

    closeColorPanelAndFocusBackToInput = () => {
        this.props.chooseColorAddNewCate()
        this.props.focusBackToInput()
    }

    render() {
        return (
            <Modal
                transparent={true}
            >
                <View
                    style={{
                        alignItems: "center",
                        position: "relative",
                        flex: 1,
                    }}
                >

                    <TouchableWithoutFeedback
                        onPress={this.closeColorPanelAndFocusBackToInput}
                    >
                        <View
                            style={{
                                flex: 1,
                                width: Dimensions.get("window").width,
                                backgroundColor: "black",
                                opacity: 0.5,
                            }}
                        >
                        </View>
                    </TouchableWithoutFeedback>


                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            backgroundColor: "white",
                            borderWidth: 1,
                            borderColor: "gainsboro",
                            borderRadius: 10,
                            position: "absolute",
                            width: 250,
                            height: 200,
                            top: 435,
                        }}
                    >
                        {this.state.colors.map((color, index) => (
                            <ColorButton
                                key={`color-${index}`}
                                color={color}
                                {... this.props}
                                closeColorPanelAndFocusBackToInput={this.closeColorPanelAndFocusBackToInput}
                            />
                        ))}
                    </View>
                </View>
            </Modal>
        )
    }
}

// renders each touchable color holder
class ColorButton extends React.PureComponent {
    chooseColor = () => {
        this.props.setNewCateData({ color: this.props.color })
        this.props.closeColorPanelAndFocusBackToInput()
    }

    render() {
        return (
            <TouchableHighlight
                style={{
                    backgroundColor: this.props.color,
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    marginHorizontal: 15,
                    marginVertical: 10,
                }}

                onPress={this.chooseColor}
            >
                <></>
            </TouchableHighlight>
        )
    }
}