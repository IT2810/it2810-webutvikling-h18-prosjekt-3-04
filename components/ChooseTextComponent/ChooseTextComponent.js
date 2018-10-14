import React from "react";
import styles from "./styles/styles";
import {Keyboard, TextInput} from "react-native";
import PropTypes from 'prop-types'

export default class ChooseTextComponent extends React.Component {

    static propTypes = {
      updateText: PropTypes.func,
    };

    render() {
        return (
            <TextInput
                style ={styles.textInputField}
                containerViewStyle={{marginLeft:-10,marginRight:null,width:"105%"}}
                placeholder={"Add some descriptive and motivating text to your task! 💪🏼"}
                multiline={true}
                returnKeyType={"done"}
                enablesReturnKeyAutomatically={true}
                onChangeText={(text) => this.props.updateText(text)}
                blurOnSubmit={true}
                onSubmitEditing={Keyboard.dismiss}
            />
        )
    }
}
