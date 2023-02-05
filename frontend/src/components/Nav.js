import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.clear()
        navigate('/signup')
    }
    return (
        <>
        
           {auth ? <ul className='nav-ul'>
                <li><Link to='/' style={{background:'gray', borderRadius:'50%'}}>Ecom...</Link></li>

                <li><Link to='/'>Products</Link></li>
                <li><Link to='/add'>Add Products</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
               
                <li className='right-li'><Link to='/signup' onClick={handleLogout}
                >Logout ({JSON.parse(auth).name})</Link></li>

              
            </ul>
            :
            <ul className='nav-ul'>

                <>
                <li><Link to='/' style={{background:'gray', borderRadius:'50%'}}>Ecom...</Link></li>

                    <li className='right-li'><Link to='/signup'>Signup</Link></li>
                    <li className='right-li'><Link to='/login'>Login</Link></li>
                </>
            </ul>
        }
        </>
    )
}

export default Nav;