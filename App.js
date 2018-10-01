import React from 'react';
import {StyleSheet, View } from 'react-native';
import FABComponent from './components/FABComponent/FABComponent.js'

export default class App extends React.Component {

    constructor(){
        super();
    }
  render() {
    return (
      <View style={styles.container}>
          <FABComponent></FABComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
