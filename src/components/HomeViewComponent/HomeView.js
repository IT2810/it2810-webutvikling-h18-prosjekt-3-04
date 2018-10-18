import React from 'react';
import {Platform, Alert, View, ScrollView, SafeAreaView, TouchableHighlight} from 'react-native';
import {Pedometer} from "expo";
import {Ionicons} from "@expo/vector-icons";
import FABComponent from '../../components/FABComponent/FABComponent.js'
import TaskContainerComponent from '../TaskContainerComponent/TaskContainerComponent'
import MotivationalQuoteComponent from "../MotivationalQuoteComponent/MotivationalQuoteComponent";
import { RetrieveTodos, Clear, StoreTodos} from '../../util/AsyncStorage'
import styles from './styles/styles'

// The is the initial screen show when starting the app.
// It contains a task-feed and the ability to start new tasks.
export default class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.renderTodoCells = this.renderTodoCells.bind(this);
        this._onTaskPress = this._onTaskPress.bind(this);
        this._subscribe = this._subscribe.bind(this);
        this._unsubscribe = this._unsubscribe.bind(this);
        this._handleIconTouch = this._handleIconTouch.bind(this);
        this._deleteSelectedTasks = this._deleteSelectedTasks.bind(this);
        this._getStoredTasks = this._getStoredTasks.bind(this);
        this.quotes = React.createRef();
        this.state = {
            todos: null,
            isPedometerAvailable: "checking",
            stepsMade: 0,
            numTodos: 0,
        };
    }

    // Customizes the header for this particular view.
    // Styles here must be inline, since the object is static.
    static navigationOptions = ({navigation}) => ({
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
                onPress={()=> navigation.state.params._handleIconTouch('Delete tasks ⚠️',
                    'Would you like to remove all your selected tasks?')}>
                <View style={styles.iconView}>
                    <Ionicons  name="md-trash" size={25} color="#ff0042" />
                </View>
            </TouchableHighlight>,
    });

    // Allows us to call the handleIconTouch function from the static header
    componentWillMount() {
        this.props.navigation.setParams({ _handleIconTouch:
            this._handleIconTouch });
    }

    // Setup initial app state
    componentDidMount() {
        this._getStoredTasks();

        // Add listener to update feed when returning to home-screen
        const didFocusListener = this.props.navigation.addListener('didFocus', this._getStoredTasks);

        // Starts step-counter if app is running on iOS
        if (Platform.OS === 'ios') {
            this._subscribe();
        }
    }

    // Removes pedometer listener on exit
    componentWillUnmount() {
        this._unsubscribe();
    }

    // Starts listening on pedometer and updates components of that type.
    _subscribe = async() => {
        this._subscription = Pedometer.watchStepCount(result => {

            let todos = JSON.parse(this.state.todos);
            let deltaValue = parseInt(result.steps) - parseInt(this.state.stepsMade);
            this.setState({ stepsMade: result.steps });

            // Updates components
            for (let index in todos) {
                if (todos[index].type === 'steps') {
                    let data = todos[index].data.split('/');
                    let test = parseInt(deltaValue) + parseInt(data[0]) + '/' + data[1];
                    todos[index].data = test;
                }
            }

            // Stores new values
            StoreTodos(todos);
            this.setState({todos: JSON.stringify(todos)});
        });

        const result = await Pedometer.isAvailableAsync();
        this.setState({isPedometerAvailable: String(result)});
    };

    // Removes pedometer listener
    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    // Invoked when delete button is pressed.
    // Ensures that at least one task is selected and asks user for confirmation
    _handleIconTouch = (title, message) => {
        let todos = JSON.parse(this.state.todos);
        let oneItemSelected = false;

        for (let index in todos) {
            if (todos[index].checked) {
                oneItemSelected = true;
                break;
            }
        }

        // Avoids deleting tasks when no tasks are selected
        if (!oneItemSelected) {
            Alert.alert('No tasks selected', 'Please select the tasks you want to delete and try again.');
            return;
        }

        Alert.alert(title, message, [
            {text: 'Cancel', onPress: console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Yes please', onPress: this._deleteSelectedTasks},
        ])
    };

    // Deletes all selected tasks from state and AsyncStorage
    _deleteSelectedTasks = () =>{
        let todos = JSON.parse(this.state.todos);
        let newTodos = [];

        for (let index in todos) {
            if(!todos[index].checked) {
                newTodos.push(todos[index]);
            }
        }

        StoreTodos(newTodos); // Updates AsyncStorage
        this.setState({
            todos: JSON.stringify(newTodos),
            numTodos: newTodos.length,
        });
        this.quotes.current.newQuote();
    };

    // Fetches everything in AsyncStorage
    _getStoredTasks = async() => {
        //await Clear();
        const todos = await RetrieveTodos();
        let length = 0;
        if (todos !== null) { length = JSON.parse(todos).length }
        this.setState({
            todos: todos,
            numTodos: length,
        });
        this.quotes.current.newQuote();
    };

    // Checks or unchecks a task when pressed.
    _onTaskPress = (index) => {
        let todos = JSON.parse(this.state.todos);
        let todo = todos[index];
        todo.checked = !todo.checked;
        todos[index] = todo;
        StoreTodos(todos);
        this.setState({ todos: JSON.stringify(todos) });
    };

    // Render function for task-objects
    // Generates the task-feed on the home screen.
    renderTodoCells = () => {
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
                        {this.renderTodoCells()}
                        <MotivationalQuoteComponent ref={this.quotes} numTodos={this.state.numTodos}/>
                    </ScrollView>
                </View>
                <FABComponent navigation={this.props.navigation}/>
            </SafeAreaView>
        );
    }
}
