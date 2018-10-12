import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
let width = Dimensions.get('window').width; //full width

export default StyleSheet.create({
    taskObject:{
        backgroundColor: "#FFF",
        borderRadius: 20,
        width:width-20,
        height:"auto",
        padding: 20,
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        marginBottom:0,
        flex: 0,
        flexDirection: 'row',
        flexWrap:"wrap",
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset:{height: 2},
    },
    textFlex:{
        width: 200,
        alignSelf: "center",
    },
    checkFlex:{
        width:40,
        alignSelf: "center",
    },
    dateStyle:{
        marginTop:40,
        color: "#FF0040",
        textAlign:"center",
        justifyContent: "center",
    },
    image:{
        width:200,
        aspectRatio:1,
        alignSelf: "center",
    }

});