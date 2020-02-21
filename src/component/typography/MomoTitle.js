/* eslint-disable react/jsx-props-no-spreading */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MomoText from './MomoText';

const LEVEL = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4'
};
const MomoTitle = ({
    children, level, ...restProps
}) => (
    <MomoText size={LEVEL[level]} {...restProps}>
        {children === undefined ? '' : children}
    </MomoText>
);

MomoTitle.defaultProps = {
    level: 1
};

MomoTitle.propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4]),
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.array,
        PropTypes.any,
    ]),
};

export default memo(MomoTitle);
