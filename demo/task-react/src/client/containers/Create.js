import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            error: undefined
        };

        this.handleSave = this.handleSave.bind(this);
        this.setError = this.setError.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
    }

    setError(error) {
        this.setState({
            error: error
        });
    }

    handleTyping() {
        this.setError(undefined);
    }

    handleSave(e) {
        e.preventDefault();

        const task = findDOMNode(this.refs.newtask).value;

        if (!task.trim()) {
            this.setError('please type a new task');
        } else {
            this.props.createRequest({
                task: task,
                completed: false
            });
        }
    }

    render() {
        let { create } = this.props;
        
        let error = this.state.error;
        return (
            <form className="createform" onSubmit={this.handleSave}>
                <textarea ref="newtask" placeholder="Type a new task..." onChange={this.handleTyping}></textarea>
                <button>Confirm</button>
                <div className="error">{error ? error : ''}</div>
            </form>
        );
    }
}

let { createRequest, createComplete } = actions

export default connect(
  ({ create }, ownProps) => ({
    create
  }),
  { createRequest, createComplete }
)(Create);