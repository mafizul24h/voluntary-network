import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './../../assets/logos/Group1329.png'

const NavBer = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'><img style={{height: '40px'}} src={logo} alt="Logo" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item me-3">
                                <NavLink to='/' className={({ isActive }) => isActive ? 'btn btn-success' : 'btn btn-outline-success'}>Home</NavLink>
                            </li>
                            <li className="nav-item me-3">
                                <NavLink to='/donation' className={({ isActive }) => isActive ? 'btn btn-success' : 'btn btn-outline-success'}>Donation</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBer;