import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading) {
        return (
            <div style={{height: '90vh'}} className='d-flex justify-content-center align-items-center'>
                <h1 >Loading...</h1>
            </div>
        )
    }

    if(user?.email) {
        return children;
    }
    
    return <Navigate to='/login' state={{from: location}} replace />
    
};

export default PrivateRoute;