import { signOut } from 'firebase/auth'
import React from 'react'
import Swal from 'sweetalert2'
import '../App.css'
import { auth } from '../firebase/firebase'

const Profile = ({ user, onChange }) => {
    const logout = () => {
        signOut(auth).then(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Successfully logged out!',
                showConfirmButton: false,
                timer: 3000
            })
            onChange();
        }).catch((error) => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.message,
                showConfirmButton: false,
                timer: 3000
            })
        });
    }
    return (
        <div className='profile-view shadow p-3 rounded'>
            <div className='d-flex justify-content-center'>
                <img src={user.imageURL} alt="User" height="200px" width="200px" style={{ borderRadius: '50%', border: '3px solid blue' }} />
            </div>
            <h2 className='text-center mt-2'>{user.name}</h2>
            <h5 className='text-center mt-2'>{user.email}</h5>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-danger w-100 mt-2' onClick={logout}>Signout</button>
            </div>
        </div>
    )
}

export default Profile