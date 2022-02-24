import React, {forwardRef, useState} from 'react';
import PropTypes from "prop-types";
import {Check} from "react-feather";

import './MenuSelection.scss';
import MenuItem from "./MenuItem";

const MenuSelection = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {size, variant, defaultIndices, checkIcon, ...rootProps} = curProps;

  const [state, setState] = useState({
    selectedIndices: defaultIndices ? defaultIndices : [],
  })

  return (
    <div
      ref={ref}
      {...rootProps}
    >
      {React.Children.map(children, (item, index) => {
        if (item.type !== MenuItem) return item;

        let newProps = Object.assign({}, item.props);
        if (size) newProps['size'] = size;
        newProps['icon'] = (variant === 'indent' || !state.selectedIndices.includes(index)) ? <div/> : checkIcon;

        return (
          <div
            onClick={() => {
              let newSelectedIndices = [...state.selectedIndices];
              if (variant === 'indent') {
                newSelectedIndices = [];
              }
              else if (variant === 'select') {
                newSelectedIndices = [index];
              }
              else {
                const contain = newSelectedIndices.indexOf(index);
                if (contain !== -1) newSelectedIndices.splice(contain, 1);
                else newSelectedIndices.push(index);
              }
              setState({...state, selectedIndices: newSelectedIndices});
            }}
          >
            {React.cloneElement(item, newProps)}
          </div>
        )
      })}
    </div>
  );
});

MenuSelection.propTypes = {
  /** The size of the menu items in this menu section. */
  size: PropTypes.oneOf(['large', 'medium', 'small', undefined]),
  /** The variant of how menu item is selected */
  variant: PropTypes.oneOf(['indent', 'select', 'check']),
  /** Default selected indices of the menu items */
  defaultIndices: PropTypes.arrayOf(PropTypes.number),
  /** The icon of the checkmark of the menu items */
  checkIcon: PropTypes.node,
}

MenuSelection.defaultProps = {
  variant: 'indent',
  checkIcon: <Check/>
}

export default MenuSelection;