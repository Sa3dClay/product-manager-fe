import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex h-screen w-screen items-center bg-gray-900">
            <div className="mx-auto my-auto">
                <form onSubmit={handleSubmit}>
                    <div className="my-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="my-4">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
