import React from 'react';
import {Text,Alert, View, ScrollView, SafeAreaView, TouchableHighlight} from 'react-native';
import styles from './styles/styles'
import FABComponent from '../../components/FABComponent/FABComponent.js'
import { AddInitialTodos, RetrieveTodos, Clear, AddTodo, RemoveTodo } from '../../util/AsyncStorage'
import TaskContainerComponent from '../TaskContainerComponent/TaskContainerComponent'
import {Ionicons} from "@expo/vector-icons";

export default class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.createTodoCell = this.createTodoCell.bind(this);
        this.state = {todos: null};
    }
    componentWillMount() {
        this.props.navigation.setParams({ handleIconTouch:
            this.handleIconTouch });

    }
    handleIconTouch = (title, message) => {
        Alert.alert(title, message, [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Yes please', onPress: () => this.deleteSelectedTasks()},
        ])
    };
    deleteSelectedTasks = () =>{
        console.log('hey alertbro')
        /*
        let test = JSON.parse(this.state.todos);
        for (let item in test) {
            if(test[item].isChecked) {

            }
        }*/
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
            <TouchableHighlight underlayColor={"rgba(0,0,0,0)"} style={styles.rightButtonItem} activeOpacity={0.5} onPress={()=> navigation.state.params.handleIconTouch('Delete tasks ⚠️','Would you like to remove all your selected tasks?')}>
                <View style={styles.iconView}>
                    <Ionicons  name="md-trash" size={25} color="#ff0042" />
                </View>
            </TouchableHighlight>,
    });
    /*onPressDeleteTask={this.deleteTasks}*/
    async componentDidMount() {

        //await Clear();
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

    createTodoCell = () => {
        if (this.state.todos !== null) {
            let array = JSON.parse(this.state.todos);
            return array.map((item, key) => {
                return (
                    <TaskContainerComponent key={key} type={item.type} isChecked={item.checked} data={item.data} deadline={item.deadline}/>
                );
            });
        }
        return <Text>Looks like there's nothing here :)</Text>
    };

    render() {
        let motivationalQuotes = [
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

        let randomIndex = Math.floor(Math.random() * (motivationalQuotes.length - 1));
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.viewWrapper}>
                    <ScrollView contentContainerStyle={styles.container}>
                        {this.createTodoCell()}
                        <TaskContainerComponent type ='motivational' data= {motivationalQuotes[randomIndex]}/>
                    </ScrollView>
                </View>
                <FABComponent navigation={this.props.navigation}/>
            </SafeAreaView>
        );
    }


}
