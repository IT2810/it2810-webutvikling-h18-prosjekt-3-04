import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
let width = Dimensions.get('window').width; //full width

export default StyleSheet.create({
    motivationalElement: {
        height:90,
        marginTop:15,
        width:width-40,
    },

    motivationalText: {
        fontSize: 16,
        marginLeft:15,
        marginTop:32,
        color:'#bcbcbc',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});