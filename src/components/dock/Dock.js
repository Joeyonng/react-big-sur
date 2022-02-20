import React, {useEffect, useRef, useState} from "react";

import DockContainer from "./DockContainer";

import * as style from "../../style";
import "./Dock.scss"
import PropTypes from "prop-types";

function Dock(props) {
  const {classNames, styles, children, ...curProps} = props;
  const {baseSize, largeSize, position, debug, ...rootProps} = curProps;
  const horizontal = ['top', 'bottom'].includes(position);

  const [state, setState] = useState({
    center: null,
  });

  const ref = useRef();
  useEffect(() => {
    if (ref) {
      const rect = ref.current.getBoundingClientRect();
      setState(state => ({
        ...state,
        center: horizontal ? rect.x + rect.width / 2 : rect.y + rect.height / 2,
      }));
    }
  }, [ref]);

  return (
    <div
      ref={ref}
      className="dock"
      style={{
        ...[{
          height: "100%",
          flexDirection: "column",
        }, {
          width: "100%",
          flexDirection: "row",
        }][Number(horizontal)],
        [position]: 0,
      }}
    >
      <DockContainer
        center={state.center}
        baseSize={baseSize}
        largeSize={largeSize}
        spreading={3}
        horizontal={horizontal}
        magnifyDirection={{"top": "secondary", "bottom": "primary", "left": "secondary", "right": "primary"}[position]}
        debug={debug}
      >
        {children}
      </DockContainer>
    </div>
  );
}

DockContainer.propTypes = {
  /** The unmagnified size of the item. Suggested ranges: [16, 128]. */
  baseSize: PropTypes.number,
  /** The magnified size of the item. Suggested ranges: [16, 128]. */
  largeSize: PropTypes.number,
  /** The position of the dock. */
  position: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
  /** Debug mode. */
  debug: PropTypes.bool,
}

DockContainer.defaultProps = {
  baseSize: 64,
  largeSize: 128,
  position: 'bottom',
  debug: false,
}

export default Dock;