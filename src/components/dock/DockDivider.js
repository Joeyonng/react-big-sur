import React, {useState} from "react";
import {animated, useSpring, to} from "react-spring";

import Tooltip from "../tooltip/Tooltip";

import * as style from "../../style";
import "./DockDivider.scss"

function DockDivider(props) {
  const {classNames, styles, children, ...curProps} = props;
  const {size, baseSize, horizontal, debug, ...rootProps} = curProps;

  return (
    <animated.div
      className="dock-divider-container"
      style={{
        ...[{
          width: "100%",
          height: size,
        }, {
          width: size,
          height: "100%",
        }][Number(horizontal)],
        padding: baseSize / 16 * 2 + 2,
      }}
    >
      <div
        className="dock-divider"
        style={{
          ...[{
            width: "100%",
            height: 1,
            borderTop: style.divider1,
          }, {
            width: 1,
            height: "100%",
            borderLeft: style.divider1,
          }][Number(horizontal)]
        }}
      />
    </animated.div>
  );
}

export default DockDivider;