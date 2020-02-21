import React, { Children, Component } from 'react';
import {
    Animated, Dimensions, PanResponder, StyleSheet, View, Platform
} from 'react-native';
import PropTypes from 'prop-types';
import Item from './Item';
/* eslint-disable react/jsx-props-no-spreading */
const SENSITIVITY_LOW = 'low';
const SENSITIVITY_HIGH = 'high';
const SENSITIVITY_NORMAL = 'normal';
const DECELERATION_FAST = 0.99;
const DECELERATION_NORMAL = 0.994;
const widthScreen = Dimensions.get('window').width;

const widthImg = widthScreen / 1.9;
const heightImg = widthImg * 1.5;

const clamp = (value, min, max) => {
    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
};
const convertSensitivity = (sensitivity) => {
    switch (sensitivity) {
    case SENSITIVITY_LOW:
        return 110;
    case SENSITIVITY_HIGH:
        return 40;
    case SENSITIVITY_NORMAL:
    default:
        return 60;
    }
};
const fixChildrenOrder = (props, selection) => {
    const source = Children.toArray(props.children);

    const children = [];

    // First the children before selection
    for (let i = 0; i < selection; i += 1) {
        children.push([i, source[i]]);
    }

    // Next the children after selection in reverse order
    for (let i = source.length - 1; i > selection; i -= 1) {
        children.push([i, source[i]]);
    }

    // Finally the selection at the top
    children.push([selection, source[selection]]);

    return children;
};

const styles = StyleSheet.create({
    containerView: {
        paddingTop: 20, backgroundColor: '#1a191c'
    },
    contentView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: widthScreen,
        height: heightImg
    },
});

class CoverFlow extends Component {
    constructor(props) {
        super(props);

        const sensitivity = convertSensitivity(props.sensitivity);
        this.scrollPos = props.initialSelection;
        const scrollX = new Animated.Value(props.initialSelection);
        this.state = {
            width: 0,
            sensitivity,
            scrollX,
            selection: props.initialSelection,
            children: fixChildrenOrder(props, props.initialSelection),
        };
        this.createScrollListener();
    }

    createScrollListener = () => {
        const { scrollX, sensitivity } = this.state;
        const { setEnableScrollView } = this.props;
        this.scrollListener = scrollX.addListener(this.onScroll);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            // Since we want to handle presses on individual items as well
            // Only start the pan responder when there is some movement
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 10,
            onPanResponderGrant: () => {
                scrollX.stopAnimation();
                scrollX.extractOffset();
                clearInterval(this.timer);
            },
            onPanResponderTerminationRequest: () => false,
            onPanResponderMove: (evt, gestureState) => {
                if (setEnableScrollView) {
                    setEnableScrollView(false);
                }
                scrollX.setValue(-(gestureState.dx / sensitivity));
                // scrollX.setValue(offset - (gestureState.dx / sensitivity));
            },
            onPanResponderRelease: this.release,
            onPanResponderTerminate: this.release
        });
    };

    release = (evt, gestureState) => {
        const { scrollX, sensitivity } = this.state;
        const { children, setEnableScrollView } = this.state;
        if (setEnableScrollView) {
            setEnableScrollView(true);
        }
        scrollX.flattenOffset();

        const count = Children.count(children);
        const selection = Math.round(this.scrollPos);

        // Damp out the scroll with certain deceleration
        if (selection > 0 && selection < count - 2 && Math.abs(gestureState.vx) > 1) {
            const velocity = -Math.sign(gestureState.vx)
                * (clamp(Math.abs(gestureState.vx), 3, 5) / sensitivity);
            const { deceleration } = this.props;

            Animated.decay(scrollX, {
                velocity,
                deceleration,
            }).start(({ finished }) => {
                // Only snap to finish if the animation was completed gracefully
                if (finished) {
                    this.snapToPosition();
                }
            });
        } else {
            this.snapToPosition();
        }
        // When release finger start again loop action
        this.startAgainLoop();
    };

    componentDidMount() {
        const { autoplay } = this.props;
        if (autoplay) this.loop();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { selection, scrollX } = this.state;
        // Check if the children property changes on addition / removal
        const sensitivity = convertSensitivity(nextProps.sensitivity);
        const nextSelection = clamp(selection, 0, Children.count(nextProps.children) - 1);
        const children = fixChildrenOrder(nextProps, nextSelection);

        if (selection !== nextSelection) {
            scrollX.setValue(nextSelection);
        }

        this.setState({
            selection: nextSelection,
            sensitivity,
            children,
        });
    }

    componentWillUnmount() {
        const { scrollX } = this.state;
        scrollX.removeListener(this.listenerId);
        if (this.timer) clearInterval(this.timer);
    }

    startAgainLoop = () => {
        const { autoplay, autoplayInterval } = this.props;
        if (!autoplay) return;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.autoPlay();
            clearInterval(this.timer);
            this.timer = setInterval(this.autoPlay, autoplayInterval);
        }, autoplayInterval / 2);
    };

    loop = () => {
        const { autoplayInterval } = this.props;
        this.timer = setInterval(this.autoPlay, autoplayInterval);
    };

    autoPlay = () => {
        const { children } = this.state;
        return this.scrollPos === children.length - 1 ? this.snapToPosition(0)
            : this.snapToPosition(this.scrollPos + 1);
    };

    onScroll = ({ value }) => {
        // Update the most recent value
        const { children, selection } = this.props;
        this.scrollPos = value;

        const count = children.length;

        const newSelection = clamp(Math.round(value), 0, count - 1);
        if (newSelection !== selection) {
            this.setState({
                selection: newSelection,
                children: fixChildrenOrder(this.props, newSelection),
            });
        }
    };

    onLayout = ({ nativeEvent }) => {
        this.setState({
            width: nativeEvent.layout.width,
        });
    };

    onSelect = (idx) => {
        // Check if the current selection is "exactly" the same
        const { onPress } = this.props;
        if (idx === Math.round(this.scrollPos)) {
            if (onPress) {
                onPress(idx);
            }
        } else {
            this.snapToPosition(idx);
        }
    };

    snapToPosition = (pos = this.scrollPos) => {
        const { scrollX, children } = this.state;
        const { onChange } = this.props;
        const count = children.length;

        const finalPos = clamp(Math.round(pos), 0, count - 1);
        if (finalPos !== this.scrollPos) {
            onChange(finalPos);

            Animated.spring(scrollX, {
                toValue: finalPos,
            }).start();
        }
    };

    renderItem = ([position, item]) => {
        const { scrollX, width } = this.state;
        if (!width) {
            return null;
        }

        const {
            rotation,
            midRotation,
            perspective,
            children,
            scaleDown,
            scaleFurther,
            spacing,
            wingSpan,
        } = this.props;
        const count = Children.count(children);

        return (
            <Item
                key={item.key}
                scroll={scrollX}
                position={position}
                count={count}
                spacing={spacing}
                wingSpan={wingSpan}
                rotation={rotation}
                midRotation={midRotation}
                perspective={perspective}
                scaleDown={scaleDown}
                scaleFurther={scaleFurther}
                onSelect={this.onSelect}
            >
                {item}
            </Item>
        );
    };

    renderContent() {
        const {
            contentStyle,
            rotation,
            midRotation,
            scaleDown,
            scaleFurther,
            perspective,
            spacing,
            wingSpan,
            ...props
        } = this.props;
        const { children } = this.state;
        return (
            <View
                {...props}
                {...this.panResponder.panHandlers}
                style={[styles.contentView, contentStyle]}
                onLayout={this.onLayout}
            >
                {children.map(this.renderItem)}
            </View>
        );
    }

    render() {
        const { containerStyle } = this.props;
        return (
            <View style={[styles.containerView, containerStyle]}>
                {this.renderContent()}
            </View>
        );
    }
}

export default CoverFlow;

CoverFlow.propTypes = {
    sensitivity: PropTypes.oneOf([SENSITIVITY_LOW, SENSITIVITY_NORMAL, SENSITIVITY_HIGH]),
    deceleration: PropTypes.oneOf([DECELERATION_NORMAL, DECELERATION_FAST]),
    initialSelection: PropTypes.number,
    spacing: PropTypes.number,
    wingSpan: PropTypes.number,
    autoplayInterval: PropTypes.number,
    rotation: PropTypes.number,
    midRotation: PropTypes.number,
    perspective: PropTypes.number,
    scaleDown: PropTypes.number,
    scaleFurther: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    onPress: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    autoplay: PropTypes.bool,
    contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string])
};

CoverFlow.defaultProps = {
    initialSelection: 0,
    contentStyle: {},
    containerStyle: {},
    sensitivity: SENSITIVITY_LOW,
    deceleration: DECELERATION_NORMAL,
    spacing: widthScreen - widthImg - (Platform.OS === 'ios' ? 10 : 25), // 100,
    wingSpan: 80,
    rotation: 65, // 50,
    midRotation: 40, // 50,
    perspective: 800,
    autoplayInterval: 3000,
    autoplay: true,
    scaleDown: 0.8,
    scaleFurther: 0.75,
    onPress: undefined,
};
