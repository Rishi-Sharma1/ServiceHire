import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import { ROUTES } from '../../../shared/constants/routes.constants';

export default function LoginPage() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] =
        useState({
            email: '',

            password: '',
        });

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            setError('');

            await login(formData);

            navigate(
                ROUTES.DASHBOARD
            );
        } catch (err: any) {
            setError(
                err.message ||
                'Login failed'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
            >
                <h1 className="mb-6 text-3xl font-bold text-center">
                    Login
                </h1>

                {error && (
                    <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 rounded">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={
                            formData.email
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full p-3 border rounded-lg outline-none"
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={
                            formData.password
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full p-3 border rounded-lg outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-3 font-semibold text-white bg-black rounded-lg cursor-pointer"
                >
                    {loading
                        ? 'Logging in...'
                        : 'Login'}
                </button>

                <p className="mt-4 text-sm text-center">
                    Don't have an account?{' '}
                    <span
                        onClick={() =>
                            navigate(
                                ROUTES.REGISTER
                            )
                        }
                        className="font-semibold cursor-pointer"
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
}