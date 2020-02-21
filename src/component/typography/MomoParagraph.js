/* eslint-disable react/jsx-props-no-spreading */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MomoText from './MomoText';


const MomoParagraph = ({
    rows, ellipsizeMode, children, ...restProps
}) => (
    <MomoText numberOfLines={rows} ellipsizeMode={ellipsizeMode} {...restProps}>
        {children === undefined ? '' : children}
    </MomoText>
);

MomoParagraph.defaultProps = {
    ellipsizeMode: 'tail',
    rows: 3
};

MomoParagraph.propTypes = {
    ellipsizeMode: PropTypes.string,
    rows: PropTypes.number,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.array,
        PropTypes.any,
    ]),
};

export default memo(MomoParagraph);
