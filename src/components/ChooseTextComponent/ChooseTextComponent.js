import React from "react";
import styles from "./styles/styles";
import {Keyboard, TextInput} from "react-native";
import PropTypes from 'prop-types'

// Component for inputting text for a text-task.
export default class ChooseTextComponent extends React.Component {

    static propTypes = {
      updateText: PropTypes.func,
    };

    render() {
        return (
            <TextInput
                style ={styles.textInputField}
                containerViewStyle={styles.textContainer}
                placeholder={"Add some descriptive and motivating text to your task! 💪🏼"}
                multiline={true}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                autoCorrect={false}
                returnKeyType={"done"}
                enablesReturnKeyAutomatically={true}
                onChangeText={(text) => this.props.updateText(text)}
                blurOnSubmit={true}
                onSubmitEditing={Keyboard.dismiss}
            />
        )
    }
}
