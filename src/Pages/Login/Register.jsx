import React, { useContext, useState } from 'react';
import logo from './../../assets/logos/Group1329.png'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Providers/AuthProvider';

const image_Hosting_Key = import.meta.env.VITE_IMAGE_API_TOKEN;

const Register = () => {
    const {createUser} = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [passError, setPasError] = useState();
    const [confirmError, setConfirmError] = useState();
    const [matchError, setMatchError] = useState();
    const [image, setImage] = useState();
    const imageURL = `https://api.imgbb.com/1/upload?key=${image_Hosting_Key}`;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {

        setPasError('');
        setConfirmError('');

        if (!/(?=.*[A-Z])/.test(data.password)) {
            setPasError('Please add at least one uppercase');
            return;
        } else if (!/(?=.*?[a-z])/.test(data.password)) {
            setPasError('Please add at lest one lowercase');
            return;
        } else if (!/(?=.*?[0-9])/.test(data.password)) {
            setPasError('Please add at lest one number');
            return;
        } else if (!/(?=.*?[!@#$%^&*])/.test(data.password)) {
            setPasError('Please add at lest one !@#$%^&*')
            return;
        } else if (data.password.length < 6) {
            setPasError('Please add password minimum 6 character')
            return;
        }

        if (!/(?=.*[A-Z])/.test(data.confirm)) {
            setConfirmError('Please add at least one uppercase');
            return;
        } else if (!/(?=.*?[a-z])/.test(data.confirm)) {
            setConfirmError('Please add at lest one lowercase');
            return;
        } else if (!/(?=.*?[0-9])/.test(data.confirm)) {
            setConfirmError('Please add at lest one number');
            return;
        } else if (!/(?=.*?[!@#$%^&*])/.test(data.confirm)) {
            setConfirmError('Please add at lest one !@#$%^&*')
            return;
        } else if (data.confirm.length < 6) {
            setConfirmError('Please add password minimum 6 character')
            return;
        }

        setMatchError('');
        if (data.password !== data.confirm) {
            setMatchError('Passwrod and Confirm Passwrod not matched');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        fetch(imageURL, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(resImg => {
            if(resImg.success) {
                data.image = resImg.data.display_url;
                console.log(data);

                createUser(data.email, data.password)
                .then(result => {
                    const logedUser = result.user;
                    console.log(logedUser);
                })
                .catch(error => {
                    console.log(error);
                })
            }
        })
    }

    return (
        <div >
            <div className="col-md-8 col-lg-6 bg-white p-4 p-lg-5 rounded mx-md-auto my-5 mx-3">
                <div className='d-flex justify-content-around mb-3'>
                    <img style={{ height: '40px' }} src={logo} alt="Logo" />
                    <h2>Please Register!</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label fw-bold">Name</label>
                        <input type="text" name='name' {...register("name", { required: true })} className="form-control" placeholder='Your Name' />
                        {errors.name && <p className='text-danger'>Please entry your name</p>}
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label fw-bold">Email</label>
                        <input type="email" name='email' {...register("email", { required: true })} className="form-control" placeholder='Your Email' />
                        {errors.email && <p className='text-danger'>Please entry your email</p>}
                    </div>
                    <div className="mb-3 fw-bold">
                        <label for="formFile" className="form-label">Upload Your Profile Photo</label>
                        <input className="form-control" type="file" onChange={(e) => setImage(e.target.files[0])} id="formFile" required />
                    </div>
                    <div className="mb-3 password-container position-relative">
                        <label for="exampleInputPassword1" className="form-label fw-bold">Password</label>
                        <input type={!show ? 'password' : 'text'} {...register("password", { required: true })} name='password' className="form-control" placeholder='Your Password' />
                        <div style={{ top: '53%', right: '3%', cursor: 'pointer' }} className='border-0 eye-icon position-absolute'>
                            {
                                !show ? <FaRegEyeSlash onClick={() => setShow(!show)} className='' /> : <FaRegEye onClick={() => setShow(!show)} />
                            }
                        </div>
                        {passError && <p className='text-danger'>{passError}</p>}
                        {errors.password && <p className='text-danger'>Please entry your password</p>}
                    </div>
                    <div className="mb-3 password-container position-relative">
                        <label for="exampleInputPassword1" className="form-label fw-bold">Confirm Password</label>
                        <input type={!show ? 'password' : 'text'} {...register("confirm", { required: true })} name='confirm' className="form-control" placeholder='Your Confirm Password' />
                        <div style={{ top: '53%', right: '3%', cursor: 'pointer' }} className='border-0 eye-icon position-absolute'>
                            {
                                !show ? <FaRegEyeSlash onClick={() => setShow(!show)} className='' /> : <FaRegEye onClick={() => setShow(!show)} />
                            }
                        </div>
                        {confirmError && <p className='text-danger'>{confirmError}</p>}
                        {matchError && <p className='text-danger'>{matchError}</p>}
                        {errors.confirm && <p className='text-danger'>Please entry your confirm password</p>}
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