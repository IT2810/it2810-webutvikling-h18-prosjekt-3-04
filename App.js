import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from "react-navigation";
import HomeView from "./src/components/HomeViewComponent/HomeView";
import CreateTaskView from "./src/components/CreateTaskViewComponent/CreateTaskView";

export default class App extends React.Component {

    render() {
        return <AppWithNavigation />;
    }
}

// Creates app header for each view.
const AppWithNavigation = createStackNavigator(
    {
        Home: HomeView,
        NewTask: CreateTaskView,
    },
    {
        initialRouteName: 'Home', // defines which view to open on startup
    }
);
