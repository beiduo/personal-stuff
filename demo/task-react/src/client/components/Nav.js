import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Icon from './Icon';

class Nav extends Component {

    renderFilter(item) {
        if (item.route === this.props.sitemap.path) {
            return (
                <Link key={item.route} className="current" to={item.route}><Icon icon={item.icon} />{item.name}</Link>
            )
        } else {
            return (
                <Link key={item.route} to={item.route}><Icon icon={item.icon} />{item.name}</Link>
            )
        }
    }

    render() {
        let self = this;

        return (
            <nav className="sitenav">
                <div className="main">
                    {this.props.sitemap.main.map(item =>
                        self.renderFilter(item)
                    )}
                </div>
                <div className="sub">
                    {this.props.sitemap.sub.map(item =>
                        self.renderFilter(item)
                    )}
                </div>
            </nav>
        )
    }

}

Nav.PropTypes = {
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
    })
}


function mapStateToProps(state) {
    return {
        sitemap: state.sitemap
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);