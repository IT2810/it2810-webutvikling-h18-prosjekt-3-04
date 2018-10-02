import React, {Component} from 'react';
import { View,Text,TouchableHighlight } from 'react-native'
import styles from "./styles/styles";
import { Ionicons } from '@expo/vector-icons';
//import Icon from 'react-native-fa-icons';



export default class CheckboxComponent extends Component{

    /*
    componentDidMount() {
        Font.loadAsync({
            'FontAwesome': require("../../assets/fonts/fa-solid-900.ttf"),
        });
    }
    */


    constructor() {
        super();
        this.state= {
            checked: false,
            checkIcon : ""
        };
    }

    onPress = () => {
        this.setState({
            checked: !this.state.checked
        });

        if (this.state.checked){
            this.state.checkIcon = <Ionicons name="md-checkmark-circle" size={32} color="green" />
        } else {
            this.state.checkIcon = ""
        }

    };

    render() {
        return (
            <TouchableHighlight
                underlayColor={"rgba(0,0,0,0)"}
                onPress = { this.onPress }
            >
                <View
                    style={[this.state.checked ?  styles.checkboxStyleChecked : styles.checkboxStyle]}
                >
                    <Text

                    >
                        {this.state.checkIcon}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}