import React from 'react';
// import Header from './components/header/Header'
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header backgroundColor={ '#fff' }  centerComponent={{ text: 'BIRD', style: styles.text }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6',
    },

    text: {
        color: '#ff0042',
        letterSpacing: 5,
        fontSize: 20,
        fontWeight: "bold",
    },
});
