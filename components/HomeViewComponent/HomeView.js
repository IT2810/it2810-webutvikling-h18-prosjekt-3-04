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
        var motivationalQuotes = [
            "Just do it!",
            "You are doing great!",
            "You are great!",
            "You go girl!",
            "Stay productive!",
            "Go get ‘em!",
            "Nice progression!",
            "Achieve your goals!",
            "You become great.",
            "Move along.",
            "How are you?",
            "Andreas loves you!",
            "Gotta catch 'em all!",
            "Go go gadget!",
            "Nothing is impossible.",
            "Live in the present.",
            "Apples are nice.",
            "I like you.",
            "Do you like me?",
            "Kan jeg bomme en snus?",
            "Run, Forrest!",
            "Catch me if you can.",
            "What are your goals?",
            "Do you remember?",
            "Have you done it yet?",
            "Stop procrastinating!",
            "Stay hydrated!"
        ];

        var randomIndex = Math.floor(Math.random() * (motivationalQuotes.length - 1));
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
                    <TaskContainerComponent type ='motivational' data= {motivationalQuotes[randomIndex]}/>
                </ScrollView>
                <FABComponent navigation={this.props.navigation}/>
            </View>
            </SafeAreaView>
        );
    }
}
