import React from "react";
import styles from "./styles/styles";
import {Keyboard, TextInput} from "react-native";
import PropTypes from 'prop-types'

// Component for writing in a step goal for a stepcounter-task. Only available on iOS.
export default class ChooseStepCounterComponent extends React.Component {

    static propTypes = {
        updateStepsText: PropTypes.func,
    };

    render() {
        return (
            <TextInput
                style ={styles.textInputField}
                containerViewStyle={styles.textContainer}
                placeholder={"Enter step-goal 🤸🏼‍♀️"}
                keyboardType={"number-pad"}
                multiline={false}
                returnKeyType={"done"}
                maxLength={14}
                enablesReturnKeyAutomatically={true}
                onChangeText={(text) => this.props.updateStepsText(text)}
                blurOnSubmit={true}
                onSubmitEditing={Keyboard.dismiss}
            />
        )
    }
}
