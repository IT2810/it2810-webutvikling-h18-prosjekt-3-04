import React from 'react';
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import { ImageManipulator, ImagePicker } from "expo";
import DateTimePicker from 'react-native-modal-datetime-picker';
import ChooseTextComponent from '../ChooseTextComponent/ChooseTextComponent'
import ChooseImageComponent from '../ChooseImageComponent/ChooseImageComponent'
import ChooseStepCounterComponent from "../ChooseStepCounterComponent/ChooseStepCounterComponent";
import UploadImageModalComponent from '../UploadImageModalComponent/UploadImageModalComponent'
import { RequestPermission } from "../../util/Permissions";
import { AddTodo } from "../../util/AsyncStorage";
import styles from './styles/styles'

// This class is a view containing components and functionality for creating any task-object.
export default class CreateTaskView extends React.Component {

    constructor(props) {
        super(props);
        this._pickImage = this._pickImage.bind(this);
        this._pickCameraImage = this._pickCameraImage.bind(this);
        this._toggleModal = this._toggleModal.bind(this);
        this._postTask = this._postTask.bind(this);
        this._updateText = this._updateText.bind(this);
        this._updateStepsText = this._updateStepsText.bind(this);
        this._toggleDatePicker = this._toggleDatePicker.bind(this);
        this._handleDatePicked = this._handleDatePicked.bind(this);
        this.state = {
            isDatePickerVisible: false,
            isModalVisible: false,
            currentTask: {
                type: 'text',
                data: null,
                deadline: 'Whenever you want',
                checked: false,
            }
        };
    }

    // Customizes the header for this particular view.
    // Styles here must be inline, since the object is static.
    static navigationOptions = {
        title: 'Create New Task',
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



    // ######################################
    // #        General functionality       #
    // ######################################


    // Fetches which task type was requested and updates state accordingly.
    // State here is later used to render correct components within view.
    componentDidMount() {
        let tempTask = this.state.currentTask;
        tempTask.type = this.props.navigation.getParam('type', 'text');
        this.setState({ currentTask: tempTask });
    }

    // Triggers when 'Create Task' button is pressed. Validates that the task is not empty and adds it
    // to our AsyncStorage. Returns to home screen upon completion
    _postTask = async() => {
        if (this.state.currentTask.data === null || this.state.currentTask.data === '') {
            Alert.alert('Cannot add empty task', 'Please fill out the task correctly and try again');
            return;
        }
        await AddTodo(this.state.currentTask);
        this.props.navigation.navigate('Home');
    };

    // Toggles the visibility of the datepicker
    _toggleDatePicker = () => { this.setState(prevState => ({ isDatePickerVisible: !prevState.isDatePickerVisible }))};

    // Allows users to choose a deadline for their task
    _handleDatePicked = (date) => {
        let deadlineString = date.toString().substring(0,16) + 'at ' + date.toString().substring(16,21);
        let tempTask = this.state.currentTask;
        tempTask.deadline = deadlineString;
        this.setState({ currentTask: tempTask });
        this._toggleDatePicker();
    };



    // ######################################
    // #    Image-specific functionality    #
    // ######################################


    // Toggles visibility of modal on image-task
    _toggleModal = () => { this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }))};

    // Allows users to choose an image from their phone.
    _pickImage = async() => {
        const status = await RequestPermission('cameraRoll');

        if (!status) { return } // Return if permission not granted

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: false,
        });

        this._updateImage(result);
    };

    // Allows user to snap a new image with their camera.
    _pickCameraImage = async() => {
        const statusCamera = await RequestPermission('camera');
        const statusLibrary = await RequestPermission('cameraRoll');

        if (!statusCamera || !statusLibrary) { return } // Return if permission not granted

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            base64: false,
        });

        this._updateImage(result);
    };

    // Updates state with a chosen image
    _updateImage = async(result) => {

        // Prevents errors if a user does not choose an image
        if (result["cancelled"]) {
            return;
        }

        // Compresses image and converts it to base64-string in order to
        // store it in the AsyncStorage
        const uri = result.uri;
        const actions = [{ resize: { width: 300 } }];
        const saveOptions = {
            compress: 0.5,
            format: 'jpeg',
            base64: true,
        };
        const newImage = await ImageManipulator.manipulate(uri, actions, saveOptions);

        // Updates state
        let tempTask = this.state.currentTask;
        tempTask.data = 'data:image/jpeg;base64,' + newImage.base64;
        this._toggleModal();
        this.setState({ currentTask: tempTask });
    };



    // ######################################
    // #     Text-specific functionality    #
    // ######################################


    // Updates state with text in a text-task
    _updateText(text) {
        let tempTask = this.state.currentTask;
        tempTask.data = text;
        this.setState({ currentTask: tempTask });
    }


    // ######################################
    // # Stepcounter-specific functionality #
    // ######################################


    // Updates state with steps in a stepcounter-task
    _updateStepsText(text) {
        let tempTask = this.state.currentTask;
        tempTask.data = '0/' + text;
        this.setState({ currentTask: tempTask });
    }



    // Renders correct components based on which task-type is requested.
    renderTypeSpecificComponents() {
        if (this.state.currentTask.type === 'image') {
            return (
                <React.Fragment>
                    <ChooseImageComponent currentTask={this.state.currentTask} toggleModal={this._toggleModal}/>
                    <UploadImageModalComponent
                        isModalVisible={this.state.isModalVisible}
                        pickImage={this._pickImage}
                        pickCameraImage={this._pickCameraImage}
                        toggleModal={this._toggleModal}/>
                </React.Fragment>
            );
        } else if(this.state.currentTask.type === 'text'){
            return <ChooseTextComponent updateText={this._updateText}/>;
        }
        else{
            return <ChooseStepCounterComponent updateStepsText={this._updateStepsText}/>;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderTypeSpecificComponents()}
                <TouchableOpacity style={styles.deadlineBtn} onPress={this._toggleDatePicker}>
                    <Text style={styles.deadlineButtonText}>{this.state.currentTask.deadline === 'Whenever you want' ?
                        'Add deadline +' : this.state.currentTask.deadline}</Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._toggleDatePicker}
                    is24Hour={true}
                    timeZoneOffsetInMinutes={120}
                    mode={"datetime"}
                />
                <TouchableOpacity style={styles.createTaskButton} onPress={this._postTask}>
                    <Text style={styles.createTaskButtonText}>Create task ✓</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
