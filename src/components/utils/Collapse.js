import React, {forwardRef, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useMeasure} from "react-use";
import {useSpring, animated, config} from "react-spring";

import "./Collapse.scss";

const Collapse = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {open, ...rootProps} = curProps;

  const [state, setState] = useState({
    contentHeight: 0,
  });

  const [contentMeasureRef, contentMeasure] = useMeasure()

  const spring = useSpring({
    contentHeight: open ? state.contentHeight : 0,
    config: config.stiff,
  })

  useEffect(() => {
    setState(state => ({...state, contentHeight: contentMeasure.height}));
  }, [contentMeasure.height]);

  return (
    <animated.div
      ref={ref}
      className="collapse-container"
      style={{
        height: spring.contentHeight,
      }}
      {...rootProps}
    >
      <animated.div
        ref={contentMeasureRef}
        style={{
          transform: spring.contentHeight.to(x => `translateY(${-(state.contentHeight - x)}px)`),
        }}
      >
        {children}
      </animated.div>
    </animated.div>
  )
});

export default Collapse;
