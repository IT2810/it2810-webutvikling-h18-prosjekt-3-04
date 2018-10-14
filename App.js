import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from "react-navigation";
import HomeView from "./components/HomeViewComponent/HomeView";
import CreateTaskView from "./components/CreateTaskViewComponent/CreateTaskView";

export default class App extends React.Component {

    render() {
        return <AppWithNavigation />;
    }
}

const AppWithNavigation = createStackNavigator(
    {
        Home: HomeView,
        NewTask: CreateTaskView,
    },
    {
        initialRouteName: 'Home',
    }
);
