import {Dimensions, StyleSheet} from 'react-native';
let width = Dimensions.get('window').width; //full width

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    text: {
        color: '#ff0042',
        letterSpacing: 5,
        fontSize: 20,
        fontWeight: "bold",
    },
    textInputField:{
        height: 200,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#f3f3f3',
        backgroundColor:'#f3f3f3',
        padding:10,
        width: "90%",
        marginTop:20,
        marginBottom:20,
        fontSize: 17,
        fontWeight:"bold",
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
        elevation: 1,
        marginBottom: 150,
        width:133,
        alignSelf:'flex-end',
        marginRight: '5%'
    },
    buttonText: {
        fontSize:15,
        fontWeight: "bold",
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop:5,
        color: '#fff',
    },
    createTaskButton: {
        backgroundColor: '#ff0042',
        height:50,
        width:150,
        borderRadius:20,
        borderWidth: 1,
        borderColor:'#ff0042',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createTaskButtonText: {
        fontSize:15,
        fontWeight: "bold",
        color: '#fff',
    },
    deadlineLabelView:{


    },
    deadlineLabel:{


    }
})