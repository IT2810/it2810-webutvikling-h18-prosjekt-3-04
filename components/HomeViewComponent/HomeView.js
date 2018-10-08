import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles/styles'
import FABComponent from '../../components/FABComponent/FABComponent.js'
import CheckBoxComponent from '../CheckboxComponent/CheckboxComponent'
import { AddInitialTodos, RetrieveTodos, Clear, AddTodo, RemoveTodo } from '../../util/AsyncStorage'

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
        //console.log(todos);
        this.setState({ todos: todos });
        if (todos === null) {
            await AddInitialTodos();
        }
        //let testobject = {test: 'Testing 123'};
        //console.log(testobject);
        //await RemoveTodo(2);
    }

    createTodoCell = () => {
        if (this.state.todos !== null) {
            let array = JSON.parse(this.state.todos);
            console.log(array[0].test);
            return array.map((item, key) => {
                console.log(item);
                return (
                    <Text key={key}>{item.test}</Text>
                );
            });
        }
        return <Text>Looks like there's nothing here :)</Text>;
    };

    render() {

        return (
            <View style={styles.container}>
                { this.createTodoCell() }
                <CheckBoxComponent/>
                <FABComponent navigation={this.props.navigation}/>
            </View>
        );
    }
}
