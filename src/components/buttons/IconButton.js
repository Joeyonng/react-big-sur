import React, {forwardRef, useState} from "react";
import PropTypes from "prop-types";

import "./IconButton.scss"
import * as style from "../../style";

const SIZES = {
  'large': {
    width: style.height7,
    height: style.height7,
    fontSize: style.font4,
    lineHeight: style.icon1,
  },
  'medium': {
    width: style.height10,
    height: style.height10,
    fontSize: style.font4,
    lineHeight: style.icon1,
  },
  'small': {
    width: style.height12,
    height: style.height12,
    fontSize: style.font7,
    lineHeight: style.icon2,
  },
};

const VARIANTS = {
  'primary': {
    color: style.white,
    backgroundColor: style.blue,
    boxShadow: undefined,
  },
  'secondary': {
    color: style.black,
    backgroundColor: style.white,
    boxShadow: style.shadow4,
  },
  'subdued': {
    color: style.grey1,
    backgroundColor: style.white,
    boxShadow: style.shadow4,
  },
  'disabled': {
    color: style.grey1,
    backgroundColor: style.grey3,
    boxShadow: undefined,
  },
}

const IconButton = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {size, variant, disabled, ...rootProps} = curProps;

  const [state, setState] = useState({
    active: false,
  })

  return (
    <div
      ref={ref}
      className="icon-button"
      style={{
        width: SIZES[size].width,
        height: SIZES[size].height,
        backgroundColor: state.active && variant === 'secondary' ? style.blue : VARIANTS[variant].backgroundColor,
        boxShadow: VARIANTS[variant].boxShadow,
        color: state.active && variant === 'secondary' ? style.white : VARIANTS[variant].color,
        filter: state.active && variant !== 'secondary' ? style.filterDarken : undefined,
        fontSize: SIZES[size].fontSize,
        lineHeight: SIZES[size].lineHeight,
        pointerEvents: disabled ? "none" : "auto",
      }}
      onMouseUp={(e) => {
        if (!disabled) setState({...state, active: false})
        if (rootProps.onMouseUp) rootProps.onMouseUp(e);
      }}
      onMouseDown={(e) => {
        if (!disabled) setState({...state, active: true})
        if (rootProps.onMouseDown) rootProps.onMouseDown(e);
      }}
      {...rootProps}
    >
      {typeof children === "string" ? children :
        React.Children.map(children, (item) => (
          React.cloneElement(item, {
            style: {
              width: SIZES[size].lineHeight,
              height: SIZES[size].lineHeight,
            }
          })
        ))
      }
    </div>
  )
});

IconButton.propTypes = {
  /** The size of the button. */
  size: PropTypes.oneOf(['large', 'small']),
  /** Different variance of the button style */
  variant: PropTypes.oneOf(['primary', 'secondary', 'subdued', 'disabled']),
  /** Whether the button is disabled. */
  disabled: PropTypes.bool,
}

IconButton.defaultProps = {
  size: "large",
  variant: 'primary',
  disabled: false,
}

export default IconButton;