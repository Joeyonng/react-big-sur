import React, {useRef, useState} from "react";
import {useSpring, useTransition, to} from "react-spring";

import * as style from "../../style";
import "./DockContainer.scss"

function DockContainer(props) {
  const {classNames, styles, children, ...curProps} = props;
  const {centerX, itemSize, largeSize, spreading, direction, debug, ...rootProps} = curProps;

  const magnifyStyle = {
    'up': {alignItems: 'end'},
    'down': {alignItems: 'start'},
    'center': {alignItems: 'center'}
  }[direction]

  // Helper functions
  const sumDockItemSizes = (itemWidths = []) => {
    return itemWidths.reduce((sum, itemWidth) => sum + itemWidth, 0);
  }

  const getDockItemSize = (magnifierX, index) => {
    if (magnifierX === null) return itemSize;

    let defaultDockItemSizes = getDockItemSizes(null);
    let itemCenter = sumDockItemSizes(defaultDockItemSizes.slice(0, index)) + (itemSize / 2);
    let distance = Math.abs(magnifierX - itemCenter);
    let distancePercent = Math.max(1 - (distance / (itemSize * spreading)), 0);
    return itemSize + (largeSize - itemSize) * distancePercent;
  }

  const getDockItemSizes = (magnifierX) => {
    return React.Children.map(children, (item, index) => item ? getDockItemSize(magnifierX, index) : 0);
  }

  const getDockWidth = (magnifierX) => {
    return sumDockItemSizes(getDockItemSizes(magnifierX));
  }

  // React states and Spring states
  const [state, setState] = useState({
    pageX: null,
  });

  let magnifierX = state.pageX ? state.pageX - (centerX - getDockWidth(null) / 2) : null;
  magnifierX = magnifierX >= 0 && magnifierX < getDockWidth(null) ? magnifierX : null;
  const spring = useSpring({
    ...Object.fromEntries(children.map((item, index) => [item.props.id, getDockItemSize(magnifierX, index)])),
    config: {tension: 500, clamp: true},
  });

  const springTransitions = useTransition(React.Children.map(children, child => child), {
    keys: item => item.props.id,
    from: () => ({scale: 0}),
    enter: () => ({scale: 1}),
    leave: () => ({scale: 0}),
  });

  if (!centerX) return null;
  return(
    <div
      className="dock-container-test"
      style={{
        height: itemSize + itemSize / 16 + 8,
        border: debug ? style.divider : null,
        ...magnifyStyle,
      }}
      onMouseMove={(event) => {
        setState({...state, pageX: event.pageX});
      }}
      onMouseLeave={() => {
        setState({...state, pageX: null});
      }}
    >
      {springTransitions((springTransition, item) => {
        return React.cloneElement(item, {
          size: to([spring[item.props.id], springTransition.scale], (size, scale) => size * scale),
          baseSize: itemSize,
          debug: debug,
        })
      })}
    </div>

  );
}

export default DockContainer;

/*

    <div
      className="dock-container"
      style={{
        height: itemSize + itemSize / 16 + 8,
        border: debug ? style.divider : null,
        ...magnifyStyle,
      }}
      onMouseMove={(event) => {
        setState({...state, pageX: event.pageX});
      }}
      onMouseLeave={() => {
        setState({...state, pageX: null});
      }}
    >
      <div
        className="dock-background"
        style={{
          backgroundColor: debug ? "red" : null,
          height: itemSize + itemSize / 16 + 8,
          border: debug ? style.divider : null,
        }}
      />

      {springTransitions((springTransition, item) => {
        return React.cloneElement(item, {
          size: to([spring[item.props.id], springTransition.scale], (size, scale) => size * scale),
          baseSize: itemSize,
          debug: debug,
        })
      })}
    </div>
 */
