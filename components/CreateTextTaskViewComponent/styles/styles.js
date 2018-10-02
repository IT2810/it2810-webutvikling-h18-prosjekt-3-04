import { StyleSheet } from 'react-native';

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

    deadlineBtn: {
        backgroundColor: '#ff0042',
        borderRadius:20,
        borderWidth: 1,
        borderColor:'#ff0042',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 1,
    },

    textInputField:{
        height: 150,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#f3f3f3',
        backgroundColor:'#f3f3f3',
        //marginBottom:20,
        padding:10,
        width: "90%",
        marginTop:20,
        marginBottom:20,
        fontSize: 20,
        fontWeight:"bold",
    },
    buttonText: {
        fontSize:15,
        fontWeight: "bold",
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop:5,
        color: '#fff',
    }
})