import React, {useEffect, useRef, useState} from "react";

import DockContainer from "./DockContainer";

import * as style from "../../style";
import "./Dock.scss"

function Dock(props) {
  const {classNames, styles, children, ...curProps} = props;
  const {tileSize, largeSize, position, debug, ...rootProps} = curProps;
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
        baseSize={tileSize}
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

export default Dock;