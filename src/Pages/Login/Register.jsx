import React, { useState } from 'react';
import logo from './../../assets/logos/Group1329.png'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { Link } from 'react-router-dom';

const Register = () => {
    const [show, setShow] = useState(false);

    return (
        <div>
            <div className="col-md-8 col-lg-6 bg-white p-4 p-lg-5 rounded mx-md-auto my-5 mx-3">
                <div className='d-flex justify-content-around mb-3'>
                    <img style={{ height: '40px' }} src={logo} alt="Logo" />
                    <h2>Please Login!</h2>
                </div>
                <form>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label fw-bold">Name</label>
                        <input type="text" name='name' className="form-control" placeholder='Your Name' />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label fw-bold">Email</label>
                        <input type="email" name='email' className="form-control" placeholder='Your Email' />
                    </div>
                    <div class="mb-3 fw-bold">
                        <label for="formFile" class="form-label">Upload Your Profile Photo</label>
                        <input class="form-control" type="file" id="formFile" />
                    </div>
                    <div className="mb-3 password-container position-relative">
                        <label for="exampleInputPassword1" className="form-label fw-bold">Password</label>
                        <input type={!show ? 'password' : 'text'} name='password' className="form-control" placeholder='Your Password' />
                        <div style={{ top: '53%', right: '3%', cursor: 'pointer' }} className='border-0 eye-icon position-absolute'>
                            {
                                !show ? <FaRegEyeSlash onClick={() => setShow(!show)} className='' /> : <FaRegEye onClick={() => setShow(!show)} />
                            }
                        </div>
                    </div>
                    <div className="mb-3 password-container position-relative">
                        <label for="exampleInputPassword1" className="form-label fw-bold">Confirm Password</label>
                        <input type={!show ? 'password' : 'text'} name='confirm' className="form-control" placeholder='Your Confirm Password' />
                        <div style={{ top: '53%', right: '3%', cursor: 'pointer' }} className='border-0 eye-icon position-absolute'>
                            {
                                !show ? <FaRegEyeSlash onClick={() => setShow(!show)} className='' /> : <FaRegEye onClick={() => setShow(!show)} />
                            }
                        </div>
                    </div>
                    <input className="btn btn-primary w-100" type="submit" value={'Register'} />
                </form>
                <SocialLogin />
                <p className='mt-3 text-center'>Alreday have an account? <Link to='/login'>Please Login</Link></p>
            </div>
        </div>
    );
};

export default Register;