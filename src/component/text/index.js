import React, { memo } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ApplicationStyles } from 'themes';

const TextComponent = ({
  children,
  type,
  size,
  font,
  color,
  style,
  align,
  underline,
  ...restProps
}) => {
  const getStyle = ApplicationStyles();
  return (
    <Text
      style={StyleSheet.flatten([
        {
          flexShrink: 1,
          textAlign: align,
          textDecorationLine: underline ? 'underline' : 'none',
        },
        getStyle.text[size],
        getStyle.font[font],
        getStyle.color[type],
        color && { color },
        style,
      ])}
      {...restProps}>
      {children === undefined ? '' : children}
    </Text>
  );
};

TextComponent.defaultProps = {
  font: 'regular',
  type: 'back',
  size: 'h4',
  align: 'auto',
  color: null,
  underline: false,
};

TextComponent.propTypes = {
  underline: PropTypes.bool,
  align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
  color: PropTypes.string,
  font: PropTypes.oneOf([
    'black',
    'regular',
    'bold',
    'semibold',
    'heavy',
    'light',
    'thin',
    'ultralight',
  ]),
  size: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'paragraph1',
    'paragraph2',
    'caption1',
    'caption2',
  ]),
  type: PropTypes.oneOf([
    'black',
    'back',
    'primary',
    'white',
    'disabled',
    'hint',
    'success',
    'danger',
    'warning',
    'link',
    'placeholder',
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.array,
    PropTypes.any,
  ]),
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.any]),
};

export default memo(TextComponent);
