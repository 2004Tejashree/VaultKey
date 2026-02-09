import React from 'react';
import { toast } from 'react-toastify';

const Profile = ({ navigateTo }) => {
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userid');
        toast.info("Logged out");
        navigateTo('login');
    };

    return (
        <div className="flex justify-center items-center h-[80vh] text-white">
            <div className="bg-slate-800/50 backdrop-blur-sm p-10 rounded-xl shadow-2xl border border-white/10 text-center">
                <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold">
                    {username ? username[0].toUpperCase() : 'U'}
                </div>
                <h2 className="text-3xl font-bold mb-2">Hello, <span className="text-green-400">{username}</span>!</h2>
                <p className="text-slate-400 mb-8">Welcome to your secure vault.</p>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg hover:shadow-red-500/40"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
