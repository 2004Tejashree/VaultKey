import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Login = ({ navigateTo }) => {
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('userid', data.userid);
                toast.success("Logged in successfully! Welcome!");
                setTimeout(() => {
                    navigateTo('manager');
                }, 1000);
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            toast.error("Server error");
        }
    };

    return (
        <div className="flex justify-center items-center h-[80vh] text-white">
            <div className="bg-slate-800/50 backdrop-blur-sm p-10 rounded-xl shadow-2xl border border-white/10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Sign In</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        className="rounded-full border border-green-500 w-full py-2 px-6 bg-slate-900/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="rounded-full border border-green-500 w-full py-2 px-6 bg-slate-900/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="bg-green-600 hover:bg-green-500 rounded-full py-2 font-bold transition-all shadow-lg hover:shadow-green-500/40">
                        Sign In
                    </button>
                </form>
                <div className="text-center mt-4 text-slate-300">
                    Don't have an account? <span onClick={() => navigateTo('register')} className="text-green-400 hover:underline cursor-pointer">Register</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
