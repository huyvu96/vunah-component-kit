import { StyleSheet } from 'react-native';
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
    },
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

export default styles;
