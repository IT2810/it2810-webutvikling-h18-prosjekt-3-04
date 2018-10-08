import { AsyncStorage } from "react-native";

export async function AddInitialTodos() {
    try {
        let initialList = [
                {test: 'This is a test'},
                {test: 'This is also a test'},
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
        let todos = JSON.parse(todoString);
        todos.push(todo);
        //console.log(t);
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
        console.log(todos);
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