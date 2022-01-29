import React, {forwardRef, useEffect, useRef, useState} from 'react';

import {Popover} from "../utils/Popover";

import * as style from "../../style";
import './MenuButton.scss';

const MenuButton = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {open, title, onMenuOpen, onMenuClose, ...rootProps} = curProps;

  const [state, setState] = useState({
    menuOpen: false,
  });

  const buttonPopoverRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (buttonPopoverRef.current && !buttonPopoverRef.current.contains(e.target)) {
        if (open === undefined) {
          setState({...state, menuOpen: false})
        }
        else {
          if (onMenuClose) onMenuClose();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const menuOpen = open === undefined ? state.menuOpen : open;
  return (
    <div
      ref={buttonPopoverRef}
      style={{
        ...styles['root'],
      }}
      {...rootProps}
    >
      <div
        ref={buttonRef}
        className="menu-button"
        style={{
          ...(menuOpen ? style.glassBackground() : {}),
          ...styles['button'],
        }}
        onClick={() => {
          if (open === undefined) {
            setState({...state, menuOpen: true})
          }
          else {
            if (onMenuOpen) onMenuOpen();
          }
        }}
      >
        {typeof title === "string" ? title :
          React.Children.map(title, (item) => (
            React.cloneElement(item, {
              className: "menu-button-content",
            })
          ))
        }
      </div>

      {children === undefined ? null :
        <Popover
          open={menuOpen}
          anchorRef={buttonRef}
          anchorDir="y"
        >
          {React.Children.map(children, (item) => (
            React.cloneElement(item, {
            })
          ))}
        </Popover>
      }
    </div>
  )
});

MenuButton.propTypes = {

}

MenuButton.defaultProps = {

}

export default MenuButton;