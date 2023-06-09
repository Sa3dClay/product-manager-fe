import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userDataActions } from "@/store/user.slice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [password, setPassword] = useState("");
    const [initial, setInitial] = useState(true);

    useEffect(() => {
        if (!initial) return;

        axios.defaults.baseURL = "http://127.0.0.1:8000";

        if (userData.token || localStorage.token) router.push("/");

        setInitial(false);
    }, [initial, userData, router]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrors([]);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrors([]);
    };

    const ClearFormData = () => {
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = { username: email, password };

        axios
            .post("/api/auth/login", credentials)
            .then((res) => {
                let user = res.data.user;
                let token = res.data.token;

                dispatch(userDataActions.setUser(user));
                dispatch(userDataActions.setToken(token));

                localStorage.user = JSON.stringify(user);
                localStorage.token = JSON.stringify(token);

                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;

                ClearFormData();
                router.push("/");
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div className="flex h-screen w-screen items-center bg-gray-100">
            <div className="mx-auto my-auto rounded-md overflow-hidden bg-white shadow-xl p-8">
                <form onSubmit={handleSubmit}>
                    <div className="my-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => handleEmailChange(e)}
                            required
                            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        {errors.username && (
                            <p className="w-full text-sm my-2 text-red-400">
                                {errors.username[0]}
                            </p>
                        )}
                    </div>
                    <div className="my-4">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e)}
                            required
                            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        {errors.password && (
                            <p className="w-full text-sm my-2 text-red-400">
                                {errors.password[0]}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full my-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
