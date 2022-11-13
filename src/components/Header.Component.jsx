import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { FaYoutube } from 'react-icons/fa';

import '../App.css';

const Header = () => {
    return (
        <>
            <Navbar bg="white" variant="light" className='border-bottom shadow'>
                <Container>
                    <Navbar.Brand className='header-title d-flex py-0'>
                        <FaYoutube size={40} color={'red'} />&nbsp;&nbsp;
                        <h3 className='pt-1 pb-0 m-0'>YouTube Videos</h3>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default Header