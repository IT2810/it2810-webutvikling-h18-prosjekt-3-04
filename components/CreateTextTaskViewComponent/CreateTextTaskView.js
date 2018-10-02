import React from 'react';
import { TouchableOpacity, Text,TextInput,Keyboard , View } from 'react-native';
import styles from './styles/styles'
import DateTimePicker from 'react-native-modal-datetime-picker';


export default class CreateTextTaskView extends React.Component {
    state = {
        isDateTimePickerVisible: false,
    };

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });


    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };
    static navigationOptions = {
        title: 'Create Text Task',
        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTintColor: '#ff0042',
        headerTitleStyle: {
            color: '#ff0042',
            fontSize: 20,
            fontWeight: "bold",
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style ={styles.textInputField}
                    containerViewStyle={{marginLeft:-10,marginRight:null,width:"105%"}}
                    placeholder={"Add some descriptive and motivating text to your task! 💪🏼"}
                    multiline={true}
                    returnKeyType={"done"}
                    enablesReturnKeyAutomatically={true}
                    blurOnSubmit={true}
                    onSubmitEditing={Keyboard.dismiss}
                />
                <TouchableOpacity style={styles.deadlineBtn} onPress={this._showDateTimePicker}>
                    <Text style={styles.buttonText}>Add deadline +</Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    is24Hour={true}
                    mode={"datetime"}
                />
            </View>
        );
    }
}
