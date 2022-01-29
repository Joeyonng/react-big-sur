import React, {forwardRef, useState} from "react";
import PropTypes from "prop-types";

import "./ToolbarItem.scss"
import * as style from "../../style";

const VARIANTS = {
  'focused': {
    color: style.black,
    boxShadow: style.shadow4,
    backgroundColor: style.white,
  },
  'selected': {
    color: style.grey1,
    boxShadow: undefined,
    backgroundColor: style.grey2,
  },
  'deselected': {
    color: style.grey1,
    boxShadow: undefined,
    backgroundColor: style.transparent,
  },
  'disabled': {
    color: style.grey2,
    boxShadow: undefined,
    backgroundColor: style.transparent,
  }
}

const ToolbarItem = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {size, variant, disabled, ...rootProps} = curProps;

  const [state, setState] = useState({
    hover: false,
    active: false,
  })

  return (
    <div
      ref={ref}
      className="toolbar-item"
      style={{
        backgroundColor: disabled ? style.transparent : (variant === 'deselected' ?
          style.rgba(style.grey3, state.hover ? 1 : 0) : VARIANTS[variant].backgroundColor),
        boxShadow: VARIANTS[variant].boxShadow,
        color: VARIANTS[variant].color,
        filter: disabled ? undefined : (state.active ? style.filterDarken : undefined),
      }}
      onMouseUp={(e) => {
        if (!disabled) setState({...state, active: false});
        if (rootProps.onMouseUp) rootProps.onMouseUp(e);
      }}
      onMouseDown={(e) => {
        if (!disabled) setState({...state, active: true});
        if (rootProps.onMouseDown) rootProps.onMouseDown(e);
      }}
      onMouseEnter={(e) => {
        if (!disabled) setState({...state, hover: true});
        if (rootProps.onMouseEnter) rootProps.onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        if (!disabled) setState({...state, hover: false});
        if (rootProps.onMouseLeave) rootProps.onMouseLeave(e);
      }}
      {...rootProps}
    >
      {typeof children === "string" ? children :
        React.Children.map(children, (item) => (
          React.cloneElement(item, {})
        ))
      }
    </div>
  )
});

ToolbarItem.propTypes = {
  /** Different variance of the button style */
  variant: PropTypes.oneOf(['focused', 'selected', 'deselected', 'disabled']),
  /** Whether the button is disabled. */
  disabled: PropTypes.bool,
}

export default ToolbarItem;