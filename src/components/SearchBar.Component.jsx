/* eslint-disable no-lone-blocks */
import React, { useState } from 'react'
import Swal from 'sweetalert2';

const SearchBar = ({ onSubmitText, user }) => {

    const [searchText, setSearchText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (user.length === 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: 'Please login to search videos!',
                showConfirmButton: false,
                timer: 3000
            })
            setSearchText('');
        } else {
            { searchText !== '' && onSubmitText(searchText) }
        }

    }

    const searchVideos = () => {
        if (user.length === 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: 'Please login to search videos!',
                showConfirmButton: false,
                timer: 3000
            })
            setSearchText('');
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onClick={searchVideos} onChange={e => setSearchText(e.target.value)} type="search" placeholder="Search any type of video" className='form-control shadow border-0 py-2 rounded-0' style={{ fontSize: '24px' }} />
            </form>
        </>
    )
}

export default SearchBar