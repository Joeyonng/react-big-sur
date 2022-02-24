import React, {forwardRef, useRef, useState} from "react";
import PropTypes from "prop-types";

import ListItem from "../lists/ListItem";
import Popover from "../popovers/Popover";

import * as style from "../../style";

const MenuItem = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {size, primary, icon, tail, ...rootProps} = curProps;

  const [state, setState] = useState({
    menuOpen: false,
    hover: false,
  });

  const listItemRef = useRef(null);

  return (
    <div
      ref={ref}
      onMouseLeave={() => {
        setState({...state, hover: false, menuOpen: false})
        if (rootProps.onMouseLeave) rootProps.onMouseLeave();
      }}
      {...rootProps}
    >
      <ListItem
        ref={listItemRef}
        size={size}
        variant={state.hover ? "primary" : (children && state.menuOpen) ? "secondary" : "normal"}
        primary={primary}
        icon={icon}
        tail={tail}
        onMouseEnter={() => {
          setState({...state, hover: true, menuOpen: true})
        }}
        onMouseLeave={() => {
          setState({...state, hover: false})
        }}
      />

      <Popover
        open={state.menuOpen}
        anchorEl={listItemRef.current}
        anchorOriginX='right'
        anchorOriginY='top'
        offset={{
          top: -style.rmPx(style.space7)
        }}
      >
        {children}
      </Popover>
    </div>
  )
});

MenuItem.propTypes = {
  /** Size of the menu item */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /** Primary text of the menu item. */
  primary: PropTypes.string,
  /** Front Icon of the menu item */
  icon: PropTypes.node,
  /** Tail of the menu item */
  tail: PropTypes.node,
}

MenuItem.defaultProps = {
  size: 'small',
}

export default MenuItem;