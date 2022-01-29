import React, {forwardRef} from 'react';
import PropTypes from "prop-types";

import List from "../lists/List";

import './Menu.scss';

const Menu = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {width, size, ...rootProps} = curProps;

  return (
    <div
      className="menu"
      {...rootProps}
    >
      <List
        size={size}
        width={width}
      >
        {children}
      </List>
    </div>
  )
});

Menu.propTypes = {
  /** The width of the menu. */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** The size of the menu items in the menu. */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
}

Menu.defaultProps = {
  width: "fit-content",
  size: "small",
}

export default Menu;