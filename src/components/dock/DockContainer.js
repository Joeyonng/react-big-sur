import React, {useEffect, useRef, useState} from "react";
import {useSpring, useTransition, to, animated} from "react-spring";
import {create, all} from 'mathjs'

import {DockItem, DockDivider} from "../../index";

import * as style from "../../style";
import "./DockContainer.scss"
import {usePrevious} from "react-use";
import isEqual from "react-fast-compare";

const math = create(all, {
  matrix: 'Array',
});


function DockContainer(props) {
  const {classNames, styles, children, ...curProps} = props;
  const {center, baseSize, largeSize, spreading, horizontal, magnifyDirection, debug, ...rootProps} = curProps;

  const getPercents = (cursorRel, scales) => {
    const distances = math.abs(math.subtract(scales, cursorRel));
    const percents = math.subtract(1, math.divide(distances, baseSizeMargin * spreading));
    const percentsClip = percents.map(x => x < 0 ? 0 : x);

    return percentsClip;
  }

  const getDockItemWidths = (cursorRel) => {
    if (cursorRel === null) return itemSizes;

    const magPercents = math.multiply(getPercents(cursorRel, scales.current), magnifier);
    const itemPercents = ranges.current.map((range, index) =>
      index !== 0 ? magPercents.slice(ranges.current[index - 1], range) : magPercents.slice(0, range));
    const itemWidths = math.add(math.apply(itemPercents, 1, math.sum), itemSizes);

    return itemWidths
  }

  const getDockWidth = (cursorRel=null) => {
    return math.sum(getDockItemWidths(cursorRel));
  }

  const getDockOffset = (cursorRel, left) => {
    if (scales === null) return 0;

    const nonMagnifiedDockWidth = getDockWidth();
    const endMagnifiedDockWidth = getDockWidth(0);
    const maxOffset = endMagnifiedDockWidth - nonMagnifiedDockWidth;
    if (cursorRel === null) return maxOffset;

    const maxMagnifiedDockWidth = nonMagnifiedDockWidth + maxOffset * 2;
    const midMagnifiedDockWidth = getDockWidth(nonMagnifiedDockWidth / 2);
    const curDockOffset = math.abs(maxMagnifiedDockWidth - getDockWidth(cursorRel));
    const midDockOffset = math.abs(maxMagnifiedDockWidth - midMagnifiedDockWidth);

    const cursorMid = cursorRel / nonMagnifiedDockWidth - 0.5;
    const offset1 = (1 - math.abs(cursorMid) * 2) * midDockOffset / 2;
    const offset2 = curDockOffset - offset1;
    const dockOffset = (left && cursorMid < 0) || (!left && cursorMid >= 0) ? offset2 : offset1;

    return dockOffset
  }

  const getCursorRel = (cursor) => {
    const cursorRel = cursor ? cursor - (center - getDockWidth(null) / 2) : null;
    return cursorRel < 0 || cursorRel > getDockWidth(null) ? null : cursorRel;
  }

  const baseSizeMargin = baseSize + baseSize / 16;
  const itemSizes = React.Children.map(children, item => item.type === DockItem ? baseSizeMargin : baseSize * 0.5625);
  const prevItemSizes = usePrevious(itemSizes);

  const scales = useRef(null);
  const ranges = useRef(null);
  if (!isEqual(prevItemSizes, itemSizes)) {
    const cumItems = [];
    itemSizes.reduce((value, prevValue, index) => cumItems[index] = value + prevValue, 0);

    scales.current = math.range(0, getDockWidth(), 1);
    ranges.current = cumItems.map((x) => {
      const larger = math.compare(x, scales.current);
      return larger.includes(-1) ? larger.indexOf(-1) : scales.current.length;
    })
  }

  const largeSizeMargin = largeSize + largeSize / 16;
  const percents = getPercents(baseSizeMargin / 2, math.range(0, baseSizeMargin, 1));
  const magnifier = (largeSizeMargin - baseSizeMargin) / math.sum(percents);

  const [state, setState] = useState({
    cursor: null,
  });

  const dockRef = useRef();
  const dockCenterRef = useRef();

  // useSpring for magnifying animation
  const getSpringObject = (cursor, config) => {
    const cursorRel = getCursorRel(cursor);
    const dockItemSizes = getDockItemWidths(cursorRel);

    if (debug && dockRef.current && dockCenterRef.current) {
      console.log('[DockContainer DEBUG]',
        'total width', dockRef.current.offsetWidth,
        'center width', dockCenterRef.current.offsetWidth,
        'cursorRel', cursorRel,
        'left offset', getDockOffset(cursorRel, true),
        'right offset', getDockOffset(cursorRel, false),
        'dock width', getDockWidth(cursorRel),
      );
    }

    if (dockCenterRef.current) {
      let duration = math.abs(getDockWidth(cursorRel) - dockCenterRef.current.offsetWidth) / 3;
      config = {duration};
    }

    return {
      ...Object.assign(...React.Children.map(children, (item, index) => ({[item.props.id]: dockItemSizes[index]}))),
      offsetLeft: getDockOffset(cursorRel, true),
      offsetRight: getDockOffset(cursorRel, false),
      config: config,
    };
  }
  const config = {tension: 500, clamp: true};
  const spring = useSpring(getSpringObject(state.cursor, config));

  // useTransition for entering/leaving animation
  const springTransitions = useTransition(React.Children.map(children, item => item), {
    keys: item => item.props.id,
    from: () => ({scale: 0}),
    enter: () => ({scale: 1}),
    leave: () => ({scale: 0}),
    config,
  });

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
        ref={dockCenterRef}
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
          const cursor = horizontal ? event.pageX : event.pageY;
          setState({...state, cursor: cursor})
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
const getMagnifier = () => {
  const percents = getPercents(baseSizeMargin / 2, baseSizeMargin);
  const magnifier = (largeSizeMargin - baseSizeMargin) / math.sum(percents);

  return magnifier
}

const numItems = React.Children.count(children);
const getDockItemWidths = (cursorRel) => {
  if (cursorRel === null) return math.multiply(baseSizeMargin, math.ones(numItems));

  const percents = getPercents(cursorRel, getDockWidth());
  const itemPercents = math.reshape(math.multiply(percents, getMagnifier()), [numItems, -1]);
  const itemWidths = math.add(math.apply(itemPercents, 1, math.sum), baseSizeMargin);

  return itemWidths
}
 */

