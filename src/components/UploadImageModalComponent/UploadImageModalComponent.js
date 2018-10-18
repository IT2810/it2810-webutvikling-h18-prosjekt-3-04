import React from "react";
import styles from "./styles/styles";
import {View} from "react-native";
import {Button} from "react-native-elements";
import Modal from "react-native-modal";
import PropTypes from 'prop-types'

// This is the modal that pops up when u want to choose an image to upload.
export default class UploadImageModalComponent extends React.Component {

    static propTypes = {
        isModalVisible: PropTypes.bool,
        pickImage: PropTypes.func,
        pickCameraImage: PropTypes.func,
        toggleModal: PropTypes.func,
    };

    render() {
        return (
            <Modal isVisible={this.props.isModalVisible}
                   onBackdropPress={this.props.toggleModal}
                   style={styles.modal}
                   backdropColor='white'>
                <View>
                    <Button onPress={this.props.pickImage} title={"Choose from library!"} buttonStyle={styles.button}/>
                    <Button onPress={this.props.pickCameraImage} title={"Take picture with camera!"} buttonStyle={styles.button}/>
                </View>
            </Modal>
        )
    }

}