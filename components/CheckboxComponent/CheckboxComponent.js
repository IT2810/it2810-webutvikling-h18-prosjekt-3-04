import React, {Component} from 'react';
import { View,Text,TouchableHighlight } from 'react-native'
import styles from "./styles/styles";
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';


export default class CheckboxComponent extends Component{

    static propTypes = {
        checked: PropTypes.bool,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        checked: false
    };

    render(){
        return (
            <TouchableHighlight underlayColor={"rgba(0,0,0,0)"} onPress={this.props.onPress}>
                <View style={styles.checkboxStyle}>
                    {this.props.checked ? <Ionicons name="md-checkmark" size={35} color="#FF0040" /> : " "}
                </View>
            </TouchableHighlight>
        );
    }
}
