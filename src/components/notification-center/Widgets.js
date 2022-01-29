import React, {forwardRef} from 'react';
import PropTypes from "prop-types";

import * as style from "../../style";
import './Widgets.scss';

const Widgets = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {numRows, ...rootProps} = curProps;

  return(
    <div
      ref={ref}
      className="widgets"
      style={{
        gridTemplateRows: `repeat(${numRows}, ${style.widgetSmall})`,
      }}
      {...rootProps}
    >
      {children}
    </div>
  )
});

Widgets.propTypes = {
  /** The number of rows in the widget list. */
  numRows: PropTypes.number,
}

Widgets.defaultProps = {
  numRows: 5,
}

export default Widgets;
