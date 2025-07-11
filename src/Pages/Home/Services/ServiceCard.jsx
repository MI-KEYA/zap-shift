// components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ service }) => {
    const { title, description, icon: Icon } = service;
    return (
        <div className="bg-white hover:bg-[#CAEB66] rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center border border-gray-100">
            <div className="text-blue-800 text-4xl mb-4 flex justify-center">
                <Icon />
            </div>
            <h3 className="font-semibold text-lg text-black mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
};

export default ServiceCard;
