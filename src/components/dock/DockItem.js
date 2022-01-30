import React, {useState} from "react";
import {animated, useSpring} from "react-spring";

import Tooltip from "../tooltip/Tooltip";

import * as style from "../../style";
import "./DockItem.scss"

function DockItem(props) {
  const {classNames, styles, children, ...curProps} = props;
  const {size, baseSize, name, running, onClick, debug, ...rootProps} = curProps;

  const [state, setState] = useState({
    hover: false,
  });
  const [spring, springApi] = useSpring(() => ({
    y: 1,
    config: {duration: 1800},
  }));

  return (
    <div
      className="dock-item-container"
      onMouseEnter={() => {
        setState({...state, hover: true})
      }}
      onMouseLeave = {() => {
        setState({...state, hover: false})
      }}
    >
      <animated.div
        className="dock-item-tooltip"
        style={{
          display: state.hover ? "initial" : "none",
          transform: spring.y.to({
            range: [0, 0.166, 0.333, 0.499, 0.665, 0.831, 1],
            output: [0, -50, 0, -50, 0, -50, 0]
          }).to(y => `translateY(${y}px)`),
        }}
      >
        <Tooltip text={name}/>
      </animated.div>

      <animated.div
        className="dock-item"
        style={{
          width: size,
          height: size,
          margin: baseSize / 32,
          padding: baseSize / 32 * 3,
          border: debug ? style.divider : null,
          transform: spring.y.to({
            range: [0, 0.166, 0.333, 0.499, 0.665, 0.831, 1],
            output: [0, -50, 0, -50, 0, -50, 0]
          }).to(x => `translateY(${x}px)`),
        }}
        onClick={() => {
          if (!running) {
            springApi.start({from: {y: 0}, y: 1})
          }

          if (onClick) props.onClick()
        }}
      >
        {React.Children.map(props.children, (item) => (
          React.cloneElement(item, {
            className: "dock-item-icon",
            style: {
              border: debug ? style.divider : null,
            }
          })
        ))}
      </animated.div>

      {running ? <animated.div className="dock-item-indicator"/> : null}
    </div>
  );
}

export default DockItem;
