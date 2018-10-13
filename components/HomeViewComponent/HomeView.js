import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import styles from './styles/styles'
import FABComponent from '../../components/FABComponent/FABComponent.js'
import { AddInitialTodos, RetrieveTodos, Clear, AddTodo, RemoveTodo } from '../../util/AsyncStorage'
import TaskContainerComponent from '../TaskContainerComponent/TaskContainerComponent'

export default class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.createTodoCell = this.createTodoCell.bind(this);
        this.state = { todos: null } ;
    }

    static navigationOptions = {
        title: 'MOLTITASK',
        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTitleStyle: {
            color: '#ff0042',
            letterSpacing: 5,
            fontSize: 18,
            fontWeight: "bold",
        }
    };

    async componentDidMount() {
        //await Clear();
        const todos = await RetrieveTodos();
        console.log(todos);
        this.setState({ todos: todos });

        // Add listener to update feed when returning to home-screen
        const didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.componentDidMount();
            }
        );

    }

    createTodoCell = () => {
        if (this.state.todos !== null) {
            let array = JSON.parse(this.state.todos);

            return array.map((item, key) => {
                return (
                    <TaskContainerComponent key={key} type={item.type} data={item.data} deadline={item.deadline}/>
                );
            });
        }
        return <Text>Looks like there's nothing here :)</Text>
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
            "Run, Forrest!",
            "Catch me if you can.",
            "What are your goals?",
            "Do you remember?",
            "Have you done it yet?",
            "Stop procrastinating!",
            "Stay hydrated!"
        ];

        let randomIndex = Math.floor(Math.random() * (motivationalQuotes.length - 1));
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.viewWrapper}>
                    <ScrollView contentContainerStyle={styles.container}>
                        {this.createTodoCell()}
                        <TaskContainerComponent type ='motivational' data= {motivationalQuotes[randomIndex]}/>
                    </ScrollView>
                    <FABComponent navigation={this.props.navigation}/>
                </View>
            </SafeAreaView>
        );
    }
}
