import React from 'react';
import HomeViewComponent from '../HomeView';
import renderer from 'react-test-renderer'
import {Alert} from 'react-native';

let component;
let navigation = {
    setParams: jest.fn(),
    addListener: jest.fn(),
};

jest.mock('../../../util/AsyncStorage.js', () => ({
    RetrieveTodos: jest.fn(() => (JSON.stringify([
        {type: 'image',},
        {type: 'text'},
        {type: 'steps'},
    ]))),
    StoreTodos: jest.fn(),
}));

beforeEach(() => {
    component = renderer.create(<HomeViewComponent navigation={navigation} />).getInstance();
});

test('renders correctly', () => {
    const tree = renderer.create(<HomeViewComponent navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('creates task object cells', () => {
    let todos = [{
            type: 'text',
            data: 'This is text',
            deadline: 'Whenever you want',
            checked: false,
    }];
    component.setState({todos: JSON.stringify(todos)});
    todos = JSON.parse(component.state.todos);
    expect(todos[0].data).toBe('This is text');
});

test('updates selected prop when clicking task object', () => {
    let todos = [{
        type: 'text',
        data: 'This is text',
        deadline: 'Whenever you want',
        checked: false,
    }];
    component.setState({todos: JSON.stringify(todos)});
    todos = JSON.parse(component.state.todos);
    expect(todos[0].checked).toBeFalsy();

    component._onTaskPress(0);
    todos = JSON.parse(component.state.todos);
    expect(todos[0].checked).toBeTruthy();
});

test('should be able to fetch data from AsyncStorage', async() => {
    let mockQuoteFunc = jest.fn();
    expect(component.state.numTodos).not.toBe(3);
    component.quotes.current = {newQuote: mockQuoteFunc};
    await component._getStoredTasks();
    expect(component.state.numTodos).toBe(3);
    expect(mockQuoteFunc).toBeCalled();
});

test('should run function on delete icon press', () => {
    let mockDeleteFunc = jest.fn();
    let navigation = {
        state: {
            params: {
                handleIconTouch: mockDeleteFunc
            }
        }
    };
    HomeViewComponent.navigationOptions({navigation}).headerRight.props.onPress();
    expect(mockDeleteFunc).toBeCalled();
});

test('should delete selected tasks when asked', () => {
    let tasks = [
        {
            type: 'image',
            data: 'base64string',
            deadline: 'Whenever',
            checked: false
        },
        {
            type: 'text',
            data: 'This is a test',
            deadline: 'Whenever',
            checked: true
        },
        {
            type: 'steps',
            data: '0/1234',
            deadline: 'Whenever',
            checked: false
        },
    ];
    let mockQuoteFunc = jest.fn();
    component.setState({
        todos: JSON.stringify(tasks) ,
        numTodos: 3,
    });
    component.quotes.current = {newQuote: mockQuoteFunc};
    component.deleteSelectedTasks();
    let todos = JSON.parse(component.state.todos);
    expect(component.state.numTodos).toBe(2);
    expect(todos[0]).toEqual(tasks[0]);
    expect(todos[1]).toEqual(tasks[2]);
    expect(mockQuoteFunc).toBeCalled();
});

test('should validate that tasks are selected and prompt for validation', () => {
    let tasks = [
        {
            type: 'image',
            data: 'base64string',
            deadline: 'Whenever',
            checked: false
        },
        {
            type: 'text',
            data: 'This is a test',
            deadline: 'Whenever',
            checked: true
        },
        {
            type: 'steps',
            data: '0/1234',
            deadline: 'Whenever',
            checked: false
        },
    ];
    Alert.alert = jest.fn().mockImplementation(() => {
        console.log('Alert called');
    });
    component.setState({ todos: JSON.stringify(tasks) });
    component.handleIconTouch('test', 'test');
    expect(Alert.alert).toBeCalled();

    tasks[1].checked = false;
    component.setState({ todos: JSON.stringify(tasks) });
    component.handleIconTouch();
    expect(Alert.alert).toBeCalledWith('No tasks selected', 'Please select the tasks you want to delete and try again.');
});

test('subscribe should start pedometer', async() => {
    let tasks = [
        {
            type: 'image',
            data: 'base64string',
            deadline: 'Whenever',
            checked: false
        },
        {
            type: 'text',
            data: 'This is a test',
            deadline: 'Whenever',
            checked: true
        },
        {
            type: 'steps',
            data: '0/1234',
            deadline: 'Whenever',
            checked: false
        },
    ];
    component.setState({ todos: JSON.stringify(tasks) });
    let results = {
        steps: 50,
    };
    component._subscribe();
    expect(component.state.isPedometerAvailable).toBe('checking');
    tasks = JSON.parse(component.state.todos);
    expect(tasks[2].data).toBe('0/1234');

    component._subscription.listener(results);
    tasks = JSON.parse(component.state.todos);
    expect(tasks[2].data).toBe('50/1234');
    expect(component.state.stepsMade).toBe(50);
});

test('unsubscribe should remove subscription', () => {
    component._unsubscribe();
    expect(component._subscription).toBeNull();
});

test('unmount should call unsubscribe', () => {
    component.componentWillUnmount();
    expect(component._subscription).toBeNull();
});

test('android version renders correctly', () => {
    jest.mock('Platform', () => {
        const Platform = require.requireActual('Platform');
        Platform.OS = 'android';
        return Platform;
    });

    const tree = renderer.create(<HomeViewComponent navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
});