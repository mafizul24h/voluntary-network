import React from 'react';
import googleImg from './../../assets/logos/google-icon.png'

const SocialLogin = () => {
    return (
        <div className='mt-3'>
            <button className='btn btn-outline-primary w-100'><img style={{width: '30px'}} src={googleImg} alt="Google Image" /> Sign In</button>
        </div>
    );
};

export default SocialLogin;