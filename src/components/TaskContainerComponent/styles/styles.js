import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
let width = Dimensions.get('window').width; //full width

export default StyleSheet.create({
    taskObject: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        width:width-40,
        height:"auto",
        padding: 20,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom:0,
        flex: 0,
        flexDirection: 'row',
        flexWrap:"wrap",
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset:{height: 2},
        elevation:1,
    },

    textFlex: {
        width: 200,
        alignSelf: "center",
    },

    taskText: {
        fontSize:17,
        fontWeight: 'bold',
    },

    checkFlex: {
        width:40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    dateStyle: {
        marginTop:10,
        color: "#FF0040",
    },

    image: {
        width:170,
        aspectRatio:1,
        marginLeft:-30,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#f3f3f3',
        alignSelf: "center",
    },
});