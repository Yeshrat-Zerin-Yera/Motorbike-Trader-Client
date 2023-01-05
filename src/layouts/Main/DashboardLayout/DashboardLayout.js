import React, { useContext } from 'react';
import Header from '../../../pages/Shared/Header/Header';
import { FaBars } from 'react-icons/fa'
import Footer from '../../../pages/Shared/Footer/Footer';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useRole from '../../../hooks/useRole';

const DashboardLayout = () => {
    // Auth Context
    const { user } = useContext(AuthContext);
    // [isSeller] From useRole
    const [userRole] = useRole(user?.email);

    // Dashboard Drawer
    const dashboardDrawer = <label htmlFor="dashboard-drawer" className='btn btn-ghost drawer-button'><FaBars /></label>

    // Button Class
    const btnClass = 'btn border-none bg-gradient-to-r from-cyan-400 to-blue-500 text-white mb-3'

    return (
        <div>
            {/* Header */}
            <Header dashboardDrawer={dashboardDrawer}></Header>
            {/* Dashboard */}
            <div className="drawer drawer-mobile drawer-end my-12">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                {/* Dashboard Content */}
                <div className="drawer-content bg-blue-100">
                    <Outlet></Outlet>
                </div>
                {/* Dashboard Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    {/* Dashboard Sidebar Links */}
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {
                            userRole === 'Seller' && <>
                                <li><Link to='/dashboard/addaproduct' className={btnClass}>Add A Product</Link></li>
                                <li><Link to='/dashboard/myproducts' className={btnClass}>My Products</Link></li>
                            </>
                        }
                        {
                            userRole === 'Buyer' && <li><Link to='/dashboard/myorders' className={btnClass}>My Orders</Link></li>
                        }
                        {
                            userRole === 'Admin' && <>
                                <li><Link to='/dashboard/allsellers' className={btnClass}>All Sellers</Link></li>
                                <li><Link to='/dashboard/allbuyers' className={btnClass}>All Buyers</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;