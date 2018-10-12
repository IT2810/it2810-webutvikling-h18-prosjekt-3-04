import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
    },

    image: {
        marginTop: 20,
        borderColor: '#d6d6d6',
        borderWidth: 2,
        borderRadius: 10,
        width: '90%',
        aspectRatio: 1,
        backgroundColor: '#e8e8e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainer: {
        width: '80%',
        height: '40%',
        alignItems: 'center',
    },

    text: {
        fontSize: 24,
        color: '#d6d6d6',
    },

    modal: {
        backgroundColor: 'rgba(255,255,255,0)',
        width: '90%',
        display: 'flex',
        justifyContent: 'flex-end',
    },

    button: {
        backgroundColor: '#ff0042',
        borderRadius: 10,
        margin: 1,
        width: '100%',
    }
})