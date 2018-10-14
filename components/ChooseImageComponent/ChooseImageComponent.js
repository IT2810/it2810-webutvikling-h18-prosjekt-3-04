import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles/styles";
import React from "react";
import PropTypes from 'prop-types'


export default class ChooseImageComponent extends React.Component{

    static propTypes = {
        currentTask: PropTypes.object,
        toggleModal: PropTypes.func,
    };

    render() {
        let imageComponent;
        if (this.props.currentTask.data !== null) {
            imageComponent = <Image style={styles.image} source={{uri: 'data:image/jpeg;base64,' + this.props.currentTask.data}}/>;
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