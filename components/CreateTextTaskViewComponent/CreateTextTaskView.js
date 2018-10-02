import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles/styles'

export default class CreateTextTaskView extends React.Component {

    static navigationOptions = {
        title: 'Create Text Task',
        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTintColor: '#ff0042',
        headerTitleStyle: {
            color: '#ff0042',
            fontSize: 20,
            fontWeight: "bold",
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text> ÅÅÅÅ DU ER SÅ JÆVLIG TEIT UUUUUUUUG </Text>
            </View>
        );
    }
}
