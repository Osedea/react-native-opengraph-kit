/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import Example from './root';

export default class example extends Component {
  render() {
    return (
      <Example />
    );
  }
}

AppRegistry.registerComponent('example', () => example);
