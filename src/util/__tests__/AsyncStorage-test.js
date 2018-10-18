import React from 'react';
import {RetrieveTodos, StoreTodos, AddTodo, Clear}from '../AsyncStorage';
import {AsyncStorage} from "react-native";


const testTodo = {
    date: "this is a date",
    deadline: "this is a deadline",
    type: "this is a type"
};

const anotherTodo = {
    date: "this is really not a date",
    deadline: "this is really not a deadline",
    type: "this is really not a type"
};

global.alert = jest.fn().mockImplementation(() => {
    console.log('Alert called')
});

jest.mock('react-native', ()=> ({
    AsyncStorage: {
        setItems: jest.fn(),
        getItem: jest.fn(),
        clear:jest.fn()
    }
}));

test('Test that RetrieveTodos works', async () => {

    AsyncStorage.getItem.mockImplementation(()=>({
        date: "this is a date",
        deadline: "this is a deadline",
        type: "this is a type"
    }
    ));

    // RetrieveTodos should call AsyncStorage.getItem and return object defined above
    const result = await RetrieveTodos(testTodo);
    expect(result).toEqual(testTodo);
    expect(result).not.toEqual(anotherTodo);
});

test('Test that StoreTodos works', async () => {

    // Update AsyncStorage first
    AsyncStorage.setItems.mockImplementation(()=>(
        [{
            date: "this is a date",
            deadline: "this is a deadline",
            type: "this is a type"
        },
        {
            date: "this is really not a date",
            deadline: "this is really not a deadline",
            type: "this is really not a type"
        }]
    ));
    await StoreTodos(testTodo,anotherTodo);

    // Test that retrieve function calls AsyncStorage.getItem and returns correct object.
    AsyncStorage.getItem.mockImplementation(()=>([
        {
            date: "this is a date",
            deadline: "this is a deadline",
            type: "this is a type"
        },
        {
            date: "this is really not a date",
            deadline: "this is really not a deadline",
            type: "this is really not a type"
        }]
    ));
    const result = await RetrieveTodos();
    expect(result).toEqual([testTodo,anotherTodo]);
});


test('Test that Clear works', async () => {
    await Clear();
    expect(AsyncStorage.clear).toBeCalled()
});

test('Test that AddTodo works', async () => {
    AsyncStorage.setItems.mockImplementation(()=>(
        {
            date: "this is a date",
            deadline: "this is a deadline",
            type: "this is a type"
        }
    ));
    await AddTodo(testTodo);

    // Test that values in AsyncStorage are the same as the ones we added earlier
    AsyncStorage.getItem.mockImplementation(()=>({
        date: "this is a date",
        deadline: "this is a deadline",
        type: "this is a type"
    }));
    const result = await RetrieveTodos();
    expect(result).toEqual(testTodo);
});


test('Test that AddTodo todoString = null  works', async () => {
    AsyncStorage.setItems.mockImplementation(()=>(
        {
            date: "this is really not a date",
            deadline: "this is really not a deadline",
            type: "this is really not a type"
        }
    ));
    AsyncStorage.getItem.mockImplementation(()=>(null));
    await AddTodo(testTodo);
    AsyncStorage.getItem.mockImplementation(()=>[{
            date: "this is a date",
            deadline: "this is a deadline",
            type: "this is a type"
        },
        {
            date: "this is really not a date",
            deadline: "this is really not a deadline",
            type: "this is really not a type"
        }]
    );
    const result = await RetrieveTodos();
    expect(result).toEqual([testTodo,anotherTodo]);
});

// Tests that alert is called when an error is thrown in clear-function
test('Test Clear-alert', async () => {
    AsyncStorage.clear.mockImplementation(()=>"this".shouldThrowAnError());
    await Clear();
    expect(global.alert).toBeCalled()
});

// Tests that alert is called when an error is thrown in RetrieveTodos-function
test('Test RetrieveTodos-alert', async () => {
    AsyncStorage.getItem.mockImplementation(()=>"this".shouldThrowAnError());
    await RetrieveTodos();
    expect(global.alert).toBeCalled()
});