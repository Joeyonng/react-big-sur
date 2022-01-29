import React, {forwardRef} from "react";

import "./ButtonGroup.scss"

const ButtonGroup = forwardRef((props, ref) => {
  return (
    <div
      className="buttons"
      style={{
        flexDirection: props.reverse ? "row-reverse" : "row",
      }}
    >
      {React.Children.map(props.children, (item, index) => (
        React.cloneElement(item, {
          key: index,
          style: {
            left: props.overlap ? (props.reverse ? 5 : -5) * index : 0, // Simulate the overlapping between buttons
          },
        })
      ))}
    </div>
  )
});

export default ButtonGroup;