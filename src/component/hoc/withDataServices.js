import React, { Component } from 'react';
import { get } from './DI_Remote';


const withDataServices = (WrappedComponent, dependencies, mapDepsToProps) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = mapDepsToProps(...dependencies.map(get));
        }

        render() {
            return <WrappedComponent {...this.state} {...this.props} />;
        }
    }
}

export default withDataServices;
