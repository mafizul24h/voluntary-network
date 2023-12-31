import React, { useContext, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from './../assets/logos/Group1329.png'
import { AuthContext } from '../Providers/AuthProvider';
import { FaDonate, FaHouseUser, FaPlus, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='bg-light container-fluid'>
            <div className='row'>
                <div style={{ minHeight: '100vh' }} className='col-2 col-md-3 bg-white'>
                    <div className=' p-3'>
                        <Link to='/'><img style={{ height: '50px' }} src={logo} alt="" /></Link>
                        <div className='mt-2'>
                            <div style={{height: '180px'}} className='text-center p-3'>
                                <img style={{ width: '100px', height: '100px' }} className='border border-success rounded-circle mb-2 ' src={user?.photoURL} alt={user?.displayName} />
                                <h4 className='text-dark'>{user?.displayName}</h4>
                            </div>

                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item mb-2">
                                    <NavLink to='/' className={({ isActive }) => isActive ? 'btn btn-success w-100' : 'btn btn-outline-success w-100'}><FaHouseUser /> Home</NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to='/donation' className={({ isActive }) => isActive ? 'btn btn-success w-100' : 'btn btn-outline-success w-100'}><FaDonate /> Donation</NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to='/admin/registerList' className={({ isActive }) => isActive ? 'btn btn-success w-100' : 'btn btn-outline-success w-100'}><FaUsers /> Volunteer register list</NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to='/admin/addEvent' className={({ isActive }) => isActive ? 'btn btn-success w-100' : 'btn btn-outline-success w-100'}><FaPlus /> Add Event</NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to='/admin/myEvent' className={({ isActive }) => isActive ? 'btn btn-success w-100' : 'btn btn-outline-success w-100'}>My Event</NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <NavLink to='/admin/allEvent' className={({ isActive }) => isActive ? 'btn btn-success w-100' : 'btn btn-outline-success w-100'}>All Event Summary</NavLink>
                                </li>
                                <li className="nav-item mb-2">
                                    <button onClick={handleLogout} className='btn btn-outline-success mb-2 w-100'>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-10 col-md-9 container'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;