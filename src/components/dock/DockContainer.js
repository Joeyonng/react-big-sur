import React, {useRef, useState} from "react";
import {useSpring, useTransition, to, animated} from "react-spring";

import * as style from "../../style";
import "./DockContainer.scss"

function DockContainer(props) {
  const {classNames, styles, children, ...curProps} = props;
  const {center, baseSize, largeSize, spreading, horizontal, magnifyDirection, debug, ...rootProps} = curProps;
  const baseSizeMargin = baseSize + baseSize / 16;
  const largeSizeMargin = largeSize + largeSize / 16;

  // Helper functions
  const getMagnifier = (cursor) => {
    const magnifier = cursor ? cursor - (center - getDockWidth(null) / 2) : null;
    return magnifier < 0 || magnifier >= getDockWidth(null) ? null : magnifier;
  }

  const sumDockItemSizes = (itemWidths = []) => {
    return itemWidths.reduce((sum, itemWidth) => sum + itemWidth, 0);
  }

  const getDockItemSize = (magnifier, index) => {
    if (magnifier === null) return baseSizeMargin;

    const itemCenter = getDockWidth(null, index) + baseSizeMargin / 2;
    const distance = Math.abs(magnifier - itemCenter);
    const distancePercent = Math.max(1 - (distance / (baseSizeMargin * spreading)), 0);
    return baseSizeMargin + (largeSizeMargin - baseSizeMargin) * distancePercent;
  }

  const getDockWidth = (magnifier, until=React.Children.count(children)) => {
    const dockItemSizes = React.Children.map(children, (item, index) => index < until ? getDockItemSize(magnifier, index) : 0);
    return sumDockItemSizes(dockItemSizes);
  }

  const getDockOffset = (magnifier, left) => {
    const nonMagnifiedDockWidth = getDockWidth(null);
    const endMagnifiedDockWidth = getDockWidth(0);
    const maxOffset = endMagnifiedDockWidth - nonMagnifiedDockWidth;
    if (magnifier === null) return maxOffset;

    const maxMagnifiedDockWidth = nonMagnifiedDockWidth + maxOffset * 2;
    const midMagnifiedDockWidth = getDockWidth(nonMagnifiedDockWidth / 2);
    const dockOffset = Math.abs(maxMagnifiedDockWidth - getDockWidth(magnifier));
    if (midMagnifiedDockWidth >= maxMagnifiedDockWidth) {
      const passMiddle = magnifier >= nonMagnifiedDockWidth / 2;
      return (left && !passMiddle) || (!left && passMiddle) ? dockOffset : 0;
    }

    const rightOffset = magnifier / nonMagnifiedDockWidth * dockOffset;
    // console.log("[getDockOffset]",
    //   "maxOffset", maxOffset,
    //   "nonMag", nonMagnifiedDockWidth,
    //   "endMag", endMagnifiedDockWidth,
    //   "midMag", midMagnifiedDockWidth,
    //   "maxMag", maxMagnifiedDockWidth,
    //   "rightOffset", rightOffset,
    // )
    return left ? dockOffset - rightOffset : rightOffset;
  }

  // React states and Spring states
  const [state, setState] = useState({
    cursor: null,
    hidden: Object.fromEntries(props.children.map(item => ([item.props.id, false])))
  });

  // useSpring for magnifying animation
  const spring = useSpring({
    ...Object.fromEntries(children.map((item, index) => [item.props.id, getDockItemSize(getMagnifier(state.cursor), index)])),
    offsetLeft: getDockOffset(getMagnifier(state.cursor), true),
    offsetRight: getDockOffset(getMagnifier(state.cursor), false),
    config: {tension: 500, clamp: true},
    // config: {duration: 1},
  });

  // useTransition for entering/leaving animation
  const springTransitions = useTransition(React.Children.map(children, child => child), {
    keys: item => item.props.id,
    from: () => ({scale: 0}),
    enter: () => ({scale: 1}),
    leave: () => ({scale: 0}),
    onRest: (results, control, item) => {
      setState(state => {
        let newHidden = {...state.hidden};
        newHidden[item.props.id] = true;
        return {...state, hidden: newHidden};
      })
    },
    config: {
      duration: 200,
    }
  });

  const dockRef = useRef();
  // if (dockRef.current) {
  //   const magnifier = getMagnifier(state.cursor);
  //   console.log(
  //     'total width', dockRef.current.offsetWidth,
  //     'magnifier', magnifier,
  //     'left offset', getDockOffset(magnifier, true),
  //     'right offset', getDockOffset(magnifier, false),
  //     'dock width', getDockWidth(magnifier)
  //   );
  // }
  return(
    <div
      ref={dockRef}
      className="dock-container"
      style={{
        ...[{
          flexDirection: "column",
        }, {
          flexDirection: "row",
        }][Number(horizontal)],
      }}
    >
      <animated.div
        style={{
          width: spring.offsetLeft,
          backgroundColor: style.rgba(style.red, debug ? 0.5 : 0),
        }}
      />
      <div
        className="dock-center"
        style={{
          borderRadius: baseSize / 3,
          ...[{
            width: baseSizeMargin + 8,
            flexDirection: "column",
          }, {
            height: baseSizeMargin + 8,
            flexDirection: "row",
          }][Number(horizontal)],
          ...{
            'center': {alignItems: 'center'},
            'primary': {alignItems: 'end'},
            'secondary': {alignItems: 'start'},
          }[magnifyDirection],
        }}
        onMouseMove={(event) => {
          setState({...state, cursor: horizontal ? event.pageX : event.pageY})
        }}
        onMouseLeave={(event) => {
          setState({...state, cursor: null});
        }}
      >
        {springTransitions((springTransition, item) => React.cloneElement(item, {
          size: to([spring[item.props.id], springTransition.scale], (size, scale) => size),
          baseSize,
          horizontal,
          magnifyDirection,
          debug,
          hidden: state.hidden[item.props.id],
          scale: springTransition.scale,
        }))}
      </div>
      <animated.div
        style={{
          width: spring.offsetRight,
          backgroundColor: style.rgba(style.red, debug ? 0.5 : 0),
        }}
      />
    </div>

  );
}

export default DockContainer;

/*
const getDockItemSize = (index, cursor) => {
  const sumDockItemSizes = (itemWidths = []) => {
    return itemWidths.reduce((sum, itemWidth) => sum + itemWidth, 0);
  }

  if (cursor === null) return baseSize;
  let defaultDockItemSizes = Array(React.Children.count(children)).fill(baseSize);
  let magnifier = state.cursor - (center - sumDockItemSizes(defaultDockItemSizes) / 2);

  let itemCenter = sumDockItemSizes(defaultDockItemSizes.slice(0, index)) + (baseSize / 2);
  let distance = Math.abs(itemCenter - magnifier);
  let distancePercent = Math.max(1 - (distance / (baseSize * spreading)), 0);
  return baseSize + (largeSize - baseSize) * distancePercent;
}

const getDockOffset = (left, cusor) => {
  const maxMagnifiedDockWidth = getDockWidth(getDockWidth(null) / 2)
  const dockOffset = Math.abs(maxMagnifiedDockWidth - getDockWidth(magnifier));
  if (magnifier === null) return dockOffset / 2;

  const passMiddle = magnifier >= getDockWidth(null) / 2;
  return (left && !passMiddle) || (!left && passMiddle) ? dockOffset : 0;
}
 */

/*
  const offsetRef = useRef(null);
  const numChildren = React.Children.count(children);
  const prevNumChildren = usePrevious(numChildren);
  useEffect(() => {
    if (dockRef.current) {
      const difference = baseSize * (numChildren - (prevNumChildren ? prevNumChildren : 0)) * 0.5;
      if (!offsetRef.current) {
        const rect = dockRef.current.getBoundingClientRect();
        offsetRef.current = (horizontal ? rect.x : rect.y) + getDockOffset(null, true) - difference;
      }
      offsetRef.current -= difference
      console.log('current', offsetRef.current, difference)
    }
  }, [numChildren])
 */

/*
          const rect = dockRef.current.getBoundingClientRect();
          const magnifier = (horizontal ? event.pageX - rect.x : event.pageY - rect.y) - getDockOffset(null, true);
          setState({...state, magnifier});
 */

/*
  const getDockOffset = (magnifier, left) => {
    const maxMagnifiedDockWidth = getDockWidth(getDockWidth(null) / 2);
    const dockOffset = Math.abs(maxMagnifiedDockWidth - getDockWidth(magnifier));
    if (magnifier === null) return dockOffset / 2;

    const passMiddle = magnifier >= getDockWidth(null) / 2;
    return (left && !passMiddle) || (!left && passMiddle) ? dockOffset : 0;
  }

 */

