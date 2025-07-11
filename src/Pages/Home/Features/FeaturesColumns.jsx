import React from 'react';
import trackImg from '../../../assets/live-tracking.png';
import safeImg from '../../../assets/safe-delivery.png';


const features = [
    {
        id: 1,
        title: "Live Parcel Tracking",
        description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: trackImg
    },
    {
        id: 2,
        title: "100% Safe Delivery",
        description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: safeImg
    },
    {
        id: 3,
        title: "24/7 Call Center Support",
        description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: safeImg
    }
];

const FeatureColumns = () => {
    return (
        <section className="py-14 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 gap-8">
                    {features.map(({ id, title, description, image }) => (
                        <div
                            key={id}
                            className="flex bg-white px-6 py-10 rounded-lg shadow-md items-center gap-6"
                        >
                            {/* Image */}
                            <div className="w-[30%] flex-shrink-0">
                                <img src={image} alt={title} className="w-full h-32 object-contain" />
                            </div>

                            {/* Dotted line */}
                            <div className="border-l border-dotted border-gray-400  h-24"></div>

                            {/* Text */}
                            <div className="w-[70%] pl-6">
                                <h3 className="text-xl font-semibold  text-[#03373D] mb-2">{title}</h3>
                                <p className="text-[#03373D] text-sm">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureColumns;
