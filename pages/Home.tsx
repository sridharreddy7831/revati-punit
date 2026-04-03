
import React from 'react';
import Hero from '../components/Hero';
import Events from '../components/Events';
import Story from '../components/Story';
import Gallery from '../components/Gallery';
import Venue from '../components/Venue';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <Story />
            <Events />
            <Venue />
            <Gallery />
        </>
    );
};

export default Home;
