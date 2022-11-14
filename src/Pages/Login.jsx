import React, { useState } from 'react'
import '../App.css'
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginAccount = () => {
        if (password !== '' && email !== '') {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Successfully logged in!',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    setLoading(false);
                    navigate('/');
                })
                .catch((error) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: error.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                    setLoading(false);
                });
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please fill out all the required fields!',
                showConfirmButton: false,
                timer: 3000
            })
            setLoading(false);
        }
    }

    return (
        <>
            <div className='login container d-flex justify-content-center align-items-center'>
                <div className='shadow p-4'>
                    <h1 className='text-center'>Login</h1>
                    <hr></hr>
                    <div className='m-2'>
                        <MdOutlineEmail size={24} className='text-primary' />
                        <label className='mx-3'>Email</label>
                    </div>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} className='form-control shadow' style={{ width: '300px' }} placeholder='Enter email address' />
                    <div className='m-2 mt-3'>
                        <RiLockPasswordLine size={24} className='text-primary' />
                        <label className='mx-3'>Password</label>
                    </div>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='form-control shadow' style={{ width: '300px' }} placeholder='Enter password' />
                    <div className='d-flex flex-column align-items-center mt-4'>
                        <button id='button' onClick={loginAccount} className='btn btn-primary shadow w-100' disabled={loading}>{loading ? 'Please wait...' : 'Login'}</button>
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                        <p>Don't have an account? </p><p onClick={() => navigate('/signup')} className='mx-2 text-primary' style={{ cursor: 'pointer' }}>Register</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login