import React, { Component, PropTypes } from 'react';

class Icon extends Component {
    render () {
        var html = '<use xlink:href="#' + this.props.icon + '"></use>';
        return (
            <svg className="icon" dangerouslySetInnerHTML={{__html: html }} />
        )
    }
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired
}

export default Icon;