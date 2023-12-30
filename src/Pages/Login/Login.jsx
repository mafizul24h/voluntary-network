import React, { useContext, useState } from 'react';
import logo from './../../assets/logos/Group1329.png'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Login = () => {
    const {singInUser} = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [passError, setPasError] = useState();

    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        setPasError('')
        if (!/(?=.*[A-Z])/.test(password)) {
            setPasError('Please add at least one uppercase');
            return;
        } else if (!/(?=.*?[a-z])/.test(password)) {
            setPasError('Please add at lest one lowercase');
            return;
        } else if (!/(?=.*?[0-9])/.test(password)) {
            setPasError('Please add at lest one number');
            return;
        } else if (!/(?=.*?[!@#$%^&*])/.test(password)) {
            setPasError('Please add at lest one !@#$%^&*')
            return;
        } else if (password.length < 6) {
            setPasError('Please add password minimum 6 character')
            return;
        }else {
            setPasError('')
        }
        console.log(email, password);
        singInUser(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <div className="col-md-8 col-lg-6 bg-white p-4 p-lg-5 rounded mx-md-auto my-5 mx-3">
                <div className='d-flex justify-content-around mb-3'>
                    <img style={{ height: '40px' }} src={logo} alt="Logo" />
                    <h2>Please Login!</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label fw-bold">Email</label>
                        <input type="email" name='email' className="form-control" placeholder='Your Email' />
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
                    {passError && <p className='text-danger'>{passError}</p>}
                    <input className="btn btn-primary w-100" type="submit" value={'Login'} />
                </form>
                <SocialLogin />
                <p className='mt-3 text-center'>Don’t have an account? <Link to='/register'>Create an Account</Link></p>
            </div>
        </div>
    );
};

export default Login;