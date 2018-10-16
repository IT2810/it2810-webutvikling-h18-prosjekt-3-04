import React from 'react';
import {RequestPermission,CheckPermission} from "../Permissions"
import {Permissions} from "expo";
import {AsyncStorage} from "react-native";

jest.mock('expo', ()=> ({
    Permissions: {
        askAsync: jest.fn(),
        getAsync: jest.fn()
    }
}));

global.alert = jest.fn().mockImplementation(() => {
    console.log('Alert called')
});

test("test CheckPermission",async ()=>{
    Permissions.getAsync.mockImplementation(()=>({status:'granted'}));
    const permissionStatus = await CheckPermission('cameraRoll');
    expect(permissionStatus).toBeTruthy()
});

test("test RequestPermission = true",async ()=>{
    Permissions.askAsync.mockImplementation(()=>({status:'granted'}));
    const permissionStatus = await RequestPermission('cameraRoll');
    expect(permissionStatus).toBeTruthy()
});

test("test RequestPermission = true",async ()=>{
    Permissions.askAsync.mockImplementation(()=>({status:'granted'}));
    const permissionStatus = await RequestPermission('cameraRoll');
    expect(permissionStatus).toBeTruthy()
});
test("test RequestPermission = false",async ()=>{
    Permissions.askAsync.mockImplementation(()=>({status:'denied'}));
    const permissionStatus = await RequestPermission('cameraRoll');
    expect(permissionStatus).toBeFalsy()
});