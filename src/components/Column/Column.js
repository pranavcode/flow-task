import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTaskInColumn } from "../../store/actions";

import "./Column.scss";

// TODO: Use selector instead
const FIRST_COLUMN_ID = "d1ea1845-86e2-4c46-976c-8b09ba4786e5";

export class Column extends Component {
  constructor(props) {
    super(props);

    this.el = null;
    this.handleCreateTask = this.handleCreateTask.bind(this);
  }

  handleCreateTask() {
    this.el.scrollTop = 0;
    this.props.createTaskInColumn();
  }

  render() {
    const {
      id,
      name,
      count,
      children,
      innerRef,
      droppableProps
    } = this.props;

    const isFirstColumn = id === FIRST_COLUMN_ID;

    return (
      <div
        id={id}
        name={name}
        className="Column"
      >
        <header>
          <h2>
            {name} ({count})
          </h2>
          {isFirstColumn && (
            <i className="Column-plus" onTouchEnd={this.handleCreateTask} />
          )}
        </header>
        <div
          className="Column-body"
          ref={el => {
            this.el = el;
            innerRef(el);
          }}
          {...droppableProps}
        >
          {children}
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  droppableProps: PropTypes.object.isRequired,
  innerRef: PropTypes.func.isRequired,
  createTaskInColumn: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default connect(null, {
  createTaskInColumn
})(Column);
