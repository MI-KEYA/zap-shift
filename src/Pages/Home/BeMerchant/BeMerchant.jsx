import React from 'react';
import merchant from '../../../assets/location-merchant.png'

const BeMerchant = () => {
    return (
        <div className="hero bg-gray-50 p-10">
            <div data-aos="zoom-in" className="hero-content bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] px-16 py-20 rounded-3xl flex-col lg:flex-row-reverse">
                <img
                    src={merchant}
                    className="max-w-sm rounded-lg "
                />
                <div>
                    <h1 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product.
                        Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className='flex items-center gap-6'>
                        <button className="btn py-3 px-6 rounded-full bg-[#CAEB66] font-bold text-[#03373D]">Be a Merchant</button>
                        <button className="btn bg-transparent text-[#CAEB66] border-[#CAEB66] rounded-full px-6 py-3">Earn With Profast Courier</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;