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
    taskText:{
        fontSize:20,
        fontWeight: '500',
    },
    checkFlex:{
        width:40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    dateStyle:{
        marginTop:10,
        color: "#FF0040",
    },
    image:{
        width:200,
        aspectRatio:1,
        marginLeft:-10,
        alignSelf: "center",
    },
    motivationalElement: {
        height:90,
        marginTop:15,
        width:250,
        marginLeft:-100,
    },
    motivationalText: {
        fontSize: 16,
        marginLeft:15,
        marginTop:32,
        color:'#bcbcbc',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
});