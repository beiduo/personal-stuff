import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import contentFilter from '../lib/contentFilter';

import Icon from './Icon';

export default class TaskTodo extends Component {
    constructor(props) {
        super(props);

        // these states are used for editing.
        this.state =  {
            edit: false,
            cache: this.props.task
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.setError = this.setError.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
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

    handleView() {
        this.props.taskClearError(this.props.id);
        this.setState({
            edit: false
        });
    }

    handleEdit() {
        this.props.taskClearError(this.props.id);
        this.setState({
            edit: true
        });
    }

    handleComplete(e) {
        e.preventDefault();
        this.props.completeRequest(this.props.id);
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.deleteRequest(this.props.id);
    }

    setError(error) {
        this.props.taskSetError(this.props.id, error);
    }

    handleTyping() {
        this.props.taskClearError(this.props.id);
    }

    handleSave() {
        const value = findDOMNode(this.refs.taskedit).value;

        if (!value.trim()) {
            this.props.taskSetError(this.props.id, 'please type a new task');
        } else {

            this.setState({
                cache: {
                    task: value
                }
            });
            this.props.editRequest(this.props.id, value);

            this.handleView();
        }
    }

    render() {
        const { task, id } = this.props;
        let { edit, cache } = this.state;

        if (edit) {
            return (
                <li>
                    <div className="time">
                        Created at {this.timeRender(task.created)},
                        Updated at {this.timeRender(task.updated)}
                    </div>
                    {this.errorRender(task.error)}
                    <div className="task-edit">
                        <textarea ref="taskedit" placeholder="Please type a task" defaultValue={cache.task} onChange={this.handleTyping}></textarea>
                    </div>
                    <div className="operator">
                        <div className="edit">
                            <a className="btn-save" href="javascript:;" onClick={this.handleSave}><Icon icon="floppy-disk" />Save</a>
                            <a className="btn-cancel" href="javascript:;" onClick={this.handleView}><Icon icon="undo2" />Cancel</a>
                        </div>
                    </div>
                </li>
            );
        } else {
            return (
                <li>
                    <div className="time">
                        Created at {this.timeRender(task.created)},
                        Updated at {this.timeRender(task.updated)}
                    </div>
                    {this.errorRender(task.error)}
                    <div className="task-content">
                        <div className="text" dangerouslySetInnerHTML={{__html: contentFilter(task.task)}}></div>
                    </div>
                    <div className="operator">
                        <div className="edit">
                            <a className="btn-edit" href="javascript:;" onClick={this.handleEdit}><Icon icon="pencil" />Edit</a>
                        </div>
                        <div className="extra">
                            <a className="btn-finish" href="javascript:;" onClick={this.handleComplete}><Icon icon="lock" />Complete</a>
                            <a className="btn-delete" href="javascript:;" onClick={this.handleDelete}><Icon icon="bin" />Delete</a>
                        </div>
                    </div>
                </li>
            );
        }
    }
}