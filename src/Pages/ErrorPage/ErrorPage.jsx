import React from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { FaArrowAltCircleLeft, FaHome } from 'react-icons/fa';
import errorImage from './../../assets/error-image/400-error.avif'

const ErrorPage = () => {
    const navigate = useNavigate();
    const error = useRouteError();
    console.log(error);
    return (
        <div className='bg-ligth' style={{ minHeight: '100vh' }}>
            <div className='text-center py-3'>
                <img className='img-fluid' src={errorImage} alt="Error Image" />
                <div>
                    <h2 className='text-danger'>{error.status} Error</h2>
                    <p className='text-danger'>{error.error.message}</p>
                </div>
                <button className='btn btn-success me-3'><Link className='nav-link' to={'/'}><FaHome /> Home</Link></button>
                <button onClick={() => navigate(-1)} className='btn btn-warning'><FaArrowAltCircleLeft /> Go Back</button>
            </div>
        </div>
    );
};

export default ErrorPage;