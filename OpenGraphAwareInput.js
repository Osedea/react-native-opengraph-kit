import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import OpenGraphDisplay from './OpenGraphDisplay';
import OpenGraphParser from './OpenGraphParser';
import debounce from 'lodash.debounce';

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
        debounceDelay: React.PropTypes.number,
        onChange: React.PropTypes.func,
        textInputStyle: TextInput.propTypes.style,
    };

    static defaultProps = {
        debounceDelay: 300,
    };

    constructor(props) {
        super(props);

        this.state = {
            openGraphData: {},
        };
    }

    extractMetaAndSetState = debounce(
        (text) => {
            OpenGraphParser.extractMeta(text)
            .then(
                (data) => {
                    const customEvent = {};

                    this.setState({ openGraphData: data || {} });

                    if (this.props.onChange) {
                        customEvent.event = event;
                        customEvent.opengraphData = data || {};
                        customEvent.text = text;

                        this.props.onChange(customEvent);
                    }
                }
            );
        },
        this.props.debounceDelay
    );

    handleTextInputChange = (event) => {
        const text = event.nativeEvent.text;

        this.extractMetaAndSetState(text);
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
