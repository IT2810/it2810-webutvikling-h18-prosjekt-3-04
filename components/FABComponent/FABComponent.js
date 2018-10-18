import React from 'react';
import ActionButton from 'react-native-action-button'; // 2.7.2
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from "react-native"; // 4.2.0
import styles from './styles/styles';

// This is the component in the lower right corner of the homeview.
// It allows a user to create a new task for a specific type.
export default class FABComponent extends React.Component {

    // Step-counter task only available for iOS due to pedometer issue in Android.
    renderiOSComponent() {
        if (Platform.OS === 'ios') {
            return (
                <ActionButton.Item
                    buttonColor="#dc0045"
                    title="New step counter task"
                    onPress={() => this.props.navigation.navigate('NewTask', { type: 'steps' })}>
                    <Icon name="md-walk" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
            );
        }
    }

    render() {
        return (
            <ActionButton buttonColor="rgba(255,0,66,1)" style={styles.FAB}>
                {this.renderiOSComponent()}
                <ActionButton.Item
                    buttonColor="#cc0035"
                    title="New image task"
                    onPress={() => this.props.navigation.navigate('NewTask', { type: 'image' })}>
                    <Icon name="md-image" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor="#bc0025"
                    title="New text task"
                    onPress={() => this.props.navigation.navigate('NewTask', { type: 'text' })}>
                    <Icon name="md-document" style={styles.actionButtonIcon}/>
                </ActionButton.Item>
            </ActionButton>
        );
    }
}