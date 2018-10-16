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
    const result = await RetrieveTodos(testTodo);
    expect(result).toEqual(testTodo);
    expect(result).not.toEqual(anotherTodo);
});

test('Test that Clear throws alert', async () => {
    await Clear();
});

test('Test that StoreTodos works', async () => {
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
    AsyncStorage.setItems.mockImplementation(()=>(
        {
            date: "this is a date",
            deadline: "this is a deadline",
            type: "this is a type"
        }
    ));

    await StoreTodos(testTodo,anotherTodo);

    await Clear();

    AsyncStorage.getItem.mockImplementation(()=>(
        undefined
    ));
    const result = await RetrieveTodos();
    expect(result).toBe(undefined)
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

//This is to get full coverage by throwing alerts
test('Test Clear-alert', async () => {
    AsyncStorage.clear.mockImplementation(()=>"this".shouldThrowAnError());
    await Clear();
});
//This is to get full coverage by throwing alerts
test('Test RetrieveTodos-alert', async () => {
    AsyncStorage.getItem.mockImplementation(()=>"this".shouldThrowAnError());
    await RetrieveTodos();
});