import React from 'react';
import { TouchableOpacity, Text,TextInput,Keyboard , View } from 'react-native';
import styles from './styles/styles'
import DateTimePicker from 'react-native-modal-datetime-picker';
import {AddTodo} from "../../util/AsyncStorage";


export default class CreateTextTaskView extends React.Component {

    constructor(props) {
        super(props);
        this.handleCreateTextTaskSubmit = this.handleCreateTextTaskSubmit.bind(this);
        this.state = {
            isDateTimePickerVisible: false,
            currentTask: {
                type: 'text',
                data: null,
                deadline: 'No deadline',
            }
        };
    }

    async handleCreateTextTaskSubmit(){
        let test = {
            deadline: this.state.currentTask.deadline,
            type: this.state.currentTask.type,
            data: this.state.currentTask.data,
        };

        await AddTodo(test);
        this.props.navigation.navigate('Home');

    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });


    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });


    _handleDatePicked = (date) => {
        let deadlineString = date.toString().substring(0,16) + 'at ' + date.toString().substring(16,21);
        console.log('Deadline: ' + deadlineString);
        /*let deadlineString = ('Deadline: ', date.toString().substring(0,16), 'at', date.toString().substring(16,21));
        this.props.deadlineText = deadlineString;*/
        let tempTask = this.state.currentTask;
        tempTask.deadline = deadlineString;
        this.setState({ currentTask: tempTask });
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
            fontSize: 16,
            fontWeight: "bold",
        }
    };

    _updateText(text) {
        let tempTask = this.state.currentTask;
        tempTask.data = text;
        this.setState({ currentTask: tempTask });
    }

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
                    onChangeText={(text) => this._updateText(text)}
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
                <View style={styles.deadlineLabelView}>
                    <Text style={styles.deadlineLabel}>{this.props.deadlineText}</Text>
                </View>
                <TouchableOpacity style={styles.createTaskButton} onPress={this.handleCreateTextTaskSubmit}>
                    <Text style={styles.createTaskButtonText}>Create task ✓</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
