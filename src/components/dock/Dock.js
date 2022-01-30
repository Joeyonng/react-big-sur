import React, {useEffect, useRef, useState} from "react";

import DockContainer from "./DockContainer";

import * as style from "../../style";
import "./Dock.scss"

function Dock(props) {
  const {classNames, styles, children, ...curProps} = props;
  const {tileSize, largeSize, orientation, debug, ...rootProps} = curProps;
  const ref = useRef();

  const [state, setState] = useState({
    centerX: null,
  });

  useEffect(() => {
    if (ref) {
      setState(state => ({
        ...state,
        centerX: ref.current.getBoundingClientRect().x + ref.current.getBoundingClientRect().width / 2
      }));
    }
  }, [ref]);

  return (
    <div
      ref={ref}
      className="dock"
      style={{
        ...{top: {top: 0}, bottom: {bottom: 0}}[orientation],
      }}
    >
      <DockContainer
        centerX={state.centerX}
        itemSize={tileSize}
        largeSize={largeSize}
        spreading={3.25}
        direction={{"top": "down", "bottom": "up"}[orientation]}
        debug={debug}
      >
        {children}
      </DockContainer>
    </div>
  );
}

export default Dock;