import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Controllers from '../components/controllers';
import Controller from '../components/controller';

export const AppNavigator = StackNavigator({
    Controllers: { screen: Controllers },
    Controller: { screen: Controller }
});

class AppWithNavigationState extends React.Component {
    render() {
        const { dispatch, nav } = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav
        });
        return <AppNavigator navigation={navigation} />;
    }
}

// AppWithNavigationState.propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     nav: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);