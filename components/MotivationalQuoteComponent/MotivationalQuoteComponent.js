import React from 'react';
import styles from "./styles/styles";
import {Text, View} from "react-native";
import PropTypes from 'prop-types'

export default class MotivationalQuoteComponent extends React.Component {

    constructor(props) {
        super(props);
        this.newQuote = this.newQuote.bind(this);
        this.state = {
            quote: 'No quote given',
        };
    }

    componentDidMount() {
        this.newQuote();
    }

    static propTypes = {
        numTodos: PropTypes.number,
    };

    motivationalQuotes = [
        "Just do it!",
        "You are doing great!",
        "You are great!",
        "You go girl!",
        "Stay productive!",
        "Go get ‘em!",
        "Nice progression!",
        "Achieve your goals!",
        "You become great.",
        "Move along.",
        "How are you?",
        "Andreas loves you!",
        "Gotta catch 'em all!",
        "Go go gadget!",
        "Nothing is impossible.",
        "Live in the present.",
        "Apples are nice.",
        "I like you.",
        "Do you like me?",
        "Run, Forrest!",
        "Catch me if you can.",
        "What are your goals?",
        "Do you remember?",
        "Have you done it yet?",
        "Stop procrastinating!",
        "Stay hydrated!",
        "B U T L E R ❤️ you."
    ];

    newQuote = () => {
        if (this.props.numTodos > 0) {
            let rng = Math.floor(Math.random() * (this.motivationalQuotes.length - 1));
            this.setState({ quote: this.motivationalQuotes[rng] });
        } else {
            this.setState({ quote: 'Looks like you have no tasks. Press the button in the lower right corner to get started :)' });
        }

    };

    render() {
        return(
            <View style={styles.motivationalElement}>
                <Text style={styles.motivationalText}>{this.state.quote}</Text>
            </View>
        );
    }
}