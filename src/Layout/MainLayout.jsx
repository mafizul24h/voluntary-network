import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBer from '../Pages/NavBer/NavBer';
import Footer from '../Pages/Footer/Footer';

const MainLayout = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <NavBer />
            <div style={{minHeight: '90vh'}}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;