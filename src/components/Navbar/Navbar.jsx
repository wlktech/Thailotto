import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let navigate = useNavigate();
    let auth = localStorage.getItem('token');

    let handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        alert("Logged Out Successfully.");
        navigate('/login');
    }
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-secondary navbar-dark shadow">
            <div className="container">
                <NavLink to={'/'} className="navbar-brand">
                    <div className="d-flex">
                        <div className='me-2'>
                            <img src="http://localhost:3000/logo.png" className='rounded shadow' width={60} alt="" />
                        </div>
                        <div className=''>
                            <span className="fw-bold d-block mb-0 pb-0 logo">DELIGHT MYANMAR</span>
                            {/* <span className='sologan mt-0 pt-0'>Grow Your Business With Us.</span> */}
                        </div>
                    </div>
                </NavLink>
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to={'/'} className="nav-link fw-bold">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/blogs'} className="nav-link">
                                Blogs
                            </NavLink>
                        </li>

                        {!auth && <li className="nav-item">
                            <NavLink to={'/login'} className="nav-link fw-bold">
                                Login
                            </NavLink>
                        </li>}

                        {auth && <li className="nav-item">
                            <button className="nav-link" onClick={handleLogout}>Logout</button>
                        </li>}
                    </ul>
                </div>
            </div>
        </nav>

    </div>
  )
}