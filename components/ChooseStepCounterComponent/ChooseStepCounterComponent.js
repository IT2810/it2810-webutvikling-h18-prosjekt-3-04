import React from "react";
import styles from "./styles/styles";
import {Keyboard, TextInput} from "react-native";
import PropTypes from 'prop-types'

export default class ChooseStepCounterComponent extends React.Component {

    static propTypes = {
        updateStepsText: PropTypes.func,
    };

    render() {
        return (
            <TextInput
                style ={styles.textInputField}
                containerViewStyle={{marginLeft:-10,marginRight:null,width:"105%"}}
                placeholder={"Type in your step-goal 🤸🏼‍♀️"}
                keyboardType={"numeric"}
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
