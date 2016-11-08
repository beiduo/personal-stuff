import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import contentFilter from '../lib/contentFilter';

import Icon from './Icon';

export default class TaskCompleted extends Component {
    constructor(props) {
        super();

        this.handleRestart = this.handleRestart.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.timeRender = this.timeRender.bind(this);
        this.errorRender = this.errorRender.bind(this);
    }

    timeRender(time) {
        return new Date(Number(time)).toLocaleString();
    }

    errorRender(error) {
        if (typeof error =='string') {
            return (
                <div className="error">{error}</div>
            )
        } else {
            return '';
        }
    }

    handleRestart(e) {
        e.preventDefault();
        this.props.restartRequest(this.props.id);
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.deleteRequest(this.props.id);
    }

    render() {
        const { task } = this.props;

        return (
            <li>
                <div className="time">
                    Created at {this.timeRender(task.created)},
                    Updated at {this.timeRender(task.updated)}
                </div>
                {this.errorRender(task.error)}
                <div className="task-content" dangerouslySetInnerHTML={{__html: contentFilter(task.task)}}>
                </div>
                <div className="operator">
                    <div className="extra">
                        <a href="javascript:;" onClick={this.handleRestart}><Icon icon="unlocked" />Restart</a>
                        <a href="javascript:;" onClick={this.handleDelete}><Icon icon="bin" />Delete</a>
                    </div>
                </div>
            </li>
        );
    }
}