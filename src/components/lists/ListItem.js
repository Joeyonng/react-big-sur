import React, {forwardRef} from "react";
import PropTypes from "prop-types";

import * as style from "../../style";
import './ListItem.scss';

const SIZES = {
  'large': {
    height: style.height5,
    space: style.space6,
    font: style.font4,
    iconSize: style.height7,
  },
  'medium': {
    height: style.height6,
    space: style.space7,
    font: style.font5,
    iconSize: style.height11,
  },
  'small': {
    height: style.height9,
    space: style.space7,
    font: style.font6,
    iconSize: style.height11,
  }
}

const VARIANTS = {
  'primary': {
    color: style.white,
    primaryColor: style.white,
    secondaryColor: style.white,
    backgroundColor: style.blue,
  },
  'secondary': {
    color: undefined,
    primaryColor: style.black,
    secondaryColor: style.grey1,
    backgroundColor: style.grey2,
  },
  'subdued': {
    color: undefined,
    primaryColor: style.black,
    secondaryColor: style.grey1,
    backgroundColor: style.grey3,
  },
  'normal': {
    color: undefined,
    primaryColor: style.black,
    secondaryColor: style.grey1,
    backgroundColor: style.transparent,
  },
  'disabled': {
    color: undefined,
    primaryColor: style.grey1,
    secondaryColor: style.grey1,
    backgroundColor: style.transparent,
  },
}

const ListItem = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {size, variant, noPadding, primary, secondary, icon, tail, ...rootProps} = curProps;

  return (
    <div
      ref={ref}
      className="list-item"
      style={{
        height: secondary ? style.height4 : SIZES[size].height,
        padding: noPadding ? "0 0 0 0" : `0 ${style.space4} 0 ${style.space4}`,
        color: VARIANTS[variant].color,
        backgroundColor: VARIANTS[variant].backgroundColor,
      }}
      {...rootProps}
    >
      {!icon ? null :
        <div
          className="list-item-icon"
          style={{
            width: secondary ? style.height7 : SIZES[size].iconSize,
            height: secondary ? style.height7 : SIZES[size].iconSize,
            margin: `0 ${secondary ? style.space5 : SIZES[size].space} 0 0`,
          }}
        >
          {icon}
        </div>
      }

      <div className="list-item-main">
        <div
          className="text-item-row"
          style={{
            color: VARIANTS[variant].primaryColor,
            fontSize: secondary ? style.font4 : SIZES[size].font,
            fontWeight: style.fontWeight4,
          }}
        >
          {primary}
        </div>
        {!secondary ? null :
          <div
            className="text-item-row"
            style={{
              color: VARIANTS[variant].secondaryColor,
              fontSize: style.font6,
              fontWeight: style.fontWeight4,
            }}
          >
            {secondary}
          </div>
        }
      </div>

      {!tail ? null :
        <div className="list-item-tail">
          {tail}
        </div>
      }
    </div>
  )
});

ListItem.propTypes = {
  /** The size of the list item. */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /** The variant of the list item style. */
  variant: PropTypes.oneOf(['primary', 'secondary', 'subdued', 'normal', 'disabled']),
  /** Whether add side paddings to this list item */
  noPadding: PropTypes.bool,
  /** Primary text of the list item. */
  primary: PropTypes.string,
  /** Secondary text of the list item. */
  secondary: PropTypes.string,
  /** Front icon of the list item. */
  icon: PropTypes.node,
  /** Tail of the list item */
  tail: PropTypes.node,
}

ListItem.defaultProps = {
  size: 'medium',
  variant: 'normal',
  noPadding: false,
}

export default ListItem;