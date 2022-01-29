import React, {forwardRef} from 'react';
import PropTypes from "prop-types";

import './Widget.scss';

const SIZES = {
  large: 'auto / auto / span 2 / span 2',
  medium: 'auto / auto / span 1 / span 2',
  small: 'auto / auto / span 1 / span 1',
}

const Widget = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {size, ...rootProps} = curProps;

  return (
    <div
      ref={ref}
      className="widget"
      style={{
        gridArea: SIZES[size],
      }}
      {...rootProps}
    >
      {children}
    </div>
  )
});

Widget.propTypes = {
  /** The size of the widget. Both 'small' and 'medium' take 1 row, while 'large' takes 2 rows. */
  size: PropTypes.string,
}

Widget.defaultProps = {
  size: 'medium',
}

export default Widget;