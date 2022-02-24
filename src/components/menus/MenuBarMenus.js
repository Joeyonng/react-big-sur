import React, {forwardRef, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {useEnsuredForwardedRef} from "react-use";

import Menu from "./Menu";
import MenuItem from "./MenuItem";
import Popover from "../popovers/Popover";

import * as style from "../../style";
import "./MenuBarMenus.scss";

const MenuBarMenus = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {...rootProps} = curProps;

  const menus = React.Children.toArray(children).filter((item) => item.type === Menu)

  const [state, setState] = useState({
    openIndex: -1,
  })

  const menuButtonGroupRef = useEnsuredForwardedRef(ref);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuButtonGroupRef.current && !menuButtonGroupRef.current.contains(event.target)) {
        setState({...state, openIndex: -1});
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })

  const buttonsRef = useRef([]);

  return (
    <div
      ref={menuButtonGroupRef}
      className="menu-button-group"
      style={{
      }}
    >
      {menus.map((menu, index) => (
        <div key={index}>
          <div
            ref={ref => buttonsRef.current.push(ref)}
            className="menu-button"
            style={{
              ...(state.openIndex === index ? style.glassBackground() : {}),
            }}
            onClick={() => {
              setState({...state, openIndex: index});
            }}
            onMouseOver={() => {
              if (state.openIndex !== -1) setState({...state, openIndex: index});
            }}
          >
            {typeof menu.props.label === "string" ? menu.props.label :
              React.Children.map(menu.props.label, (item) => (
                React.cloneElement(item, {
                  className: "menu-button-content",
                })
              ))
            }
          </div>

          <Popover
            open={state.openIndex === index}
            anchorEl={buttonsRef.current[index]}
            anchorOriginY='bottom'
          >
            {menu}
          </Popover>
        </div>
      ))}
    </div>
  )
});

MenuItem.propTypes = {
}

MenuItem.defaultProps = {
}

export default MenuBarMenus;