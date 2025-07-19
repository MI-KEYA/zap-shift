import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';

const SendParcel = () => {
    const { user } = UseAuth();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const [warehouses, setWarehouses] = useState([]);
    const [regions, setRegions] = useState([]);
    const parcelType = watch('type');

    useEffect(() => {
        fetch('/warehouses.json')
            .then(res => res.json())
            .then(data => {
                setWarehouses(data);
                const uniqueRegions = [...new Set(data.map(w => w.region))];
                setRegions(uniqueRegions);
            });
    }, []);

    const getCentersByRegion = (region) =>
        warehouses.filter(w => w.region === region).map(w => w.district);

    const calculateDeliveryCost = (data) => {
        const sameCenter = data.senderCenter === data.receiverCenter;
        const isWithinCity = sameCenter;

        let baseCost = 0;
        let breakdown = '';

        if (data.type === 'document') {
            baseCost = isWithinCity ? 60 : 80;
            breakdown = `Parcel Type: Document\nRegion: ${isWithinCity ? 'Within City' : 'Outside City'}\nTotal: ৳${baseCost}`;
        } else {
            const weight = parseFloat(data.weight);
            if (weight <= 3) {
                baseCost = isWithinCity ? 110 : 150;
                breakdown = `Parcel Type: Non-Document (≤3kg)\nRegion: ${isWithinCity ? 'Within City' : 'Outside City'}\nTotal: ৳${baseCost}`;
            } else {
                const extraKg = weight - 3;
                const extraCharge = extraKg * 40;
                baseCost = isWithinCity ? (110 + extraCharge) : (150 + extraCharge + 40);
                breakdown = `Parcel Type: Non-Document (>3kg)\nRegion: ${isWithinCity ? 'Within City' : 'Outside City'}\nWeight: ${weight}kg\nExtra: ৳${extraCharge}${!isWithinCity ? ' + ৳40 (outside)' : ''}\nTotal: ৳${baseCost}`;
            }
        }

        return { baseCost, breakdown };
    };

    const saveParcel = (data, cost) => {
        const parcelData = {
            ...data,
            cost,
            weight: data.type === 'document' ? null : data.weight,
            create_date: new Date().toISOString(),
        };
        console.log('Saved Parcel:', parcelData);
        Swal.fire('Success!', 'Parcel submitted successfully!', 'success');
        reset();
    };

    const onSubmit = (data) => {
        const { baseCost, breakdown } = calculateDeliveryCost(data);

        Swal.fire({
            title: 'Confirm Parcel Submission',
            icon: 'info',
            html: `<pre class="text-left text-sm">${breakdown}</pre>`,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            customClass: {
                htmlContainer: 'text-left whitespace-pre-wrap',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                saveParcel(data, baseCost);
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-6 border-2 rounded-3xl my-10">
            <h2 className="text-3xl font-bold mb-1">Send a Parcel</h2>
            <p className="text-gray-600 mb-6">Fill in parcel, sender, and receiver details to book delivery.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Parcel Info */}
                <section className="border border-gray-300 rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-3">Parcel Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="flex items-center gap-6">
                            <label className="label cursor-pointer flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="document"
                                    {...register('type', { required: true })}
                                    className="radio checked:bg-primary"
                                />
                                <span className="label-text">Document</span>
                            </label>
                            <label className="label cursor-pointer flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="non-document"
                                    {...register('type', { required: true })}
                                    className="radio checked:bg-primary"
                                />
                                <span className="label-text">Non-Document</span>
                            </label>
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Describe your parcel"
                                className="input input-bordered w-full"
                                {...register('title', { required: 'Parcel name is required' })}
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>

                        {parcelType === 'non-document' && (
                            <div>
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder="Weight (kg)"
                                    className="input input-bordered w-full"
                                    {...register('weight', {
                                        required: 'Weight is required for non-documents',
                                        min: { value: 0.1, message: 'Minimum weight is 0.1 kg' },
                                    })}
                                />
                                {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
                            </div>
                        )}
                    </div>
                </section>

                {/* Sender & Receiver Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Sender Info */}
                    <section className="border border-gray-300 rounded-lg p-4">
                        <h3 className="text-xl font-semibold mb-3">Sender Information</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                defaultValue={user?.displayName || ''}
                                readOnly
                                className="input text-white input-bordered w-full"
                                {...register('senderName')}
                            />
                            <input
                                type="text"
                                placeholder="Contact"
                                className="input input-bordered w-full"
                                {...register('senderContact', { required: 'Sender contact is required' })}
                            />
                            {errors.senderContact && <p className="text-red-500 text-sm">{errors.senderContact.message}</p>}

                            <select
                                {...register('senderRegion', { required: 'Sender region is required' })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Region</option>
                                {regions.map(region => <option key={region}>{region}</option>)}
                            </select>

                            <select
                                {...register('senderCenter', { required: 'Sender center is required' })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select District</option>
                                {getCentersByRegion(watch('senderRegion')).map(center => (
                                    <option key={center}>{center}</option>
                                ))}
                            </select>

                            <input
                                type="text"
                                placeholder="Address"
                                className="input input-bordered w-full"
                                {...register('senderAddress', { required: 'Sender address is required' })}
                            />

                            <textarea
                                placeholder="Pickup Instruction"
                                className="textarea textarea-bordered w-full"
                                {...register('pickupInstruction', { required: 'Pickup instruction is required' })}
                            ></textarea>
                        </div>
                    </section>

                    {/* Receiver Info */}
                    <section className="border border-gray-300 rounded-lg p-4">
                        <h3 className="text-xl font-semibold mb-3">Receiver Information</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder="Receiver Name"
                                className="input input-bordered w-full"
                                {...register('receiverName', { required: 'Receiver name is required' })}
                            />
                            <input
                                type="text"
                                placeholder="Contact"
                                className="input input-bordered w-full"
                                {...register('receiverContact', { required: 'Receiver contact is required' })}
                            />
                            <select
                                {...register('receiverRegion', { required: 'Receiver region is required' })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Region</option>
                                {regions.map(region => <option key={region}>{region}</option>)}
                            </select>
                            <select
                                {...register('receiverCenter', { required: 'Receiver center is required' })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select District</option>
                                {getCentersByRegion(watch('receiverRegion')).map(center => (
                                    <option key={center}>{center}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Address"
                                className="input input-bordered w-full"
                                {...register('receiverAddress', { required: 'Receiver address is required' })}
                            />
                            <textarea
                                placeholder="Delivery Instruction"
                                className="textarea textarea-bordered w-full"
                                {...register('deliveryInstruction', { required: 'Delivery instruction is required' })}
                            ></textarea>
                        </div>
                    </section>
                </div>

                <button type="submit" className="btn btn-primary text-black w-full">Submit</button>
            </form>
        </div>
    );
};

export default SendParcel;
