
import React, { Component } from 'react';
import { Text } from 'react-native';
export default (props) => {
    return <Text adjustsFontSizeToFit allowFontScaling={false} numberOfLines={1} {...props}>{props.children}</Text>
}