import { AsyncStorage } from "react-native";

export async function AddInitialTodos() {
    try {
        let initialList = [
                {
                    data: 'This is a test',
                    deadline: '19.10.2018',
                    type: 'text'
                },
                {
                    data: 'This is also a test',
                    deadline: 'No deadline',
                    type: 'text'
                },
        ];

        await AsyncStorage.setItem('todos', JSON.stringify(initialList));
        console.log('Added initial todos');
    } catch (error) {
        alert(error);
    }
}

export async function RetrieveTodos() {
    try {
        return await AsyncStorage.getItem('todos', null);
    } catch (error) {
        alert(error);
    }
}

export async function AddTodo(todo) {
    try {
        const todoString = await RetrieveTodos();
        let todos;

        if (todoString === null) { todos = JSON.parse('[]') }
        else { todos = JSON.parse(todoString); }

        todos.push(todo);
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        alert(error);
    }
}

export async function RemoveTodo(index) {
    try {
        const todoString = await RetrieveTodos();
        let todos = JSON.parse(todoString);
        todos.splice(index, 1);
        //console.log(todos);
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        alert(error);
    }
}

export async function Clear() {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        alert(error);
    }
}