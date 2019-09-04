import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Task.scss";

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.el = null;
    this.buttonPressTimer = null;
    this.getRef = this.getRef.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
  }

  componentDidMount() {
    // We need a way to avoid contentEditable warnings from react
    // One way to do so is to add the attribute after mounting
    if (this.el) {
      this.el.setAttribute("contentEditable", true);
    }
  }

  handleButtonPress(e) {
    e.stopPropagation();

    this.buttonPressTimer = setTimeout(() => {
      const { isDragging, onDragStart } = this.props;
      if (!isDragging) {
        onDragStart();
        // At the point when we drop this element may no longer exist
        this.el && this.el.blur();
      }
    }, 1000);
  }

  handleButtonRelease(e) {
    clearTimeout(this.buttonPressTimer);
  }

  handleBlur(e) {
    // Stop event so that it doesn't go to the Column
    e.stopPropagation();
    if (this.props.isDragging) {
      // clicking on contentEditable element focuses it automatically,
      // so we have to force blur when dragging (no keyboard will appear)
      this.el.blur();
    }
  }

  getRef(el) {
    this.el = el;
  }

  render() {
    const { id, children, onDragStart, isDragging = false } = this.props;

    return (
      <div
        id={id}
        ref={this.getRef}
        className={classNames("Task", { "Task--dragging": isDragging })}
        draggable
        autoFocus
        onDragStart={onDragStart}
        onClick={this.handleBlur}
        // TODO: split touch and desktop
        onTouchStart={this.handleButtonPress}
        onTouchEnd={this.handleButtonRelease}
        onMouseDown={this.handleButtonPress}
        onMouseUp={this.handleButtonRelease}
        onMouseLeave={this.handleButtonRelease}
      >
        {children}
      </div>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  isDragging: PropTypes.bool,
  onDragStart: PropTypes.func.isRequired
};
