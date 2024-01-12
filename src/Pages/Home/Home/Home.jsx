import React from 'react';
import { Helmet } from 'react-helmet-async';
import Events from './Events';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Volunteer Network || Home</title>
            </Helmet>
            <Events />
        </div>
    );
};

export default Home;