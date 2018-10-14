import React from 'react';
import ActionButton from 'react-native-action-button'; // 2.7.2
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from "react-native"; // 4.2.0

class FABComponent extends React.Component {

    constructor(){
        super();
        this.state ={
            status:true
        }
    }

    toggleCreateTaskSubView(){
        this.setState({
            status:!this.state.status
        });
        console.log('toggle button handler: '+ this.state.status);
    }

    render() {
        return (
            <ActionButton buttonColor="rgba(255,0,66,1)" style={styles.FAB}>
                <ActionButton.Item
                    buttonColor="#cc0035"
                    title="New image task"
                    onPress={() => this.props.navigation.navigate('NewTask', { type: 'image' })}>
                    <Icon name="md-image" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor="#a3052e"
                    title="New text task"
                    onPress={() => this.props.navigation.navigate('NewTask', { type: 'text' })}>
                    <Icon name="md-document" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
            </ActionButton>
        );
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    FAB: {
        bottom:30,
        right: 0,
    },
});

export default FABComponent;