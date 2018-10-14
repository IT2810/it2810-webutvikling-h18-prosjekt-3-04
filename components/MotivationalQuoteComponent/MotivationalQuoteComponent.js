import React from 'react';
import styles from "./styles/styles";
import {Text, View} from "react-native";
import PropTypes from 'prop-types'

export default class MotivationalQuoteComponent extends React.Component {

    static propTypes = {
        data: PropTypes.string,
    };

    render() {
        return(
            <View style={styles.motivationalElement}>
                <Text style={styles.motivationalText}>{this.props.data}</Text>
            </View>
        );
    }
}