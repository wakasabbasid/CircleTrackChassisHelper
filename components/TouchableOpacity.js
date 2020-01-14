import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
export default (props) => {
    return <TouchableOpacity activeOpacity={0.7} numberOfLines={1} {...props}>{props.children}</TouchableOpacity>
}