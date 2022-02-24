import React, {forwardRef, useCallback, useState} from "react";
import PropTypes from "prop-types";
import {useWindowSize} from "react-use";

import * as style from "../../style";
import "./Popover.scss"


const Popover = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {open, pos, anchorEl, anchorOriginX, anchorOriginY, popoverX, popoverY, offset, ...rootProps} = curProps;

  const [state, setState] = useState({
    left: 0,
    top: 0,
  });
  const windowSize = useWindowSize();

  const onPopoverRefChange = useCallback(node => {
    if (ref) ref.current = node;

    const offsetX = offset.left ? offset.left : 0;
    const offsetY = offset.top ? offset.top : 0;
    if (node) {
      const menuW = node.offsetWidth;
      const menuH = node.offsetHeight;

      let x = 0, y = 0, x0 = 0, y0 = 0, x1 = 0, y1 = 0;

      if (anchorEl) {
        x0 = anchorEl.offsetLeft;
        y0 = anchorEl.offsetTop;
        x1 = x0 + anchorEl.offsetWidth;
        y1 = y0 + anchorEl.offsetHeight;
      }
      else if (pos) {
        x0 = pos.left;
        y0 = pos.top;
        x1 = x0;
        y1 = y0;
      }

      if (anchorOriginX === 'left') x = x0;
      else if (anchorOriginX === 'right') x = x1;
      else x = (x0 + x1) / 2;

      if (anchorOriginY === 'top') y = y0;
      else if (anchorOriginY === 'bottom') y = y1;
      else y = (y0 + y1) / 2;

      if (popoverX === 'right') x = x - menuW;
      else if (popoverX === 'middle') x = x - menuW / 2

      if (popoverY === 'bottom') y = y - menuH;
      else if (popoverY === 'middle') y = y - menuH / 2

      setState({...state, left: x + offsetX, top: y + offsetY})

      // if (anchorEl) {
      //   const x0 = anchorEl.offsetLeft;
      //   const y0 = anchorEl.offsetTop;
      //   const x1 = x0 + anchorEl.offsetWidth;
      //   const y1 = y0 + anchorEl.offsetHeight;
      //
      //   if (anchorOrigin === 'y') {
      //     if (windowSize.width < x0 + menuW) setState(state => ({...state, left: x1 - menuW + offsetX}));
      //     else setState(state => ({...state, left: x0 + offsetX}));
      //     if (windowSize.height < y0 + menuH) setState(state => ({...state, top: y0 - menuH + offsetY}));
      //     else setState(state => ({...state, top: y1 + offsetY}));
      //   }
      //   else {
      //     if (windowSize.width < x1 + menuW) setState(state => ({...state, left: x0 - menuW + offsetX}));
      //     else setState(state => ({...state, left: x1 + offsetX}));
      //     if (windowSize.height < y0 + menuH) setState(state => ({...state, top: y1 - menuH - offsetY}));
      //     else setState(state => ({...state, top: y0 + offsetY}));
      //   }
      // }
      // else if (pos) {
      //   setState(state => ({...state,
      //     left: (pos.left + menuW > windowSize.width ? pos.left - menuW : pos.x) + offsetX,
      //     top: (pos.top + menuH > windowSize.height ? pos.top - menuH : pos.y) + offsetY,
      //   }))
      // }
    }
  }, [pos, anchorEl, anchorOriginX, anchorOriginY, popoverX, popoverY, windowSize]);

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
  /** If True, the Popover is shown. */
  open: PropTypes.bool,
  /** The position of the Popover with respect to the parent element. */
  pos: PropTypes.shape({left: PropTypes.number, top: PropTypes.number}),
  /** An HTML element. It's used to set the position of the popover. It has to share the same parent as the Popover. */
  anchorEl: PropTypes.instanceOf(Element),
  /** The x-axis point on the anchor where the popover's anchorEl will attach to. */
  anchorOriginX: PropTypes.oneOf(['left', 'middle', 'right']),
  /** The y-axis point on the anchor where the popover's anchorEl will attach to. */
  anchorOriginY: PropTypes.oneOf(['top', 'middle', 'bottom']),
  /** The x-axis point on the popover which will attach to the anchor's origin. */
  popoverX: PropTypes.oneOf(['left', 'middle', 'right']),
  /** The y-axis point on the popover which will attach to the anchor's origin. */
  popoverY: PropTypes.oneOf(['top', 'middle', 'bottom']),
  /** The offset adjustment to the position of the popover. */
  offset: PropTypes.shape({left: PropTypes.number, top: PropTypes.number}),
}

Popover.defaultProps = {
  open: false,
  anchorOriginX: 'left',
  anchorOriginY: 'top',
  popoverX: 'left',
  popoverY: 'top',
  offset: {left: 0, top: 0},
}

export default Popover;
