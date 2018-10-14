import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Image} from 'react-native';
import styles from "./styles/styles";
import CheckboxComponent from '../CheckboxComponent/CheckboxComponent';
import PropTypes from 'prop-types';

export default class TaskContainerComponent extends Component{

    static propTypes = {
        type: PropTypes.string,
        data: PropTypes.string,
        deadline: PropTypes.string,
        onPress: PropTypes.func,
        isChecked: PropTypes.bool,
        id: PropTypes.number,
    };

    render(){
        return (
            <TouchableHighlight underlayColor={"rgba(0,0,0,0)"} onPress = {() => this.props.onPress(this.props.id)} >
                <View style={styles.taskObject}>
                    <View style={styles.textFlex}>
                        {this.props.type === "image" ? <Image style={styles.image} source={{uri: 'data:image/jpeg;base64,' + this.props.data}}/>
                                : <Text style={styles.taskText}>{this.props.data}</Text>}
                        <Text style={styles.dateStyle}>{this.props.deadline}</Text>
                    </View>
                    <View style={styles.checkFlex}>
                        <CheckboxComponent checked={this.props.isChecked} onPress={() => this.props.onPress(this.props.id)}/>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

