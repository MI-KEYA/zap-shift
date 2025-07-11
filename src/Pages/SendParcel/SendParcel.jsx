import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../hooks/UseAuth';

const regions = ['Dhaka', 'Chittagong', 'Sylhet', 'Khulna'];
const serviceCenters = ['Uttara Center', 'Mirpur Center', 'Agrabad Center', 'Zindabazar Center'];

const SendParcel = () => {
    const { user } = UseAuth();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const [cost, setCost] = useState(null);
    const parcelType = watch('type');

    const onSubmit = (data) => {
        let baseCost = data.type === 'document' ? 50 : 100;
        if (data.weight) baseCost += Number(data.weight) * 10;
        if (data.senderCenter !== data.receiverCenter) baseCost += 20;
        setCost(baseCost);
    };

    const saveParcel = (data, cost) => {
        const parcelData = {
            ...data,
            cost,
            weight: data.type === 'document' ? null : data.weight,
            create_date: new Date().toISOString(),
        };
        console.log('Saving to DB:', parcelData);
        setCost(null);
        reset();
    };

    return (
        <div className="max-w-5xl mx-auto p-6 border-2 rounded-3xl my-10">
            <h2 className="text-3xl font-bold mb-1">Send a Parcel</h2>
            <p className="text-gray-600 mb-6">
                Fill in parcel, sender, and receiver details to book delivery.
            </p>

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
                                placeholder="Parcel Title"
                                className="input input-bordered w-full"
                                {...register('title', { required: 'Title is required' })}
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
                                {errors.weight && (
                                    <p className="text-red-500 text-sm">{errors.weight.message}</p>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Sender & Receiver Info Responsive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Sender Info */}
                    <section className="border border-gray-300 rounded-lg p-4">
                        <h3 className="text-xl font-semibold mb-3">Sender Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                className="input text-white input-bordered w-full"
                                defaultValue={user?.displayName || ''}

                                {...register('senderName')}
                            />

                            <div>
                                <input
                                    type="text"
                                    placeholder="Contact"
                                    className="input input-bordered w-full"
                                    {...register('senderContact', { required: 'Sender contact is required' })}
                                />
                                {errors.senderContact && (
                                    <p className="text-red-500 text-sm">{errors.senderContact.message}</p>
                                )}
                            </div>

                            <div>
                                <select
                                    {...register('senderRegion', { required: 'Sender region is required' })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Region</option>
                                    {regions.map((region) => (
                                        <option key={region}>{region}</option>
                                    ))}
                                </select>
                                {errors.senderRegion && (
                                    <p className="text-red-500 text-sm">{errors.senderRegion.message}</p>
                                )}
                            </div>

                            <div>
                                <select
                                    {...register('senderCenter', { required: 'Sender center is required' })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Service Center</option>
                                    {serviceCenters.map((center) => (
                                        <option key={center}>{center}</option>
                                    ))}
                                </select>
                                {errors.senderCenter && (
                                    <p className="text-red-500 text-sm">{errors.senderCenter.message}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="input input-bordered w-full"
                                    {...register('senderAddress', { required: 'Sender address is required' })}
                                />
                                {errors.senderAddress && (
                                    <p className="text-red-500 text-sm">{errors.senderAddress.message}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Pickup Instruction"
                                    className="input input-bordered w-full"
                                    {...register('pickupInstruction', {
                                        required: 'Pickup instruction is required',
                                    })}
                                />
                                {errors.pickupInstruction && (
                                    <p className="text-red-500 text-sm">{errors.pickupInstruction.message}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Receiver Info */}
                    <section className="border border-gray-300 rounded-lg p-4">
                        <h3 className="text-xl font-semibold mb-3">Receiver Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Receiver Name"
                                    className="input input-bordered w-full"
                                    {...register('receiverName', { required: 'Receiver name is required' })}
                                />
                                {errors.receiverName && (
                                    <p className="text-red-500 text-sm">{errors.receiverName.message}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Contact"
                                    className="input input-bordered w-full"
                                    {...register('receiverContact', { required: 'Receiver contact is required' })}
                                />
                                {errors.receiverContact && (
                                    <p className="text-red-500 text-sm">{errors.receiverContact.message}</p>
                                )}
                            </div>

                            <div>
                                <select
                                    {...register('receiverRegion', { required: 'Receiver region is required' })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Region</option>
                                    {regions.map((region) => (
                                        <option key={region}>{region}</option>
                                    ))}
                                </select>
                                {errors.receiverRegion && (
                                    <p className="text-red-500 text-sm">{errors.receiverRegion.message}</p>
                                )}
                            </div>

                            <div>
                                <select
                                    {...register('receiverCenter', { required: 'Receiver center is required' })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Service Center</option>
                                    {serviceCenters.map((center) => (
                                        <option key={center}>{center}</option>
                                    ))}
                                </select>
                                {errors.receiverCenter && (
                                    <p className="text-red-500 text-sm">{errors.receiverCenter.message}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="input input-bordered w-full"
                                    {...register('receiverAddress', { required: 'Receiver address is required' })}
                                />
                                {errors.receiverAddress && (
                                    <p className="text-red-500 text-sm">{errors.receiverAddress.message}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Delivery Instruction"
                                    className="input input-bordered w-full"
                                    {...register('deliveryInstruction', {
                                        required: 'Delivery instruction is required',
                                    })}
                                />
                                {errors.deliveryInstruction && (
                                    <p className="text-red-500 text-sm">{errors.deliveryInstruction.message}</p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Submit
                </button>
            </form>

            {/* Cost & Confirmation */}
            {cost !== null && (
                <div className="mt-6 p-4 bg-base-200 rounded-lg shadow-md text-center">
                    <p className="text-xl font-semibold text-gray-800 mb-2">
                        Estimated Delivery Cost: <span className="text-primary">৳{cost}</span>
                    </p>
                    <button
                        className="btn btn-success"
                        onClick={handleSubmit((data) => saveParcel(data, cost))}
                    >
                        Confirm and Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default SendParcel;
