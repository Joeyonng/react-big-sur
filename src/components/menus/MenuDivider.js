import React, {forwardRef} from "react";

import './MenuDivider.scss';

const MenuDivider = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="menu-divider"
    />
  )
});

export default MenuDivider;

