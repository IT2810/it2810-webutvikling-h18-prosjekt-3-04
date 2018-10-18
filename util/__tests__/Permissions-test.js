import React from 'react';
import {RequestPermission,CheckPermission} from "../Permissions"
import {Permissions} from "expo";
import {AsyncStorage} from "react-native";

// Mock expo permissions since these functions are not authored by us.
jest.mock('expo', ()=> ({
    Permissions: {
        askAsync: jest.fn(),
        getAsync: jest.fn()
    }
}));

// Mock alerts to avoid issues
global.alert = jest.fn().mockImplementation(() => {
    console.log('Alert called')
});

test("test CheckPermission",async ()=>{
    Permissions.getAsync.mockImplementation(()=>({status:'granted'}));
    const permissionStatus = await CheckPermission('cameraRoll');
    expect(permissionStatus).toBeTruthy();
    expect(Permissions.getAsync).toBeCalled();
});

test("test RequestPermission = true",async ()=>{
    Permissions.askAsync.mockImplementation(()=>({status:'granted'}));
    const permissionStatus = await RequestPermission('cameraRoll');
    expect(permissionStatus).toBeTruthy();
    expect(Permissions.askAsync).toBeCalled();
});

test("test RequestPermission = false",async ()=>{
    Permissions.askAsync.mockImplementation(()=>({status:'denied'}));
    const permissionStatus = await RequestPermission('cameraRoll');
    expect(permissionStatus).toBeFalsy();
    expect(Permissions.askAsync).toBeCalled();
});