import React from 'react';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Volunteer Network || Home</title>
            </Helmet>
            <h1>Home Page</h1>
            <button className='btn btn-primary'>Home</button>
        </div>
    );
};

export default Home;