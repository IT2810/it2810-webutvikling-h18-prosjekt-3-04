import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
    },

    image: {
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
        marginTop: 20,
        width: '80%',
        aspectRatio: 1,
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
    },

    deadlineBtn: {
        backgroundColor: '#a3052e',
        borderRadius:20,
        borderWidth: 1,
        borderColor:'#a3052e',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    buttonText: {
        fontSize:15,
        fontWeight: "bold",
        color: '#fff',
    },

    createTaskButton: {
        backgroundColor: '#ff0042',
    },

    createTaskButtonText: {
        fontSize:15,
        fontWeight: "bold",
        color: '#fff',
    },
})