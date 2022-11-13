/* eslint-disable no-lone-blocks */
import React, { useState } from 'react'

const SearchBar = ({ onSubmitText }) => {

    const [searchText, setSearchText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        { searchText !== '' && onSubmitText(searchText) }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={e => setSearchText(e.target.value)} type="search" placeholder="Search any type of video" className='form-control shadow border-0 py-2 rounded-0' style={{ fontSize: '24px' }} />
            </form>
        </>
    )
}

export default SearchBar