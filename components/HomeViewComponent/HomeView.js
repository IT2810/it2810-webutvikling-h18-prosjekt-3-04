import React from 'react';
import { StyleSheet, Text,SafeAreaView, View, ScrollView} from 'react-native';
import styles from './styles/styles';
import FABComponent from '../../components/FABComponent/FABComponent.js';
import TaskContainerComponent from '../TaskContainerComponent/TaskContainerComponent';

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
            <SafeAreaView style={{flex: 1, backgroundColor: '#f9f9f9'}}>
            <View style={styles.viewWrapper}>
                <ScrollView contentContainerStyle={styles.container}>
                    <TaskContainerComponent type='image' />
                    <TaskContainerComponent type ='text' data='heyheyheyheyheyheyheyheyheyheyheyheyheyheyheyheyheyheyheyheyheyheyheyhey'/>
                    <TaskContainerComponent type ='text' data='heyhey'/>
                    <TaskContainerComponent type ='text' data='heyhey'/>
                    <TaskContainerComponent type ='text' data='heyhey'/>
                    <TaskContainerComponent type ='text' data='hei ol'/>
                </ScrollView>
                <FABComponent navigation={this.props.navigation}/>
            </View>
            </SafeAreaView>
        );
    }
}
