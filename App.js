import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckBoxComponent from './components/checkboxComponent/CheckboxComponent'

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>gh!</Text>
                <CheckBoxComponent/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
