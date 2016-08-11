/**
 *
 * @namespace Oseadea.Components.OpenGraph
 *
 * @class
 * @classdesc open graph component
 * @memberof Oseadea.Components
 * @extends React.Component
 *
 * @author Mohamed Mellouki <mellouki.mhd@gmail.com>
 * @version 0.1.0
 *
 */

import React, { Component } from 'react';

import {
    View,
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';

import { unescape } from 'lodash';

const colors = {
    defaultBackgroundColor: '#EEEEEE',
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultBackgroundColor,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.defaultBackgroundColor,
        height: 80,
        padding: 5,
        overflow: 'hidden',
        marginBottom: 10,
        marginTop: 10,
    },
    smallContainer: {
        backgroundColor: colors.defaultBackgroundColor,
        borderWidth: 1,
        borderColor: colors.defaultBackgroundColor,
        justifyContent: 'center',
        padding: 5,
        marginBottom: 10,
        marginTop: 10,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        alignSelf: 'center',
        height: 70,
    },
    title: {
        fontWeight: 'bold',
    },
    textContent: {
        flex: 4,
        paddingLeft: 5,
        paddingBottom: 5,
        overflow: 'hidden',
    },
});

export default class OpenGraphDisplay extends Component {
    static propTypes = {
        data: React.PropTypes.shape({
            url: React.PropTypes.string,
            image: React.PropTypes.string,
            title: React.PropTypes.string,
            description: React.PropTypes.string,
        }).isRequired,
    };

    handleLinkPress = () => {
        Linking.canOpenURL(this.props.data.url).then((supported) => {
            if (!supported) {
                console.log(`Can\'t handle url: ${this.props.data.url}`);

                return null;
            } else {
                return Linking.openURL(this.props.data.url);
            }
        }).catch(
            (err) => console.error('An error occurred', err)
        );
    };

    unescape = (content) => {
        if (!content) {
            return '';
        }

        return unescape(
            content.replace(/&#([0-9]{1,3});/gi, (match, numStr) => (
                String.fromCharCode(Number(numStr))
            ))
        );
    }

    render() {
        if (!this.props.data.url) {
            return null;
        }

        if (this.props.data.title
            || this.props.data.description
            || this.props.data.image
        ) {
            return (
                <TouchableWithoutFeedback
                    onPress={this.handleLinkPress}
                >
                    <View style={styles.container}>
                        {this.props.data.image ?
                            <Image
                                style={styles.image}
                                source={{ uri: this.props.data.image }}
                            /> : null
                        }
                        <View style={styles.textContent}>
                            <Text style={styles.title}>{this.unescape(this.props.data.title) || ''}</Text>
                            <Text>{this.unescape(this.props.data.description) || ''}</Text>
                            <Text>{this.unescape(this.props.data.url) || ''}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        } else {
            return (
                <TouchableWithoutFeedback
                    onPress={this.handleLinkPress}
                >
                    <View style={styles.smallContainer}>
                        <Text>{this.props.data.url || ''}</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
    }
}
