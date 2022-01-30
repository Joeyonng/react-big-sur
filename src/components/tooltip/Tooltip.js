import React, {forwardRef} from "react";
import PropTypes from "prop-types";

import * as style from "../../style";
import "./Tooltip.scss"

const PLACEMENTS = {
  'top': {
    flexDirection: "column",
    borderColor: `${style.grey2} transparent transparent transparent`,
    borderWidth: `${style.height14} ${style.height14} 0 ${style.height14}`,
  },
  'bottom': {
    flexDirection: "column-reverse",
    borderColor: `transparent transparent ${style.grey2} transparent`,
    borderWidth: `0 ${style.height14} ${style.height14} ${style.height14}`,
  },
  'left': {
    flexDirection: "row",
    borderColor: `transparent transparent transparent ${style.grey2}`,
    borderWidth: `${style.height14} 0 ${style.height14} ${style.height14}`,
  },
  'right': {
    flexDirection: "row-reverse",
    borderColor: `transparent ${style.grey2} transparent transparent`,
    borderWidth: `${style.height14} ${style.height14} ${style.height14} 0`,
  },
}

const Tooltip = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {placement, ...rootProps} = curProps;

  return (
    <div
      className="tooltip"
      style={{
        flexDirection: PLACEMENTS[placement].flexDirection,
      }}
      {...rootProps}
    >
      <div className="tooltip-text">
        {props.text}
      </div>

      <div
        className="tooltip-tip"
        style={{
          borderColor: PLACEMENTS[placement].borderColor,
          borderWidth: PLACEMENTS[placement].borderWidth,
        }}
      />
    </div>
  )
});

Tooltip.propTypes = {
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
}

Tooltip.defaultProps = {
  placement: 'top',
}

export default Tooltip;
