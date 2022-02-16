import React, {useState} from "react";
import {animated, useSpring, to} from "react-spring";

import Tooltip from "../tooltip/Tooltip";

import * as style from "../../style";
import "./DockItem.scss"

function DockItem(props) {
  const {classNames, styles, children, ...curProps} = props;
  const {name, running, onClick, animation, size, baseSize, horizontal, magnifyDirection, debug, ...rootProps} = curProps;
  const placement = horizontal ? (magnifyDirection === 'primary' ? 'top' : 'bottom') :
    (magnifyDirection === 'primary' ? 'left' : 'right');

  const [state, setState] = useState({
    hover: false,
  });
  const [spring, springApi] = useSpring(() => ({
    shift: 1,
    config: {duration: 1800},
  }));

  return (
    <animated.div
      className="dock-item-container"
      style={{
        width: to([props.size, props.scale], (size, scale) => size * scale),
        flexDirection: {top: "column", bottom: "column-reverse", left: "row", right: "row-reverse"}[placement],
        torchAction: "none",
      }}
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
          transform: !animation.open ? "none" : spring.shift.to({
            range: [0, 0.166, 0.333, 0.499, 0.665, 0.831, 1],
            output: [0, 50, 0, 50, 0, 50, 0]
          }).to(shift => `translate${horizontal ? 'Y' : 'X'}(${magnifyDirection === 'primary' ? -shift : shift}px)`),
        }}
      >
        <Tooltip
          text={name}
          placement={placement}
        />
      </animated.div>

      <animated.div
        className="dock-item"
        style={{
          // width: to([props.size, props.scale], (size, scale) => size * scale),
          width: "100%",
          height: to([props.size, props.scale], (size, scale) => size * scale),
          padding: baseSize / 32 * 4,
          transform: !animation.open ? "none" : spring.shift.to({
            range: [0, 0.166, 0.333, 0.499, 0.665, 0.831, 1],
            output: [0, 50, 0, 50, 0, 50, 0]
          }).to(shift => `translate${horizontal ? 'Y' : 'X'}(${magnifyDirection === 'primary' ? -shift : shift}px)`),
          border: debug ? "1px solid blue" : null,
        }}
        onClick={() => {
          if (!running) {
            springApi.start({from: {shift: 0}, shift: 1})
          }

          if (onClick) props.onClick()
        }}
      >
        {React.Children.map(children, (item) => (
          React.cloneElement(item, {
            className: "dock-item-icon",
            style: {
              width: "100%",
              height: "100%",
              objectFit: "contain",
              border: debug ? "1px solid yellow" : null,
            }
          })
        ))}
      </animated.div>

      <div
        className="dock-item-indicator"
        style={{
          visibility: running ? "visible" : "hidden",
        }}
      />
    </animated.div>
  );
}

export default DockItem;
/*
        <animated.div
          style={{
            // width: props.hidden ? "100%" : props.scale.to(scale => `${size * (-4 * scale + 5)}px`),
            // height: props.hidden ? "100%" : props.scale.to(scale => `${size * (-4 * scale + 5)}px`),
            // width: props.hidden ? "100%" : to([props.scale, props.size], (scale, size) => `${size * (-4 * scale + 5)}px`),
            // height: props.hidden ? "100%" : to([props.scale, props.size], (scale, size) => `${size * (-4 * scale + 5)}px`),
            // width: to([props.scale, props.size], (scale, size) => `${size * (-4 * scale + 5)}px`),
            // height: to([props.scale, props.size], (scale, size) => `${size * (-4 * scale + 5)}px`),
            width: size.to(size => size - 2 * baseSize / 32 * 4),
            height: size.to(size => size - 2 * baseSize / 32 * 4),
            transform: to([size, props.scale], (size, scale) =>
              `translate(0, ${(1 - scale) * -500}px) scale(${(-4 * scale + 5)})`
            )
          }}
        >
          {React.Children.map(children, (item) => (
            React.cloneElement(item, {
              className: "dock-item-icon",
              style: {
                width: "100%",
                height: "100%",
                objectFit: "contain",
                // border: debug ? "1px solid yellow" : null,
              }
            })
          ))}
        </animated.div>

 */
