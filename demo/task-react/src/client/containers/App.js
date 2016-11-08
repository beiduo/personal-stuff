import React, { Component, PropTypes } from 'react';

import SvgIcon from '../icon-sprites.svg';

import Nav from '../components/Nav';

class App extends Component {
    render() {

        const { sitemap, tasks } = this.props;
        return (
            <div>
                <Nav sitemap={sitemap} />
                <div className="content">
                    {this.props.children && React.cloneElement(this.props.children, {
                        tasks: tasks,
                        sitemap: sitemap
                    })}
                </div>
                <div className="iconwrap">
                    <SvgIcon />
                </div>
            </div>
        )
    }
}

App.PropTypes = {
    sitemap: PropTypes.shape({
        path: PropTypes.string.isRequired,
        main: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            route: PropTypes.string.isRequired
        })),
        sub: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            route: PropTypes.string.isRequired
        }))
    }),
    tasks: PropTypes.arrayOf(PropTypes.shape({
        task: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }))
}

export default App;