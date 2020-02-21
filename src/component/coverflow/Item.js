import React, { Component } from 'react';
import {
    Animated, StyleSheet, TouchableWithoutFeedback, View
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class Item extends Component {
    // static childContextTypes = {
    //   animatedPosition: PropTypes.instanceOf(Animated.Interpolation),
    // };
    //
    // getChildContext() {
    //   const { scroll, position } = this.props;
    //   return {
    //     animatedPosition: scroll.interpolate({
    //       inputRange: [position - 2, position - 1, position, position + 1, position + 2],
    //       outputRange: [-1, -1, 0, 1, 1],
    //     }),
    //   };
    // }

    shouldComponentUpdate(nextProps) {
        const {
            position, rotation, midRotation, perspective, scaleDown, scaleFurther, wingSpan, spacing, children
        } = this.props;
        // Only if the props are different
        return nextProps.position !== position
            || nextProps.rotation !== rotation
            || nextProps.midRotation !== midRotation
            || nextProps.perspective !== perspective
            || nextProps.scaleDown !== scaleDown
            || nextProps.scaleFurther !== scaleFurther
            || nextProps.wingSpan !== wingSpan
            || nextProps.spacing !== spacing
            || nextProps.children !== children;
    }

    render() {
        const {
            scroll,
            position,
            rotation,
            midRotation,
            perspective,
            scaleDown,
            scaleFurther,
            wingSpan,
            spacing,
            onSelect,
            children
        } = this.props;

        const style = {
            transform: [
                { perspective },
                {
                    translateX: scroll.interpolate({
                        inputRange: [position - 2, position - 1, position, position + 1, position + 2],
                        outputRange: [spacing + wingSpan, spacing, 0, -spacing, -spacing - wingSpan],
                    }),
                },
                {
                    scale: scroll.interpolate({
                        inputRange: [position - 2, position - 1, position, position + 1, position + 2],
                        outputRange: [scaleFurther, scaleDown, 1, scaleDown, scaleFurther],
                    }),
                },
                {
                    rotateY: scroll.interpolate({
                        inputRange: [
                            position - 2,
                            position - 1,
                            position - 0.5,
                            position,
                            position + 0.5,
                            position + 1,
                            position + 2,
                        ],
                        outputRange: [
                            `-${rotation}deg`,
                            `-${rotation}deg`,
                            `-${midRotation}deg`,
                            '0deg',
                            `${midRotation}deg`,
                            `${rotation}deg`,
                            `${rotation}deg`,
                        ],
                    }),
                },
            ],
        };

        return (
            <View pointerEvents="box-none" style={styles.container}>
                <TouchableWithoutFeedback onPress={() => onSelect(position)}>
                    <Animated.View style={style}>
                        {children}
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

Item.propTypes = {
    scroll: PropTypes.instanceOf(Animated.Value).isRequired,
    position: PropTypes.number.isRequired,
    children: PropTypes.element.isRequired,
    wingSpan: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
    rotation: PropTypes.number.isRequired,
    midRotation: PropTypes.number.isRequired,
    perspective: PropTypes.number.isRequired,
    scaleDown: PropTypes.number.isRequired,
    scaleFurther: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default Item;
