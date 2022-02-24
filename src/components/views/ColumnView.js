import React, {forwardRef, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {usePrevious} from "react-use";
import {ChevronRight} from "react-feather";

import List from "../lists/List";
import ListItem from "../lists/ListItem";

import "./ColumnView.scss";
import * as style from "../../style";


const ColumnView = forwardRef((props, ref) => {
  const {...publicProps} = props;
  const {classNames, styles, children, ...curProps} = publicProps;
  const {minWidth, selectedId, onSelect} = curProps;

  const [state, setState] = useState({
    width: minWidth,
    focused: true,
    isResizing: false,
    selectedId: undefined,
  })

  // Use controlled selectedId if it changes
  const prevSelectedId = usePrevious(selectedId);
  if (prevSelectedId !== selectedId && state.selectedId !== selectedId) {
    setState({...state, selectedId})
  }

  // Resizing column
  const listRef = useRef(ref);
  const stopResizing = React.useCallback(() => {
    setState(state => ({...state, isResizing: false}));
  }, []);

  const resize = React.useCallback((event) => {
    if (state.isResizing) {
      const width = event.clientX - listRef.current.getBoundingClientRect().left;
      setState(state => ({...state, width: Math.max(minWidth, width)}));
    }
  }, [state.isResizing]);

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  // sort out ColumnView components and other components
  const items = {};
  const others = [];
  React.Children.forEach(children, item => {
    if (item.type === ColumnView) items[item.props.id] = item;
    else others.push(item);
  });

  return (
    <div
      ref={ref}
      className="column-view"
    >
      <div
        ref={listRef}
        className="column"
        style={{
          width: state.width
        }}
        onClick={(event) => {
          if (event.target === listRef.current) {
            setState({...state, selectedId: undefined})
            if (onSelect) onSelect(undefined);
          }
        }}
      >
        <List
          size="small"
        >
          {Object.values(items).map((item, index) =>
            <ListItem
              key={index}
              primary={item.props.label}
              icon={
                <img
                  width={style.icon1}
                  height={style.icon1}
                  src={item.props.iconSrc}
                  alt={item.props.label}
                />
              }
              tail={!item.props.hasArrow ? null : <ChevronRight width={10} height={10}/>}
              variant={item.props.id === state.selectedId ? (state.focused ? 'primary' : 'secondary') : 'normal'}
              onClick={(event) => {
                setState({...state, selectedId: item.props.id});
                if (onSelect) onSelect(item.props.id);
                if (item.props.onClick) item.props.onClick(event);
              }}
            />
          )}
        </List>

        {others}
      </div>

      <div
        className="divider"
        onMouseDown={() => {
          setState({...state, isResizing: true});
        }}
      />

      {!items[state.selectedId] ? null :
        !items[state.selectedId].type === ColumnView ? items[state.selectedId] :
          React.cloneElement(items[state.selectedId], {
            onSelect: (selectedId) => {
              setState({...state, focused: selectedId === undefined});
              if (items[state.selectedId].props.onSelect) items[state.selectedId].props.onSelect(selectedId);
            }
          })
      }
    </div>
  )
});

ColumnView.propTypes = {
  /** The id of the ColumnView. */
  id: PropTypes.string,
  /** The label string of the ColumnView item appeared in the parent ColumnView. */
  label: PropTypes.string,
  /** The front icon src of the ColumnView item appeared in the parent ColumnView. */
  iconSrc: PropTypes.string,
  /** Whether to display an arrow in the back. */
  hasArrow: PropTypes.bool,
  /** The min width of the ColumnView. */
  minWidth: PropTypes.number,
  /** The selected id of the children ColumnView. */
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Callback function fired when a child ColumnView is selected. */
  onSelect: PropTypes.func,
}

ColumnView.defaultProps = {
  minWidth: 300,
  arrow: true,
}

export default ColumnView;
