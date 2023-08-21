import '../../assets/sass/layout.css'
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from './navbar';
import SideBar from './sidebar';
import { getDataUser, isAuthenticated } from '../shared/services/sesionService';

function Layout() {
    const [showMenu, setShowMenu] = useState(false);
    const [dataUser] = useState(getDataUser());
    const [title] = useState('Prestamo fácil');
    const isLogin = isAuthenticated();

    if (!isLogin) {
        return (<Navigate to={'/login'} />)
    }

    return (
        <>
            <NavBar title={title} dataUser={dataUser} setShowMenu={setShowMenu} />
            <SideBar title={title} showMenu={showMenu} setShowMenu={setShowMenu} />
            <Outlet />
        </>
    )
}

export default Layout;