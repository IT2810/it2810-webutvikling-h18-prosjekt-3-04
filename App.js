import React from 'react';
import {StyleSheet, View } from 'react-native';
import FABComponent from './components/FABComponent/FABComponent.js'
import CheckBoxComponent from './components/checkboxComponent/CheckboxComponent'

export default class App extends React.Component {

    constructor(){
        super();
    }
  render() {
    return (
      <View style={styles.container}>
        <CheckBoxComponent/>
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
