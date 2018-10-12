import React from 'react';
import { TouchableOpacity, Text,TextInput,Keyboard , View } from 'react-native';
import styles from './styles/styles'
import DateTimePicker from 'react-native-modal-datetime-picker';


export default class CreateTextTaskView extends React.Component {
    state = {
        isDateTimePickerVisible: false,
    };
    handleCreateTextTaskSubmit(){

    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });


    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });


    _handleDatePicked = (date) => {
        console.log('Deadline: ', date.toString().substring(0,16), 'at', date.toString().substring(16,21));
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
                    timeZoneOffsetInMinutes={0}
                    mode={"datetime"}
                />
                <TouchableOpacity style={styles.createTaskButton} onPress={this.handleCreateTextTaskSubmit}>
                    <Text style={styles.createTaskButtonText}>Create task</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
