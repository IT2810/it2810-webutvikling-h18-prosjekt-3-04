import React, {Component} from 'react';
import { View,Text,TouchableHighlight } from 'react-native'
import styles from "./styles/styles";
import { Ionicons } from '@expo/vector-icons';


export default class CheckboxComponent extends Component{
    constructor() {
        super();
        this.state= {
            checked: false,
        };
    }

    onPress = () => {
        this.setState({
            checked: !this.state.checked
        });

    };

    render(){
        return (
            <TouchableHighlight underlayColor={"rgba(0,0,0,0)"} onPress = { this.onPress }>
                <View style={styles.checkboxStyle}>
                    {this.state.checked ? <Ionicons name="md-checkmark" size={35} color="#FF0040" /> : ""}
                </View>
            </TouchableHighlight>
        );
    }
}
