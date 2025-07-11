// src/pages/Coverage.jsx

import React from 'react';
import BangladeshMap from './BangladeshMap';


const Coverage = () => {
    return (
        <div className="p-8 space-y-6">
            {/* Page Title */}
            <h2 className="text-3xl font-bold text-center text-blue-900">
                We are Available in 64 Districts
            </h2>

            {/* Search Input */}
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search District..."
                    className="input input-bordered w-full max-w-md"
                />
            </div>

            {/* Map Component */}
            <BangladeshMap />
        </div>
    );
};

export default Coverage;
