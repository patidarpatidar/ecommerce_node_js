import React from 'react';
import {Link} from 'react-router-dom';
const Nav=()=>{
    return (
        <>
            <ul className='nav-ul'>
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/add'>Add Products</Link></li>
                <li><Link to='/update'>Update Products</Link></li>
                <li className='right-li'><Link to='/logout'>Logout</Link></li>
                <li className='right-li'><Link to='/profile'>Profile</Link></li>
                <li className='right-li'><Link to='/signup'>Signup</Link></li>
            </ul>
        </>
    )
}

export default Nav;