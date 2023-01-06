import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Logo from '../../../assets/images/logo/logo.png';

const Header = ({ dashboardDrawer }) => {
    // Auth Context
    const { user, logOut } = useContext(AuthContext);

    // Nav Menu
    const navMenu = <React.Fragment>
        <li><Link to='/'>Home</Link></li>
        {/* Dropdown Menu  */}
        <li tabIndex={0} className='z-50'>
            <span>
                Categories
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </span>
            <ul className="p-1 bg-base-100 text-cyan-500">
                <li><Link to='categories/1' className='px-6 py-1'>Yamaha</Link></li>
                <li><Link to='categories/2' className='px-6 py-1'>Honda</Link></li>
                <li><Link to='categories/3' className='px-6 py-1'>Suzuki</Link></li>
                <li><Link to='categories/4' className='px-6 py-1'>Hero</Link></li>
                <li><Link to='categories/5' className='px-6 py-1'>Bajaj</Link></li>
                <li><Link to='categories/6' className='px-6 py-1'>TVS</Link></li>
            </ul>
        </li>
        {
            user?.uid && <li><Link to='/dashboard'>Dashboard</Link></li>
        }
        <li><Link to='/blog'>Blog</Link></li>
        {
            user?.uid ? <li><Link to='/signin' onClick={logOut} className='btn btn-white btn-outline'>Sign Out</Link></li> : <li><Link to='/signin' className='btn btn-white btn-outline'>Sign In</Link></li>
        }
    </React.Fragment>

    return (
        <div className="navbar bg-gradient-to-r from-cyan-500 to-blue-500 text-white max-w-[1400px] mx-auto">
            {/* Start */}
            <div className="navbar-start">
                {/* Dropdown */}
                <div className="dropdown">
                    {/* Dropdown Bar */}
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    {/* Dropdown Menu */}
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-cyan-500">
                        {navMenu}
                    </ul>
                </div>
                {/* Brand Name & Logo */}
                <Link to='/' className="btn btn-ghost normal-case text-xl"><img src={Logo} alt="" className='h-12' />Motorbike Trader</Link>
            </div>
            {/* End Menu */}
            <div className="navbar-end w-full hidden lg:flex">
                <ul className="menu menu-horizontal px-1 justify-end">
                    {navMenu}
                </ul>
            </div>
            <div className="navbar-end w-full flex lg:hidden">
                {dashboardDrawer}
            </div>
        </div>
    );
};

export default Header;