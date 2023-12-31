import React, { useContext } from 'react';
import googleImg from './../../assets/logos/google-icon.png'
import { AuthContext } from '../../Providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const hangleGoogleLogin = () => {
        googleSignIn()
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            navigate(from, {replace: true})
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className='mt-3'>
            <button onClick={hangleGoogleLogin} className='btn btn-outline-primary w-100'><img style={{width: '30px'}} src={googleImg} alt="Google Image" /> Sign In</button>
        </div>
    );
};

export default SocialLogin;