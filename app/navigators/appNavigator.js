import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';

import Controllers from '../components/controllers';
import Controller from '../components/controller';

export const AppNavigator = StackNavigator({
    Controllers: { screen: Controllers },
    Controller: { screen: Controller }
});

class AppWithNavigationState extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };
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