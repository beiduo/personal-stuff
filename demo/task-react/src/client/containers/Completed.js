import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';

import TaskCompleted from '../components/TaskCompleted';

class Completed extends Component {
    componentDidMount() {
        this.props.actions.fetchRequest();
    }

    taskFilter(items) {
        return items.filter(task =>
            task.completed
        );
    }
    render() {
        const { tasks } = this.props;
        const items = this.taskFilter(tasks.items);
        const actions = this.props.actions;
        return (
            <ul>
                {items.map((task) => {
                    return (
                        <TaskCompleted task={task} key={task._id} id={task._id} {...actions} />
                    )
                })}
            </ul>
        );
    }
}

Completed.PropTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        task: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }))
}


function mapStateToProps(state) {
    return {
        tasks: state.tasks
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Completed);