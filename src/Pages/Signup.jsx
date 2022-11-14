import React, { useState } from 'react'
import '../App.css'
import { MdOutlineEmail, MdOutlinePhotoCamera } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { auth, storage, db } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';


const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(false);

    const createAccount = () => {
        setLoading(true);
        if (name !== '' && password !== '' && email !== '' && photo !== '') {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (res) => {
                    const userRef = doc(db, 'users', res.user.uid);
                    await setDoc(userRef, { name, email, imageURL })
                        .then(() => {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Successfully Registered!',
                                showConfirmButton: false,
                                timer: 3000
                            })
                            setLoading(false);
                            navigate('/youtube-clone');
                        }).catch((error) => {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: error.message,
                                showConfirmButton: false,
                                timer: 3000
                            })
                            setLoading(false);
                        });
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

    const uploadImage = e => {
        setPhoto(e.target.files[0])
        const imageRef = ref(storage, "images/" + Date.now());
        uploadBytes(imageRef, e.target.files[0]).then(res => {
            getDownloadURL(res.ref).then(url => {
                setImageURL(url);
            }).catch(err => { console.log("Error ", err) });
        }).catch(err => { console.log("Error ", err) });
    }

    return (
        <>
            <div className='login container d-flex justify-content-center align-items-center'>
                <div className='shadow p-4'>
                    <h1 className='text-center'>Register</h1>
                    <hr></hr>
                    <div className='m-2'>
                        <BsPersonCircle size={24} className='text-primary' />
                        <label className='mx-3'>Name</label>
                    </div>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} className='form-control shadow' style={{ width: '300px' }} placeholder='Enter email address' />

                    <div className='m-2 mt-3'>
                        <MdOutlineEmail size={24} className='text-primary' />
                        <label className='mx-3'>Email</label>
                    </div>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} className='form-control shadow' style={{ width: '300px' }} placeholder='Enter email address' />

                    <div className='m-2 mt-3'>
                        <RiLockPasswordLine size={24} className='text-primary' />
                        <label className='mx-3'>Password</label>
                    </div>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='form-control shadow' style={{ width: '300px' }} placeholder='Enter password' />

                    <input type='file' onChange={uploadImage} id='photo' style={{ display: 'none' }} accept='image/*' />
                    <label htmlFor='photo' className='mt-4' style={{ cursor: 'pointer' }}>
                        <MdOutlinePhotoCamera size={24} className='text-primary mx-2' />
                        {photo !== '' ? imageURL !== '' ? photo.name : 'Please wait...' : 'Choose a photo'}
                    </label>

                    <div className='d-flex flex-column align-items-center mt-4'>
                        <button id='button' onClick={createAccount} className='btn btn-primary shadow w-100' disabled={loading}>{loading ? 'Please wait...' : 'Register'}</button>
                    </div>

                    <div className='d-flex justify-content-center mt-4'>
                        <p>Have an account? </p><p onClick={() => navigate('/login')} className='mx-2 text-primary' style={{ cursor: 'pointer' }}>Login</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup