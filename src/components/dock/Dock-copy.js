import React, {useRef, useState} from "react";
import {animated, useSpring, useTransition, to} from "react-spring";

import * as style from "../../style";
import "./Dock.scss"
import {useMouseHovered, usePrevious} from "react-use";

function DockContainer(props) {

  const {classNames, styles, children, ...curProps} = props;
  const {itemSize, spreading, magnification, magnifyDirection, debug, ...rootProps} = curProps;
  const magnifyStyle = {
    'up': {alignItems: 'end'},
    'down': {alignItems: 'start'},
    'center': {alignItems: 'center'}
  }[magnifyDirection]

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
    return itemSize + (itemSize * distancePercent * magnification);
  }

  const getDockItemSizes = (magnifierX) => {
    return React.Children.map(children, (item, index) => item ? getDockItemSize(magnifierX, index) : 0);
  }

  const getDockWidth = (magnifierX) => {
    return sumDockItemSizes(getDockItemSizes(magnifierX));
  }

  const getDockOffset = (magnifierX, left) => {
    // The dock's width will be maximum when the mouse is magnifying the center of it.
    const maxMagnifiedDockWidth = getDockWidth(getDockWidth(null) / 2)
    const dockOffset = Math.abs(maxMagnifiedDockWidth - getDockWidth(magnifierX));
    if (magnifierX === null) return dockOffset / 2;

    const passMiddle = magnifierX >= getDockWidth(null) / 2;
    return (left && !passMiddle) || (!left && passMiddle) ? dockOffset : 0;
  }

  // React states and Spring states
  const [state, setState] = useState({
    magnifierX: null,
  });

  console.log(state.magnifierX);
  const spring = useSpring({
    ...Object.fromEntries(children.map((item, index) => [item.props.id, getDockItemSize(state.magnifierX, index)])),
    offsetLeft: getDockOffset(state.magnifierX, true),
    offsetRight: getDockOffset(state.magnifierX, false),
    config: {tension: 500, clamp: true},
  });

  const springTransitions = useTransition(React.Children.map(children, child => child), {
    keys: item => item.props.id,
    from: () => ({scale: 0}),
    enter: () => ({scale: 1}),
    leave: () => ({scale: 0}),
  });

  const dockRef = useRef();
  const centerRef = useRef();
  const position = useMouseHovered(centerRef, {bound: true, whenHovered: false});

  // noinspection ConstantConditionalExpressionJS
  return (
    <div
      ref={dockRef}
      className="dock-container"
    >
      <animated.div
        className="dock-offset"
        style={{
          width: spring.offsetLeft,
          height: itemSize,
          opacity: debug ? 0.5 : 0,
          ...magnifyStyle,
        }}
      />
      <div
        ref={centerRef}
        className="dock-center"
        style={{
          // display: "grid";
          // gridTemplateColumns: React.Children.map(children, () => "auto").join(" "),
          display: "flex",

          ...magnifyStyle,
        }}
        onMouseMove={(event) => {
          let magnifierX = event.pageX - dockRef.current.offsetLeft - getDockOffset(null, true);
          setState({...state, magnifierX: magnifierX >= 0 && magnifierX < getDockWidth(null) ? magnifierX : null, pageX: event.pageX});
        }}
        onMouseLeave={() => {
          setState({...state, magnifierX: null});
        }}
      >
        <div
          className="dock-background"
          style={{
            height: itemSize,
            border: debug ? style.divider : null,
            ...magnifyStyle,
          }}
        />

        {[true, false][1] ?
          React.Children.map(props.children, (item, index) => (
            !React.isValidElement(item) ? null :
              React.cloneElement(item, {
                size: spring[item.props.id],
                debug: debug,
              })
          )) :
          springTransitions((springTransition, item) => {
            return React.cloneElement(item, {
              size: to([spring[item.props.id], springTransition.scale], (size, scale) => size * scale),
              debug: debug,
            })
          })
        }
      </div>
      <animated.div
        className="dock-offset"
        style={{
          width: spring.offsetRight,
          height: itemSize,
          opacity: debug ? 0.5 : 0,
          ...magnifyStyle,
        }}
      />
    </div>
  );
}

export default DockContainer;