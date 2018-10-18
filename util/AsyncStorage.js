import { AsyncStorage } from "react-native";

//Retrieve all tasks
export async function RetrieveTodos() {
    try {
        return await AsyncStorage.getItem('todos', null);
    } catch (error) {
        alert(error);
    }
}

//Add all tasks
export async function StoreTodos(todos) {
    try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        alert(error);
    }
}

//Add one task
export async function AddTodo(todo) {
    try {
        const todoString = await RetrieveTodos();
        let todos;

        if (todoString === null) { todos = JSON.parse('[]') }
        else { todos = JSON.parse(todoString); }

        todos.unshift(todo);
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        alert(error);
    }
}

//Remove all tasks
export async function Clear() {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        alert(error);
    }
}