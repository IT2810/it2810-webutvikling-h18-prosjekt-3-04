import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles/styles";
import React from "react";
import PropTypes from 'prop-types'

// This component allows a user to upload a photo from their phone to the app
export default class ChooseImageComponent extends React.Component{

    static propTypes = {
        currentTask: PropTypes.object,
        toggleModal: PropTypes.func,
    };

    // Renders an image if an image has already been chosen,
    // otherwise renders a clickable view which allows a user to choose an image.
    render() {
        let imageComponent;
        if (this.props.currentTask.data !== null) {
            imageComponent = <Image style={styles.image} source={{uri: this.props.currentTask.data}}/>;
        } else {
            imageComponent = <View style={styles.image}><Text style={styles.text}>+</Text></View>;
        }

        return (
                <TouchableOpacity style={styles.imageContainer} onPressIn={this.props.toggleModal}>
                    {imageComponent}
                </TouchableOpacity >
        );
    }
}