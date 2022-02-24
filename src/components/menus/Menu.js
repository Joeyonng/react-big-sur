import React, {forwardRef} from 'react';
import PropTypes from "prop-types";

import List from "../lists/List";
import MenuItem from "./MenuItem";
import MenuSelection from "./MenuSelection";

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
        width={width}
      >
        {React.Children.map(children, item => {
          if (item.type !== MenuItem && item.type !== MenuSelection) return item;

          let newProps = Object.assign({}, item.props);
          if (size) newProps['size'] = size;

          return React.cloneElement(item, newProps)
        })}
      </List>
    </div>
  )
});

Menu.propTypes = {
  /** The width of the menu. */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** The size of the menu items in the menu. */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /** The label of the menu to be appeared in MenuBarMenus. */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
}

Menu.defaultProps = {
  width: "fit-content",
  size: "small",
}

export default Menu;