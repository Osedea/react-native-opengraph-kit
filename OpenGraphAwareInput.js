import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import OpenGraphDisplay from './OpenGraphDisplay';
import OpenGraphParser from './OpenGraphParser';

const styles = StyleSheet.create({
    container: {
    },
    input: {
        height: 50,
        marginBottom: 5,
    },
});

export default class OpenGraphAwareInput extends Component {
    static propTypes = {
        containerStyle: View.propTypes.style,
        onChange: React.PropTypes.func,
        textInputStyle: TextInput.propTypes.style,
    };

    constructor(props) {
        super(props);

        this.state = {
            openGraphData: {},
        };
    }

    handleTextInputChange = (event) => {
        const text = event.nativeEvent.text;

        OpenGraphParser.extractMeta(text).then(
            (data) => {
                const customEvent = {};

                if (data) {
                    this.setState({
                        openGraphData: data,
                    });
                }
                if (this.props.onChange) {
                    customEvent.event = event;
                    if (data) {
                        customEvent.opengraphData = data;
                    }
                    customEvent.text = text;

                    this.props.onChange(customEvent);
                }
            }
        );
    };

    render() {
        return (
            <View
                style={[
                    styles.container,
                    this.props.containerStyle,
                ]}
            >
                <TextInput
                    onChange={this.handleTextInputChange}
                    style={[
                        styles.input,
                        this.props.textInputStyle,
                    ]}
                />
                <OpenGraphDisplay data={this.state.openGraphData} />
            </View>
        );
    }
}
