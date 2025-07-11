import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientSlider from '../ClientLogosMarquee/ClientSlider';
import FeatureColumns from '../Features/FeaturesColumns';
import BeMerchant from '../BeMerchant/BeMerchant';

const Home = () => {
    return (
        <div>
            <Banner />
            <Services />
            <ClientSlider />
            <FeatureColumns />
            <BeMerchant />
        </div>
    );
};

export default Home;