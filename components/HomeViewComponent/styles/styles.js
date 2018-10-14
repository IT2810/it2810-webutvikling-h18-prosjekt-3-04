import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
        paddingBottom:20,
    },
    safeAreaView:{
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    viewWrapper:{
        minHeight: '90%',
    },
    text: {
        color: '#ff0042',
        letterSpacing: 5,
        fontSize: 20,
        fontWeight: "bold",
    },
    rightButtonItem:{
        width: 80,
        backgroundColor:'transparent'
    },
    iconView:{
        marginLeft: 40,
    }

})