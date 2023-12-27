import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <p className='text-center'><small>&copy; {new Date().getFullYear()} All Right Reserved by <Link to={'/'} className='fw-bold text-decoration-none text-dark'>Volunteer Network</Link></small></p>
        </div>
    );
};

export default Footer;