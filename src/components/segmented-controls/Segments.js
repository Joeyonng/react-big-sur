import React, {forwardRef, useState} from "react";
import PropTypes from "prop-types";

import "./Segments.scss"

const Segments = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {defaultIndex, onChange, ...rootProps} = curProps;

  const [state, setState] = useState({
    selectedIndex: defaultIndex,
  })

  return (
    <div
      ref={ref}
      className="segments"
      {...rootProps}
    >
      {React.Children.map(children, (item, index) => (
        <>
          {React.cloneElement(item, {
            selected: (index === state.selectedIndex),
            onSelect: () => {
              setState({...state, selectedIndex: index});
              if (onChange) onChange(state.selectedIndex, index);
            },
          })}
          <div
            className="segment-divider"
            style={{
              visibility : (!Array.isArray(children) || index === children.length - 1 ||
                index === state.selectedIndex - 1 || index === state.selectedIndex) ? "hidden" : "visible",
            }}
          />
        </>
      ))}
    </div>
  )
});

Segments.propTypes = {
  /** The default index of the selected segment. */
  defaultIndex: PropTypes.number,
  /** Callback function fired when a new segment is selected. */
  onChange: PropTypes.func,
}

Segments.defaultProps = {
  defaultIndex: 0,
}

export default Segments;