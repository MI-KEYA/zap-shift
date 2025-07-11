import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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

// ✨ FlyTo component
const MapFlyTo = ({ coordinates }) => {
    const map = useMap();

    useEffect(() => {
        if (coordinates) {
            map.flyTo(coordinates, 15); // Zoom level 10 for district
        }
    }, [coordinates, map]);

    return null;
};

const BangladeshMap = () => {
    const [branches, setBranches] = useState([]);
    const [searchText, setSearchText] = useState('')
    const [flyToCoordinates, setFlyToCoordinates] = useState(null)
    const [message, setMessage] = useState('')

    useEffect(() => {
        setBranches(branchData);
    }, []);

    const handleSearch = () => {
        const matchedBranch = branches.find(branch =>
            branch.district.toLowerCase().includes(searchText.toLowerCase())
        );
        if (matchedBranch) {
            setFlyToCoordinates([matchedBranch.latitude, matchedBranch.longitude])
            setMessage(`Found: ${matchedBranch.district}`)
        } else {
            setMessage('No matching district found.')
        }
    }
    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Search Input */}
            <div className="flex justify-center mb-5">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search District..."
                    className="input input-bordered w-full max-w-md"
                />
                <button onClick={handleSearch} className='btn btn-primary text-black'>Search</button>
            </div>
            {
                message && (
                    <p className='text-sm text-center text-red-600 mb-4'>{message}</p>
                )
            }
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
                {/* Fly to coordinates when search matches */}
                {flyToCoordinates && <MapFlyTo coordinates={flyToCoordinates} />}

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
