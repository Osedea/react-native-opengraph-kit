import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { OpenGraphAwareInput, OpenGraphDisplay, OpenGraphParser } from 'react-native-opengraph-kit';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        minHeight: 100,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
    },
});

export default class Example extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
        };
    }

    handleTextChange = (event) => {
        OpenGraphParser.extractMeta(event.nativeEvent.text)
        .then((data) => {
            this.setState({ data });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>OpenGraphAwareInput</Text>
                <OpenGraphAwareInput
                    containerStyle={styles.textInput}
                />
                <Text style={styles.title}>Using OpenGraphParser with normal TextInput</Text>
                <TextInput
                    style={styles.textInput}
                    onChange={this.handleTextChange}
                />
                <Text style={styles.title}>OpenGraphDisplay</Text>
                <OpenGraphDisplay
                    data={this.state.data}
                />
            </View>
        );
    }
}
