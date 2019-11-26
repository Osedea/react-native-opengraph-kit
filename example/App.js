/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import { OpenGraphAwareInput, OpenGraphDisplay, OpenGraphParser } from 'react-native-opengraph-kit';

export default class Example extends Component {
    state = {
        data: [],
    };

    handleIconPress = () => {
        console.log('Pressed X');
    }

    handleTextChange = (event) => {
        OpenGraphParser.extractMeta(event.nativeEvent.text)
        .then((data) => {
            console.log(data);
            this.setState({ data });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={styles.title}>OpenGraphAwareInput</Text>
                    <OpenGraphAwareInput
                        showIcon
                        containerStyle={styles.textInput}
                    />
                    <Text style={styles.title}>Using OpenGraphParser with normal TextInput</Text>
                    <TextInput
                        style={styles.textInput}
                        onChange={this.handleTextChange}
                    />
                    <Text style={styles.title}>OpenGraphDisplay</Text>
                    {this.state.data.map((meta, i) =>
                        <OpenGraphDisplay
                            key={meta}
                            data={meta}
                        />
                    )}
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 10,
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
