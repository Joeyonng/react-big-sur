import React, {forwardRef, useEffect, useRef, useState} from "react";
import {useEnsuredForwardedRef} from "react-use";

import * as style from "../../style";
import Menu from "./Menu";
import Popover from "../utils/Popover";

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
            {typeof menu.props.title === "string" ? menu.props.title :
              React.Children.map(menu.props.title, (item) => (
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

export default MenuBarMenus;