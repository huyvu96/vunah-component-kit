import React, { Component } from 'react'

import { TextInputProps, ButtonProps, StyleProp, ViewStyle, TextStyle, ImageStyle, KeyboardTypeOptions, TextProps, FlatListProps, ScrollViewProps } from 'react-native';
/**
 * Text
 */
export type AlignType = 'auto' | 'left' | 'right' | 'center' | 'justify';
export type FontType = 'black' | 'regular' | 'bold' | 'semibold' | 'heavy' | 'light' | 'thin' | 'ultralight';
export type SizeType = 'h1' | 'h2' | 'h3' | 'h4' | 'paragraph1' | 'paragraph2' | 'caption1' | 'caption2';
export type TypeText = 'black' | 'back' | 'primary' | 'white' | 'disabled' | 'hint' | 'success' | 'danger' | 'warning' | 'link' | 'placeholder';

interface TextProps extends TextProps{
  underline?: boolean,
  align?: AlignType,
  color?: string,
  font?: FontType,
  size?: SizeType,
  type?: TypeText,
  children?: any,
  style?: StyleProp<ViewStyle>,
}
export class Text extends React.Component<TextProps> {}

/**
 * CoverFlow
 */
export type Sensitivity = 'low' | 'normal' | 'high';
export type Deceleration = 0.99 | 0.994;

interface CoverFlowProps{
    sensitivity?: Sensitivity,
    deceleration?: Deceleration,
    initialSelection?: number,
    spacing?: number,
    wingSpan?: number,
    autoplayInterval?: number,
    rotation?: number,
    midRotation?: number,
    perspective?: number,
    scaleDown?: number,
    scaleFurther?: number,
    autoplay?: boolean,
    contentStyle?: StyleProp<ViewStyle>,
    containerStyle?: StyleProp<ViewStyle>,
    onPress?: (value?: number) => void,
    onChangePage?: (value?: number) => void
}
export class CoverFlow extends React.Component<CoverFlowProps> {}

/**
 * Pagination
 */
interface PaginationProps{
  activeDotIndex?: number,
  dotsLength?: number,
  activeOpacity?: number,
  carouselRef?: object,
  containerStyle?: StyleProp<ViewStyle>,
  dotColor?: string,
  dotContainerStyle?: StyleProp<ViewStyle>,
  dotElement?: any,
  dotStyle?: StyleProp<ViewStyle>,
  inactiveDotColor?: string,
  inactiveDotElement?: any,
  inactiveDotOpacity?: number,
  inactiveDotScale?: number,
  inactiveDotStyle?: StyleProp<ViewStyle>,
  renderDots?: React.ReactElement<any>,
  tappableDots?: boolean,
  vertical?: boolean,
  accessibilityLabel?: string
}
export class Pagination extends React.Component<PaginationProps> {}

/**
* Carousel
*/
export type ActiveSlideAlignment = 'center' | 'end' | 'start';
export type Layout = 'default' | 'stack' | 'tinder';

interface CarouselProps{
  data?: Array<any>,
  renderItem?: ({item: any, index: number}) => React.ReactElement<any>,
  itemWidth?: number, // required for horizontal carousel
  itemHeight?: number, // required for vertical carousel
  sliderWidth?: number, // required for horizontal carousel
  sliderHeight?: number, // required for vertical carousel
  activeAnimationType?: string,
  activeAnimationOptions?: object,
  activeSlideAlignment?: ActiveSlideAlignment,
  activeSlideOffset?: number,
  apparitionDelay?: number,
  autoplay?: boolean,
  autoplayDelay?: number,
  autoplayInterval?: number,
  callbackOffsetMargin?: number,
  containerCustomStyle?: StyleProp<ViewStyle>,
  contentContainerCustomStyle?: StyleProp<ViewStyle>,
  enableMomentum?: boolean,
  enableSnap?: boolean,
  firstItem?: number,
  hasParallaxImages?: boolean,
  inactiveSlideOpacity?: number,
  inactiveSlideScale?: number,
  inactiveSlideShift?: number,
  layout?: Layout,
  layoutCardOffset?: number,
  lockScrollTimeoutDuration?: number,
  lockScrollWhileSnapping?: boolean,
  loop?: boolean,
  loopClonesPerSide?: number,
  scrollEnabled?: boolean,
  scrollInterpolator?: Function,
  slideInterpolatedStyle?: Function,
  slideStyle?: StyleProp<ViewStyle>,
  shouldOptimizeUpdates?: boolean,
  swipeThreshold?: number,
  useScrollView?: boolean,
  vertical?: boolean,
  showsPagination?: boolean,
  onBeforeSnapToItem?: (index: any) => void,
  onSnapToItem?: (index: any) => void,
  renderPagination?: React.ReactElement<any>,
}
export class Carousel extends React.Component<CarouselProps> {}

/**
* Skeleton
*/
export type SkeletonType = 'line' | 'media' | 'custom';

interface SkeletonProps{
type?: SkeletonType,
size?: number,
height?: number,
style?: StyleProp<ViewStyle>,
isRound?: boolean,
noMargin?: boolean,
width?: number,
color?: string,
duration?: number,
right?: React.ReactElement<any>,
left?: React.ReactElement<any>
}
export class Skeleton extends React.Component<SkeletonProps> {}
