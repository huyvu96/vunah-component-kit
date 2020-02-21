/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { memo } from 'react';
import {
    Text, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import Fonts from './Fonts';

const styles = () => {
    const text = StyleSheet.create({
        h1: {
            fontSize: Fonts.fontSize.h1,
            lineHeight: Fonts.fontSize.h1 + 2,
        },
        h2: {
            fontSize: Fonts.fontSize.h2,
            lineHeight: Fonts.fontSize.h2 + 2,
        },
        h3: {
            fontSize: Fonts.fontSize.h3,
            lineHeight: Fonts.fontSize.h3 + 2,
        },
        h4: {
            fontSize: Fonts.fontSize.h4,
            lineHeight: Fonts.fontSize.h4 + 2,
        },
        paragraph1: {
            fontSize: Fonts.fontSize.paragraph1,
            lineHeight: Fonts.fontSize.paragraph1 + 2,
        },
        paragraph2: {
            fontSize: Fonts.fontSize.paragraph2,
            lineHeight: Fonts.fontSize.paragraph2 + 2,
        },
        caption1: {
            fontSize: Fonts.fontSize.caption1,
            lineHeight: Fonts.fontSize.caption1 + 2,
        },
        caption2: {
            fontSize: Fonts.fontSize.caption2,
            lineHeight: Fonts.fontSize.caption2 + 2,
        },
    });

    const font = StyleSheet.create({
        black: {
            fontFamily: Fonts.fontFamily.SFProText_Black,
        },
        regular: {
            fontFamily: Fonts.fontFamily.SFProText_Regular,
        },
        bold: {
            fontFamily: Fonts.fontFamily.SFProText_Bold,
        },
        semibold: {
            fontFamily: Fonts.fontFamily.SFProText_Semibold,
        },
        heavy: {
            fontFamily: Fonts.fontFamily.SFProText_Heavy,
        },
        light: {
            fontFamily: Fonts.fontFamily.SFProText_Light,
        },
        thin: {
            fontFamily: Fonts.fontFamily.SFProText_Thin,
        },
        ultralight: {
            fontFamily: Fonts.fontFamily.SFProText_Ultralight,
        }
    });

    const color = StyleSheet.create({
        black: { color: '#3a3a3a' },
        back: { color: '#222222' },
        primary: { color: '#b0006d' },
        white: { color: '#ffffff' },
        disabled: { color: '#bec4cf' },
        hint: { color: '#8d919d' },
        success: { color: '#78ca32' },
        danger: { color: '#e82956' },
        warning: { color: '#fa8613' },
        link: { color: '#188aeb' },
        placeholder: { color: '#ced0d4' },
    });

    return { font, text, color };
};

const MomoText = ({
    children, type, size, font, color, style, align, underline, ...restProps
}) => {
    const getStyle = styles();
    return (
        <Text
            style={StyleSheet.flatten([
                {
                    flexShrink: 1,
                    textAlign: align,
                    textDecorationLine: underline ? 'underline' : 'none'
                },
                getStyle.text[size],
                getStyle.font[font],
                getStyle.color[type],
                color && { color },
                style,
            ])}
            {...restProps}
        >
            {children === undefined ? '' : children}
        </Text>

    );
};

MomoText.defaultProps = {
    font: 'regular',
    type: 'back',
    size: 'h4',
    align: 'auto',
    color: null,
    underline: false,
};

MomoText.propTypes = {
    underline: PropTypes.bool,
    align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
    color: PropTypes.string,
    font: PropTypes.oneOf(['black', 'regular', 'bold', 'semibold', 'heavy', 'light', 'thin', 'ultralight']),
    size: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'paragraph1', 'paragraph2', 'caption1', 'caption2']),
    type: PropTypes.oneOf(['black', 'back', 'primary', 'white', 'disabled', 'hint', 'success', 'danger', 'warning', 'link', 'placeholder']),
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.array,
        PropTypes.any,
    ]),
    style: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.any,
    ]),
};

export default memo(MomoText);
