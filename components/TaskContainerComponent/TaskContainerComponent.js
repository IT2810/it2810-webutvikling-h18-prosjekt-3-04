import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Image} from 'react-native';
import styles from "./styles/styles";
import CheckboxComponent from '../CheckboxComponent/CheckboxComponent';
import PropTypes from 'prop-types';


export default class TaskContainerComponent extends Component{

    constructor() {
        super();
        this.onPress = this.onPress.bind(this);
        this.state= {
            checked: false,
        };

    }

    static propTypes = {
        type: PropTypes.string,
        data: PropTypes.string,
        deadline: PropTypes.string,
        onPress: PropTypes.func,
        isChecked: PropTypes.bool,
        steps: PropTypes.number,
    };

    onPress = () => {
        this.setState({ checked: !this.state.checked });
        this.props.isChecked = this.state.checked;
    };

    renderTaskObject(){
        if (this.props.type === "image"){
           return <Image style={styles.image} source={{uri: 'data:image/jpeg;base64,' + this.props.data}}/>
        }
        else if (this.props.type === "steps"){
            let data = this.props.data.split('/');
            return <Text style={styles.taskText}>🏃🏻‍♂️ {parseInt(data[0]) + parseInt(data[1])} of {data[2]} steps</Text>
        }
        else {
           return <Text style={styles.taskText}>{this.props.data}</Text>
        }
    }

    render(){
        return (
                <TouchableHighlight underlayColor={"rgba(0,0,0,0)"} onPress={this.onPress}>
                    {this.props.type === "motivational" ? <View style={styles.motivationalElement}>
                            <Text style={styles.motivationalText}>{this.props.data}</Text>
                        </View> :
                        <View style={styles.taskObject}>
                            <View style={styles.textFlex}>
                                {this.renderTaskObject()}
                                <Text style={styles.dateStyle}>{this.props.deadline}</Text>
                            </View>
                            <View style={styles.checkFlex}>
                                <CheckboxComponent checked={this.state.checked} onPress={this.onPress}/>
                            </View>
                        </View>
                    }
                </TouchableHighlight>
        );
    }
}

