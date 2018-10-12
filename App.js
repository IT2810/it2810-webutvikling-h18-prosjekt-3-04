import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from "react-navigation";
import HomeView from "./components/HomeViewComponent/HomeView";
import CreateTextTaskView from "./components/CreateTextTaskViewComponent/CreateTextTaskView";
import CreateImageTaskView from "./components/CreateImageTaskViewComponent/CreateImageTaskView";

export default class App extends React.Component {

    render() {
        return <AppWithNavigation />;
    }
}

const AppWithNavigation = createStackNavigator(
    {
        Home: HomeView,
        TextTask: CreateTextTaskView,
        ImageTask: CreateImageTaskView,
    },
    {
        initialRouteName: 'Home',
    }
);
