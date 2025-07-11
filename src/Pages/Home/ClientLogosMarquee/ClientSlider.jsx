import React from 'react';
import Marquee from 'react-fast-marquee';

import logo1 from '../../../assets/brands/amazon.png';
import logo2 from '../../../assets/brands/amazon_vector.png';
import logo3 from '../../../assets/brands/casio.png';
import logo4 from '../../../assets/brands/moonstar.png';
import logo5 from '../../../assets/brands/randstad.png';
import logo6 from '../../../assets/brands/start-people 1.png';
import logo7 from '../../../assets/brands/start.png';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientSlider = () => {
    return (
        <section className="bg-white py-10 ">
            <div className="max-w-6xl mx-auto ">
                <div className="max-w-6xl mx-auto text-center mb-10">
                    <h2 className="text-3xl font-bold text-blue-900 ">Trusted by Clients</h2>
                </div>

                <Marquee speed={50} gradient={false} pauseOnHover={true}>
                    {logos.map((logo, index) => (
                        <div key={index} className="mx-24">
                            <img src={logo} alt={`client-logo-${index}`} className="h-6 w-auto object-contain" />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default ClientSlider;
