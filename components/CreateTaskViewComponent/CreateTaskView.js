import React from 'react';
import { TouchableOpacity, Text , View } from 'react-native';
import styles from './styles/styles'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { AddTodo } from "../../util/AsyncStorage";
import ChooseTextComponent from '../ChooseTextComponent/ChooseTextComponent'
import ChooseImageComponent from '../ChooseImageComponent/ChooseImageComponent'
import UploadImageModalComponent from '../UploadImageModalComponent/UploadImageModalComponent'
import { RequestPermission } from "../../util/Permissions";
import { ImageManipulator, ImagePicker } from "expo";


export default class CreateTaskView extends React.Component {

    constructor(props) {
        super(props);
        this._pickImage = this._pickImage.bind(this);
        this._pickCameraImage = this._pickCameraImage.bind(this);
        this._toggleModal = this._toggleModal.bind(this);
        this._postTask = this._postTask.bind(this);
        this._updateText = this._updateText.bind(this);
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

    componentDidMount() {
        let tempTask = this.state.currentTask;
        tempTask.type = this.props.navigation.getParam('type', 'text');
        this.setState({ currentTask: tempTask });
    }

    _postTask = async() => {
        if (this.state.currentTask.data === null || this.state.currentTask.data === '') {
            alert('Cannot add empty task');
            return;
        }

        await AddTodo(this.state.currentTask);
        this.props.navigation.navigate('Home');
    };

    _toggleDatePicker = () => { this.setState(prevState => ({ isDatePickerVisible: !prevState.isDatePickerVisible }))};

    _toggleModal = () => { this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }))};

    _handleDatePicked = (date) => {
        let deadlineString = date.toString().substring(0,16) + 'at ' + date.toString().substring(16,21);
        console.log('Deadline: ' + deadlineString);

        let tempTask = this.state.currentTask;
        tempTask.deadline = deadlineString;
        this.setState({ currentTask: tempTask });
        this._toggleDatePicker();
    };

    _updateText(text) {
        let tempTask = this.state.currentTask;
        tempTask.data = text;
        this.setState({ currentTask: tempTask });
    }

    _pickImage = async() => {
        const status = await RequestPermission('cameraRoll');

        if (!status) {
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: false,
        });

        this._updateImage(result);
    };

    _pickCameraImage = async() => {
        const statusCamera = await RequestPermission('camera');
        const statusLibrary = await RequestPermission('cameraRoll');

        if (!statusCamera || !statusLibrary) {
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            base64: false,
        });

        this._updateImage(result);
    };

    _updateImage = async(result) => {
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
    };

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
            )
        } else {
            return <ChooseTextComponent updateText={this._updateText}/>;
        }
    }

    render() {

        return (
            <View style={styles.container}>
                {this.renderTypeSpecificComponents()}
                <TouchableOpacity style={styles.deadlineBtn} onPress={this._toggleDatePicker}>
                    <Text style={styles.buttonText}>{this.state.currentTask.deadline === 'Whenever you want' ?
                        'Add deadline +' : this.state.currentTask.deadline}</Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._toggleDatePicker}
                    is24Hour={true}
                    timeZoneOffsetInMinutes={0}
                    mode={"datetime"}
                />
                <TouchableOpacity style={styles.createTaskButton} onPress={this._postTask}>
                    <Text style={styles.createTaskButtonText}>Create task ✓</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
