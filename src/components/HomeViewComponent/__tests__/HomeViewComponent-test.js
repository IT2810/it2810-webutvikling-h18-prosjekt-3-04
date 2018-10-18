import React from 'react';
import HomeViewComponent from '../HomeView';
import renderer from 'react-test-renderer'
import {Alert} from 'react-native';
import {RetrieveTodos} from "../../../util/AsyncStorage";

// Global variables
let component;
let navigation = {
    setParams: jest.fn(),
    addListener: jest.fn(),
};

// Mocks
jest.mock('../../../util/AsyncStorage.js', () => ({
    RetrieveTodos: jest.fn(() => (JSON.stringify([
        {type: 'image',},
        {type: 'text'},
        {type: 'steps'},
    ]))),
    StoreTodos: jest.fn(),
}));

// Generate fresh instance of component for each test
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

    // Tasks are unchecked by default, so task.checked should be false
    component.setState({todos: JSON.stringify(todos)});
    todos = JSON.parse(component.state.todos);
    expect(todos[0].checked).toBeFalsy();

    // Simulate task press and try again. task.checked should be true now
    component._onTaskPress(0);
    todos = JSON.parse(component.state.todos);
    expect(todos[0].checked).toBeTruthy();
});

test('should be able to fetch data from AsyncStorage', async() => {

    // Mock function that updates quotes, this function only needs to be called from the class
    let mockQuoteFunc = jest.fn();

    // Make sure that tasks are not updated before fetching from AsyncStorage
    expect(component.state.numTodos).toBe(0);
    component.quotes.current = {newQuote: mockQuoteFunc};

    // Fetch from mocked AsyncStorage-function. 3 task-objects should be returned,
    // so numTasks should also be 3.
    await component._getStoredTasks();
    expect(component.state.numTodos).toBe(3);
    expect(mockQuoteFunc).toBeCalled();

    // Ensure that JSON.parse is not called unless there are items in AsyncStorage
    let jsonMock = jest.spyOn(JSON, 'parse');
    RetrieveTodos.mockImplementation(() => { return null });
    await component._getStoredTasks();
    expect(jsonMock).not.toBeCalled();
});

test('should run function on delete icon press', () => {
    let mockDeleteFunc = jest.fn();
    let navigation = {
        state: {
            params: {
                _handleIconTouch: mockDeleteFunc
            }
        }
    };

    // Simulate click on delete-icon, which should call the handleIconTouch function
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

    // Update component with task-objects, 1 of which is checked
    let mockQuoteFunc = jest.fn();
    component.setState({
        todos: JSON.stringify(tasks) ,
        numTodos: 3,
    });
    component.quotes.current = {newQuote: mockQuoteFunc};

    // Delete function should delete tasks that are checked, which in our case is the task with index 1
    component._deleteSelectedTasks();
    let todos = JSON.parse(component.state.todos);
    expect(component.state.numTodos).toBe(2); // Number of tasks now 2
    expect(todos[0]).toEqual(tasks[0]); // First task is still the same
    expect(todos[1]).toEqual(tasks[2]); // Second task in state is now the third task of our original array
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

    // We mock alert function to ensure that its called correctly.
    Alert.alert = jest.fn().mockImplementation(() => {
        console.log('Alert called');
    });


    // We updates tasks in component where one task is checked. This should show an alert box which requires
    // confirmation from user.
    component.setState({ todos: JSON.stringify(tasks) });
    component._handleIconTouch('title', 'message');
    expect(Alert.alert).toBeCalledWith('title', 'message', expect.any(Array) );

    // Uncheck our previous task, and run the function again. This should show an alert saying
    // no tasks are selected.
    tasks[1].checked = false;
    component.setState({ todos: JSON.stringify(tasks) });
    component._handleIconTouch();
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

    // Add listener for pedometer. Our stepscounter task should not be updated yet.
    component._subscribe();
    expect(component.state.isPedometerAvailable).toBe('checking');
    tasks = JSON.parse(component.state.todos);
    expect(tasks[2].data).toBe('0/1234');

    // Simulate 50 steps taken. Stepcounter task should now update to 50 steps of goal 1234
    component._subscription.listener(results);
    tasks = JSON.parse(component.state.todos);
    expect(tasks[2].data).toBe('50/1234');
    expect(component.state.stepsMade).toBe(50);
});

test('unsubscribe should remove subscription', () => {
    // Add some data to _subscription and check that gets removed
    component._subscription = { remove: jest.fn() };
    component._unsubscribe();
    expect(component._subscription).toBeNull();
});

test('unmount should call unsubscribe', () => {
    // Add some data to _subscription and check that gets removed
    component._subscription = { remove: jest.fn() };
    component.componentWillUnmount();
    expect(component._subscription).toBeNull();
});

test('android version renders correctly', () => {
    jest.mock('Platform', () => {
        const Platform = require.requireActual('Platform');
        Platform.OS = 'android';
        return Platform;
    });

    // Test rendering of android-version separately due to pedometer issues
    const tree = renderer.create(<HomeViewComponent navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
});