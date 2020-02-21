import {
    Animated, StyleSheet, View
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const START_VALUE = 0.5;
const END_VALUE = 1;
const useNativeDriver = true;
const isInteraction = false;
const MARGIN_DEFAULT = 12;
const BORDER_DEFAULT = 5;
const DURATION_DEFAULT = 500;
const WIDTH_DEFAULT = 100;
const HEIGHT_DEFAULT = 15;
const SIZE_DEFAULT = 50;
const PRIMARY_COLOR = '#efefef';
const TYPE_SKELETON = {
    line: 'line',
    media: 'media',
    custom: 'custom'
};

const styles = StyleSheet.create({
    line: {
        borderRadius: BORDER_DEFAULT,
        marginBottom: MARGIN_DEFAULT
    },
    full: {
        flex: 1
    },
    left: {
        marginRight: MARGIN_DEFAULT
    },
    right: {
        marginLeft: MARGIN_DEFAULT
    },
    row: { flexDirection: 'row', width: '100%' }
});

// create a component
export default class Skeleton extends Component {
    constructor(props) {
        super(props);
        this.animation = new Animated.Value(START_VALUE);
    }

    componentDidMount() {
        this.start();
    }

    start = () => {
        const { duration } = this.props;
        Animated.sequence([
            Animated.timing(this.animation, {
                duration,
                isInteraction,
                toValue: END_VALUE,
                useNativeDriver
            }),
            Animated.timing(this.animation, {
                duration,
                isInteraction,
                toValue: START_VALUE,
                useNativeDriver
            })
        ]).start((e) => {
            if (e.finished) {
                this.start();
            }
        });
    }

    renderLineSkeleton = ({
        width, height, color, style, noMargin
    }) => (
        <Animated.View style={[styles.line, {
            opacity: this.animation, height, width, backgroundColor: color, marginBottom: noMargin ? 0 : MARGIN_DEFAULT
        }, style]}
        />
    )

    renderMediaSkeleton = ({
        size, color, isRound, style
    }) => (
        <Animated.View style={[{
            opacity: this.animation,
            height: size,
            width: size,
            borderRadius: isRound ? size / 2 : 3,
            backgroundColor: color
        }, style]}
        />
    )

    renderCustomSkeleton = ({
        left, right, style, children
    }) => (
        <View style={[styles.row, style]}>
            {left && <View style={styles.left}>{left}</View>}
            <View style={styles.full}>{children}</View>
            {right && <View style={styles.right}>{right}</View>}
        </View>
    )

    render() {
        const { type, ...prop } = this.props;
        const ObjRender = {
            [TYPE_SKELETON.line]: this.renderLineSkeleton({ ...prop }),
            [TYPE_SKELETON.media]: this.renderMediaSkeleton({ ...prop }),
            [TYPE_SKELETON.custom]: this.renderCustomSkeleton({ ...prop }),
        };
        if (ObjRender[type]) return ObjRender[type];
        return null;
    }
}

Skeleton.defaultProps = {
    duration: DURATION_DEFAULT,
    type: TYPE_SKELETON.line,
    size: SIZE_DEFAULT,
    width: WIDTH_DEFAULT,
    height: HEIGHT_DEFAULT,
    style: {},
    isRound: true,
    color: PRIMARY_COLOR,
    right: null,
    left: null,
    noMargin: false
};


Skeleton.propTypes = {
    type: PropTypes.oneOf([TYPE_SKELETON.line, TYPE_SKELETON.media, TYPE_SKELETON.custom]),
    size: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    isRound: PropTypes.bool,
    noMargin: PropTypes.bool,
    width: PropTypes.number,
    color: PropTypes.string,
    duration: PropTypes.number,
    right: PropTypes.any,
    left: PropTypes.any
};
