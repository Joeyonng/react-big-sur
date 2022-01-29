import React, {forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {useWindowSize} from "react-use";

import * as style from "../../style";
import "./Popover.scss"


const Popover = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {anchorRef, anchorDir, open, pos, offset, ...rootProps} = curProps;

  const [state, setState] = useState({});
  const windowSize = useWindowSize();

  const onPopoverRefChange = useCallback(node => {
    if (ref) ref.current = node;

    let offsetX = 0;
    let offsetY = 0;
    if (offset) {
      offsetX = offset.x ? offset.x : 0;
      offsetY = offset.y ? offset.y : 0;
    }

    if (node) {
      const menuW = node.offsetWidth;
      const menuH = node.offsetHeight;

      if (anchorRef !== undefined) {
        const x0 = anchorRef.current.offsetLeft;
        const y0 = anchorRef.current.offsetTop;
        const x1 = x0 + anchorRef.current.offsetWidth;
        const y1 = y0 + anchorRef.current.offsetHeight;

        if (anchorDir === 'y') {
          if (windowSize.width < x0 + menuW) setState(state => ({...state, left: x1 - menuW}));
          else setState(state => ({...state, left: x0}));
          if (windowSize.height < y0 + menuH) setState(state => ({...state, top: y0 - menuH}));
          else setState(state => ({...state, top: y1}));
        }
        else {
          if (windowSize.width < x1 + menuW) setState(state => ({...state, left: x0 - menuW}));
          else setState(state => ({...state, left: x1}));
          if (windowSize.height < y0 + menuH) setState(state => ({...state, top: y1 - menuH - offsetY}));
          else setState(state => ({...state, top: y0 + offsetY}));
        }
      }
      else {
        setState(state => ({...state, left: pos.x, top: pos.y}))

        if (windowSize.width < pos.x + menuW) setState(state => ({...state, left: pos.x - menuW}));
        if (windowSize.height < pos.y + menuH) setState(state => ({...state, top: pos.y - menuH}));
      }
    }
  }, [anchorRef, anchorDir, pos, windowSize]);

  return (
    !open ? null :
      <div
        ref={onPopoverRefChange}
        className="popover"
        style={{
          left: state.left,
          top: state.top,
        }}
        {...rootProps}
      >
        {React.Children.map(children, (item) =>
          React.cloneElement(item)
        )}
      </div>
  )
});

Popover.propTypes = {

}

Popover.defaultProps = {
}

function AnchorPopover(props) {
  const anchorPopoverRef = useRef(null);
  const anchorRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (anchorPopoverRef.current && !anchorPopoverRef.current.contains(e.target)) {
        if (props.onClose !== undefined) props.onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })

  return (
    <div
      className="anchorPopover"
      ref={anchorPopoverRef}
    >
      <div
        ref={anchorRef}
        className="anchor"
        style={{
          ...props.anchorStyle,
        }}
      >
        {props.anchor}
      </div>

      <Popover
        open={props.open}
        anchorRef={anchorRef}
        anchorDir={props.anchorDir}
      >
        {props.children}
      </Popover>
    </div>
  )
}

export {Popover, AnchorPopover};
