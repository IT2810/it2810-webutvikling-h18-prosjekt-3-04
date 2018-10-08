import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles/styles';
import {ImagePicker, Permissions} from 'expo';
import Modal from "react-native-modal";
import {Button} from "react-native-elements";
import { Image } from 'react-native';
import { RequestPermission } from "../../util/Permissions";

export default class CreateImageTaskView extends React.Component {

    constructor(props) {
        super(props);
        this.pickImage = this.pickImage.bind(this);
        this.pickCameraImage = this.pickCameraImage.bind(this);
        this._toggleModal = this._toggleModal.bind(this);
        this._updateImage = this._updateImage.bind(this);
        this.state = {
            isModalVisible: false,
            currentTask: {
                image64: null,
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
            base64: true,
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
            base64: true,
        });

        this._updateImage(result);
    }

    _updateImage(result) {
        if (result["cancelled"]) {
            return;
        }

        let tempTask = this.state.currentTask;
        tempTask.image64 = result["base64"];
        this._toggleModal();
        this.setState({ currentTask: tempTask });
    }

    _toggleModal() {
        this.setState(prevState => ({
            isModalVisible: !prevState.isModalVisible
        }));
    }

    render() {
        let imageView;
        if (this.state.currentTask.image64 !== null) {
            imageView = <Image style={styles.image} source={{uri: 'data:image/png;base64,' + this.state.currentTask.image64}}/>;
        } else {
            imageView = <View style={styles.image}><Text style={styles.text}>+</Text></View>;
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageContainer} onPressIn={this._toggleModal}>
                    {imageView}
                </TouchableOpacity >
                <Modal isVisible={this.state.isModalVisible} onBackdropPress={this._toggleModal} style={styles.modal} backdropColor='white'>
                    <View>
                        <Button onPress={this.pickImage} title={"Choose from library!"} buttonStyle={styles.button}/>
                        <Button onPress={this.pickCameraImage} title={"Take picture with camera!"} buttonStyle={styles.button}/>
                    </View>
                </Modal>
            </View>
        );
    }
}
