import React from 'react';
import {Platform, Alert, View, ScrollView, SafeAreaView, TouchableHighlight} from 'react-native';
import styles from './styles/styles'
import FABComponent from '../../components/FABComponent/FABComponent.js'
import { RetrieveTodos, Clear, RemoveTodo, StoreTodos} from '../../util/AsyncStorage'
import TaskContainerComponent from '../TaskContainerComponent/TaskContainerComponent'
import {Ionicons} from "@expo/vector-icons";
import {Pedometer} from "expo";
import MotivationalQuoteComponent from "../MotivationalQuoteComponent/MotivationalQuoteComponent";

export default class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.createTodoCell = this.createTodoCell.bind(this);
        this.quotes = React.createRef();
        this._onTaskPress = this._onTaskPress.bind(this);
        this.state = {
            todos: null,
            isPedometerAvailable: "checking",
            currentStepCount: 0,
            numTodos: 0,
        };
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {

            let todos = JSON.parse(this.state.todos);

            for (let index in todos) {
                if (todos[index].type === 'steps') {
                    let data = todos[index].data.split('/');
                    let test = parseInt(result.steps) + parseInt(data[0]) + '/' + data[1];
                    todos[index].data = test;
                }
            }

            StoreTodos(todos);

            this.setState({
                todos: JSON.stringify(todos)
            });
        });

        Pedometer.isAvailableAsync().then(
            result => {
                this.setState({
                    isPedometerAvailable: String(result)
                });
            },
            error => {
                this.setState({
                    isPedometerAvailable: "Could not get isPedometerAvailable: " + error
                });
            }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    componentWillMount() {
        this.props.navigation.setParams({ handleIconTouch:
            this.handleIconTouch });
        this._unsubscribe();
    }

    handleIconTouch = (title, message) => {
        let todos = JSON.parse(this.state.todos);
        let oneItemSelected = false;

        for (let index in todos) {
            if (todos[index].checked) {
                oneItemSelected = true;
                break;
            }
        }

        if (!oneItemSelected) {
            Alert.alert('No tasks selected', 'Please select the tasks you want to delete and try again.');
            return;
        }

        Alert.alert(title, message, [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Yes please', onPress: () => this.deleteSelectedTasks()},
        ])
    };


    deleteSelectedTasks = () =>{
        let todos = JSON.parse(this.state.todos);
        let newTodos = [];

        for (let index in todos) {
            if(!todos[index].checked) {
                newTodos.push(todos[index]);
            }
        }

        StoreTodos(newTodos);
        this.setState({
            todos: JSON.stringify(newTodos),
            numTodos: newTodos.length,
        });
        this.quotes.current.newQuote();
    };

    static navigationOptions = ({navigation})=>({
        title: 'BUTLER',
        headerStyle: {
            backgroundColor: '#fff',
        },
        headerTitleStyle: {
            color: '#000',
            letterSpacing: 5,
            fontSize: 18,
            fontWeight: "bold",
        },
        headerRight:
            <TouchableHighlight
                underlayColor={"rgba(0,0,0,0)"}
                style={styles.rightButtonItem}
                activeOpacity={0.5}
                onPress={()=> navigation.state.params.handleIconTouch('Delete tasks ⚠️','Would you like to remove all your selected tasks?')}>
                <View style={styles.iconView}>
                    <Ionicons  name="md-trash" size={25} color="#ff0042" />
                </View>
            </TouchableHighlight>,
    });

    componentDidMount() {
        this._getStoredTasks();

        // Add listener to update feed when returning to home-screen
        const didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this._getStoredTasks();
            }
        );

        if (Platform.OS === 'ios') {
            this._subscribe();
        }
    }

    _getStoredTasks = async() => {
        //await Clear();
        const todos = await RetrieveTodos();
        let length = JSON.parse(todos).length;
        this.setState({
            todos: todos,
            numTodos: length,
        });
        this.quotes.current.newQuote();
    };

    _onTaskPress = (index) => {
        let todos = JSON.parse(this.state.todos);
        let todo = todos[index];
        todo.checked = !todo.checked;
        todos[index] = todo;
        StoreTodos(todos);
        this.setState({ todos: JSON.stringify(todos) });
    };

    createTodoCell = () => {
        if (this.state.todos !== null) {
            let array = JSON.parse(this.state.todos);
            return array.map((item, key) => {
                return (
                    <TaskContainerComponent
                        key={key}
                        type={item.type}
                        isChecked={item.checked}
                        data={item.data}
                        deadline={item.deadline}
                        id={key}
                        onPress={this._onTaskPress}
                    />
                );
            });
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.viewWrapper}>
                    <ScrollView contentContainerStyle={styles.container}>
                        {this.createTodoCell()}
                        <MotivationalQuoteComponent ref={this.quotes} numTodos={this.state.numTodos}/>
                    </ScrollView>
                </View>
                <FABComponent navigation={this.props.navigation}/>
            </SafeAreaView>
        );
    }


}
