import { Permissions } from 'expo';

let permissionMap = {
    'cameraRoll' : Permissions.CAMERA_ROLL,
    'camera' : Permissions.CAMERA,
    'location' : Permissions.LOCATION,
    'notifications' : Permissions.NOTIFICATIONS,
    'audioRecording' : Permissions.AUDIO_RECORDING,
    'reminders' : Permissions.REMINDERS,
    'brightness' : Permissions.SYSTEM_BRIGHTNESS,
};

/**
 * @return {boolean}
 */

export async function RequestPermission(permission) {
    const response = await Permissions.askAsync(permissionMap[permission]);
    //console.log(response);
    if (response['status'] !== 'granted') {
        alert('Permission ' + permission + ' not granted. Permissions can be changed in settings');
        return false;
    }
    return true;
}

/**
 * @return {boolean}
 */

export async function CheckPermission(permission) {
    const { status } = await Permissions.getAsync(permissionMap[permission]);
    return status === 'granted';
}
