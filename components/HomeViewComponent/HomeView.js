import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
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

        return (
            <ScrollView contentContainerStyle={styles.container}>
                {this.createTodoCell()}
                <FABComponent navigation={this.props.navigation}/>
            </ScrollView>
        );
    }
}
