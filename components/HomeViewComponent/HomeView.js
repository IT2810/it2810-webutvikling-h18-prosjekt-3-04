import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from "react-navigation";

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
                <Text>HEIHEI!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: '#ff0042',
        letterSpacing: 5,
        fontSize: 20,
        fontWeight: "bold",
    },
});