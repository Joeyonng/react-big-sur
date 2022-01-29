import React, {forwardRef, useState} from "react";
import PropTypes from "prop-types";
import {X, Minus, Plus} from "react-feather"

import * as style from "../../style";
import "./TrafficLights.scss"

const TrafficLight = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {hover, focus, color, ...rootProps} = curProps;

  const [state, setState] = useState({
    active: false,
  })

  return (
    <button
      ref={ref}
      className="traffic-light"
      style={{
        backgroundColor: hover ? color : (focus ? color : style.grey2),
        filter: state.active ? style.filterDarken : undefined,
      }}
      onMouseUp={(e) => {
        setState({active: false});
        if (rootProps.onMouseUp) rootProps.onMouseUp(e);
      }}
      onMouseDown={(e) => {
        setState({active: true});
        if (rootProps.onMouseDown) rootProps.onMouseDown(e);
      }}
      {...rootProps}
    >
      {!hover ? null : React.cloneElement(children, {
        className: "traffic-light-icon"
      })}
    </button>
  )
});

const TrafficLights = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {focus, onCloseClick, onMinimizeClick, onMaximizeClick, ...rootProps} = curProps;

  const [state, setState] = useState({
    hover: false,
  });

  return (
    <div
      ref={ref}
      className="traffic-lights"
      onMouseEnter={() => {
        setState({...state, hover: true})
      }}
      onMouseLeave={() => {
        setState({...state, hover: false})
      }}
      {...rootProps}
    >
      <TrafficLight
        hover={state.hover}
        focus={focus}
        color={style.red}
        onClick={(e) => {
          if (onCloseClick !== undefined) onCloseClick(e);
        }}
      >
        <X/>
      </TrafficLight>
      <TrafficLight
        hover={state.hover}
        focus={focus}
        color={style.yellow}
        onClick={(e) => {
          if (onMinimizeClick !== undefined) onMinimizeClick(e);
        }}
      >
        <Minus/>
      </TrafficLight>
      <TrafficLight
        hover={state.hover}
        focus={focus}
        color={style.green}
        onClick={(e) => {
          if (onMaximizeClick	 !== undefined) onMaximizeClick(e);
        }}
      >
        <Plus/>
      </TrafficLight>
    </div>
  )
});

TrafficLights.propTypes = {
  /** Whether the window with the traffic lights is focused */
  focus: PropTypes.bool,
  /** Callback function fired when the close button is clicked. */
  onCloseClick: PropTypes.func,
  /** Callback function fired when the minimize button is clicked. */
  onMinimizeClick: PropTypes.func,
  /** Callback function fired when the maximize button is clicked. */
  onMaximizeClick: PropTypes.func,
}

TrafficLights.defaultProps = {
  focus: true,
}

export default TrafficLights;
