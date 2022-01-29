import React, {forwardRef, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {useSpring, animated} from "react-spring";

import * as style from "../../style";
import './NotificationCenter.scss';

const NotificationCenter = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {open, visibleHeight, fadingHeight, ...rootProps} = curProps;

  const visibleHeightStr = style.addPx(visibleHeight);
  const fadingHeightStr = style.addPx(fadingHeight);

  const notificationCenterRef = useRef(null);
  const spring = useSpring({
    right: open ? 0 : style.rmPx(style.widgetsWidth),
    onRest: {
      right: () => {
        if (!open && notificationCenterRef.current) {
          // Scroll widgets back top when hidden
          notificationCenterRef.current.scrollTop = 0;
          // Avoid scrolling widgets when hidden.
          // Disabling scrolling has to be after reset scrolling position, or the reset won't work.
          notificationCenterRef.current.style.overflow = "visible";
        }
      },
    }
  });

  return(
    <div
      ref={ref}
      className="notification-center-container"
      style={{
        height: visibleHeightStr,
      }}
      {...rootProps}
    >
      <animated.div
        className="notification-center-background"
        style={{
          right: spring.right.to(x => `${-x}px`),
        }}
      />

      <div
        ref={notificationCenterRef}
        className="notification-center"
        style={{
          // Allow scrolling widgets when visible
          overflow: open ? "scroll" : undefined,
          // Enable click through widgets when hidden
          pointerEvents: open ? "auto" : "none",
          // Top/bottom content fading
          WebkitMask: `linear-gradient(to bottom, ` +
            `${style.rgba(style.white, 0)} 0, ` +
            `${style.rgba(style.white, 1)} ${fadingHeightStr}, ` +
            `${style.rgba(style.white, 1)} calc(${visibleHeightStr} - ${fadingHeightStr}), ` +
            `${style.rgba(style.white, 0)} ${visibleHeightStr})`,
        }}
      >
        <div className="notifications-container">
          {props.notifications}
        </div>

        <animated.div
          className="widgets-container"
          style={{
            right: spring.right.to(x => `${-x}px`)
          }}
        >
          {children}
        </animated.div>

      </div>
    </div>
  )
});

NotificationCenter.propTypes = {
  /** The height of the visible part of the widget list. */
  visibleHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** The height of the fading parts at the start and end of the widget list. */
  fadingHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

NotificationCenter.defaultProps = {
  visibleHeight: '500px',
  fadingHeight: '16px',
}

export default NotificationCenter;
