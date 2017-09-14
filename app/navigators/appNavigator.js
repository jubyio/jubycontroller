import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Home from '../components/home';
import Setting from '../components/setting';

export const AppNavigator = StackNavigator({
    Home: { screen: Home },
    Setting: { screen: Setting }
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