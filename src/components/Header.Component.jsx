import React, { useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { FaYoutube } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

import '../App.css';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

const Header = ({ user }) => {
    const [profileView, setProfileView] = useState(false);
    const navigate = useNavigate();

    const loginProfile = () => {
        navigate('/login');
    }

    return (
        <>
            <Navbar bg="white" variant="light" className='shadow'>
                <Container>
                    <Navbar.Brand className='header-title d-flex py-0' style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <FaYoutube size={40} color={'red'} />&nbsp;&nbsp;
                        <h3 className='pt-1 pb-0 m-0'>YouTube Videos</h3>
                    </Navbar.Brand>
                    {user.length !== 0 ? <div onClick={() => setProfileView(!profileView)} style={{ border: '2px solid red', borderRadius: '50%', cursor: 'pointer' }}>
                        <img src={user.imageURL} alt='User' height='40px' width='40px' style={{ borderRadius: '50%' }} />
                    </div> : <CgProfile size={40} onClick={loginProfile} className='login-profile' />}
                </Container>
                {profileView && <Profile user={user} onChange={() => setProfileView(false)} />}
            </Navbar>
        </>
    )
}

export default Header