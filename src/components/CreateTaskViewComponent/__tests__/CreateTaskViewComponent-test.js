import React from 'react';
import CreateTaskView from '../CreateTaskView';
import renderer from 'react-test-renderer';
import {RequestPermission} from '../../../util/Permissions';
import {AddTodo} from "../../../util/AsyncStorage";

// Global variables
let component;
let getParam = jest.fn();
let navigate = jest.fn();
let navigation = {
    navigate: navigate,
    getParam: getParam,
};

// Mocks
jest.mock('../../../util/Permissions.js', () => ({
    RequestPermission: jest.fn(),
}));

jest.mock('expo', () => ({
    ImageManipulator: { // ImageManipulator should return a base64-string when finished
        manipulate: () => ({ base64: 'base64string'}),
    },
    ImagePicker: {
        launchCameraAsync: () => ({ cancelled: false }),
        launchImageLibraryAsync: () => ({ cancelled: false }),
    }
}));

jest.mock('../../../util/AsyncStorage.js', () => ({
    AddTodo: jest.fn(),
}));

// Generate fresh instance of module for each test
beforeEach(() => {
    const testCreateTaskViewComponent = <CreateTaskView navigation={navigation}/>;
    component = renderer.create(testCreateTaskViewComponent).getInstance();
});

test('renders correctly for text type', () => {
    getParam = jest.fn(x => 'text');
    navigation = {
      getParam: getParam,
    };

    const testCreateTaskViewComponent = <CreateTaskView navigation={navigation}/>;
    const tree = renderer.create(testCreateTaskViewComponent).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders correctly for image type', () => {
    getParam = jest.fn(x => 'image');
    navigation = {
        getParam: getParam,
    };

    const testCreateTaskViewComponent = <CreateTaskView navigation={navigation}/>;
    const tree = renderer.create(testCreateTaskViewComponent).toJSON();
    expect(tree).toMatchSnapshot();
});

test('updates image correctly', async () => {
    let result = {
        cancelled: true,
    };

    // Data should not update if user does not choose image
    await component._updateImage(result);
    expect(component.state.currentTask.data).toBeNull();

    result = {
        cancelled: false,
    };

    // Data should update with base64-string if an image is chosen.
    await component._updateImage(result);
    expect(component.state.currentTask.data).toBe('data:image/jpeg;base64,base64string');
});

test('choosing image from camera runs correctly', async () => {

    // If permissions are granted, data state should update with base64-string
    RequestPermission.mockImplementation(() => true );
    await component._pickCameraImage();
    expect(component.state.currentTask.data).toBe('data:image/jpeg;base64,base64string');

    component.setState({ currentTask: {
        type: 'image',
        data: null
    }});

    // If permissions are not granted, state should not update and data should be null
    RequestPermission.mockImplementation(() => false );
    await component._pickCameraImage();
    expect(component.state.currentTask.data).toBeNull();

});

test('choosing image from library runs correctly', async () => {

    // If permissions are granted, data state should update with base64-string
    RequestPermission.mockImplementation(() => true );
    await component._pickImage();
    expect(component.state.currentTask.data).toBe('data:image/jpeg;base64,base64string');

    component.setState({ currentTask: {
            type: 'image',
            data: null
        }});

    // If permissions are not granted, state should not update and data should be null
    RequestPermission.mockImplementation(() => false );
    await component._pickImage();
    expect(component.state.currentTask.data).toBeNull();
});

test('writing text updates data state', () => {
    component._updateText('This is text');
    expect(component.state.currentTask.data).toBe('This is text');
});

test('writing steps text updates data state', () => {
    component._updateStepsText('This is step text');
    expect(component.state.currentTask.data).toBe('0/'+'This is step text');
});

test('choosing date updates deadline state', () => {
    component._handleDatePicked('Tue Oct 16 2018 19:24:08 GMT+0200 (CEST)');
    expect(component.state.currentTask.deadline).toBe('Tue Oct 16 2018 at 19:24');
});

test('toggle DateTimePicker should update visible state', () => {
    component._toggleDatePicker();
    expect(component.state.isDatePickerVisible).toBeTruthy();
    component._toggleDatePicker();
    expect(component.state.isDatePickerVisible).toBeFalsy();
});

test('toggle modal should update visible state', () => {
    component._toggleModal();
    expect(component.state.isModalVisible).toBeTruthy();
    component._toggleModal();
    expect(component.state.isModalVisible).toBeFalsy();
});

test('posting empty task should prevent storage update', async() => {
    global.alert = jest.fn().mockImplementation(() => {
        console.log('Alert called')
    });

    // Data is null when postTask is called here
    await component._postTask();
    expect(navigate).not.toBeCalled();
    expect(component.state.currentTask.data).toBeNull();
});

test('posting task should update storage and navigate to home', async() => {
    let navigation2 = {
        navigate: jest.fn(),
        getParam: jest.fn()
    };
    const testCreateTaskViewComponent = <CreateTaskView navigation={navigation2}/>;
    component = renderer.create(testCreateTaskViewComponent).getInstance();

    // Same as last text, but we update data state with text before calling postTask.
    // Navigate should be called after updating AsyncStorage
    component._updateText('This is text');
    await component._postTask();
    expect(component.state.currentTask.data).not.toBeNull();
    expect(navigation2.navigate).toBeCalled();
    expect(AddTodo).toBeCalled();
});
