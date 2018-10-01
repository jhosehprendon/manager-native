import React from 'react';
import { Text } from 'react-native';

const Header = (props) => {
    const { textStyle } = styles;

    return <Text style={textStyle}>{props.headerText}</Text>;

};

const styles = {
    textStyle: {
        fontSize: 20
    }
};

export { Header };