import React from 'react';
import {Text,Alert, View, ScrollView, SafeAreaView, TouchableHighlight} from 'react-native';
import styles from './styles/styles'
import FABComponent from '../../components/FABComponent/FABComponent.js'
import { RetrieveTodos, Clear, RemoveTodo, StoreTodos} from '../../util/AsyncStorage'
import TaskContainerComponent from '../TaskContainerComponent/TaskContainerComponent'
import {Ionicons} from "@expo/vector-icons";
import MotivationalQuoteComponent from "../MotivationalQuoteComponent/MotivationalQuoteComponent";

export default class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.createTodoCell = this.createTodoCell.bind(this);
        this._onTaskPress = this._onTaskPress.bind(this);
        this.state = {
            todos: null,
        };
    }

    motivationalQuotes = [
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
        "Stay hydrated!",
        "B U T L E R ❤️ you."
    ];

    randomIndex = Math.floor(Math.random() * (this.motivationalQuotes.length - 1));

    componentWillMount() {
        this.props.navigation.setParams({ handleIconTouch:
            this.handleIconTouch });

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
            alert('No items selected!');
            return;
        }

        Alert.alert(title, message, [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Yes please', onPress: () => this.deleteSelectedTasks()},
        ])
    };

    deleteSelectedTasks = async() =>{
        let todos = JSON.parse(this.state.todos);

        for (let index in todos) {
            if(todos[index].checked) {
                await RemoveTodo(index); // Remove from AsyncStorage
                todos.splice(index, 1); // Remove from local state
                this.setState({ todos: JSON.stringify(todos) });
            }
        }
        this.componentDidMount();
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
        rightButtonTitle: 'HEI',
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

    async componentDidMount() {

        // await Clear();
        const todos = await RetrieveTodos();
        this.setState({ todos: todos });

        // Add listener to update feed when returning to home-screen
        const didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.componentDidMount();
            }
        );

    }

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
        return <Text>Looks like there's nothing here :)</Text>
    };

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.viewWrapper}>
                    <ScrollView contentContainerStyle={styles.container}>
                        {this.createTodoCell()}
                        <MotivationalQuoteComponent data={this.motivationalQuotes[this.randomIndex]}/>
                    </ScrollView>
                </View>
                <FABComponent navigation={this.props.navigation}/>
            </SafeAreaView>
        );
    }


}
