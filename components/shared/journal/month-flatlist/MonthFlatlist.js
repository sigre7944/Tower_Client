import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native';

export default class MonthFlatlist extends React.Component {

    month_text_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    month_data = []

    comparing_year = -1

    _flatlistRef = React.createRef()

    start_index = 0

    month = new Date().getMonth()

    year = new Date().getFullYear()

    state = {
        should_update: 0,

        current_month_index: 0,
        last_month_index: 0,
    }

    chooseMonth = (month_index) => {
        this.setState(prevState => ({
            last_month_index: prevState.current_month_index,
            current_month_index: month_index,

            should_update: prevState.should_update + 1
        }))

        let month = this.month_data[month_index].month,
            year = this.month_data[month_index].year

        this.props.setChosenDateData({ month, year })

        this.scrollToIndex(month_index)
    }

    scrollToIndex = (index) => {
        if (this._flatlistRef) {
            this._flatlistRef.scrollToOffset({ animated: true, offset: index * 97 - 97 })
        }
    }

    _keyExtractor = (item, index) => `month-${index}`

    _renderItem = ({ item, index }) => {
        if (item.year_holder) {
            return (
                <YearHolder
                    data={item}
                />
            )
        }
        return (
            <MonthHolder
                data={item}
                month_index={index}
                current_month_index={this.state.current_month_index}
                last_month_index={this.state.last_month_index}
                chooseMonth={this.chooseMonth}
            />
        )
    }

    getMonthData = (month, year) => {
        if (this.comparing_year !== year) {
            this.comparing_year = year

            this.month_data.push({
                year_holder: true,
                year: this.comparing_year
            })
        }

        let end_day_of_month = new Date(year, month + 1, 0),
            first_day_of_month = new Date(year, month, 1)

        this.month_data.push({
            start_week: this.getWeek(first_day_of_month),
            end_week: this.getWeek(end_day_of_month),
            month,
            year
        })

        this.month += 1

        if (this.month > 11) {
            this.month = 0
            this.year += 1
        }
    }

    getWeek = (date) => {
        let target = new Date(date);
        let dayNr = (date.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        let firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() != 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target) / 604800000);
    }

    getMonday = (date) => {
        let dayInWeek = new Date(date).getDay()
        let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000))
    }

    _onEndReached = () => {
        this.getMonthData(this.month, this.year)

        this.setState(prevState => ({
            should_update: prevState.should_update + 1,
        }))
    }

    _getItemLayout = (data, index) => ({
        length: 97,
        offset: index * 97,
        index
    })

    setRef = (r) => {
        this._flatlistRef = r
    }

    _onScroll = (e) => {
        let index = Math.floor((e.nativeEvent.contentOffset.x) / 97 + 2)
        if (index < 0) {
            index = 0
        }
        let string

        if (this.month_data[index].month >= 0)
            string = `${this.month_text_arr[this.month_data[index].month]} - ${this.month_data[index].year}`

        else
            string = `${this.month_data[index].year}`

        this.props.updateHeaderText(string)
    }

    componentDidMount() {
        for (let i = 0; i < 10; i++) {
            this.getMonthData(this.month, this.year)
        }

        let current = new Date()

        this.month_data.every((data, index) => {
            if (data.month === current.getMonth() && data.year === current.getFullYear()) {
                this.start_index = index

                this.setState(prevState => ({
                    last_month_index: prevState.current_month_index,
                    current_month_index: index,

                    should_update: prevState.should_update + 1
                }))

                return false
            }

            return true
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.headerPressed !== prevProps.headerPressed){
            this.chooseMonth(this.start_index)
        }
    }

    render() {
        return (
            <View
                style={{
                    height: 70,
                }}
            >
                <FlatList
                    data={this.month_data}
                    extraData={this.state.should_update}

                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}

                    onEndReachedThreshold={0.5}
                    onEndReached={this._onEndReached}

                    horizontal={true}

                    initialScrollIndex={this.start_index}
                    getItemLayout={this._getItemLayout}

                    ref={this.setRef}

                    onScroll={this._onScroll}
                    scrollEventThrottle={6}
                />
            </View>
        )
    }
}


class MonthHolder extends React.Component {
    month_text_arr = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Deccember"]

    state = {
        month_style: styles.not_chosen_month,
        text_style: styles.not_chosen_month_text
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.month_index === nextProps.current_month_index || this.props.month_index === nextProps.last_month_index
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.month_index === nextProps.current_month_index) {
            return ({
                month_style: styles.chosen_month,
                text_style: styles.chosen_month_text
            })
        }

        else if (nextProps.month_index === nextProps.last_month_index) {
            return ({
                month_style: styles.not_chosen_month,
                text_style: styles.not_chosen_month_text
            })
        }

        return null
    }

    _onPress = () => {
        this.props.chooseMonth(this.props.month_index)
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    marginHorizontal: 7,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 83,
                }}

                onPress={this._onPress}
            >
                <View
                    style={this.state.month_style}
                >
                    <Text
                        style={this.state.text_style}
                    >
                        {this.month_text_arr[this.props.data.month]}
                    </Text>
                </View>

                <Text
                    style={{
                        marginTop: 7,
                        fontSize: 10,
                        color: "black",
                        opacity: 0.3
                    }}
                >
                    {`week ${this.props.data.start_week} - ${this.props.data.end_week}`}
                </Text>

            </TouchableOpacity>
        )
    }
}

class YearHolder extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    marginHorizontal: 7,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 83,
                }}
            >
                <Text
                    style={{
                    }}
                >
                    {this.props.data.year}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    not_chosen_month: {
        width: 83,
        height: 21,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },

    chosen_month: {
        width: 83,
        height: 21,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "black"
    },

    not_chosen_month_text: {
        color: "black"
    },

    chosen_month_text: {
        color: "white"
    }
})