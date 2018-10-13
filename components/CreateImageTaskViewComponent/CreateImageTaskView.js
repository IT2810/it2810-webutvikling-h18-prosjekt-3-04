import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles/styles';
import {ImagePicker, Permissions, ImageManipulator} from 'expo';
import Modal from "react-native-modal";
import {Button} from "react-native-elements";
import { Image } from 'react-native';
import { RequestPermission } from "../../util/Permissions";
import DateTimePicker from "react-native-modal-datetime-picker";
import { AddInitialTodos, RetrieveTodos, AddTodo } from '../../util/AsyncStorage'

export default class CreateImageTaskView extends React.Component {

    constructor(props) {
        super(props);
        this.pickImage = this.pickImage.bind(this);
        this.pickCameraImage = this.pickCameraImage.bind(this);
        this._toggleModal = this._toggleModal.bind(this);
        this._toggleDatePicker = this._toggleDatePicker.bind(this);
        this._handleDatePicked = this._handleDatePicked.bind(this);
        this._updateImage = this._updateImage.bind(this);
        this._postTask = this._postTask.bind(this);
        this.state = {
            isModalVisible: false,
            isDatePickerVisible: false,
            currentTask: {
                type: 'image',
                data: null,
                deadline: 'No deadline',
            },

        };
    }

    static navigationOptions = {
        title: 'Image Task',
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

    async pickImage() {
        const status = await RequestPermission('cameraRoll');

        if (!status) {
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: false,
        });

        this._updateImage(result);
    }

    async pickCameraImage() {
        const status = await RequestPermission('camera');

        if (!status) {
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            base64: false,
        });

        this._updateImage(result);
    }

    async _updateImage(result) {
        if (result["cancelled"]) {
            return;
        }

        const uri = result.uri;
        const actions = [{ resize: { width:300 } }];
        const saveOptions = {
            compress: 0.5,
            format: 'jpeg',
            base64: true,
        };

        const newImage = await ImageManipulator.manipulate(uri, actions, saveOptions);
        let tempTask = this.state.currentTask;
        tempTask.data = newImage.base64;
        this._toggleModal();
        this.setState({ currentTask: tempTask });
    }

    _toggleModal = () => { this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }))};

    _toggleDatePicker = () => { this.setState(prevState => ({ isDatePickerVisible: !prevState.isDatePickerVisible }))};

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._toggleDatePicker();
    };

    _postTask = async() => {

        let test = {
            deadline: this.state.currentTask.deadline,
            type: 'image',
            data: this.state.currentTask.data,
        };

        await AddTodo(test);
        this.props.navigation.navigate('Home');
    };

    render() {
        let imageView;
        if (this.state.currentTask.data !== null) {
            imageView = <Image style={styles.image} source={{uri: 'data:image/jpeg;base64,' + this.state.currentTask.data}}/>;
        } else {
            imageView = <View style={styles.image}><Text style={styles.text}>+</Text></View>;
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageContainer} onPressIn={this._toggleModal}>
                    {imageView}
                </TouchableOpacity >
                <Button title='Deadline +' onPress={this._toggleDatePicker}
                        buttonStyle={styles.button} textStyle={styles.buttonText}/>
                <Button title='Create task' onPress={this._postTask}
                        buttonStyle={[styles.button, styles.createTaskButton]} textStyle={styles.createTaskButtonText}/>
                <Modal isVisible={this.state.isModalVisible} onBackdropPress={this._toggleModal} style={styles.modal} backdropColor='white'>
                    <View>
                        <Button onPress={this.pickImage} title={"Choose from library!"} buttonStyle={styles.button}/>
                        <Button onPress={this.pickCameraImage} title={"Take picture with camera!"} buttonStyle={styles.button}/>
                    </View>
                </Modal>
                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._toggleDatePicker}
                    is24Hour={true}
                    timeZoneOffsetInMinutes={0}
                    mode={"datetime"}
                />
            </View>
        );
    }
}
