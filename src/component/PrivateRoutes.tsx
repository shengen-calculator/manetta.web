import * as React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {ApplicationState, AuthenticationRole, AuthenticationState} from "../redux/reducers/types";
import {connect} from "react-redux";

interface PrivateRoutesProps {
    auth: AuthenticationState
    roles: Array<AuthenticationRole>
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({auth, roles}) => {
    return (
        roles.includes(auth.role) ?
            <Outlet/> :
            <Navigate to='/login'/>
    )
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        auth: state.authentication
    }
};

export default connect(
    mapStateToProps
)(PrivateRoutes);
