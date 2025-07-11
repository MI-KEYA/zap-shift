import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import branchData from '../../assets/warehouses.json';

// ✅ Fix Leaflet's default marker icon issue in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const BangladeshMap = () => {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        setBranches(branchData);
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto">
            <MapContainer
                center={[23.8103, 90.4125]} // Center on Dhaka
                zoom={7}
                scrollWheelZoom={true}
                className="h-[600px] w-full rounded-xl shadow-lg z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {branches.map((branch, index) => (
                    <Marker
                        key={index}
                        position={[branch.latitude, branch.longitude]}
                    >
                        <Popup>
                            <div className="text-sm leading-5">
                                <strong>{branch.city}, {branch.district}</strong><br />
                                Region: {branch.region}<br />
                                <span className="block">Areas: {branch.covered_area?.join(', ')}</span>
                                <a
                                    href={branch.flowchart}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline mt-1 inline-block"
                                >
                                    View Flowchart
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default BangladeshMap;
