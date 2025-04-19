import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function AccountStatus() {
    const ctx = useContext(UserContext);
    console.log(ctx);

    // You can replace this with dynamic user data from backend
    const user = {
        username: 'holosquad_hero',
        email: 'hero@holosquad.com',
        status: 'Active',
        registrationDate: '2024-05-10',
        renewalDate: '2025-05-10',
        plan: 'Premium',
        lastLogin: '2025-04-17 09:42 AM',
    };

    const getStatusBadge = (status) => {
        const baseClass = 'inline-block px-3 py-1 rounded-full text-white text-sm';
        switch (status) {
            case 'Active':
                return <span className={`${baseClass} bg-green-500`}>Active</span>;
            case 'Suspended':
                return <span className={`${baseClass} bg-yellow-500`}>Suspended</span>;
            case 'Deactivated':
                return <span className={`${baseClass} bg-red-500`}>Deactivated</span>;
            default:
                return <span className={`${baseClass} bg-gray-400`}>Unknown</span>;
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">Account Status</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <p className="text-gray-500">Username</p>
                    <p className="font-semibold">{ctx.user.loggedUserDetails
.name}</p>
                </div>
                <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-semibold">{ctx.user.loggedUserDetails
.email}</p>
                </div>
                <div>
                    <p className="text-gray-500">Account Status</p>
                    {getStatusBadge(user.status)}
                </div>
                <div>
                    <p className="text-gray-500">Subscription Plan</p>
                    <p className="font-semibold">{user.plan}</p>
                </div>
                <div>
                    <p className="text-gray-500">Registration Date</p>
                    <p className="font-semibold">{user.registrationDate}</p>
                </div>
                <div>
                    <p className="text-gray-500">Renewal Date</p>
                    <p className="font-semibold">{user.renewalDate}</p>
                </div>
                <div>
                    <p className="text-gray-500">Last Login</p>
                    <p className="font-semibold">{user.lastLogin}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl">
                    Upgrade Plan
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl">
                    Renew Account
                </button>
            </div>
        </div>
    );
}
