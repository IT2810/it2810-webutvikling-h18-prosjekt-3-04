import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles/styles'
import FABComponent from '../../components/FABComponent/FABComponent.js'
import CheckBoxComponent from '../CheckboxComponent/CheckboxComponent'

export default class HomeView extends React.Component {

    static navigationOptions = {
        title: 'BIRD',
        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTitleStyle: {
            color: '#ff0042',
            letterSpacing: 5,
            fontSize: 20,
            fontWeight: "bold",
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <CheckBoxComponent/>
                <FABComponent navigation={this.props.navigation}/>
            </View>
        );
    }
}
