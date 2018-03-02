import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import PropTypes from 'proptypes';
import debounce from 'lodash.debounce';

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
        debounceDelay: PropTypes.number,
        iconSource: OpenGraphDisplay.propTypes.iconSource,
        iconStyle: OpenGraphDisplay.propTypes.iconStyle,
        onChange: PropTypes.func,
        onIconPress: PropTypes.func,
        showIcon: PropTypes.bool,
        textInputStyle: TextInput.propTypes.style,
        resultLimit: PropTypes.number,
    };

    static defaultProps = {
        debounceDelay: 300,
        showIcon: false,
        resultLimit: 1,
    };

    constructor(props) {
        super(props);

        this.state = {
            openGraphData: [],
        };
    }

    handleDismissOpengraph = () => {
        this.setState({
            openGraphData: [],
        });
    }

    extractMetaAndSetState = debounce(
        (text) => {
            OpenGraphParser.extractMeta(text)
            .then(
                (data) => {
                    const customEvent = {};

                    this.setState({ openGraphData: data || [] });

                    if (this.props.onChange) {
                        customEvent.event = event;
                        customEvent.opengraphData = data || [];
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
        const ogDataToDisplay = this.state.openGraphData.slice(0, this.props.resultLimit);
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
                {ogDataToDisplay.map((meta, i) =>
                    <OpenGraphDisplay
                        key={i}
                        data={meta}
                        onIconPress={this.props.showIcon
                            ? this.props.onIconPress || this.handleDismissOpengraph
                            : null
                        }
                        iconSource={this.props.iconSource}
                        iconStyle={this.props.iconStyle}
                    />
                )}
            </View>
        );
    }
}
