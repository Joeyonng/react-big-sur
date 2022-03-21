import React, {forwardRef} from 'react';
import PropTypes from "prop-types";
import {animated, useTransition} from "react-spring";

import './Notifications.scss';
import * as style from "../../style";

const Notifications = forwardRef(function Notifications(props, ref) {
  const {classNames, styles, children, ...curProps} = props;
  const {horizontal, vertical, ...rootProps} = curProps;

  // Store the notification + margin component ref for measuring height
  const notificationsMap = new WeakMap();
  const transitions = useTransition(React.Children.toArray(children).filter(Boolean).map(child => child), {
    keys: item => item.props.id,
    from: {x: `${horizontal === "left" ? '' : '-'}${style.notificationWidth}`, y: "0px"},
    enter: item => async (next) => {
      const ref = notificationsMap.get(item);
      await next({x: "0px", y: `${ref.offsetHeight}px`})
    },
    leave: () => {
      return {x: `${horizontal === "left" ? '' : '-'}${style.notificationWidth}`, y: "0px"};
    },
    expires: 10,
  });

  return (
    <div
      {...rootProps}
      ref={ref}
      className="notifications"
      style={{
        flexDirection: vertical === "top" ? "column-reverse" : "column",
      }}
    >
      {transitions((spring, item) => {
        return (
          <animated.div
            className="notification-container"
            style={{
              height: spring.y,
              transform: spring.x.to(x => `translateX(${x})`),
            }}
          >
            <div ref={(ref) => ref && notificationsMap.set(item, ref)}>
              {React.cloneElement(item, {})}
              <div className="notification-margin"/>
            </div>
          </animated.div>
        )
      })}
    </div>
  )
});

Notifications.propTypes = {
  /** Left: notifications animation will slide from right to left; right otherwise. */
  horizontal: PropTypes.oneOf(['left', 'right']),
  /** Top: new notifications will created on top of the list; bottom otherwise. */
  vertical: PropTypes.oneOf(['top', 'bottom']),
}

Notifications.defaultProps = {
  horizontal: 'left',
  vertical: 'bottom',
}

export default Notifications;