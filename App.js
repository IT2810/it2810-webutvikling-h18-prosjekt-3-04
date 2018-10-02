import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from "react-navigation";
import HomeView from "./components/HomeViewComponent/HomeView";

export default class App extends React.Component {
    render() {
        return <Navigator />;
    }
}

const Navigator = createStackNavigator(
    {
        Home: HomeView,
    },
    {
        initialRouteName: 'Home',
    }
);
